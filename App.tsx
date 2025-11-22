
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SectionDetail from './components/SectionDetail';
import Assistant, { AssistantRef } from './components/Assistant';
import { ViewState, CategoryId } from './types';
import { CATEGORIES } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const assistantRef = useRef<AssistantRef>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleNavigate = (target: 'home' | 'about' | CategoryId) => {
    setIsExploreOpen(false);
    if (target === 'home') setView({ type: 'home' });
    else if (target === 'about') setView({ type: 'about' });
    else setView({ type: 'section', categoryId: target });
  };

  const handleStartVoice = () => {
    if (assistantRef.current) {
        assistantRef.current.startVoiceSession();
    }
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200 bg-[#020617] text-slate-200 font-manrope">
      
      {/* Premium Background Gradients */}
      <div className="fixed top-0 w-full h-screen -z-10 bg-[#020617] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-900/10 blur-[100px]"></div>
      </div>

      <Navbar 
        onNavigateHome={() => handleNavigate('home')}
        onNavigateAbout={() => handleNavigate('about')}
        onTriggerAgent={handleStartVoice}
        onToggleExplore={() => setIsExploreOpen(!isExploreOpen)}
      />
      
      {/* Explore Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-2xl transition-all duration-500 flex items-center justify-center ${isExploreOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="max-w-4xl w-full px-6 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {CATEGORIES.map((cat, idx) => (
                  <button 
                    key={cat.id}
                    onClick={() => handleNavigate(cat.id)}
                    className="group text-left p-6 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                      <span className={`text-${cat.color}-400 text-xs font-bold uppercase tracking-widest mb-2`}>{cat.label}</span>
                      <span className="text-white text-xl md:text-2xl font-bold font-space mb-2">{cat.description.split('.')[0]}</span>
                      <span className="mt-auto text-slate-500 text-sm group-hover:text-white transition-colors">Open &rarr;</span>
                  </button>
              ))}
          </div>
          <button 
            onClick={() => setIsExploreOpen(false)}
            className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white"
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
      </div>

      <main className="relative z-0">
        {view.type === 'home' && (
          <Home onStartVoice={handleStartVoice} />
        )}

        {view.type === 'about' && (
          <About />
        )}

        {view.type === 'section' && (
          <SectionDetail categoryId={view.categoryId} />
        )}
      </main>

      <Assistant ref={assistantRef} onNavigate={(cat) => handleNavigate(cat)} />
    </div>
  );
}

export default App;
