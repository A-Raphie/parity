'use client';

import React from 'react';
import { ScenarioDefinition } from '../../lib/scenarios/types';
import { Code2, Sparkles, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DualCodePaneProps {
  scenario: ScenarioDefinition;
  isPatched: boolean;
  onTogglePatch: () => void;
}

export const DualCodePane: React.FC<DualCodePaneProps> = ({
  scenario,
  isPatched,
  onTogglePatch,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-[#3b82f6]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Side-by-Side Runtime Logic
          </span>
        </div>

        <button
          onClick={onTogglePatch}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition cursor-pointer ${
            isPatched
              ? 'border border-[#1e293b] bg-[#0f172a] text-[#94a3b8] hover:text-white'
              : 'border border-emerald-500/50 bg-emerald-500 text-[#090d16] hover:bg-emerald-400 shadow-md shadow-emerald-500/10'
          }`}
        >
          {isPatched ? (
            <>
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Revert to Unpatched Modern Code</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Apply IBM Bob 2.0 Autonomous Patch</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left Pane: Legacy Engine */}
        <div className="obsidian-card flex flex-col overflow-hidden border-[#1e293b]">
          <div className="flex items-center justify-between border-b border-[#1e293b] bg-[#0d1322] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="font-mono text-xs font-semibold text-white">
                {scenario.legacyLabel}
              </span>
            </div>
            <span className="rounded bg-[#1e293b] px-2 py-0.5 font-mono text-[10px] text-[#94a3b8] uppercase">
              {scenario.legacyLanguage}
            </span>
          </div>

          <div className="relative flex-1 overflow-x-auto bg-[#070b12] p-4">
            <pre className="font-mono text-xs leading-relaxed text-[#cbd5e1] whitespace-pre">
              <code>{scenario.legacyCode}</code>
            </pre>
          </div>

          <div className="border-t border-[#1e293b] bg-[#0d1322]/80 px-4 py-2 font-mono text-[11px] text-[#64748b]">
            Ground Truth: Exact 20-year enterprise behavior baseline.
          </div>
        </div>

        {/* Right Pane: IBM Bob 2.0 Modern Engine */}
        <div
          className={`obsidian-card flex flex-col overflow-hidden transition ${
            isPatched ? 'border-emerald-500/40' : 'border-red-500/30'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#1e293b] bg-[#0d1322] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  isPatched ? 'bg-emerald-400' : 'bg-red-400 animate-pulse'
                }`}
              />
              <span className="font-mono text-xs font-semibold text-white">
                IBM Bob 2.0 Modern Engine ({isPatched ? 'v2.0.1 - Patched' : 'v2.0.0 - Unpatched'})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-semibold ${
                  isPatched
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {isPatched ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    <span>PARITY: 100.00%</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    <span>DIVERGENT</span>
                  </>
                )}
              </span>
              <span className="rounded bg-[#1e293b] px-2 py-0.5 font-mono text-[10px] text-[#94a3b8] uppercase">
                {scenario.modernLanguage}
              </span>
            </div>
          </div>

          <div className="relative flex-1 overflow-x-auto bg-[#070b12] p-4">
            <pre className="font-mono text-xs leading-relaxed text-[#cbd5e1] whitespace-pre">
              <code>
                {isPatched ? scenario.patchedModernCode : scenario.initialModernCode}
              </code>
            </pre>
          </div>

          <div className="border-t border-[#1e293b] bg-[#0d1322]/80 px-4 py-2 font-mono text-[11px] text-[#94a3b8]">
            {isPatched ? (
              <span className="text-emerald-400">
                ✅ Bob 2.0 autonomous patch active — zero drift across 5,000 vectors.
              </span>
            ) : (
              <span className="text-red-400">
                ⚠️ Unpatched — diverges on edge boundaries like vector #{scenario.divergenceVectorIndex}.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
