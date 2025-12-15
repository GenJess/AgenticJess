/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { LIBRARY_ITEMS } from '../constants';

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleOpenItem = (slug: string, type: 'tool' | 'resource' | 'instruction') => {
      // Logic handled by Hash Router in App.tsx
      if (type === 'tool') {
          window.location.hash = `/lab/${slug}`;
      } else {
          window.location.hash = `/library/${slug}`;
      }
  };

  const filteredItems = LIBRARY_ITEMS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F0F11] text-zinc-300 p-6 md:p-12 pt-32 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 border-b border-zinc-800/50 pb-6 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
              <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-zinc-500 text-xl">science</span>
                  <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">System // Lab</span>
              </div>
              <h1 className="text-3xl font-light text-zinc-100 tracking-tight">
                Lab & <span className="text-zinc-500">Library</span>
              </h1>
              <p className="mt-2 text-zinc-500 max-w-lg">
                Mini-tools, deployments, and static context. 
                Built for autonomous agent workflows.
              </p>
          </div>
          
          <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-zinc-500 text-sm">search</span>
                <input 
                    type="text" 
                    placeholder="Search modules..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#161618] border border-zinc-800/60 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/40 w-full md:w-64 transition-colors"
                />
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleOpenItem(item.slug, item.type)}
              className="group relative flex flex-col p-6 rounded-xl border border-zinc-800/60 bg-[#161618] hover:bg-[#1A1A1C] hover:border-zinc-700 transition-all duration-300 text-left"
            >
              <div className={`mb-4 w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                  item.type === 'tool' ? 'text-blue-400 bg-blue-500/5 group-hover:bg-blue-500/10' : 
                  'text-purple-400 bg-purple-500/5 group-hover:bg-purple-500/10'
              }`}>
                <span className="material-symbols-outlined">
                    {item.type === 'tool' ? 'terminal' : 'description'}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-zinc-200 mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              
              {/* Type Badge */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-400 uppercase tracking-widest border border-zinc-700">
                  {item.type}
                </span>
              </div>
            </button>
          ))}

          {/* New Item Placeholder (For Devs/Agents) */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-zinc-800 bg-transparent text-zinc-600">
              <span className="material-symbols-outlined mb-2 opacity-50">add_circle</span>
              <span className="text-xs uppercase tracking-widest">Deploy New Tool</span>
              <span className="text-[10px] mt-1 opacity-50 font-mono">/src/components/tools/</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;