/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { LIBRARY_ITEMS } from '../constants';

interface ToolWorkspaceProps {
    itemId: string;
    type: 'tool' | 'resource';
}

const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ itemId, type }) => {
    const item = LIBRARY_ITEMS.find(i => i.id === itemId);

    if (!item) {
        return (
            <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center text-zinc-500">
                <div className="text-center">
                    <h1 className="text-xl text-white mb-2">404 // Module Not Found</h1>
                    <a href="#library" className="underline hover:text-emerald-500">Return to Lab</a>
                </div>
            </div>
        );
    }

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
                        className="w-full h-[400px] bg-[#1A1A1C] border border-zinc-800/60 rounded-xl p-6 text-sm font-mono text-zinc-300 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
                    />
                </div>
                <div className="space-y-4">
                    <div className="bg-[#1A1A1C] border border-zinc-800/60 p-6 rounded-xl">
                        <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Estimated Tokens</div>
                        <div className="text-4xl font-mono text-white tracking-tight">{estTokens.toLocaleString()}</div>
                    </div>
                    <div className="bg-[#1A1A1C] border border-zinc-800/60 p-6 rounded-xl">
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
            <div className="bg-[#1A1A1C] border border-zinc-800/60 rounded-xl overflow-hidden">
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
        <div className="min-h-screen bg-[#0F0F11] flex flex-col text-zinc-300">
            {/* Tool Header */}
            <div className="border-b border-zinc-800/50 bg-[#161618] h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <a href="#library" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Lab
                    </a>
                    <span className="text-zinc-700 text-lg font-light">/</span>
                    <h2 className="font-mono text-zinc-300 text-sm">
                        {type === 'tool' ? 'lab' : 'library'} / {item.slug}
                    </h2>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded font-mono uppercase">
                        {item.type === 'tool' ? 'Interactive' : 'Static'}
                    </span>
                    <a href="#library" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </a>
                </div>
            </div>

            {/* Workspace Content */}
            <div className="flex-1 p-6 md:p-12 overflow-auto">
                <div className="max-w-6xl mx-auto animate-fade-in">
                    
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">{item.title}</h1>
                        <p className="text-zinc-500 max-w-2xl">{item.description}</p>
                    </header>

                    {/* Dynamic Tool Content */}
                    {item.type === 'tool' && (
                        <div>
                             {item.component === 'TokenCalculator' && <TokenCalculator />}
                             {item.component === 'EnvChecker' && <EnvChecker />}
                        </div>
                    )}

                    {/* Static Resource Content */}
                    {(item.type === 'resource' || item.type === 'instruction') && (
                        <article className="prose prose-invert prose-zinc max-w-none bg-[#1A1A1C] border border-zinc-800/60 p-8 rounded-xl">
                            <div className="flex justify-end mb-4">
                                <button 
                                    onClick={() => navigator.clipboard.writeText(item.content || '')}
                                    className="text-xs flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors uppercase tracking-widest"
                                >
                                    <span className="material-symbols-outlined text-sm">content_copy</span>
                                    Copy Raw Context
                                </button>
                            </div>
                            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed">
                                {item.content}
                            </pre>
                            <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
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