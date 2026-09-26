'use client';

import React from 'react';
import { ShieldCheck, ExternalLink, GitBranch } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1e293b] bg-[#070b12] py-12 text-[#94a3b8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#3b82f6]/20 text-[#3b82f6]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                PARITY<span className="text-[#3b82f6]">.</span>
              </span>
              <span className="rounded bg-[#1e293b] px-2 py-0.5 font-mono text-[10px] text-[#94a3b8]">
                IBM BOB 2.0 HACKATHON
              </span>
            </div>
            <p className="max-w-md text-xs text-[#64748b]">
              Compilers check syntax. Parity checks truth. The differential behavioral equivalence engine that proves AI modernizations match legacy enterprise code bit-for-bit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
            <a
              href="https://lablab.ai/ai-hackathons/ibm-bob-2-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <span>Lablab.ai Hackathon</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href="https://github.com/winsznx/parity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <GitBranch className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>

            <span className="text-[#64748b]">
              Built by <strong className="text-white">@Raphie</strong>
            </span>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1e293b]/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748b]">
          <span>© 2026 Parity Engine. 100% Static Client-Side Execution.</span>
          <span className="font-mono text-emerald-400">● 5,000 Vectors Verified In-Browser</span>
        </div>
      </div>
    </footer>
  );
};
