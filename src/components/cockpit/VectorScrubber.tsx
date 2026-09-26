'use client';

import React from 'react';
import { ExecutionResult, TestVector } from '../../lib/scenarios/types';
import { Sliders, CheckCircle2, AlertOctagon, FastForward, Shuffle } from 'lucide-react';

interface VectorScrubberProps {
  vectors: TestVector[];
  results: ExecutionResult[];
  currentIndex: number;
  divergenceIndex: number;
  onSelectIndex: (idx: number) => void;
}

export const VectorScrubber: React.FC<VectorScrubberProps> = ({
  vectors,
  results,
  currentIndex,
  divergenceIndex,
  onSelectIndex,
}) => {
  const currentVector = vectors[currentIndex] || vectors[0];
  const currentResult = results[currentIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectIndex(parseInt(e.target.value, 10));
  };

  const handleRandom = () => {
    const randomIdx = Math.floor(Math.random() * vectors.length);
    onSelectIndex(randomIdx);
  };

  return (
    <div className="obsidian-card p-5">
      <div className="flex flex-col gap-4">
        {/* Scrubber Header & Quick Actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#3b82f6]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Differential Vector Scrubber (5,000 Boundary Cases)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectIndex(0)}
              className="rounded border border-[#1e293b] bg-[#0f172a] px-2.5 py-1 font-mono text-[11px] text-[#94a3b8] hover:text-white transition cursor-pointer"
            >
              #0 (Nominal)
            </button>
            <button
              onClick={() => onSelectIndex(divergenceIndex)}
              className="flex items-center gap-1 rounded border border-red-500/40 bg-red-950/40 px-2.5 py-1 font-mono text-[11px] text-red-300 hover:bg-red-900/50 hover:text-white transition cursor-pointer"
            >
              <FastForward className="h-3 w-3" />
              <span>#{divergenceIndex} (First Divergence)</span>
            </button>
            <button
              onClick={handleRandom}
              className="flex items-center gap-1 rounded border border-[#1e293b] bg-[#0f172a] px-2.5 py-1 font-mono text-[11px] text-[#94a3b8] hover:text-white transition cursor-pointer"
            >
              <Shuffle className="h-3 w-3" />
              <span>Random</span>
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between font-mono text-xs text-[#94a3b8]">
            <span>Vector #0</span>
            <span className="font-bold text-white tabular">
              Inspecting Vector #{currentIndex.toLocaleString()} / {(vectors.length - 1).toLocaleString()}
            </span>
            <span>Vector #{(vectors.length - 1).toLocaleString()}</span>
          </div>

          <input
            type="range"
            min={0}
            max={vectors.length - 1}
            value={currentIndex}
            onChange={handleSliderChange}
            className="w-full cursor-pointer"
          />

          <div className="flex items-center justify-between text-[11px] text-[#64748b]">
            <span>Category: <strong className="text-white uppercase font-mono">{currentVector.category}</strong></span>
            <span className="font-mono">{currentVector.description}</span>
          </div>
        </div>

        {/* Vector Detail Inspection Grid */}
        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Input Vector */}
          <div className="rounded-lg border border-[#1e293b] bg-[#070b12] p-3">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-2 font-mono text-[11px] font-semibold text-[#94a3b8]">
              <span>INPUT BOUNDARY VECTOR</span>
              <span className="text-[#3b82f6]">#{currentIndex}</span>
            </div>
            <pre className="mt-2 max-h-40 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#94a3b8]">{JSON.stringify(currentVector.input, null, 2)}</pre>
          </div>

          {/* Legacy Output */}
          <div className="rounded-lg border border-[#1e293b] bg-[#070b12] p-3">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-2 font-mono text-[11px] font-semibold text-amber-300">
              <span>LEGACY ENGINE OUTPUT</span>
              <span>BASELINE</span>
            </div>
            <pre className="mt-2 max-h-40 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#cbd5e1]">{JSON.stringify(currentResult?.legacyOutput, null, 2)}</pre>
          </div>

          {/* Modern Output & Delta */}
          <div
            className={`rounded-lg border p-3 ${
              currentResult?.isMatch
                ? 'border-emerald-500/30 bg-[#070b12]'
                : 'border-red-500/40 bg-red-950/20'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-2 font-mono text-[11px] font-semibold">
              <span className={currentResult?.isMatch ? 'text-emerald-400' : 'text-red-400'}>
                BOB 2.0 MODERN OUTPUT
              </span>
              <span
                className={`flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                  currentResult?.isMatch
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-red-500/20 text-red-300 animate-pulse'
                }`}
              >
                {currentResult?.isMatch ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    <span>PARITY MATCH</span>
                  </>
                ) : (
                  <>
                    <AlertOctagon className="h-3 w-3" />
                    <span>DIVERGENT</span>
                  </>
                )}
              </span>
            </div>

            <pre className="mt-2 max-h-40 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#cbd5e1]">{JSON.stringify(currentResult?.modernOutput, null, 2)}</pre>

            {currentResult?.delta && (
              <div className="mt-2 rounded border border-red-500/30 bg-red-950/50 p-2 font-mono text-[11px] text-red-300">
                <strong>Delta:</strong> {currentResult.delta}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
