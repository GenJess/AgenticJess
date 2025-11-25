/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { CategoryId } from '../types';

interface NavbarProps {
  onNavigate: (target: 'home' | CategoryId) => void;
  onToggleVault: () => void;
  activeCategory?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onToggleVault, activeCategory }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNav = (target: 'home' | CategoryId) => {
    setIsMobileOpen(false);
    onNavigate(target);
  };

  const NavItem = ({ id, label }: { id: CategoryId, label: string }) => (
    <button 
        onClick={() => handleNav(id)}
        className={`text-xs font-medium uppercase tracking-widest transition-colors ${
            activeCategory === id ? 'text-white' : 'text-zinc-500 hover:text-white'
        }`}
    >
        {label}
    </button>
  );

  return (
    <>
        <nav className="fixed top-0 w-full z-50 glass-nav h-20">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Brand */}
                <button onClick={() => handleNav('home')} className="flex items-center gap-3 group focus:outline-none">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <span className="font-display font-bold text-white">J</span>
                    </div>
                    <span className="text-sm font-display font-bold tracking-widest text-white group-hover:text-zinc-300 transition-colors">JESSE</span>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <NavItem id="finance" label="Finance" />
                    <NavItem id="development" label="Development" />
                    <NavItem id="media" label="Media" />
                    
                    <button onClick={onToggleVault} className="text-xs font-medium uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">lock</span> Vault
                    </button>
                    
                    <button onClick={() => handleNav('code')} className="text-xs font-medium uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-2 border-l border-white/10 pl-6">
                        <span className="material-symbols-outlined text-[16px]">code</span> Source
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white p-2" onClick={() => setIsMobileOpen(true)}>
                    <span className="material-symbols-outlined">menu_open</span>
                </button>
            </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <button className="absolute top-6 right-6 text-zinc-400 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <button onClick={() => handleNav('home')} className="text-3xl font-display font-light text-white">Home</button>
            <button onClick={() => handleNav('finance')} className="text-3xl font-display font-light text-white">Finance</button>
            <button onClick={() => handleNav('development')} className="text-3xl font-display font-light text-white">Development</button>
            <button onClick={() => handleNav('media')} className="text-3xl font-display font-light text-white">Media</button>
            <button onClick={() => { setIsMobileOpen(false); onToggleVault(); }} className="text-3xl font-display font-light text-emerald-500">Vault Access</button>
            <button onClick={() => handleNav('code')} className="text-xl font-mono text-zinc-500 mt-8">&lt;view code /&gt;</button>
        </div>
    </>
  );
};

export default Navbar;
