'use client';

import React from 'react';
import { SCENARIO_LIST } from '../../lib/scenarios';
import { ScenarioDefinition, ScenarioId } from '../../lib/scenarios/types';
import { Building2, HeartPulse, ShieldAlert } from 'lucide-react';

interface ScenarioSelectorProps {
  currentScenario: ScenarioDefinition;
  onSelectScenario: (scenario: ScenarioDefinition) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  currentScenario,
  onSelectScenario,
}) => {
  const getIcon = (id: ScenarioId) => {
    switch (id) {
      case 'banking':
        return <Building2 className="h-4 w-4" />;
      case 'healthcare':
        return <HeartPulse className="h-4 w-4" />;
      case 'sanctions':
        return <ShieldAlert className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Select Enterprise Modernization Scenario
        </span>
        <span className="font-mono text-xs text-[#3b82f6]">
          {SCENARIO_LIST.length} Pre-loaded Scenarios
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SCENARIO_LIST.map((sc) => {
          const isSelected = sc.id === currentScenario.id;

          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition cursor-pointer ${
                isSelected
                  ? 'border-[#3b82f6] bg-[#0d172e] shadow-md shadow-[#3b82f6]/10'
                  : 'border-[#1e293b] bg-[#0d1322] hover:border-[#2d3e5e] hover:bg-[#111827]'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                    isSelected
                      ? 'border-[#3b82f6]/50 bg-[#3b82f6]/20 text-[#3b82f6]'
                      : 'border-[#1e293b] bg-[#0f172a] text-[#64748b]'
                  }`}
                >
                  {getIcon(sc.id)}
                </span>
                <span className="rounded-full bg-[#1e293b]/70 px-2 py-0.5 font-mono text-[10px] text-[#94a3b8]">
                  {sc.tag}
                </span>
              </div>

              <div className="mt-3 font-mono text-sm font-bold text-white">
                {sc.name}
              </div>

              <p className="mt-1 line-clamp-2 text-xs text-[#94a3b8]">
                {sc.oneLiner}
              </p>

              <div className="mt-3 flex w-full items-center justify-between border-t border-[#1e293b]/60 pt-2 font-mono text-[11px]">
                <span className="text-red-400 font-medium">Risk: {sc.failureCost.split(' ')[0]}</span>
                <span className="text-[#64748b]">Vector #{sc.divergenceVectorIndex}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
