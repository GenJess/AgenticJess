/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';

interface VaultProps {
  isOpen: boolean;
  onClose: () => void;
}

const Vault: React.FC<VaultProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  // Example placeholder video - In production, this would be a URL from constants.ts
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
        
        <div className="relative bg-[#0a0a0a] w-full max-w-2xl p-0 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
            <button className="absolute top-4 right-4 text-zinc-600 hover:text-white z-20" onClick={onClose}>
                <span className="material-symbols-outlined">close</span>
            </button>
            
            {!isUnlocked ? (
                <div className="p-10 text-center">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                        <span className="material-symbols-outlined text-zinc-500">fingerprint</span>
                    </div>
                    <h3 className="text-xl font-display text-white mb-2">Restricted Access</h3>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Enter Passcode (Demo: 1234)</p>
                    
                    <input 
                        type="password" 
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="••••" 
                        className={`w-full bg-black border rounded-lg py-3 px-4 text-center text-white tracking-[1em] focus:outline-none focus:border-white/30 transition-colors font-mono mb-4 text-xl ${error ? 'border-red-500 text-red-500' : 'border-zinc-800'}`}
                    />
                    
                    <button 
                        onClick={handleAuth}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        AUTHENTICATE
                    </button>
                </div>
            ) : (
                <div className="animate-slide-up bg-black relative">
                    {/* Video Player */}
                    <div className="aspect-video w-full bg-black relative group">
                        <video 
                            src={DEMO_VIDEO_URL} 
                            autoPlay 
                            controls 
                            className="w-full h-full object-contain"
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-white uppercase tracking-widest font-mono border border-white/10">
                            CONFIDENTIAL // PLAYING
                        </div>
                    </div>
                    
                    <div className="p-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
                        <div className="col-span-2 text-center mb-2">
                             <h3 className="text-lg font-display text-white">LoRA Model: Jesse_v4</h3>
                             <p className="text-emerald-500 text-xs uppercase tracking-widest">Active • v4.2.1 • 12GB</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80" className="rounded-lg object-cover h-24 w-full opacity-50 hover:opacity-100 transition-opacity" />
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" className="rounded-lg object-cover h-24 w-full opacity-50 hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Vault;