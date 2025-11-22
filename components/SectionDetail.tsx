
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CategoryId, Project } from '../types';
import { CATEGORIES, PORTFOLIO_ITEMS } from '../constants';

interface SectionDetailProps {
  categoryId: CategoryId;
}

const SectionDetail: React.FC<SectionDetailProps> = ({ categoryId }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const projects = PORTFOLIO_ITEMS.filter(p => p.category === categoryId);

  if (!category) return null;

  const isMedia = categoryId === 'media';

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-32 min-h-screen animate-fade-in">
       {/* Header */}
       <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <div className={`w-1 h-8 bg-${category.color}-500 rounded-full shadow-[0_0_15px_currentColor]`}></div>
             <span className={`text-sm font-bold font-space tracking-[0.2em] uppercase text-${category.color}-400`}>{category.label}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-manrope font-bold text-white mb-6 max-w-2xl leading-tight">{category.description}</h1>
       </div>

       {/* Grid */}
       <div className={`grid ${isMedia ? 'grid-cols-1 gap-12' : 'md:grid-cols-2 gap-8'}`}>
          {projects.map((project, idx) => {
             // RENDER MEDIA PLAYERS
             if (project.mediaType === 'audio') {
                 return (
                    <div key={project.id} className="bg-[#0f172a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:border-white/10 transition-colors shadow-xl">
                        <div className="w-full md:w-48 h-48 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 relative group">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 px-2 py-1 rounded">Audio</span>
                                <span className="text-xs text-slate-500">{project.duration}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                            <p className="text-slate-400 mb-6">{project.author || 'Unknown Artist'}</p>
                            
                            {/* Fake Player Controls */}
                            <div className="w-full bg-slate-800/50 h-1.5 rounded-full mb-4 overflow-hidden">
                                <div className="w-1/3 h-full bg-cyan-500 rounded-full"></div>
                            </div>
                            <div className="flex gap-6 text-slate-400">
                                <svg className="w-5 h-5 hover:text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>
                                <svg className="w-5 h-5 text-white fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                <svg className="w-5 h-5 hover:text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>
                            </div>
                        </div>
                    </div>
                 );
             }

             if (project.mediaType === 'video') {
                 return (
                    <div key={project.id} className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors shadow-xl">
                        <div className="w-full aspect-video bg-black relative group cursor-pointer">
                             <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                 </div>
                             </div>
                             <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">
                                 {project.duration}
                             </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-slate-400 text-sm">{project.description}</p>
                        </div>
                    </div>
                 );
             }

             // DEFAULT CARD LAYOUT (Dev, AI, Finance)
             return (
                <div 
                    key={project.id}
                    className="group relative bg-[#0f172a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/10 transition-all duration-500 animate-slide-up"
                    style={{ animationDelay: `${0.1 * idx}s` }}
                >
                    <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-10 opacity-80"></div>
                    <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                    </div>
                    
                    <div className="p-8 relative z-20 -mt-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-bold text-slate-300 font-space uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold font-manrope text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 font-manrope leading-relaxed mb-8 font-light">{project.description}</p>
                    
                    <button className="flex items-center gap-2 text-sm font-bold font-space text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-all border border-white/5">
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                    </div>
                </div>
             );
          })}
       </div>
    </section>
  );
};

export default SectionDetail;
