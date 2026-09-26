'use client';

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { ScenarioDefinition } from '../../lib/scenarios/types';
import { runDifferentialSuite } from '../../lib/engine/comparator';
import { ScenarioSelector } from './ScenarioSelector';
import { TrafficLightBanner } from './TrafficLightBanner';
import { DualCodePane } from './DualCodePane';
import { VectorScrubber } from './VectorScrubber';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';

interface WorkingCockpitProps {
  currentScenario: ScenarioDefinition;
  onSelectScenario: (scenario: ScenarioDefinition) => void;
  isPatched: boolean;
  onTogglePatch: () => void;
}

export const WorkingCockpit: React.FC<WorkingCockpitProps> = ({
  currentScenario,
  onSelectScenario,
  isPatched,
  onTogglePatch,
}) => {
  // Pre-generate 5,000 vectors for the active scenario
  const vectors = useMemo(() => {
    return currentScenario.generateVectors(5000);
  }, [currentScenario]);

  // Run differential suite whenever scenario or patch state changes
  const { report, results } = useMemo(() => {
    return runDifferentialSuite(currentScenario, vectors, isPatched);
  }, [currentScenario, vectors, isPatched]);

  // Selected vector index in scrubber (default to first divergence or 0)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Trigger celebration confetti when switching from unpatched to patched
  const handleTogglePatch = () => {
    if (!isPatched) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f8fafc'],
      });
    }
    onTogglePatch();
  };

  const handleJumpToDivergence = () => {
    if (report.firstDivergentIndex !== null) {
      setSelectedIndex(report.firstDivergentIndex);
    } else {
      setSelectedIndex(currentScenario.divergenceVectorIndex);
    }
  };

  return (
    <section id="cockpit" className="py-12 border-b border-[#1e293b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Cockpit Section Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#1e293b] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#3b82f6]">
              <Activity className="h-4 w-4" />
              <span>Surface 2: Differential Execution Cockpit</span>
            </div>
            <h2 className="mt-1 font-mono text-2xl font-bold text-white sm:text-3xl">
              Live Behavioral Metrology Console
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-[#94a3b8]">
            <div className="flex items-center gap-1.5 rounded-md border border-[#1e293b] bg-[#0d1322] px-3 py-1.5">
              <Gauge className="h-3.5 w-3.5 text-[#3b82f6]" />
              <span>Vectors: <strong className="text-white tabular">5,000</strong></span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-[#1e293b] bg-[#0d1322] px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Execution: <strong className="text-white tabular">{report.totalExecutionTimeMs}ms</strong></span>
            </div>
          </div>
        </div>

        {/* 1. Scenario Selector */}
        <ScenarioSelector
          currentScenario={currentScenario}
          onSelectScenario={(sc) => {
            onSelectScenario(sc);
            setSelectedIndex(0);
          }}
        />

        {/* 2. 5-Second Traffic Light Banner */}
        <TrafficLightBanner
          report={report}
          onJumpToDivergence={handleJumpToDivergence}
          onApplyPatch={handleTogglePatch}
        />

        {/* 3. Dual Code Panes */}
        <DualCodePane
          scenario={currentScenario}
          isPatched={isPatched}
          onTogglePatch={handleTogglePatch}
        />

        {/* 4. Vector Scrubber & Inspector */}
        <VectorScrubber
          vectors={vectors}
          results={results}
          currentIndex={selectedIndex}
          divergenceIndex={report.firstDivergentIndex ?? currentScenario.divergenceVectorIndex}
          onSelectIndex={setSelectedIndex}
        />
      </div>
    </section>
  );
};
