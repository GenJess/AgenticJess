/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { LIBRARY_ITEMS } from '../constants';
import { LibraryItem } from '../types';

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tool' | 'resource' | 'instruction'>('all');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  // Deep linking via Hash
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#nexus/')) {
            const id = hash.replace('#nexus/', '');
            const item = LIBRARY_ITEMS.find(i => i.id === id);
            if (item) setSelectedItem(item);
        }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenItem = (item: LibraryItem) => {
      setSelectedItem(item);
      window.location.hash = `nexus/${item.id}`;
  };

  const handleCloseItem = () => {
      setSelectedItem(null);
      // Remove hash without scrolling
      history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  const filteredItems = LIBRARY_ITEMS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTab = activeTab === 'all' || item.type === activeTab;
      return matchesSearch && matchesTab;
  });

  // --- Dynamic Components for Tools ---

  const TokenCalculator = () => {
      const [text, setText] = useState('');
      const charCount = text.length;
      const estTokens = Math.ceil(charCount / 4);
      const flashCost = (estTokens / 1_000_000) * 0.075; // Input price example
      const proCost = (estTokens / 1_000_000) * 1.25;

      return (
          <div className="space-y-4">
              <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste prompt here..."
                  className="w-full h-40 bg-black border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500/50"
              />
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900 p-4 rounded-lg">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Tokens (Est)</div>
                      <div className="text-2xl font-mono text-white">{estTokens.toLocaleString()}</div>
                  </div>
                  <div className="bg-zinc-900 p-4 rounded-lg">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Flash Input Cost</div>
                      <div className="text-2xl font-mono text-emerald-400">${flashCost.toFixed(6)}</div>
                  </div>
              </div>
          </div>
      );
  };

  const EnvChecker = () => {
      const apiKey = process.env.API_KEY ? 'CONFIGURED (HIDDEN)' : 'MISSING';
      const nodeEnv = process.env.NODE_ENV || 'development';
      
      return (
          <div className="bg-zinc-900 p-6 rounded-lg font-mono text-sm space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">process.env.API_KEY</span>
                  <span className={process.env.API_KEY ? "text-emerald-500" : "text-red-500"}>{apiKey}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400">NODE_ENV</span>
                  <span className="text-white">{nodeEnv}</span>
              </div>
              <div className="flex justify-between pt-2">
                  <span className="text-zinc-400">USER_AGENT</span>
                  <span className="text-white">{navigator.userAgent.slice(0, 20)}...</span>
              </div>
          </div>
      );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-screen animate-fade-in relative">
        <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">System // Online</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight mb-6">NEXUS LIBRARY</h2>
            <p className="text-zinc-400 max-w-2xl">
                A centralized repository of system instructions, architectural deep-dives (Deep Rx), and utility tools. 
                Designed for direct agent access via context linking.
            </p>
        </header>

        {/* Controls */}
        <div className="sticky top-24 z-30 bg-[#050505]/80 backdrop-blur-xl border-y border-white/5 py-4 mb-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {(['all', 'tool', 'resource', 'instruction'] as const).map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap ${
                            activeTab === tab ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-zinc-500 text-sm">search</span>
                <input 
                    type="text" 
                    placeholder="Search protocols..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-zinc-600 w-full md:w-64"
                />
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
                <div 
                    key={item.id} 
                    onClick={() => handleOpenItem(item)}
                    className="glass-card p-6 rounded-xl group hover:border-emerald-500/30 transition-all cursor-pointer flex flex-col h-full"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.type === 'tool' ? 'bg-blue-500/10 text-blue-400' :
                            item.type === 'resource' ? 'bg-purple-500/10 text-purple-400' :
                            'bg-orange-500/10 text-orange-400'
                        }`}>
                            <span className="material-symbols-outlined">
                                {item.type === 'tool' ? 'terminal' : item.type === 'resource' ? 'article' : 'integration_instructions'}
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">{item.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                    <p className="text-zinc-500 text-sm mb-6 flex-1">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-zinc-400 border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Modal / Detail View */}
        {selectedItem && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseItem}></div>
                <div className="relative bg-[#0a0a0a] w-full max-w-3xl max-h-[90vh] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col animate-slide-up">
                    
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-start bg-zinc-900/50">
                        <div>
                            <div className="flex gap-2 mb-2">
                                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${
                                    selectedItem.type === 'tool' ? 'bg-blue-500/20 text-blue-400' :
                                    selectedItem.type === 'resource' ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-orange-500/20 text-orange-400'
                                }`}>
                                    {selectedItem.type}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 pt-0.5">ID: {selectedItem.id}</span>
                            </div>
                            <h2 className="text-2xl font-display font-bold text-white">{selectedItem.title}</h2>
                        </div>
                        <button onClick={handleCloseItem} className="text-zinc-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        
                        {/* Dynamic Tool Rendering */}
                        {selectedItem.type === 'tool' && (
                            <div className="mb-6">
                                {selectedItem.component === 'TokenCalculator' && <TokenCalculator />}
                                {selectedItem.component === 'EnvChecker' && <EnvChecker />}
                            </div>
                        )}

                        {/* Text Content */}
                        {selectedItem.content && (
                            <div className="relative">
                                <div className="absolute right-0 top-0">
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(selectedItem.content || '')}
                                        className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-1 bg-zinc-900 px-3 py-1 rounded border border-zinc-800"
                                    >
                                        <span className="material-symbols-outlined text-sm">content_copy</span> Copy
                                    </button>
                                </div>
                                <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed bg-zinc-900/30 p-4 rounded-lg border border-white/5">
                                    {selectedItem.content}
                                </pre>
                            </div>
                        )}
                        
                        {selectedItem.type === 'resource' && !selectedItem.content && (
                            <div className="text-center py-12 text-zinc-500 italic">
                                Resource content loading...
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-zinc-900/50 border-t border-white/5 text-center">
                        <p className="text-[10px] text-zinc-600 font-mono">
                            URL_CONTEXT: {window.location.origin}/#nexus/{selectedItem.id}
                        </p>
                    </div>
                </div>
            </div>
        )}
    </section>
  );
};

export default Library;