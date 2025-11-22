
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 px-6 pb-20 max-w-4xl mx-auto animate-fade-in">
      <div className="space-y-20">
        
        {/* Header */}
        <div className="space-y-6">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">// THE ARCHITECT</span>
            <h1 className="text-5xl md:text-7xl font-manrope font-bold text-white leading-tight">
                Building the future <br/>
                <span className="text-slate-500">one node at a time.</span>
            </h1>
        </div>

        {/* Bio Content */}
        <div className="grid md:grid-cols-2 gap-12 text-slate-400 leading-relaxed font-light text-lg">
            <p>
                I am a multidisciplinary technologist focused on the intersection of <strong className="text-slate-200">AI Agents</strong>, <strong className="text-slate-200">Blockchain</strong>, and <strong className="text-slate-200">High-Performance Web</strong>. 
            </p>
            <p>
                With a background in full-stack engineering and a passion for decentralized systems, I build tools that empower the next generation of the digital economy.
            </p>
        </div>

        {/* Stats / Tech Stack */}
        <div className="border-y border-white/5 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <h4 className="text-white font-space text-3xl font-bold mb-2">5+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Years Exp</p>
            </div>
            <div>
                <h4 className="text-white font-space text-3xl font-bold mb-2">50+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Projects</p>
            </div>
            <div>
                <h4 className="text-cyan-400 font-space text-3xl font-bold mb-2">AI</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Specialist</p>
            </div>
            <div>
                <h4 className="text-white font-space text-3xl font-bold mb-2">TS</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">TypeScript</p>
            </div>
        </div>

        <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h3 className="text-xl text-white font-bold font-space mb-2">Ready to collaborate?</h3>
                <p className="text-slate-400 text-sm">I am currently accepting new contracts for Q3.</p>
            </div>
            <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-colors">
                Get in Touch
            </button>
        </div>

      </div>
    </section>
  );
};

export default About;
