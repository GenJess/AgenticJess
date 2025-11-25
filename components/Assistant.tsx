/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ChatMessage, CategoryId } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration, Blob } from '@google/genai';
import { PORTFOLIO_ITEMS, CATEGORIES } from '../constants';

export interface AssistantRef {
    startVoiceSession: () => void;
}

interface AssistantProps {
    onNavigate: (category: CategoryId) => void;
}

const Assistant = forwardRef<AssistantRef, AssistantProps>(({ onNavigate }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "System Online. I can guide you through Jesse's Finance, Development, or Media work.", timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);

  useImperativeHandle(ref, () => ({
    startVoiceSession: () => {
        if (!isOpen) setIsOpen(true);
        setTimeout(() => startLiveSession(), 500);
    }
  }));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLiveMode]);

  useEffect(() => {
    return () => stopLiveSession();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (error) {
        console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Live API ---

  const startLiveSession = async () => {
    if (isLiveConnected) return;
    setIsLiveMode(true);
    setMessages(prev => [...prev, { role: 'model', text: "Initializing voice connection...", timestamp: Date.now() }]);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("No API Key");

      const ai = new GoogleGenAI({ apiKey });
      
      const navigateTool: FunctionDeclaration = {
          name: "navigate",
          description: "Navigate the user to a specific portfolio section.",
          parameters: {
              type: Type.OBJECT,
              properties: {
                  category: { 
                      type: Type.STRING, 
                      description: "The category to go to. Options: 'finance', 'development', 'media', 'all-projects'" 
                  }
              },
              required: ["category"]
          }
      };

      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const portfolioContext = PORTFOLIO_ITEMS.map(p => 
        `- ${p.title} (${p.category}): ${p.description}`
      ).join('\n');
      
      const systemInstruction = `You are Jesse's Systems Agent.
      Your persona is efficient, precise, and slightly robotic/futuristic but helpful.
      
      Portfolio Content:
      ${portfolioContext}
      
      Crucial Rule: If the user expresses interest in a category (Finance, Development, Media, or All Projects), 
      IMMEDIATELY call the 'navigate' tool. Say "Accessing Finance Sector..." or "Loading All Modules...".
      
      Keep responses short.`;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
          tools: [{ functionDeclarations: [navigateTool] }]
        },
        callbacks: {
          onopen: () => {
            setIsLiveConnected(true);
            setMessages(prev => [...prev, { role: 'model', text: "Connection active. Listening.", timestamp: Date.now() }]);
            
            if (!inputAudioContextRef.current || !streamRef.current) return;
            sourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            processorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                let sum = 0;
                for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                setAudioLevel(Math.min(Math.sqrt(sum / inputData.length) * 5, 1));

                const pcmBlob = createBlob(inputData);
                sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            sourceRef.current.connect(processorRef.current);
            processorRef.current.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) playAudioChunk(audioData, audioContextRef.current);

            if (msg.toolCall) {
                for (const fc of msg.toolCall.functionCalls) {
                    if (fc.name === 'navigate') {
                        const args = fc.args as any;
                        onNavigate(args.category);
                        sessionPromise.then(session => session.sendToolResponse({
                            functionResponses: { name: fc.name, id: fc.id, response: { result: "Navigated" } }
                        }));
                    }
                }
            }
            if (msg.serverContent?.interrupted) {
                audioQueueRef.current.forEach(s => s.stop());
                audioQueueRef.current = [];
                nextStartTimeRef.current = 0;
            }
          },
          onclose: () => { setIsLiveConnected(false); setIsLiveMode(false); },
          onerror: (err) => { console.error(err); stopLiveSession(); }
        }
      });

    } catch (e) {
        console.error(e);
        setIsLiveMode(false);
    }
  };

  const stopLiveSession = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    inputAudioContextRef.current?.close();
    audioContextRef.current?.close();
    setIsLiveConnected(false);
    setIsLiveMode(false);
    setAudioLevel(0);
  };

  function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) int16[i] = data[i] * 32768;
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' };
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function playAudioChunk(base64Audio: string, ctx: AudioContext) {
      const dataInt16 = new Int16Array(decode(base64Audio).buffer);
      const float32 = new Float32Array(dataInt16.length);
      for(let i=0; i<dataInt16.length; i++) float32[i] = dataInt16[i] / 32768.0;
      
      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      if (nextStartTimeRef.current < ctx.currentTime) nextStartTimeRef.current = ctx.currentTime;
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += buffer.duration;
      audioQueueRef.current.push(source);
      source.onended = () => audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 font-manrope flex flex-col items-end">
      {isOpen && (
        <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] w-[90vw] sm:w-[380px] h-[500px] mb-6 flex flex-col overflow-hidden border border-zinc-800 animate-slide-up relative">
          
          {/* Header */}
          <div className="bg-zinc-900/50 p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isLiveConnected ? 'bg-emerald-400 text-emerald-400 animate-pulse' : 'bg-zinc-600 text-zinc-600'}`}></div>
                <span className="font-mono text-zinc-300 text-xs tracking-widest uppercase">Agent // v4.0</span>
            </div>
            
            {/* Close button on the right, fulfilling request to be near right side */}
            <button 
                onClick={() => { stopLiveSession(); setIsOpen(false); }} 
                className="text-zinc-500 hover:text-white transition-colors"
            >
                <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Live Mode UI */}
          {isLiveMode ? (
             <div className="flex-1 flex flex-col items-center justify-center relative bg-[#050505]">
                 <div className="relative z-10 flex items-center justify-center mb-12">
                    {/* Main Orb */}
                    <div className="w-32 h-32 rounded-full bg-black shadow-[inset_0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center relative border border-zinc-900">
                        <div 
                            className="absolute w-full h-full rounded-full bg-emerald-500/10 blur-xl transition-transform duration-75"
                            style={{ transform: `scale(${1 + audioLevel * 2})`, opacity: 0.5 + audioLevel }}
                        ></div>
                        <div 
                            className="absolute w-24 h-24 rounded-full bg-emerald-500/20 blur-md transition-transform duration-75"
                             style={{ transform: `scale(${0.9 + audioLevel})` }}
                        ></div>
                        <div className="w-20 h-20 rounded-full bg-black z-10 flex items-center justify-center border border-white/5">
                             <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                    </div>
                 </div>

                 <div className="z-10 text-center px-8">
                    <h3 className="font-display font-bold text-white text-lg mb-2 tracking-wide">LISTENING</h3>
                    <p className="text-[10px] text-zinc-500 font-mono border border-white/5 bg-white/5 px-3 py-1 rounded-full inline-block">
                        "Show me all projects"
                    </p>
                 </div>
             </div>
          ) : (
            /* Text Mode UI */
            <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]" ref={scrollRef}>
                    {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                        {msg.text}
                        </div>
                    </div>
                    ))}
                    {isThinking && <div className="text-xs font-mono text-emerald-500 ml-2 animate-pulse">COMPUTING...</div>}
                </div>
                <div className="p-3 border-t border-white/5 bg-zinc-900/30 backdrop-blur-sm">
                    <div className="flex gap-2 items-center">
                    <button 
                        onClick={startLiveSession}
                        className="p-2 rounded-lg bg-zinc-800 text-emerald-500 hover:bg-emerald-900/30 transition-colors border border-white/5"
                    >
                         <span className="material-symbols-outlined text-sm">mic</span>
                    </button>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Command..." 
                        className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-white/20 transition-colors placeholder-zinc-700 font-mono"
                    />
                    <button onClick={handleSend} disabled={!inputValue.trim() || isThinking} className="bg-white text-black p-2 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                    </button>
                    </div>
                </div>
            </>
          )}
        </div>
      )}
      
      {/* Siri Orb Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-500 ease-out overflow-hidden relative group"
      >
         {isOpen ? (
             /* Close Icon */
             <div className="absolute inset-0 bg-white flex items-center justify-center z-20">
                 <span className="material-symbols-outlined text-black text-2xl">close</span>
             </div>
         ) : (
             /* Dynamic Siri Orb */
             <div className="siri-orb-container">
                 <div className="siri-layer"></div>
                 <div className="siri-layer-2"></div>
                 <div className="siri-layer-3"></div>
                 <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">mic</span>
                 </div>
             </div>
         )}
      </button>
    </div>
  );
});

export default Assistant;