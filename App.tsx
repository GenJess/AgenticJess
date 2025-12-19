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
import ToolWorkspace from './components/ToolWorkspace';
import AllProjects from './components/AllProjects';
import Manifesto from './components/Manifesto';
import { ViewState, CategoryId } from './types';
import { LIBRARY_ITEMS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const assistantRef = useRef<AssistantRef>(null);

  // Hash Router Logic
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        // Normalize hash: remove leading # and ensures starts with /
        // Support both #library and #/library for backward compatibility during transitions
        const path = hash.startsWith('#') ? hash.slice(1) : hash;
        
        if (path === '' || path === '/' || path === '/home') {
            setView({ type: 'home' });
        } 
        else if (path === 'library' || path === '/library') {
            setView({ type: 'library' });
        }
        else if (path.startsWith('/lab/') || path.startsWith('lab/')) {
            // Tool Route
            const cleanPath = path.startsWith('/') ? path : '/' + path;
            const slug = cleanPath.replace('/lab/', '');
            const item = LIBRARY_ITEMS.find(i => i.slug === slug);
            if (item) setView({ type: 'lab-tool', itemId: item.id });
        }
        else if (path.startsWith('/library/') || path.startsWith('library/')) {
            // Resource Route (Context)
            const cleanPath = path.startsWith('/') ? path : '/' + path;
            const slug = cleanPath.replace('/library/', '');
            const item = LIBRARY_ITEMS.find(i => i.slug === slug);
            if (item) setView({ type: 'lab-resource', itemId: item.id });
        }
    };

    // Initialize based on current hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (target: 'home' | CategoryId | 'all-projects') => {
    if (target === 'home') {
        window.location.hash = '/';
        setView({ type: 'home' });
    }
    else if (target === 'vault') setIsVaultOpen(true);
    else if (target === 'library') {
        window.location.hash = '/library';
        setView({ type: 'library' });
    }
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
      
      {/* Navbar is visible unless in deep focus modes like Manifesto or Lab Workspace */}
      {view.type !== 'manifesto' && view.type !== 'lab-tool' && view.type !== 'lab-resource' && (
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

        {(view.type === 'lab-tool' || view.type === 'lab-resource') && (
            <ToolWorkspace 
                itemId={view.itemId} 
                type={view.type === 'lab-tool' ? 'tool' : 'resource'} 
                onClose={() => handleNavigate('library')}
            />
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