/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { CategoryId, Project } from '../types';
import { CATEGORIES, PORTFOLIO_ITEMS } from '../constants';

interface SectionDetailProps {
  categoryId: CategoryId;
  onToggleVault: () => void;
  onOpenManifesto: () => void;
}

const SectionDetail: React.FC<SectionDetailProps> = ({ categoryId, onToggleVault, onOpenManifesto }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const projects = PORTFOLIO_ITEMS.filter(p => p.category === categoryId);
  
  // Music Player State
  const [activeTrack, setActiveTrack] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 402 Payment State
  const [gatedTrack, setGatedTrack] = useState<Project | null>(null);
  const [unlockStatus, setUnlockStatus] = useState<'locked' | 'signing' | 'verifying' | 'unlocked'>('locked');

  if (!category) return null;

  const handleTrackSelect = (track: Project) => {
    if (activeTrack?.id === track.id) {
        setIsPlaying(!isPlaying);
        if (isPlaying) audioRef.current?.pause();
        else audioRef.current?.play();
    } else {
        setActiveTrack(track);
        setIsPlaying(true);
        // Timeout to allow DOM to update with new src before playing
        setTimeout(() => audioRef.current?.play(), 50);
    }
  };

  const simulateUnlock = () => {
      setUnlockStatus('signing');
      setTimeout(() => setUnlockStatus('verifying'), 1500);
      setTimeout(() => setUnlockStatus('unlocked'), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-screen animate-fade-in pb-32">
        <header className="mb-16 border-b border-white/5 pb-8">
            <span className={`text-xs font-mono mb-2 block text-${category.color}-500`}>{category.number} / SECTOR</span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">{category.label} Systems</h2>
            <p className="text-zinc-500 mt-4 max-w-xl">{category.description}</p>
        </header>

        {/* --- FINANCE LAYOUT --- */}
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

        {/* --- DEV LAYOUT --- */}
        {categoryId === 'development' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[450px]">
                {projects[0] && (
                    <div 
                        onClick={() => project[0].hasDetailView && onOpenManifesto()}
                        className={`lg:col-span-2 glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-end group ${projects[0].hasDetailView ? 'cursor-pointer hover:border-emerald-500/50' : ''}`}
                    >
                         <div className="absolute inset-0 z-0">
                            <img src={projects[0].imageUrl} className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-display font-bold text-white mb-3">{projects[0].title}</h3>
                            <p className="text-zinc-300 max-w-lg mb-6">{projects[0].description}</p>
                            <div className="flex gap-2">
                                {projects[0].tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {projects.slice(1).map(p => (
                    <div key={p.id} className="glass-card p-8 rounded-2xl relative overflow-hidden flex flex-col justify-end group">
                        <div className="absolute inset-0 z-0">
                            <img src={p.imageUrl} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-display font-bold text-white mb-3">{p.title}</h3>
                            <p className="text-zinc-400 text-sm">{p.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* --- MEDIA SECTION: MUSIC HUB --- */}
        {categoryId === 'media' && (
            <div className="space-y-12">
                {/* Visual Artifacts Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    <div onClick={onToggleVault} className="aspect-square bg-black border border-zinc-800 rounded-xl overflow-hidden cursor-pointer group relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <span className="material-symbols-outlined text-4xl text-zinc-600 mb-2 group-hover:text-emerald-400 transition-colors">lock</span>
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500">LoRA_Artifact_v4</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-20" />
                    </div>
                    {projects.filter(p => p.mediaType !== 'audio').map(p => (
                        <div key={p.id} className="aspect-square bg-zinc-900 rounded-xl overflow-hidden group relative">
                            <img src={p.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-4">
                                <span className="text-white text-xs font-bold tracking-widest uppercase">{p.title}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Music Library Table */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/20">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-emerald-500">graphic_eq</span>
                            <h3 className="font-display font-bold text-white text-xl">Suno & Producer.ai Artifacts</h3>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Archived Audio Modules</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 border-b border-white/5">
                                    <th className="py-5 px-8 font-medium">#</th>
                                    <th className="py-5 px-8 font-medium">Artifact Name</th>
                                    <th className="py-5 px-8 font-medium">Platform</th>
                                    <th className="py-5 px-8 font-medium">Key / BPM</th>
                                    <th className="py-5 px-8 font-medium text-right">Prompt Context</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {projects.filter(p => p.mediaType === 'audio').map((track, idx) => (
                                    <tr 
                                        key={track.id} 
                                        className={`group hover:bg-white/[0.02] transition-colors cursor-pointer ${activeTrack?.id === track.id ? 'bg-emerald-500/[0.03]' : ''}`}
                                        onClick={() => handleTrackSelect(track)}
                                    >
                                        <td className="py-5 px-8 text-zinc-500 font-mono text-xs">
                                            {activeTrack?.id === track.id && isPlaying ? (
                                                <div className="flex items-center gap-0.5 h-3">
                                                    <div className="w-0.5 bg-emerald-500 animate-[music_0.8s_ease-in-out_infinite] h-full"></div>
                                                    <div className="w-0.5 bg-emerald-500 animate-[music_1.2s_ease-in-out_infinite] h-full"></div>
                                                    <div className="w-0.5 bg-emerald-500 animate-[music_1s_ease-in-out_infinite] h-full"></div>
                                                </div>
                                            ) : `0${idx + 1}`}
                                        </td>
                                        <td className="py-5 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded bg-zinc-800 overflow-hidden relative">
                                                    <img src={track.imageUrl} className="w-full h-full object-cover" />
                                                    {activeTrack?.id === track.id && (
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-emerald-400 text-lg">
                                                                {isPlaying ? 'pause' : 'play_arrow'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-bold ${activeTrack?.id === track.id ? 'text-emerald-400' : 'text-zinc-200'}`}>
                                                        {track.title}
                                                    </div>
                                                    <div className="text-[10px] text-zinc-500">{track.tags.join(', ')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-8">
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 uppercase tracking-widest">
                                                {track.aiPlatform}
                                            </span>
                                        </td>
                                        <td className="py-5 px-8 font-mono text-xs text-zinc-500">
                                            {track.key} // {track.bpm}BPM
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            {track.isGated ? (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setGatedTrack(track); setUnlockStatus('locked'); }}
                                                    className="inline-flex items-center gap-2 text-[10px] text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-widest border border-zinc-800 px-3 py-1.5 rounded-full bg-zinc-900/50"
                                                >
                                                    <span className="material-symbols-outlined text-sm">lock</span> Extract Prompt
                                                </button>
                                            ) : (
                                                <span className="text-[10px] text-zinc-700 uppercase tracking-widest">No Context</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- GLOBAL MUSIC PLAYER BAR --- */}
        {activeTrack && (
            <div className="fixed bottom-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-3xl border-t border-white/10 h-24 flex items-center px-8 animate-slide-up">
                <audio 
                    ref={audioRef} 
                    src={activeTrack.audioUrl} 
                    onPlay={() => setIsPlaying(true)} 
                    onPause={() => setIsPlaying(false)} 
                />
                
                <div className="flex items-center gap-4 w-1/4">
                    <img src={activeTrack.imageUrl} className="w-14 h-14 rounded-lg shadow-2xl" />
                    <div className="overflow-hidden">
                        <div className="text-white font-bold text-sm truncate">{activeTrack.title}</div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-widest">{activeTrack.aiPlatform} Artifact</div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-6">
                        <button className="text-zinc-500 hover:text-white"><span className="material-symbols-outlined">shuffle</span></button>
                        <button className="text-zinc-500 hover:text-white"><span className="material-symbols-outlined text-3xl">skip_previous</span></button>
                        <button 
                            onClick={() => handleTrackSelect(activeTrack)}
                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-3xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
                        </button>
                        <button className="text-zinc-500 hover:text-white"><span className="material-symbols-outlined text-3xl">skip_next</span></button>
                        <button className="text-zinc-500 hover:text-white"><span className="material-symbols-outlined">repeat</span></button>
                    </div>
                    {/* Visual Progress Bar (Mock) */}
                    <div className="w-full max-w-md h-1 bg-zinc-800 rounded-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-emerald-500 w-[45%]"></div>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end gap-4">
                    <button className="text-zinc-500 hover:text-white"><span className="material-symbols-outlined">volume_up</span></button>
                    <button onClick={() => setActiveTrack(null)} className="text-zinc-500 hover:text-white"><span className="material-symbols-outlined">close</span></button>
                </div>
            </div>
        )}

        {/* --- 402 PAYMENT GATEWAY MODAL --- */}
        {gatedTrack && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setGatedTrack(null)}></div>
                <div className="relative bg-[#0a0a0a] border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                    
                    {/* Terminal Header */}
                    <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="ml-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">HTTP_GATEWAY // 402</span>
                        </div>
                        <button onClick={() => setGatedTrack(null)} className="text-zinc-600 hover:text-white"><span className="material-symbols-outlined text-sm">close</span></button>
                    </div>

                    <div className="p-10 text-center">
                        {unlockStatus === 'locked' && (
                            <>
                                <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                                    <span className="material-symbols-outlined text-4xl text-zinc-600">currency_bitcoin</span>
                                </div>
                                <h3 className="text-white font-display text-xl mb-2">402 Payment Required</h3>
                                <p className="text-zinc-500 text-xs mb-8 max-w-xs mx-auto">
                                    This prompt context is gated by a MicroGate. Sign a 0.01 USDC transaction on Base to extract latent style data.
                                </p>
                                <button 
                                    onClick={simulateUnlock}
                                    className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                >
                                    SIGN & EXTRACT PROMPT
                                </button>
                                <p className="text-[9px] text-zinc-700 mt-6 uppercase tracking-widest font-mono">MicroGate v0.4 // Base L2 Node</p>
                            </>
                        )}

                        {(unlockStatus === 'signing' || unlockStatus === 'verifying') && (
                            <div className="py-20 flex flex-col items-center">
                                <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                                <div className="font-mono text-xs text-emerald-500 tracking-[0.2em] uppercase">
                                    {unlockStatus === 'signing' ? 'Awaiting Wallet Signature...' : 'Verifying On-Chain Event...'}
                                </div>
                            </div>
                        )}

                        {unlockStatus === 'unlocked' && (
                            <div className="text-left animate-slide-up">
                                <div className="flex items-center gap-3 mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                    <span className="material-symbols-outlined text-emerald-400">verified</span>
                                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Transaction Confirmed // Base L2</span>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-zinc-500 text-[9px] uppercase tracking-widest mb-2 font-mono">Style Metadata</h4>
                                        <div className="bg-black p-4 rounded-lg border border-zinc-800 text-xs text-zinc-300 font-mono leading-relaxed">
                                            {gatedTrack.styleData}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-500 text-[9px] uppercase tracking-widest mb-2 font-mono">Latent Prompt</h4>
                                        <div className="bg-black p-4 rounded-lg border border-zinc-800 text-xs text-emerald-500 font-mono leading-relaxed">
                                            {gatedTrack.promptData}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(gatedTrack.promptData || '');
                                            setGatedTrack(null);
                                        }}
                                        className="w-full py-4 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-widest"
                                    >
                                        Copy & Close Context
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        <style>{`
            @keyframes music {
                0%, 100% { height: 40%; }
                50% { height: 100%; }
            }
        `}</style>
    </section>
  );
};

export default SectionDetail;