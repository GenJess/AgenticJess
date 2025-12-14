/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CategoryId, Project } from '../types';
import { CATEGORIES, PORTFOLIO_ITEMS } from '../constants';

interface SectionDetailProps {
  categoryId: CategoryId;
  onToggleVault: () => void;
  onOpenManifesto: () => void; // New Prop
}

const SectionDetail: React.FC<SectionDetailProps> = ({ categoryId, onToggleVault, onOpenManifesto }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const projects = PORTFOLIO_ITEMS.filter(p => p.category === categoryId);

  if (!category) return null;

  const handleProjectClick = (project: Project) => {
      if (project.hasDetailView) {
          onOpenManifesto();
      }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-screen animate-fade-in">
        <header className="mb-16 border-b border-white/5 pb-8">
            <span className={`text-xs font-mono mb-2 block text-${category.color}-500`}>{category.number} / SECTOR</span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">{category.label} Systems</h2>
            <p className="text-zinc-500 mt-4 max-w-xl">{category.description}</p>
        </header>

        {/* --- FINANCE LAYOUT (Wide Cards) --- */}
        {categoryId === 'finance' && (
            <div className="grid grid-cols-1 gap-12">
                {projects.map(project => (
                    <div key={project.id} className="glass-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 group hover:border-white/10 transition-colors">
                        <div className="h-64 lg:h-auto relative bg-zinc-900">
                             <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl font-display font-bold text-white mb-4">{project.title}</h3>
                            <p className="text-zinc-400 leading-relaxed mb-6">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-xs text-zinc-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* --- DEV LAYOUT (Bento) --- */}
        {categoryId === 'development' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[450px]">
                {/* Featured Item (Large) */}
                {projects[0] && (
                    <div 
                        onClick={() => handleProjectClick(projects[0])}
                        className={`lg:col-span-2 glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-end group ${projects[0].hasDetailView ? 'cursor-pointer hover:border-emerald-500/50' : ''}`}
                    >
                         <div className="absolute inset-0 z-0">
                            <img src={projects[0].imageUrl} className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <h3 className="text-3xl font-display font-bold text-white mb-3">{projects[0].title}</h3>
                                {projects[0].hasDetailView && (
                                    <span className="bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                                        Read Strategy
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-300 max-w-lg mb-6 leading-relaxed">{projects[0].description}</p>
                            <div className="flex gap-2">
                                {projects[0].tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Secondary Item (Vertical) */}
                {projects[1] && (
                     <div className="glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-end group">
                        <div className="absolute inset-0 z-0">
                            <img src={projects[1].imageUrl} className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-display font-bold text-white mb-3">{projects[1].title}</h3>
                            <p className="text-zinc-400 text-sm mb-4">{projects[1].description}</p>
                        </div>
                     </div>
                )}
                
                {/* Tertiary Item (Rest of grid if needed) */}
                 {projects[2] && (
                     <div className="lg:col-span-3 glass-card p-8 rounded-2xl relative overflow-hidden flex flex-row items-center gap-8 group">
                        <div className="w-1/3 h-full relative overflow-hidden rounded-xl">
                             <img src={projects[2].imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        </div>
                        <div className="relative z-10 flex-1">
                            <h3 className="text-2xl font-display font-bold text-white mb-3">{projects[2].title}</h3>
                            <p className="text-zinc-400 text-sm mb-4">{projects[2].description}</p>
                        </div>
                     </div>
                )}
            </div>
        )}

        {/* --- MEDIA LAYOUT (Grid + Vault) --- */}
        {categoryId === 'media' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projects.map(project => (
                    <div key={project.id} className="aspect-square bg-zinc-900 rounded-xl overflow-hidden hover:opacity-80 transition-opacity group relative">
                        <img src={project.imageUrl} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                            <span className="text-white text-sm font-bold">{project.title}</span>
                        </div>
                    </div>
                ))}

                {/* Vault Teaser */}
                <div 
                    onClick={onToggleVault}
                    className="aspect-square bg-black border border-zinc-800 rounded-xl overflow-hidden cursor-pointer group relative"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <span className="material-symbols-outlined text-4xl text-zinc-600 mb-2 group-hover:text-emerald-400 transition-colors">lock</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Restricted Model</span>
                    </div>
                    <img 
                        src="https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80" 
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity"
                    />
                </div>
            </div>
        )}
    </section>
  );
};

export default SectionDetail;