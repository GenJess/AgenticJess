/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface VaultProps {
  isOpen: boolean;
  onClose: () => void;
}

const Vault: React.FC<VaultProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const DEMO_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4"; 

  if (!isOpen) return null;

  const handleAuth = () => {
    if (passcode === '1234') {
        setIsUnlocked(true);
        setError(false);
    } else {
        setError(true);
        setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center animate-fade-in">
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
        
        {/* Theater Mode UI */}
        <div className={`relative w-full h-full flex flex-col transition-all duration-700 ${isUnlocked ? 'p-0' : 'p-4 items-center justify-center'}`}>
            
            <button className="absolute top-8 right-8 text-zinc-600 hover:text-white z-50 p-2 bg-black/50 rounded-full backdrop-blur-md transition-all" onClick={onClose}>
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            
            {!isUnlocked ? (
                <div className="bg-[#0a0a0a] w-full max-w-md p-10 rounded-2xl border border-zinc-800 shadow-2xl relative z-10">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                        <span className="material-symbols-outlined text-zinc-500">fingerprint</span>
                    </div>
                    <h3 className="text-xl font-display text-white mb-2 text-center">Restricted Access</h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-6 text-center">SECTOR 07 // VAULT</p>
                    
                    <input 
                        type="password" 
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                        placeholder="••••" 
                        className={`w-full bg-black border rounded-lg py-4 px-4 text-center text-white tracking-[1em] focus:outline-none focus:border-emerald-500/50 transition-all font-mono mb-6 text-2xl ${error ? 'border-red-500 text-red-500 animate-shake' : 'border-zinc-800'}`}
                    />
                    
                    <button 
                        onClick={handleAuth}
                        className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        UNFOLD ARCHIVE
                    </button>
                    <p className="text-[10px] text-zinc-700 mt-4 text-center font-mono">DEMO_KEY: 1234</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col relative animate-fade-in h-full overflow-hidden">
                    {/* Theater Video Backdrop */}
                    <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-10 blur-3xl scale-125" />
                    </div>

                    {/* Main Cinema Area */}
                    <div className="relative z-10 flex-1 flex flex-col lg:flex-row h-full">
                        
                        {/* Video Column */}
                        <div className="flex-[3] bg-black flex items-center justify-center relative shadow-2xl">
                             <video 
                                src={DEMO_VIDEO_URL} 
                                autoPlay 
                                controls 
                                className="w-full h-auto max-h-[85vh] object-contain shadow-[0_0_100px_rgba(0,0,0,1)]"
                             />
                             {/* Technical Overlay */}
                             <div className="absolute top-10 left-10 flex flex-col gap-2 pointer-events-none">
                                <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-[0.2em]">4K_ENCRYPTED_FEED</span>
                                <span className="text-zinc-500 text-[10px] font-mono">STREAMPACK_NODE: #7712</span>
                             </div>
                        </div>

                        {/* Metadata Sidebar (Theater Mode) */}
                        <div className="flex-1 bg-[#050505] border-l border-zinc-800/50 p-10 overflow-y-auto">
                            <div className="space-y-12">
                                <div>
                                    <span className="text-emerald-500 text-[10px] font-mono uppercase tracking-[0.3em] block mb-2">Active Artifact</span>
                                    <h2 className="text-3xl font-display font-bold text-white mb-4">LoRA_Artifact_v4</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        A visual intelligence model trained on 12,000 surreal architectural renders. This artifact represents the "Jesse" design aesthetic at its most extreme.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-white text-xs font-mono uppercase tracking-widest border-b border-zinc-800 pb-2">Technical Specs</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                                            <span className="text-[9px] text-zinc-500 uppercase block">Model Size</span>
                                            <span className="text-white font-mono">12.2 GB</span>
                                        </div>
                                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                                            <span className="text-[9px] text-zinc-500 uppercase block">Epochs</span>
                                            <span className="text-white font-mono">4,500</span>
                                        </div>
                                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                                            <span className="text-[9px] text-zinc-500 uppercase block">Base Model</span>
                                            <span className="text-white font-mono">SDXL_v1</span>
                                        </div>
                                        <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                                            <span className="text-[9px] text-zinc-500 uppercase block">Inference</span>
                                            <span className="text-white font-mono">1.2s / it</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button className="w-full py-4 border border-zinc-800 rounded-lg text-xs uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                                        Download Weight Pack (.safetensors)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Vault;