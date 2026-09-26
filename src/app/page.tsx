'use client';

import React, { useState, useMemo } from 'react';
import { SCENARIO_LIST } from '../lib/scenarios';
import { ScenarioDefinition } from '../lib/scenarios/types';
import { runDifferentialSuite } from '../lib/engine/comparator';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/landing/Hero';
import { WorkingCockpit } from '../components/cockpit/WorkingCockpit';
import { ProofRail } from '../components/proof/ProofRail';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  const [currentScenario, setCurrentScenario] = useState<ScenarioDefinition>(SCENARIO_LIST[0]);
  const [isPatched, setIsPatched] = useState<boolean>(false);

  // Compute active report for Surface 3 ProofRail
  const vectors = useMemo(() => {
    return currentScenario.generateVectors(5000);
  }, [currentScenario]);

  const { report } = useMemo(() => {
    return runDifferentialSuite(currentScenario, vectors, isPatched);
  }, [currentScenario, vectors, isPatched]);

  const handleScrollToCockpit = () => {
    const el = document.getElementById('cockpit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToMcp = () => {
    const el = document.getElementById('proof-rail');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectScenario = (sc: ScenarioDefinition) => {
    setCurrentScenario(sc);
    setIsPatched(false); // Reset to unpatched so judge can see initial divergence
  };

  const handleTogglePatch = () => {
    setIsPatched((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] flex flex-col font-sans selection:bg-[#3b82f6]/30 selection:text-white">
      {/* 1-Chrome-Row Header */}
      <Header onLaunchCockpit={handleScrollToCockpit} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Surface 1: High-Authority Front Door */}
        <Hero
          onScrollToCockpit={handleScrollToCockpit}
          onScrollToMcp={handleScrollToMcp}
        />

        {/* Surface 2: Working Cockpit */}
        <WorkingCockpit
          currentScenario={currentScenario}
          onSelectScenario={handleSelectScenario}
          isPatched={isPatched}
          onTogglePatch={handleTogglePatch}
        />

        {/* Surface 3: Cryptographic Proof Rail & MCP Loop */}
        <ProofRail
          currentScenario={currentScenario}
          report={report}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
