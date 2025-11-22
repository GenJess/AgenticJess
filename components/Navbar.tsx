
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onTriggerAgent: () => void;
  onToggleExplore: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateAbout, onTriggerAgent, onToggleExplore }) => {
  return (
    <header className="fixed top-6 w-full z-50 px-6 pointer-events-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between pointer-events-auto">
        
        {/* Logo - Home */}
        <button onClick={onNavigateHome} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0f172a] border border-slate-800 rounded-xl flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-cyan-500/30 transition-all duration-300">
            <span className="font-space font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">J</span>
          </div>
          <span className="font-space font-bold text-lg tracking-tight text-slate-300 group-hover:text-white transition-colors">{BRAND_NAME}</span>
        </button>

        {/* Center Nav - Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0f172a]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <button 
            onClick={onNavigateAbout}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            About
          </button>
          <button 
            onClick={onTriggerAgent}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-400 hover:text-[#0f172a] transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          >
            Talk
          </button>
          <button 
            onClick={onToggleExplore}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            Explore
          </button>
        </nav>

        {/* Action */}
        <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex transition-all hover:scale-105 hover:shadow-cyan-500/20 text-[10px] font-bold tracking-widest uppercase text-slate-900 bg-gradient-to-r from-slate-200 to-white rounded-full px-5 py-2.5 shadow-lg items-center justify-center">
              Hire Me
            </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
