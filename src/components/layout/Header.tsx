'use client';

import React from 'react';
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onLaunchCockpit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLaunchCockpit }) => {
  const scrollToCockpit = () => {
    if (onLaunchCockpit) {
      onLaunchCockpit();
    } else {
      const el = document.getElementById('cockpit');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e293b] bg-[#090d16]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Wordmark & Protocol Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#3b82f6]/10 border border-[#3b82f6]/30 text-[#3b82f6]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-mono text-base font-bold tracking-wider text-white">
              PARITY<span className="text-[#3b82f6]">.</span>
            </span>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-3 w-px bg-[#1e293b]" />
            <span className="flex items-center gap-1.5 rounded-full border border-[#1e293b] bg-[#0f172a] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#94a3b8]">
              <Cpu className="h-3 w-3 text-[#3b82f6]" />
              IBM BOB 2.0 VERIFICATION KERNEL
            </span>
          </div>
        </div>

        {/* Right: Live Status Badge & Primary Action */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 font-mono text-xs text-emerald-400 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>SANDBOX: 5,000 VECTORS READY</span>
          </div>

          <button
            onClick={scrollToCockpit}
            className="flex items-center gap-1.5 rounded-md border border-[#3b82f6]/40 bg-[#3b82f6] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2563eb] hover:border-[#2563eb] active:scale-98 cursor-pointer"
          >
            <span>Launch Cockpit</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
