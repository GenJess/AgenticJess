/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SectionDetail from './components/SectionDetail';
import Assistant, { AssistantRef } from './components/Assistant';
import Vault from './components/Vault';
import Library from './components/Library';
import AllProjects from './components/AllProjects';
import Manifesto from './components/Manifesto';
import { ViewState, CategoryId } from './types';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const assistantRef = useRef<AssistantRef>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  const handleNavigate = (target: 'home' | CategoryId | 'all-projects') => {
    if (target === 'home') setView({ type: 'home' });
    else if (target === 'vault') setIsVaultOpen(true);
    else if (target === 'library') setView({ type: 'library' });
    else if (target === 'all-projects') setView({ type: 'all-projects' });
    else setView({ type: 'section', categoryId: target });
  };

  const handleStartVoice = () => {
    if (assistantRef.current) {
        assistantRef.current.startVoiceSession();
    }
  };

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 selection:text-white bg-[#050505] text-e5e5e5 font-sans">
      
      {view.type !== 'manifesto' && (
          <Navbar 
            onNavigate={handleNavigate}
            onToggleVault={() => setIsVaultOpen(true)}
            activeCategory={view.type === 'section' ? view.categoryId : undefined}
          />
      )}
      
      <main className="relative z-0">
        {view.type === 'home' && (
          <Home onNavigate={handleNavigate} onStartVoice={handleStartVoice} />
        )}

        {view.type === 'section' && (
          <SectionDetail 
            categoryId={view.categoryId} 
            onToggleVault={() => setIsVaultOpen(true)}
            onOpenManifesto={() => setView({ type: 'manifesto' })}
          />
        )}

        {view.type === 'all-projects' && (
            <AllProjects />
        )}

        {view.type === 'library' && (
           <Library />
        )}

        {view.type === 'manifesto' && (
            <Manifesto onClose={() => setView({ type: 'section', categoryId: 'development' })} />
        )}
      </main>

      <Vault isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
      
      <Assistant ref={assistantRef} onNavigate={(cat) => handleNavigate(cat as CategoryId | 'all-projects')} />
    </div>
  );
}

export default App;