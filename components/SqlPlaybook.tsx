/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { NavigationTarget } from '../types';

interface SqlPlaybookProps {
  onNavigate: (target: NavigationTarget) => void;
}

const SQL_SNIPPET = `SELECT DISTINCT transaction_hash,
       transaction_index,
       event_data
  FROM solana.mainnet.analytics.v5_events AS ev
 WHERE slot_timestamp BETWEEN TIMESTAMP('2024-07-01 00:00:00+00:00')
                         AND TIMESTAMP('2024-08-01 00:00:00+00:00')
   AND account_keys[1] IN (
       '8etkAzchJWGqTA9bFDUCdy2dKm7ZcHZ1z7hXMWqZoMzw',
       '3jMr6s7vfw5QzoHsDHYisJkR1Zd9bRE8t2RG4sPKTSqs',
       'DapraEjZTCEQhPHrkhxoxBpp2thvHGu79JtdFY5iuExX'
   )
 ORDER BY slot_timestamp DESC;`;

const PYTHON_SNIPPET = `merged_df['transaction_type'] = merged_df['wallet_id'].apply(
    lambda w: 'buy' if w in TOKEBUYERS else 'sell'
)

merged_df['total_purchase_value'] = merged_df['total_token_value'].astype(float)
merged_df['pnl_realized'] = merged_df['total_purchase_value'] \
    * merged_df['token_price'].astype(float);`;

const SqlPlaybook: React.FC<SqlPlaybookProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0b1a12] to-[#050505] text-white pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center gap-3 text-emerald-300 uppercase tracking-[0.35em] text-xs font-semibold">
          <span className="material-symbols-outlined text-base">terminal</span>
          <span>On-Chain SQL // Playbook</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-emerald-900/40 backdrop-blur">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <p className="text-sm text-emerald-300 font-mono">Stepwise Query // Solana</p>
                  <h1 className="text-3xl md:text-4xl font-display font-semibold leading-tight">Trace token buyers & sellers in one pass</h1>
                </div>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-emerald-500/30 transition"
                >
                  Back to Hub
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-300">
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                  <p className="font-semibold text-white">Wallets under watch</p>
                  <ul className="font-mono text-xs leading-relaxed text-emerald-200 space-y-1">
                    <li>• 8etkAzchJWGqTA9bFDUCdy2dKm7ZcHZ1z7hXMWqZoMzw</li>
                    <li>• 3jMr6s7vfw5QzoHsDHYisJkR1Zd9bRE8t2RG4sPKTSqs</li>
                    <li>• DapraEjZTCEQhPHrkhxoxBpp2thvHGu79JtdFY5iuExX</li>
                  </ul>
                  <p className="text-xs text-zinc-400">Tip: extend this list with cohort segmentations or NFT treasuries.</p>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
                  <p className="font-semibold text-white">Why it matters</p>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-emerald-300 text-sm mt-0.5">north_east</span><span>Instantly separate buy vs. sell pressure per wallet for clean PnL calcs.</span></li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-emerald-300 text-sm mt-0.5">timeline</span><span>Use timestamp ranges to catch intraday rotations without extra filtering.</span></li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-emerald-300 text-sm mt-0.5">lab_profile</span><span>Drop the output directly into your pandas models or Superset dashboards.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 shadow-inner shadow-emerald-900/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-200 text-xs uppercase tracking-[0.28em] font-semibold">
                  <span className="material-symbols-outlined text-base">code</span>
                  <span>BigQuery slice</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Solana // analytics.v5_events</span>
              </div>
              <pre className="bg-[#0a0f0d] border border-white/5 rounded-xl p-4 text-emerald-100 text-xs md:text-sm leading-relaxed overflow-x-auto">
{SQL_SNIPPET}
              </pre>
              <p className="text-xs text-zinc-400">Swap table and columns if you&apos;re piping from another chain — the address filter pattern stays the same.</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-200 text-xs uppercase tracking-[0.3em] font-semibold">
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>Post-processing</span>
              </div>
              <p className="text-sm text-zinc-200">Stamp transaction direction based on wallet address ownership, then compute realized value.</p>
              <pre className="bg-[#0a0f0d] border border-emerald-500/20 rounded-xl p-4 text-emerald-50 text-xs md:text-sm leading-relaxed overflow-x-auto">
{PYTHON_SNIPPET}
              </pre>
              <p className="text-xs text-emerald-200/80">Extend with gas fees and slippage, then stream to your feature store.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-sm text-zinc-300">Need this wired into a live dashboard?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('library')}
                  className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
                >
                  Browse Nexus Tools
                </button>
                <button
                  onClick={() => onNavigate('development')}
                  className="px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/5 transition"
                >
                  See Dev Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SqlPlaybook;
