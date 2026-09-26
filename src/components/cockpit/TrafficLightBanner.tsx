'use client';

import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { DivergenceReport } from '../../lib/scenarios/types';

interface TrafficLightBannerProps {
  report: DivergenceReport;
  onJumpToDivergence: () => void;
  onApplyPatch: () => void;
}

export const TrafficLightBanner: React.FC<TrafficLightBannerProps> = ({
  report,
  onJumpToDivergence,
  onApplyPatch,
}) => {
  const isParity = report.parityRate === 100;

  if (isParity) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-[#0d1f18] to-emerald-950/40 p-5 shadow-lg shadow-emerald-950/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
                  VERDICT: APPROVED
                </span>
                <span className="font-mono text-xs text-[#94a3b8]">
                  STATE ROOT: {report.stateRootHash}
                </span>
              </div>

              <h2 className="mt-1 font-mono text-lg font-bold text-white sm:text-xl">
                🟢 100.00% BEHAVIORAL PARITY VERIFIED
              </h2>
              <p className="mt-1 text-xs text-emerald-300/80">
                All 5,000 execution vectors bit-identical across legacy and modern runtimes. Zero behavioral drift detected. Safe for enterprise production release.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 px-4 py-2 text-right">
              <div className="font-mono text-xs text-emerald-400">Parity Rate</div>
              <div className="font-mono text-2xl font-black text-emerald-300 tabular">100.00%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-[#1f0d0d] to-red-950/40 p-5 shadow-lg shadow-red-950/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/15 border border-red-500/40 text-red-400">
            <AlertOctagon className="h-7 w-7 animate-pulse" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-red-300">
                <ShieldAlert className="h-3.5 w-3.5" />
                RELEASE BLOCKED: BEHAVIORAL DIVERGENCE
              </span>
              <span className="font-mono text-xs text-red-300/70">
                FIRST DIVERGENCE: VECTOR #{report.firstDivergentIndex}
              </span>
            </div>

            <h2 className="mt-1 font-mono text-lg font-bold text-white sm:text-xl">
              🔴 BEHAVIORAL DIVERGENCE DETECTED — {report.parityRate}% PARITY
            </h2>
            <p className="mt-1 text-xs text-red-300/80">
              <strong className="text-white">Delta:</strong> {report.deltaSummary} — Modern rewrite does not match legacy output under edge boundaries.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onJumpToDivergence}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-950/50 px-3.5 py-2 font-mono text-xs font-semibold text-red-300 transition hover:bg-red-900/60 hover:text-white cursor-pointer"
          >
            <span>Inspect Vector #{report.firstDivergentIndex}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={onApplyPatch}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500 px-4 py-2 font-mono text-xs font-bold text-[#090d16] shadow-md shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-98 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Apply IBM Bob 2.0 Patch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
