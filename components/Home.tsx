
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HomeProps {
  onStartVoice: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartVoice }) => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Ambient */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="flex flex-col items-center text-center z-10 animate-slide-up">
            
            {/* Voice Command Core */}
            <div className="relative group cursor-pointer mb-12" onClick={onStartVoice}>
                {/* Outer Rings - Animated */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-[1.8] animate-[spin_10s_linear_infinite] opacity-30"></div>
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 scale-[2.2] animate-[spin_15s_linear_infinite_reverse] opacity-20"></div>
                
                {/* Hover Rings */}
                <div className="absolute inset-0 rounded-full border border-slate-700/50 scale-[1.4] group-hover:scale-[1.6] transition-transform duration-700"></div>
                
                {/* The Core */}
                <div className="w-40 h-40 rounded-full bg-[#020617] shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_0_50px_rgba(6,182,212,0.1)] flex items-center justify-center relative z-10 border border-white/5 group-hover:border-cyan-500/50 transition-colors duration-500">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-900 to-black flex items-center justify-center relative overflow-hidden shadow-inner">
                        {/* Active Glow */}
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl animate-[pulse_3s_ease-in-out_infinite]"></div>
                        
                        {/* Mic Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    </div>
                </div>
                
                {/* Label */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max">
                    <p className="text-[10px] font-space font-bold tracking-[0.3em] text-cyan-500/60 border border-cyan-500/10 px-3 py-1 rounded-full bg-cyan-950/10 uppercase">
                        Tap to Initialise
                    </p>
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium font-manrope text-white tracking-tighter mb-4 leading-tight opacity-90">
                Jesse's <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-500">Hub</span>
            </h1>
            
            <p className="text-slate-500 text-sm md:text-base font-mono tracking-wide">
                // SYSTEM ONLINE. WAITING FOR VOICE INPUT.
            </p>

        </div>
    </section>
  );
};

export default Home;
