/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { CategoryId } from '../types';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration, Blob } from '@google/genai';
import { PORTFOLIO_ITEMS } from '../constants';

export interface AssistantRef {
    startVoiceSession: () => void;
}

interface AssistantProps {
    onNavigate: (category: CategoryId) => void;
}

// 3D Particle Orb Component - Refined for standalone interaction
const ParticleOrb: React.FC<{ 
    active: boolean; 
    connecting: boolean;
    audioLevel: number; 
}> = ({ active, connecting, audioLevel }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; z: number; size: number }[] = [];
        const particleCount = 120;
        const baseRadius = 50;

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            particles.push({
                x: baseRadius * Math.sin(phi) * Math.cos(theta),
                y: baseRadius * Math.sin(phi) * Math.sin(theta),
                z: baseRadius * Math.cos(phi),
                size: Math.random() * 1.8 + 0.4
            });
        }

        let angleX = 0;
        let angleY = 0;

        const render = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, rect.width, rect.height);
            
            // Rotation speed logic
            let rotationSpeed = 0.005;
            if (connecting) rotationSpeed = 0.05;
            if (active) rotationSpeed = 0.01 + (audioLevel * 0.05);
            
            angleX += rotationSpeed;
            angleY += rotationSpeed;
            
            const currentRadius = active ? (baseRadius + (audioLevel * 45)) : baseRadius;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            particles.forEach(p => {
                let x = p.x;
                let y = p.y;
                let z = p.z;

                const cosX = Math.cos(angleX);
                const sinX = Math.sin(angleX);
                const tempY = y * cosX - z * sinX;
                const tempZ = y * sinX + z * cosX;
                y = tempY;
                z = tempZ;

                const cosY = Math.cos(angleY);
                const sinY = Math.sin(angleY);
                const tempX = x * cosY + z * sinY;
                z = -x * sinY + z * cosY;
                x = tempX;

                const scale = 200 / (200 + z); 
                const projX = cx + x * scale * (currentRadius/baseRadius);
                const projY = cy + y * scale * (currentRadius/baseRadius);
                
                const alpha = (z + baseRadius) / (2 * baseRadius);
                ctx.beginPath();
                ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
                
                if (connecting) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
                } else if (active) {
                    ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`; // Emerald 400
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.15})`; // Idle
                }
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [active, connecting, audioLevel]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};


const Assistant = forwardRef<AssistantRef, AssistantProps>(({ onNavigate }, ref) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);

  useImperativeHandle(ref, () => ({
    startVoiceSession: () => startLiveSession()
  }));

  useEffect(() => {
    return () => stopLiveSession();
  }, []);

  const toggleSession = () => {
      if (status === 'idle') {
          startLiveSession();
      } else {
          stopLiveSession();
      }
  };

  const startLiveSession = async () => {
    if (status !== 'idle') return;
    setStatus('connecting');

    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey) throw new Error("API Key Missing");

      const ai = new GoogleGenAI({ apiKey });
      
      const navigateTool: FunctionDeclaration = {
          name: "navigate",
          description: "Navigate the user interface to a specific category.",
          parameters: {
              type: Type.OBJECT,
              properties: {
                  category: { 
                      type: Type.STRING, 
                      description: "The sector to go to: 'finance', 'development', 'media', 'all-projects', or 'library'" 
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

      const portfolioContext = PORTFOLIO_ITEMS.map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\n');
      const systemInstruction = `You are Jesse's Systems Agent. efficient and robotic but helpful. 
      Context:\n${portfolioContext}\n
      Use the navigate tool whenever the user mentions a category. Keep talking brief.`;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
          tools: [{ functionDeclarations: [navigateTool] }]
        },
        callbacks: {
          onopen: () => {
            setStatus('active');
            if (!inputAudioContextRef.current || !streamRef.current) return;
            sourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            processorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                let sum = 0;
                for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                setAudioLevel(prev => (prev * 0.7) + (Math.sqrt(sum / inputData.length) * 4 * 0.3));

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
                        onNavigate((fc.args as any).category as CategoryId);
                        sessionPromise.then(s => s.sendToolResponse({
                            functionResponses: { name: fc.name, id: fc.id, response: { result: "navigated" } }
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
          onclose: () => { stopLiveSession(); },
          onerror: (err) => { 
            console.error(err);
            stopLiveSession(); 
          }
        }
      });

    } catch (e) {
        console.error(e);
        setStatus('idle');
    }
  };

  const stopLiveSession = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    inputAudioContextRef.current?.close();
    audioContextRef.current?.close();
    audioQueueRef.current.forEach(s => s.stop());
    audioQueueRef.current = [];
    setStatus('idle');
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

  async function playAudioChunk(base64Audio: string, ctx: AudioContext) {
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
      const dataInt16 = new Int16Array(bytes.buffer);
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
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      
      {/* Dynamic Status Label */}
      <div className={`absolute bottom-full right-0 mb-4 font-mono text-[9px] tracking-[0.3em] uppercase transition-all duration-500 pointer-events-none ${
        status === 'active' ? 'text-emerald-500 opacity-100 translate-y-0' : 'text-zinc-600 opacity-0 translate-y-2'
      }`}>
        <span className="animate-pulse">Active // Listening</span>
      </div>

      {/* The Unified Interactive Orb */}
      <button 
        onClick={toggleSession}
        className={`relative w-20 h-20 rounded-full transition-all duration-700 ease-out hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden border ${
            status === 'active' 
                ? 'bg-black border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]' 
                : 'bg-zinc-950/40 backdrop-blur-md border-white/5 hover:border-white/20'
        }`}
      >
         {/* Internal Glow Effect */}
         <div className={`absolute inset-0 transition-opacity duration-700 ${
             status === 'active' ? 'opacity-10' : 'opacity-0'
         } bg-emerald-500`}></div>

         {/* 3D Reactive Particle Canvas */}
         <div className="w-full h-full relative z-10">
            <ParticleOrb 
                active={status === 'active'} 
                connecting={status === 'connecting'}
                audioLevel={audioLevel} 
            />
         </div>

         {/* Center Icon Overlay (Subtle) */}
         <div className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${
             status === 'idle' ? 'opacity-40 group-hover:opacity-100' : 'opacity-0 scale-50'
         }`}>
             <span className="material-symbols-outlined text-white text-xl">mic</span>
         </div>
      </button>

      {/* Decorative Outer Rings (Active Only) */}
      {status === 'active' && (
          <div className="absolute inset-[-10px] border border-emerald-500/10 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
      )}
    </div>
  );
});

export default Assistant;