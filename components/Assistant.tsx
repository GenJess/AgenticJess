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
    { role: 'model', text: "I'm listening. Ask me to show you Jesse's projects in AI, Finance, or Dev.", timestamp: Date.now() }
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
                      description: "The category to go to. Options: 'dev', 'ai', 'finance', 'blockchain', 'media', 'resources'" 
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
      
      const systemInstruction = `You are Jesse's Advanced Digital Agent.
      Your persona is professional, concise, and futuristic. You are the interface to Jesse's work.
      
      Portfolio Content:
      ${portfolioContext}
      
      Crucial Rule: If the user expresses interest in a category (e.g., "show me AI", "what finance work has he done?"), 
      IMMEDIATELY call the 'navigate' tool. 
      Do not ask for permission to navigate. Just do it, and say "Accessing AI protocols..." or "Loading finance modules...".
      
      Keep responses short. Use tech-noir metaphors (protocols, modules, nodes) lightly.`;

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
            setMessages(prev => [...prev, { role: 'model', text: "Link established. Listening.", timestamp: Date.now() }]);
            
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
    <div className="fixed bottom-8 right-8 z-50 font-manrope">
      {isOpen && (
        <div className="bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-[90vw] sm:w-[380px] h-[550px] mb-6 flex flex-col overflow-hidden border border-slate-700/50 animate-slide-up relative ring-1 ring-white/10">
          
          {/* Header */}
          <div className="bg-slate-900/80 p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isLiveConnected ? 'bg-cyan-400 text-cyan-400 animate-pulse' : 'bg-slate-600 text-slate-600'}`}></div>
                <span className="font-space font-bold text-slate-200 text-sm tracking-wide">JESSE.AI_AGENT v2.1</span>
            </div>
            
            {/* Close Button moved to top right of modal header */}
            <button 
                onClick={() => { stopLiveSession(); setIsOpen(false); }} 
                className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
          </div>

          {/* Live Mode UI */}
          {isLiveMode ? (
             <div className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
                 {/* Grid Background */}
                 <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                 
                 <div className="relative z-10 flex items-center justify-center mb-12">
                    {/* Main Orb */}
                    <div className="w-32 h-32 rounded-full bg-black shadow-[inset_0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center relative border border-slate-800">
                        <div 
                            className="absolute w-full h-full rounded-full bg-cyan-500/20 blur-xl transition-transform duration-75"
                            style={{ transform: `scale(${1 + audioLevel * 2})`, opacity: 0.5 + audioLevel }}
                        ></div>
                        <div 
                            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-md transition-transform duration-75"
                             style={{ transform: `scale(${0.9 + audioLevel})` }}
                        ></div>
                        <div className="w-20 h-20 rounded-full bg-black z-10 flex items-center justify-center border border-white/10">
                             <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                        </div>
                    </div>
                 </div>

                 <div className="z-10 text-center px-8">
                    <h3 className="font-space font-bold text-white text-lg mb-2 tracking-wide">LISTENING...</h3>
                    <p className="text-xs text-cyan-400/60 font-mono border border-cyan-900/50 bg-cyan-950/30 px-3 py-1 rounded-full inline-block">
                        Try: "Take me to the AI projects"
                    </p>
                 </div>
                 
                 {/* Visualizer Bars (Fake) */}
                 <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 pb-4 opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-1 bg-cyan-500/50 rounded-t-full transition-all duration-75"
                            style={{ 
                                height: `${Math.max(10, Math.random() * 100 * (audioLevel + 0.2))}%`,
                                opacity: isLiveConnected ? 1 : 0.2
                            }}
                        ></div>
                    ))}
                 </div>
             </div>
          ) : (
            /* Text Mode UI */
            <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a]" ref={scrollRef}>
                    {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-bl-none shadow-sm'}`}>
                        {msg.text}
                        </div>
                    </div>
                    ))}
                    {isThinking && <div className="text-xs font-mono text-cyan-400 ml-2 animate-pulse">PROCESSING...</div>}
                </div>
                <div className="p-3 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
                    <div className="flex gap-2 items-center">
                    <button 
                        onClick={startLiveSession}
                        className="p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 transition-colors border border-white/5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    </button>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a command..." 
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500 transition-colors placeholder-slate-600"
                    />
                    <button onClick={handleSend} disabled={!inputValue.trim() || isThinking} className="bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-500 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                    </div>
                </div>
            </>
          )}
        </div>
      )}
      
      {/* Main Launcher Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`relative group w-16 h-16 flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${isOpen ? 'bg-slate-800 text-white rotate-45' : 'bg-gradient-to-br from-slate-900 to-black border border-white/10 text-cyan-400 hover:scale-110'}`}
      >
        {/* Glow effect behind button */}
        <div className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-lg -z-10 group-hover:bg-cyan-500/40 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
        
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
        )}
      </button>
    </div>
  );
});

export default Assistant;