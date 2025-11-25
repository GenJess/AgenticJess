/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PORTFOLIO_ITEMS } from '../constants';

const AllProjects: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-screen animate-fade-in">
        <header className="mb-16 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <span className="text-xs font-mono text-zinc-500 mb-2 block">// SYSTEM_VIEW_ALL</span>
                <h2 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">Project Index</h2>
                <p className="text-zinc-500 mt-4 max-w-xl">A complete archival view of all deployed systems, financial models, and generative artifacts.</p>
            </div>
            <div className="flex gap-4 text-xs font-mono text-zinc-600">
                <span>TOTAL_NODES: {PORTFOLIO_ITEMS.length}</span>
                <span>STATUS: ONLINE</span>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px]">
            {PORTFOLIO_ITEMS.map((project, idx) => (
                <div 
                    key={project.id} 
                    className={`glass-card rounded-2xl overflow-hidden relative group flex flex-col hover:border-white/20 transition-all duration-500 ${
                        idx % 3 === 0 ? 'md:col-span-2' : ''
                    } ${idx % 5 === 0 ? 'lg:row-span-2' : ''}`}
                >
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0 bg-zinc-900">
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 p-6 flex-1 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                <span className={`w-2 h-2 rounded-full ${
                                    project.category === 'finance' ? 'bg-emerald-500' :
                                    project.category === 'development' ? 'bg-purple-500' : 'bg-pink-500'
                                }`}></span>
                                <span className="text-[10px] uppercase tracking-widest text-zinc-300">{project.category}</span>
                            </div>
                            <h3 className="text-xl font-display font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-zinc-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                {project.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] text-white">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default AllProjects;