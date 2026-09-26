import { DivergenceReport, McpDivergencePacket, ScenarioDefinition } from '../scenarios/types';

export function generateMcpDivergencePacket(
  scenario: ScenarioDefinition,
  report: DivergenceReport,
  sha256StateRoot: string
): McpDivergencePacket {
  const timestamp = new Date().toISOString();

  let rootCause = '';
  let remedy = '';

  if (scenario.id === 'banking') {
    rootCause =
      'Floating-point IEEE-754 rounding drift in toFixed(2) vs Java BigDecimal HALF_EVEN banking mode.';
    remedy =
      'Adopt integer fixed-point basis-point arithmetic or apply Banker\'s Rounding (half-to-even) to eliminate the cumulative divergence.';
  } else if (scenario.id === 'healthcare') {
    rootCause =
      'Modulo 4 leap-year check ignores Gregorian century rules (100-year and 400-year cycle boundaries).';
    remedy =
      'Implement full ISO-8601 / astronomical Gregorian leap rule: (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0).';
  } else if (scenario.id === 'sanctions') {
    rootCause =
      'Standard JavaScript toUpperCase() does not decompose Unicode combining characters and mishandles locale-specific case folding (Turkish dotless/dotted I).';
    remedy =
      'Apply String.prototype.normalize("NFKD") before case folding and strip combining diacritical marks [\\u0300-\\u036f].';
  }

  // If report has no active divergence (e.g. patched state), pull canonical divergence vector
  let failingVector = report.firstDivergentVector;
  let expectedLegacy = report.firstDivergentLegacyOutput;
  let actualModern = report.firstDivergentModernOutput;
  let deltaSig = report.deltaSummary;

  if (!failingVector) {
    const canonicalVectors = scenario.generateVectors(scenario.divergenceVectorIndex + 1);
    failingVector = canonicalVectors[scenario.divergenceVectorIndex];
    const unpatchedRun = scenario.runVector(failingVector.input, false);
    expectedLegacy = unpatchedRun.legacy;
    actualModern = unpatchedRun.modern;
    deltaSig = unpatchedRun.delta ?? scenario.divergenceExplanation;
  }

  return {
    mcp_version: '2026-03-01',
    protocol: 'model-context-protocol/v1',
    target_agent: 'ibm-bob-modernizer',
    tool: 'patch_behavioral_divergence',
    parameters: {
      scenario_id: scenario.id,
      scenario_domain: scenario.domain,
      failing_vector_index: scenario.divergenceVectorIndex,
      failing_input: failingVector.input,
      expected_legacy_output: expectedLegacy,
      actual_modern_output: actualModern,
      delta_signature: deltaSig || 'Behavioral discrepancy identified across execution boundaries.',
      root_cause_analysis: rootCause,
      suggested_remedy: remedy,
      timestamp,
      sha256_attestation_root: sha256StateRoot,
    },
  };
}
