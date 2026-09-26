'use client';

import React, { useState, useEffect } from 'react';
import { ScenarioDefinition, DivergenceReport, ParityCertificate } from '../../lib/scenarios/types';
import { generateMcpDivergencePacket } from '../../lib/mcp/packetGenerator';
import { generateParityCertificate } from '../../lib/crypto/attestation';
import { Terminal, Shield, Copy, Check, Download, ExternalLink, Cpu } from 'lucide-react';

interface ProofRailProps {
  currentScenario: ScenarioDefinition;
  report: DivergenceReport;
}

export const ProofRail: React.FC<ProofRailProps> = ({ currentScenario, report }) => {
  const [activeTab, setActiveTab] = useState<'mcp' | 'certificate' | 'cli'>('mcp');
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [certificate, setCertificate] = useState<ParityCertificate | null>(null);

  // Generate cryptographic certificate on report changes
  useEffect(() => {
    let isMounted = true;
    generateParityCertificate(currentScenario, report).then((cert) => {
      if (isMounted) setCertificate(cert);
    });
    return () => {
      isMounted = false;
    };
  }, [currentScenario, report]);

  const mcpPacket = generateMcpDivergencePacket(
    currentScenario,
    report,
    certificate?.cryptographic_proof.certificate_signature_root ?? report.stateRootHash
  );

  const handleCopyMcp = () => {
    navigator.clipboard.writeText(JSON.stringify(mcpPacket, null, 2));
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleCopyCli = () => {
    const cliCmd = `npx @parity/cli verify --scenario ${currentScenario.id} --vectors 5000 --target ibm-bob-2`;
    navigator.clipboard.writeText(cliCmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleDownloadCertificate = () => {
    if (!certificate) return;
    const blob = new Blob([JSON.stringify(certificate, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certificate.certificate_id.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="proof-rail" className="py-12 border-b border-[#1e293b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        {/* Surface 3 Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#1e293b] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Shield className="h-4 w-4" />
              <span>Proof Rail &amp; MCP Integration</span>
            </div>
            <h2 className="mt-1 font-mono text-2xl font-bold text-white sm:text-3xl">
              Auditable Attestation &amp; Bob 2.0 Loop
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center rounded-lg border border-[#1e293b] bg-[#070b12] p-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('mcp')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'mcp'
                  ? 'bg-[#3b82f6] text-white font-bold'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Bob 2.0 MCP Packet</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-emerald-500 text-[#090d16] font-bold'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Parity Certificate</span>
            </button>

            <button
              onClick={() => setActiveTab('cli')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
                activeTab === 'cli'
                  ? 'bg-[#1e293b] text-white font-bold'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>CLI Release Gate</span>
            </button>
          </div>
        </div>

        {/* Tab 1: IBM Bob 2.0 MCP Packet */}
        {activeTab === 'mcp' && (
          <div className="obsidian-card p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#3b82f6]/20 border border-[#3b82f6]/30 px-2 py-0.5 font-mono text-xs font-bold text-[#3b82f6]">
                    MODEL CONTEXT PROTOCOL (MCP)
                  </span>
                  <span className="font-mono text-xs text-[#94a3b8]">
                    Tool: <code className="text-white">patch_behavioral_divergence</code>
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#94a3b8]">
                  Directly dispatched to IBM Bob 2.0 subagent loop. Bob consumes failing vector, legacy AST trace, and recommended fix to autonomously patch repository code.
                </p>
              </div>

              <button
                onClick={handleCopyMcp}
                className="flex items-center gap-1.5 rounded-lg border border-[#3b82f6]/40 bg-[#3b82f6] px-3.5 py-1.5 font-mono text-xs font-bold text-white hover:bg-[#2563eb] transition cursor-pointer"
              >
                {copiedMcp ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedMcp ? 'Copied Packet JSON' : 'Copy MCP Packet'}</span>
              </button>
            </div>

            <div className="relative rounded-lg border border-[#1e293b] bg-[#070b12] p-4">
              <pre className="max-h-96 overflow-y-auto font-mono text-xs leading-relaxed text-[#38bdf8]"><code>{JSON.stringify(mcpPacket, null, 2)}</code></pre>
            </div>
          </div>
        )}

        {/* Tab 2: Cryptographic Parity Certificate */}
        {activeTab === 'certificate' && certificate && (
          <div className="obsidian-card p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2.5 py-0.5 font-mono text-xs font-bold ${
                      certificate.metrics.verdict === 'APPROVED_FOR_PRODUCTION'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {certificate.metrics.verdict}
                  </span>
                  <span className="font-mono text-xs text-[#94a3b8]">
                    {certificate.certificate_id}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#94a3b8]">
                  Cryptographic SHA-256 state-root receipt certifying bit-for-bit behavioral equivalence across 5,000 adversarial vectors.
                </p>
              </div>

              <button
                onClick={handleDownloadCertificate}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500 px-3.5 py-1.5 font-mono text-xs font-bold text-[#090d16] hover:bg-emerald-400 transition cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Certificate (.json)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#1e293b] bg-[#070b12] p-4">
                <span className="font-mono text-xs font-semibold text-[#64748b]">
                  ATTESTATION AUDIT METRICS
                </span>
                <div className="mt-3 flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between border-b border-[#1e293b]/60 pb-1">
                    <span className="text-[#94a3b8]">Total Vectors Tested:</span>
                    <span className="text-white font-bold">{certificate.metrics.total_vectors_tested.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1e293b]/60 pb-1">
                    <span className="text-[#94a3b8]">Parity Percentage:</span>
                    <span
                      className={`font-bold ${
                        certificate.metrics.parity_percentage === 100 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {certificate.metrics.parity_percentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#1e293b]/60 pb-1">
                    <span className="text-[#94a3b8]">Divergence Count:</span>
                    <span className="text-white font-bold">{certificate.metrics.divergence_count}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#94a3b8]">Fuzzing Latency:</span>
                    <span className="text-white font-bold">{certificate.metrics.execution_time_ms}ms</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#1e293b] bg-[#070b12] p-4">
                <span className="font-mono text-xs font-semibold text-[#64748b]">
                  CRYPTOGRAPHIC STATE ROOTS (SHA-256)
                </span>
                <div className="mt-3 flex flex-col gap-2 font-mono text-[11px]">
                  <div className="flex flex-col">
                    <span className="text-[#94a3b8]">Signature State Root:</span>
                    <span className="truncate text-emerald-400 font-bold">
                      {certificate.cryptographic_proof.certificate_signature_root}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#94a3b8]">Vector Manifest Hash:</span>
                    <span className="truncate text-[#cbd5e1]">
                      {certificate.cryptographic_proof.vector_manifest_hash}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#94a3b8]">Modern State Root:</span>
                    <span className="truncate text-[#cbd5e1]">
                      {certificate.cryptographic_proof.modern_state_root}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CI/CD Release Gate CLI */}
        {activeTab === 'cli' && (
          <div className="obsidian-card p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="rounded bg-[#1e293b] px-2 py-0.5 font-mono text-xs font-bold text-white">
                  ENTERPRISE CI/CD PIPELINE INTEGRATION
                </span>
                <p className="mt-1 text-xs text-[#94a3b8]">
                  Run Parity in GitHub Actions or Tekton CI pipelines to gate production releases behind 100% behavioral equivalence.
                </p>
              </div>

              <button
                onClick={handleCopyCli}
                className="flex items-center gap-1.5 rounded-lg border border-[#1e293b] bg-[#070b12] px-3.5 py-1.5 font-mono text-xs font-bold text-[#94a3b8] hover:text-white transition cursor-pointer"
              >
                {copiedCli ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCli ? 'Copied CLI Command' : 'Copy CLI Command'}</span>
              </button>
            </div>

            <div className="rounded-lg border border-[#1e293b] bg-[#070b12] p-4 font-mono text-xs text-[#38bdf8]">
              <code>npx @parity/cli verify --scenario {currentScenario.id} --vectors 5000 --target ibm-bob-2</code>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 font-mono text-xs text-[#94a3b8]">
              <div className="rounded border border-[#1e293b] bg-[#070b12] p-3">
                <strong className="text-white">Exit Code 0:</strong> Parity 100.00% verified. Release pipeline continues to Kubernetes cluster.
              </div>
              <div className="rounded border border-[#1e293b] bg-[#070b12] p-3">
                <strong className="text-red-400">Exit Code 1:</strong> Behavioral divergence detected. Pipeline fails and triggers IBM Bob 2.0 repair task.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
