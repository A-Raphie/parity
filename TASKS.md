# Parity — Tasks

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 0 — Foundations & Scaffolding
- [x] Create project repository `/Users/raphie/Documents/Hackathons/parity` with clean git tree
- [x] Purge image generation rule from global agent config
- [x] Scaffold `ORCHESTRATOR.md` and `PRD.md`
- [x] Scaffold `ARCHITECTURE.md` and `DESIGN.md`
- [x] Scaffold `TASKS.md`, `MEMORY.md`, and `HANDOFF.md`
- [ ] Initialize Next.js 15 app with Tailwind CSS and Lucide icons
- [ ] Configure `output: 'export'` in `next.config.js` for 100% static Netlify deployment
- [ ] Set up semantic tokens in `globals.css` (Obsidian palette, typography, hairline borders)

---

## Phase 1 — Core Differential Fuzzing Engine (`lib/engine`)
- [ ] Implement Adversarial Vector Synthesizer (`lib/engine/synthesizer.ts`) generating 5,000 boundary inputs
- [ ] Implement 3 enterprise scenario logic pairs (Legacy vs Initial Modern vs Patched Modern):
  - Scenario 1: Banking Tax & Floating Point rounding (`lib/scenarios/banking.ts`)
  - Scenario 2: Healthcare Claims & Leap Year century boundaries (`lib/scenarios/healthcare.ts`)
  - Scenario 3: FinCEN Sanction Tokenizer & Unicode folding (`lib/scenarios/sanction.ts`)
- [ ] Implement Differential Comparator (`lib/engine/comparator.ts`) with delta extraction and timing
- [ ] Implement Web Crypto SHA-256 state root generator for Attestation Certificates (`lib/crypto/attestation.ts`)
- [ ] Implement IBM Bob 2.0 MCP Divergence Packet generator (`lib/mcp/packetGenerator.ts`)

---

## Phase 2 — Surface 1: High-Authority Front Door
- [ ] Implement 1-Chrome-Row Header with `PARITY` wordmark, IBM Bob 2.0 pill, and `Launch Cockpit` CTA
- [ ] Implement 5-Beat Hero section with visceral enterprise one-liner
- [ ] Implement 3-Card Economic Friction Grid ($42M outage, 0.38ms latency, 100% certificate)

---

## Phase 3 — Surface 2: Working Cockpit
- [ ] Implement Scenario Selector Tab bar (Banking, Healthcare, Sanctions)
- [ ] Implement 5-Second Traffic Light Banner (Red = Divergence alert, Green = 100% Parity)
- [ ] Implement Dual Code Panes with syntax-highlighted Legacy vs Bob 2.0 modern implementations
- [ ] Implement Differential Execution Scrubber (5,000 vector progress, scrubber slider, input/output inspection)
- [ ] Implement Divergence Inspector showing exact input vector and math delta
- [ ] Implement 1-Click Bob 2.0 Patch Simulator button with animated convergence loop

---

## Phase 4 — Surface 3: Cryptographic Proof Rail
- [ ] Implement IBM Bob 2.0 MCP Divergence Packet display with 1-click JSON copy and toast
- [ ] Implement Parity Attestation Certificate viewer with SHA-256 state root and download option
- [ ] Implement Release Gate status pill ("BLOCKED: DIVERGENT" vs "VERIFIED: READY FOR PROD")

---

## Phase 5 — Build Verification & Netlify Deployment
- [ ] Run `npm run build` and verify clean static export in `out/`
- [ ] Test in headless Chrome browser via Chrome DevTools MCP
- [ ] Deploy to Netlify Edge CDN (`netlify deploy --prod --dir=out`)
- [ ] Verify live deployment URL and accessibility

---

## Phase 6 — Demo Video & Submission Assets
- [ ] Draft timed 2:45 demo video script (budgeting ≥90s dedicated live on-screen cockpit interaction)
- [ ] Direct and record synchronized browser walkthrough
- [ ] Prepare slide presentation deck
- [ ] Draft Lablab.ai submission copy (Problem/Solution Statement, Bob 2.0 Usage Statement)
- [ ] Submit on Lablab.ai before deadline

---

## Done Criteria
1. Live, working static web application deployed on Netlify with zero console errors.
2. 5,000-vector differential fuzzing engine executing in <50ms in-browser across 3 distinct enterprise scenarios.
3. 5-Second Traffic Light clearly switches between Red (Divergence) and Green (100% Parity upon applying Bob 2.0 patch).
4. Machine-actionable IBM Bob 2.0 MCP Divergence Packet and Cryptographic Certificate generated.
5. High-quality 2:45 demo video with ≥90s continuous live cockpit action.
