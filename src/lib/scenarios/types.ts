export type ScenarioId = 'banking' | 'healthcare' | 'sanctions';

export interface TestVector<TInput = any> {
  index: number;
  input: TInput;
  category: 'nominal' | 'boundary' | 'adversarial' | 'extreme';
  description: string;
}

export interface ExecutionResult<TOutput = any> {
  vectorIndex: number;
  legacyOutput: TOutput;
  modernOutput: TOutput;
  isMatch: boolean;
  delta?: string;
  executionTimeUs: number;
}

export interface DivergenceReport {
  scenarioId: ScenarioId;
  totalVectors: number;
  matchingVectors: number;
  divergenceCount: number;
  parityRate: number; // 0 to 100
  firstDivergentIndex: number | null;
  firstDivergentVector: TestVector | null;
  firstDivergentLegacyOutput: any;
  firstDivergentModernOutput: any;
  deltaSummary: string | null;
  totalExecutionTimeMs: number;
  stateRootHash: string;
  isPatched: boolean;
}

export interface ScenarioDefinition {
  id: ScenarioId;
  name: string;
  tag: string;
  domain: string;
  failureCost: string;
  oneLiner: string;
  legacyLabel: string;
  legacyLanguage: string;
  legacyCode: string;
  modernLanguage: string;
  initialModernCode: string;
  patchedModernCode: string;
  divergenceVectorIndex: number;
  divergenceExplanation: string;
  bobPatchExplanation: string;
  runVector: (input: any, isPatched: boolean) => { legacy: any; modern: any; delta?: string; match: boolean };
  generateVectors: (count: number) => TestVector[];
}

export interface McpDivergencePacket {
  mcp_version: string;
  protocol: string;
  target_agent: string;
  tool: string;
  parameters: {
    scenario_id: string;
    scenario_domain: string;
    failing_vector_index: number;
    failing_input: any;
    expected_legacy_output: any;
    actual_modern_output: any;
    delta_signature: string;
    root_cause_analysis: string;
    suggested_remedy: string;
    timestamp: string;
    sha256_attestation_root: string;
  };
}

export interface ParityCertificate {
  certificate_id: string;
  schema_version: string;
  issued_at: string;
  system: string;
  verifier: string;
  scenario: {
    id: string;
    name: string;
    domain: string;
  };
  metrics: {
    total_vectors_tested: number;
    parity_percentage: number;
    divergence_count: number;
    verdict: 'APPROVED_FOR_PRODUCTION' | 'RELEASE_BLOCKED_DIVERGENCE_DETECTED';
    execution_time_ms: number;
  };
  cryptographic_proof: {
    algorithm: string;
    vector_manifest_hash: string;
    legacy_state_root: string;
    modern_state_root: string;
    certificate_signature_root: string;
  };
}
