/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const MicroGateDiagram: React.FC = () => {
  return (
    <div className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl p-8 my-12 relative overflow-hidden group">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Node: Agent */}
        <div className="flex flex-col items-center gap-4 text-center z-20">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.1)] relative">
            <span className="material-symbols-outlined text-emerald-500 text-3xl">smart_toy</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold">AI Agent</div>
        </div>

        {/* Connection 1 */}
        <div className="flex-1 h-[2px] bg-zinc-800 w-full md:w-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Node: MicroGate (The 402 Wall) */}
        <div className="flex flex-col items-center gap-4 text-center z-20">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center relative bg-[#050505]">
             <span className="font-mono text-xl text-zinc-400 font-bold">402</span>
             <span className="absolute bottom-[-10px] bg-[#050505] px-2 text-[10px] text-zinc-500 uppercase tracking-widest">Payment Req</span>
          </div>
        </div>

        {/* Connection 2 */}
        <div className="flex-1 h-[2px] bg-zinc-800 w-full md:w-auto relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[shimmer_2s_infinite_0.5s]"></div>
        </div>

        {/* Node: Blockchain / USDC */}
        <div className="flex flex-col items-center gap-4 text-center z-20">
          <div className="w-16 h-16 rounded-2xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-center relative">
            <span className="font-display font-bold text-blue-400 text-xl">USDC</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-blue-500 font-bold">Settlement</div>
        </div>

        {/* Connection 3 */}
        <div className="flex-1 h-[2px] bg-zinc-800 w-full md:w-auto relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[shimmer_2s_infinite_1s]"></div>
        </div>

        {/* Node: Resource */}
        <div className="flex flex-col items-center gap-4 text-center z-20">
          <div className="w-16 h-16 rounded-2xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center relative">
            <span className="material-symbols-outlined text-purple-400 text-3xl">database</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-purple-500 font-bold">API Data</div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs font-mono text-zinc-500">
           HTTP GET /api -> 402 Payment Required -> Agent Signs USDC Tx -> 200 OK + Data
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default MicroGateDiagram;