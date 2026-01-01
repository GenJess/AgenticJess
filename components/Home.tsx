/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CategoryId, NavigationTarget } from '../types';

interface HomeProps {
  onNavigate: (target: NavigationTarget | 'all-projects') => void;
  onStartVoice: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onStartVoice }) => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover opacity-20"
                alt="Abstract Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center animate-fade-in">
            <div>
                {/* Voice Agent Trigger */}
                <button 
                    onClick={onStartVoice}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors group cursor-pointer"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-medium text-zinc-300 tracking-[0.2em] uppercase group-hover:text-emerald-400 transition-colors">System Online // Talk</span>
                </button>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold text-white leading-[0.9] tracking-tighter mb-8">
                    The Architecture<br/>
                    <span className="text-zinc-600">of Intelligence.</span>
                </h1>
                
                <p className="text-lg text-zinc-400 max-w-lg leading-relaxed font-light mb-12 border-l border-zinc-800 pl-6">
                    A portfolio of algorithmic finance, generative identity, and autonomous agents. 
                    Building systems that think, trade, and create.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={() => onNavigate('all-projects')}
                        className="px-8 py-4 bg-white text-black rounded-lg font-semibold tracking-tight hover:bg-zinc-200 transition-all"
                    >
                        Enter Portfolio
                    </button>
                    <button
                        onClick={() => onNavigate('library')}
                        className="px-8 py-4 border border-white/10 text-white rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">grid_view</span> Access Nexus
                    </button>
                    <button
                        onClick={() => onNavigate('playbook')}
                        className="px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 rounded-lg font-medium hover:bg-emerald-500/20 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">terminal</span> SQL Playbook
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Home;