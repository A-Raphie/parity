'use client';

import React from 'react';
import { ArrowDown, CheckCircle2, AlertTriangle, Zap, Terminal } from 'lucide-react';

interface HeroProps {
  onScrollToCockpit: () => void;
  onScrollToMcp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCockpit, onScrollToMcp }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#1e293b] py-12 sm:py-16">
      {/* Clean bg */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Beat 1: Eyebrow Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 font-mono text-xs text-[#3b82f6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
            IBM BOB 2.0 REPOSITORY MODERNIZATION VERIFIER
          </div>
        </div>

        {/* Beat 2: Massive Headline */}
        <h1 className="mt-6 font-mono text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl text-balance">
          Compilers check syntax.<br />
          <span className="text-emerald-400">
            Parity checks truth.
          </span>
        </h1>

        {/* Beat 3: Visceral One-Liner */}
        <p className="mt-6 max-w-3xl text-base text-[#94a3b8] sm:text-lg sm:leading-relaxed text-pretty">
          Enterprise modernization without behavioral equivalence is a <span className="font-semibold text-white">$42M production outage</span> waiting to happen. Parity synthesizes 5,000 adversarial boundary vectors in-browser to mathematically prove IBM Bob&apos;s modern rewrites match legacy mainframe code bit-for-bit.
        </p>

        {/* Beat 4: Action Row */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onScrollToCockpit}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 font-mono text-sm font-semibold text-[#090d16] shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400 active:scale-98 cursor-pointer"
          >
            <span>Launch Verification Cockpit</span>
            <ArrowDown className="h-4 w-4" />
          </button>

          <button
            onClick={onScrollToMcp}
            className="flex items-center gap-2 rounded-lg border border-[#1e293b] bg-[#0f172a] px-5 py-3 font-mono text-sm font-medium text-[#94a3b8] transition hover:border-[#3b82f6]/50 hover:text-white cursor-pointer"
          >
            <Terminal className="h-4 w-4 text-[#3b82f6]" />
            <span>Inspect Bob 2.0 MCP Spec</span>
          </button>
        </div>

        {/* Beat 5: 3-Card Economic Friction Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Card 1: Economic Outage Friction */}
          <div className="obsidian-card p-6 border-l-2 border-l-red-500/80">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Financial Risk
              </span>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <div className="mt-3 font-mono text-3xl font-extrabold text-white sm:text-4xl tabular">
              $42.5M
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
              Average Fortune 500 core outage cost from silent rounding decays, leap-year bugs, and character-folding drift.
            </p>
          </div>

          {/* Card 2: Performance Metrology */}
          <div className="obsidian-card p-6 border-l-2 border-l-[#3b82f6]/80">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Metrology Speed
              </span>
              <Zap className="h-4 w-4 text-[#3b82f6]" />
            </div>
            <div className="mt-3 font-mono text-3xl font-extrabold text-white sm:text-4xl tabular">
              0.38ms
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
              In-browser differential sandbox execution latency per vector. 5,000 edge cases verified client-side in &lt;50ms.
            </p>
          </div>

          {/* Card 3: Cryptographic Guarantee */}
          <div className="obsidian-card p-6 border-l-2 border-l-emerald-500/80">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Release Gate
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3 font-mono text-3xl font-extrabold text-white sm:text-4xl tabular text-emerald-400">
              100.00%
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
              Bit-for-bit behavioral parity guarantee. SHA-256 state root certificate + closed-loop Bob 2.0 MCP patch repair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
