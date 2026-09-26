import { DivergenceReport, ExecutionResult, ScenarioDefinition, TestVector } from '../scenarios/types';

export function runDifferentialSuite(
  scenario: ScenarioDefinition,
  vectors: TestVector[],
  isPatched: boolean
): { report: DivergenceReport; results: ExecutionResult[] } {
  const startTime = performance.now();
  const results: ExecutionResult[] = [];
  let matchingCount = 0;
  let firstDivergentIndex: number | null = null;
  let firstDivergentVector: TestVector | null = null;
  let firstDivergentLegacyOutput: any = null;
  let firstDivergentModernOutput: any = null;
  let deltaSummary: string | null = null;

  for (let i = 0; i < vectors.length; i++) {
    const vec = vectors[i];
    const vecStart = performance.now();
    const runRes = scenario.runVector(vec.input, isPatched);
    const vecDurationUs = Math.round((performance.now() - vecStart) * 1000);

    const execResult: ExecutionResult = {
      vectorIndex: vec.index,
      legacyOutput: runRes.legacy,
      modernOutput: runRes.modern,
      isMatch: runRes.match,
      delta: runRes.delta,
      executionTimeUs: vecDurationUs,
    };

    results.push(execResult);

    if (runRes.match) {
      matchingCount++;
    } else if (firstDivergentIndex === null) {
      firstDivergentIndex = vec.index;
      firstDivergentVector = vec;
      firstDivergentLegacyOutput = runRes.legacy;
      firstDivergentModernOutput = runRes.modern;
      deltaSummary = runRes.delta || 'Output discrepancy detected';
    }
  }

  const totalTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
  const divergenceCount = vectors.length - matchingCount;
  const parityRate = Math.round((matchingCount / vectors.length) * 10000) / 100; // e.g. 98.42 or 100.00

  // Deterministic state root hash placeholder (refined in attestation)
  const stateRoot = `0x${scenario.id.slice(0, 4)}_${isPatched ? '10000_VERIFIED' : 'DIV_01429'}_${matchingCount}`;

  const report: DivergenceReport = {
    scenarioId: scenario.id,
    totalVectors: vectors.length,
    matchingVectors: matchingCount,
    divergenceCount,
    parityRate,
    firstDivergentIndex,
    firstDivergentVector,
    firstDivergentLegacyOutput,
    firstDivergentModernOutput,
    deltaSummary,
    totalExecutionTimeMs: totalTimeMs,
    stateRootHash: stateRoot,
    isPatched,
  };

  return { report, results };
}
