/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import MicroGateDiagram from './MicroGateDiagram';

interface ManifestoProps {
    onClose: () => void;
}

const Manifesto: React.FC<ManifestoProps> = ({ onClose }) => {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 pt-32 min-h-screen animate-fade-in bg-[#050505]">
        {/* Navigation / Header */}
        <div className="mb-12 border-b border-zinc-800 pb-8 flex justify-between items-start">
            <div>
                <button 
                    onClick={onClose}
                    className="text-xs font-mono text-zinc-500 hover:text-white mb-6 flex items-center gap-2 transition-colors uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Return to Portfolio
                </button>
                <div className="flex gap-3 mb-4">
                    <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] rounded uppercase tracking-widest">Strategy</span>
                    <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] rounded uppercase tracking-widest">Case Study</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                    The "No-Code CTO" Strategy
                </h1>
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
                    Why documenting the architecture is more valuable than building the SaaS. A strategic breakdown of MVP Hacking in the Agentic Economy.
                </p>
            </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert prose-lg max-w-none">
            
            <p className="text-zinc-300">
                This portfolio represents a concept with such high "MVP Hacker" potential that it could accidentally become a startup if the demo goes viral. 
                However, rather than launching a full "Vercel for MCP" startup immediately, the goal is to leverage the <strong>No-Code CTO</strong> strategy.
            </p>

            <h3 className="text-white font-display mt-12 mb-6">1. Signaling vs. Operating</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-red-900/30">
                    <h4 className="text-red-400 text-sm uppercase tracking-widest font-bold mb-4">The Startup Route (Hard Mode)</h4>
                    <p className="text-sm text-zinc-400">
                        Building a hosting platform (infrastructure) is incredibly code-heavy. It requires managing Docker containers, load balancing, security, and uptime for other people's code. This is very hard to "No-Code" effectively. It creates operational debt that distracts from the vision.
                    </p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-emerald-900/30">
                    <h4 className="text-emerald-400 text-sm uppercase tracking-widest font-bold mb-4">The Portfolio Route (God Mode)</h4>
                    <p className="text-sm text-zinc-400">
                        Documenting this architecture demonstrates vision. It shows hiring managers you aren't just a "builder"—you are an architect who understands the convergence of Agentic AI, Crypto Rails (USDC/Base), and HTTP standards.
                    </p>
                </div>
            </div>

            <h3 className="text-white font-display mt-12 mb-6">2. The Live Artifact: "Show, Don't Just Tell"</h3>
            <p>
                Instead of building the platform for others, we build one specific <strong>MicroGate</strong> instance and embed it here.
                We call this concept <em>"The Paid Resume."</em>
            </p>

            {/* Diagram Component */}
            <MicroGateDiagram />

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 my-12">
                <h4 className="text-white font-bold mb-4">The Implementation Plan</h4>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                    <li><strong>Deploy MicroGate:</strong> Run the Node.js middleware on Google Cloud Run (AntiGravity).</li>
                    <li><strong>Gate Content:</strong> Place a "Premium Insight" behind the 402 Payment Wall.</li>
                    <li><strong>Agent Integration:</strong> Add a "Pay with Agent" button that triggers an autonomous wallet signature.</li>
                </ul>
            </div>

            <h3 className="text-white font-display mt-12 mb-6">3. Why This Wins Interviews</h3>
            <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-zinc-300 my-8">
                "I built a prototype for the Agentic Economy. It's a serverless middleware that allows AI agents to autonomously negotiate and pay for their own API consumption using USDC on Base. You can actually test it live on my site right now."
            </blockquote>
            <p>
                This narrative hits every critical buzzword—AI, Crypto, Serverless, Autonomous Agents—while proving execution capability without the burden of maintaining a SaaS product.
            </p>

            <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-between items-center">
                <span className="font-mono text-xs text-zinc-600">JESSE // STRATEGY // 2025</span>
                <button onClick={onClose} className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                    Close Strategy
                </button>
            </div>
        </div>
    </article>
  );
};

export default Manifesto;