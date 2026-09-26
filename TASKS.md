# Parity — Tasks

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 0 — Foundations & Scaffolding
- [x] Create project repository `/Users/raphie/Documents/Hackathons/parity` with clean git tree
- [x] Purge image generation rule from global agent config
- [x] Scaffold `ORCHESTRATOR.md` and `PRD.md`
- [x] Scaffold `ARCHITECTURE.md` and `DESIGN.md`
- [x] Scaffold `TASKS.md`, `MEMORY.md`, and `HANDOFF.md`
- [x] Initialize Next.js 15 app with Tailwind CSS and Lucide icons
- [x] Configure `output: 'export'` in `next.config.mjs` for 100% static Netlify deployment
- [x] Set up semantic tokens in `globals.css` (Obsidian palette, typography, hairline borders)

---

## Phase 1 — Core Differential Fuzzing Engine (`lib/engine`)
- [x] Implement Adversarial Vector Synthesizer (`lib/engine/synthesizer.ts`) generating 5,000 boundary inputs
- [x] Implement 3 enterprise scenario logic pairs (Legacy vs Initial Modern vs Patched Modern):
  - Scenario 1: Banking Tax & Floating Point rounding (`lib/scenarios/banking.ts`)
  - Scenario 2: Healthcare Claims & Leap Year century boundaries (`lib/scenarios/healthcare.ts`)
  - Scenario 3: FinCEN Sanction Tokenizer & Unicode folding (`lib/scenarios/sanctions.ts`)
- [x] Implement Differential Comparator (`lib/engine/comparator.ts`) with delta extraction and timing
- [x] Implement Web Crypto SHA-256 state root generator for Attestation Certificates (`lib/crypto/attestation.ts`)
- [x] Implement IBM Bob 2.0 MCP Divergence Packet generator (`lib/mcp/packetGenerator.ts`)

---

## Phase 2 — Surface 1: High-Authority Front Door
- [x] Implement 1-Chrome-Row Header with `PARITY` wordmark, IBM Bob 2.0 pill, and `Launch Cockpit` CTA
- [x] Implement 5-Beat Hero section with visceral enterprise one-liner
- [x] Implement 3-Card Economic Friction Grid ($42M outage, 0.38ms latency, 100% certificate)

---

## Phase 3 — Surface 2: Working Cockpit
- [x] Implement Scenario Selector Tab bar (Banking, Healthcare, Sanctions)
- [x] Implement 5-Second Traffic Light Banner (Red = Divergence alert, Green = 100% Parity)
- [x] Implement Dual Code Panes with syntax-highlighted Legacy vs Bob 2.0 modern implementations
- [x] Implement Differential Execution Scrubber (5,000 vector progress, scrubber slider, input/output inspection)
- [x] Implement Divergence Inspector showing exact input vector and math delta
- [x] Implement 1-Click Bob 2.0 Patch Simulator button with animated convergence loop & confetti

---

## Phase 4 — Surface 3: Cryptographic Proof Rail
- [x] Implement IBM Bob 2.0 MCP Divergence Packet display with 1-click JSON copy and toast
- [x] Implement Parity Attestation Certificate viewer with SHA-256 state root and download option
- [x] Implement Release Gate status pill ("BLOCKED: DIVERGENT" vs "VERIFIED: READY FOR PROD")
- [x] Implement CLI CI/CD Gate tab

---

## Phase 5 — Build Verification & Netlify Deployment
- [x] Run `bun run build` and verify clean static export in `out/`
- [x] Test in headless Chrome browser via Playwright with 0 console errors
- [x] Deploy to Netlify Edge CDN (`netlify deploy --prod --dir=out`) -> `https://tryparity.netlify.app`
- [x] Verify live deployment URL and accessibility (HTTP/2 200)

---

## Phase 6 — Demo Video & Submission Assets
- [x] Draft timed 2:45 demo video script (`DEMO_SCRIPT.md`) with 108s dedicated live on-screen cockpit interaction
- [x] Capture benchmark screenshots for all 3 surfaces in `docs/screenshots/`
- [x] Prepare slide presentation deck outline (`SLIDES.md`)
- [x] Draft Lablab.ai submission copy (`SUBMISSION.md` with Problem/Solution and Bob 2.0 statements)
- [x] Push clean repository to GitHub `https://github.com/A-Raphie/parity`

---

## Done Criteria
1. Live, working static web application deployed on Netlify with zero console errors.
2. 5,000-vector differential fuzzing engine executing in <50ms in-browser across 3 distinct enterprise scenarios.
3. 5-Second Traffic Light clearly switches between Red (Divergence) and Green (100% Parity upon applying Bob 2.0 patch).
4. Machine-actionable IBM Bob 2.0 MCP Divergence Packet and Cryptographic Certificate generated.
5. High-quality 2:45 demo video with ≥90s continuous live cockpit action.
