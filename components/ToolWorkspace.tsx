/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { LIBRARY_ITEMS } from '../constants';

interface ToolWorkspaceProps {
    itemId: string;
    type: 'tool' | 'resource';
    onClose: () => void;
}

const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ itemId, type, onClose }) => {
    const item = LIBRARY_ITEMS.find(i => i.id === itemId);

    if (!item) {
        return (
            <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center text-zinc-500">
                <div className="text-center">
                    <h1 className="text-xl text-white mb-2">404 // Module Not Found</h1>
                    <button onClick={onClose} className="underline hover:text-emerald-500">Return to Lab</button>
                </div>
            </div>
        );
    }

    // Determine Accent Color
    const accentColor = type === 'tool' ? 'text-blue-500' : 'text-purple-500';
    const accentBg = type === 'tool' ? 'bg-blue-500' : 'bg-purple-500';
    const accentBorder = type === 'tool' ? 'border-blue-500/20' : 'border-purple-500/20';
    const glowShadow = type === 'tool' ? 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]';

    // --- Dynamic Tools ---
    
    const TokenCalculator = () => {
        const [text, setText] = React.useState('');
        const charCount = text.length;
        const estTokens = Math.ceil(charCount / 4);
        const flashCost = (estTokens / 1_000_000) * 0.075;
        
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
                        <span>INPUT_BUFFER</span>
                        <span>CHARS: {charCount}</span>
                    </div>
                    <textarea 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste prompt content here for analysis..."
                        className="w-full h-[400px] bg-[#1A1A1C] border border-zinc-800/60 rounded-xl p-6 text-sm font-mono text-zinc-300 focus:outline-none focus:border-blue-500/30 focus:shadow-[0_0_30px_rgba(59,130,246,0.1)] resize-none leading-relaxed transition-all duration-300"
                    />
                </div>
                <div className="space-y-4">
                    <div className="bg-[#1A1A1C] border border-zinc-800/60 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-50"></div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Estimated Tokens</div>
                        <div className="text-4xl font-mono text-white tracking-tight">{estTokens.toLocaleString()}</div>
                    </div>
                    <div className="bg-[#1A1A1C] border border-zinc-800/60 p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-50"></div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Est. Cost (Flash)</div>
                        <div className="text-4xl font-mono text-emerald-400 tracking-tight">${flashCost.toFixed(6)}</div>
                        <div className="mt-2 text-xs text-zinc-600">Based on $0.075 / 1M tokens</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-blue-400 leading-relaxed">
                        <strong className="block mb-1">Optimization Tip:</strong>
                        Using shared context vectors can reduce token load by up to 40% compared to raw prompt injection.
                    </div>
                </div>
            </div>
        );
    };

    const EnvChecker = () => {
        const apiKey = process.env.API_KEY ? 'CONFIGURED (SECURE)' : 'MISSING';
        
        return (
            <div className="bg-[#1A1A1C] border border-zinc-800/60 rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 divide-y divide-zinc-800/60">
                    <div className="p-6 flex justify-between items-center hover:bg-white/5 transition-colors">
                        <span className="font-mono text-sm text-zinc-400">process.env.API_KEY</span>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${process.env.API_KEY ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            <span className={`text-sm font-mono ${process.env.API_KEY ? 'text-emerald-500' : 'text-red-500'}`}>{apiKey}</span>
                        </div>
                    </div>
                    <div className="p-6 flex justify-between items-center hover:bg-white/5 transition-colors">
                        <span className="font-mono text-sm text-zinc-400">NODE_ENV</span>
                        <span className="text-sm font-mono text-white">{process.env.NODE_ENV || 'development'}</span>
                    </div>
                    <div className="p-6 flex justify-between items-center hover:bg-white/5 transition-colors">
                        <span className="font-mono text-sm text-zinc-400">Browser User Agent</span>
                        <span className="text-sm font-mono text-zinc-500 truncate max-w-xs">{navigator.userAgent}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0F0F11] flex flex-col text-zinc-300 relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent ${type === 'tool' ? 'via-blue-500' : 'via-purple-500'} to-transparent opacity-50 shadow-[0_0_50px_currentColor] text-${type === 'tool' ? 'blue' : 'purple'}-500`}></div>

            {/* Tool Header */}
            <div className="border-b border-zinc-800/50 bg-[#161618]/90 backdrop-blur-xl h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest group border border-transparent hover:border-zinc-800 rounded px-2 py-1"
                    >
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Lab
                    </button>
                    <span className="text-zinc-800 text-lg font-light">/</span>
                    <h2 className="font-mono text-zinc-300 text-xs md:text-sm flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${accentBg} shadow-[0_0_8px_currentColor]`}></span>
                        {type === 'tool' ? 'lab' : 'library'} / <span className="text-white">{item.slug}</span>
                    </h2>
                </div>
                
                {/* Unified Right Controls */}
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1 pl-4 gap-4">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                        {item.type === 'tool' ? 'INTERACTIVE' : 'STATIC'}
                    </span>
                    <div className="w-[1px] h-4 bg-zinc-800"></div>
                    <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-white hover:text-black transition-all">
                        <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
            </div>

            {/* Workspace Content */}
            <div className="flex-1 p-6 md:p-12 overflow-auto">
                <div className="max-w-6xl mx-auto animate-fade-in">
                    
                    <header className="mb-12 relative">
                        <h1 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">{item.title}</h1>
                        <p className="text-zinc-500 max-w-2xl text-lg font-light leading-relaxed mb-8">{item.description}</p>
                        
                        {/* Luminous Tags */}
                        <div className="flex flex-wrap gap-3">
                            <div className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-500 font-mono uppercase tracking-widest transition-all duration-500 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/5 cursor-default flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">fingerprint</span>
                                {item.id}
                            </div>
                            <div className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-500 font-mono uppercase tracking-widest transition-all duration-500 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/5 cursor-default flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">calendar_today</span>
                                {item.date}
                            </div>
                            {item.tags.map((tag, idx) => (
                                <span 
                                    key={idx} 
                                    className={`px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-500 font-mono uppercase tracking-widest transition-all duration-500 hover:text-white hover:border-white/40 ${glowShadow} hover:bg-white/5 cursor-default`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Decorative line */}
                        <div className={`w-full h-[1px] mt-8 bg-gradient-to-r from-${type === 'tool' ? 'blue' : 'purple'}-500/30 to-transparent`}></div>
                    </header>

                    {/* Dynamic Tool Content */}
                    {item.type === 'tool' && (
                        <div className="relative z-10">
                             {item.component === 'TokenCalculator' && <TokenCalculator />}
                             {item.component === 'EnvChecker' && <EnvChecker />}
                        </div>
                    )}

                    {/* Static Resource Content */}
                    {(item.type === 'resource' || item.type === 'instruction') && (
                        <article className={`prose prose-invert prose-zinc max-w-none bg-[#1A1A1C] border ${accentBorder} p-8 md:p-12 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-opacity-40`}>
                            {/* Subtle background glow for resources */}
                            <div className={`absolute top-0 right-0 w-96 h-96 ${accentBg} opacity-5 blur-[120px] pointer-events-none rounded-full`}></div>

                            <div className="flex justify-end mb-8 relative z-10">
                                <button 
                                    onClick={() => navigator.clipboard.writeText(item.content || '')}
                                    className={`text-xs flex items-center gap-2 text-zinc-500 hover:${accentColor} transition-colors uppercase tracking-widest border border-zinc-800 bg-zinc-900 px-3 py-1.5 rounded-lg group`}
                                >
                                    <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">content_copy</span>
                                    Copy Raw Context
                                </button>
                            </div>
                            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed relative z-10">
                                {item.content}
                            </pre>
                            <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center">
                                <p className="text-xs font-mono text-zinc-600">
                                    Agent Context URL: {window.location.origin}/#/library/{item.slug}
                                </p>
                            </div>
                        </article>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ToolWorkspace;