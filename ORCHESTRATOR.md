# Parity — Hackathon Orchestrator Ledger
Event: IBM Bob 2.0 Hackathon (Lablab.ai) · Deadline: September 27, 2026 at 11:00 AM ET / 4:00 PM WAT · Current stage: Stage 2 (Plan + Design) · Updated: 2026-09-26

## Executive Thesis
* **The Problem:** Enterprise clients refuse to deploy AI-modernized code because compilers check syntax, not runtime behavioral equivalence. When IBM Bob 2.0 refactors legacy systems (COBOL/Java to TypeScript/Go), undocumented business logic and edge cases silently break.
* **The Solution:** Parity is the differential behavioral equivalence engine for IBM Bob 2.0. In seconds, Parity synthesizes 5,000 adversarial boundary vectors, executes legacy and modern code in parallel browser sandboxes, renders a 5-Second Traffic Light verdict (Green = 100% Parity, Red = Divergence), generates an MCP Divergence Packet for Bob to patch, and mints an auditable Parity Attestation Certificate.
* **Hosting Constraint:** 100% static-hostable on Netlify (client-side JS/WASM sandbox execution, zero persistent daemons).
* **Video Constraint:** Full 3-minute maximum window with ≥90 seconds of continuous live on-screen execution.

---

## Sweeps
| Stage | Entered | Exited | Notes |
|---|---|---|---|
| Stage 0: Calibrate | 2026-09-26 17:40 | 2026-09-26 17:50 | Verified enrollment on Lablab.ai (@Raphie), ~22h remaining, $12,000 prize pool |
| Stage 1: Idea + Validation | 2026-09-26 17:50 | 2026-09-26 17:56 | Evaluated Plumb vs Parity; Parity selected for high enterprise relevance to IBM modernization mission |
| Stage 2: Plan + Design | 2026-09-26 17:56 | 2026-09-26 18:02 | Winsznx 10-repo benchmark calibrated; PRD, Architecture, Design, Tasks, Memory, Handoff scaffolded |
| Stage 3: Build & Scaffold | 2026-09-26 18:02 | 2026-09-26 18:12 | Next.js 15, Tailwind v4, 3 surfaces, and 5,000-vector differential fuzzing engine operational |
| Stage 4: Verify & Audit | 2026-09-26 18:12 | 2026-09-26 18:15 | Automated Playwright verification passed with 0 console errors; 5-sec traffic light validated |
| Stage 5: Deploy & Ship | 2026-09-26 18:15 | 2026-09-26 18:18 | Deployed 100% static to Netlify Edge CDN at https://tryparity.netlify.app (HTTP/2 200) |
| Stage 6: Demo & Submission | 2026-09-26 18:18 | In Progress | DEMO_SCRIPT.md (2:45 total, 108s live demo), SUBMISSION.md, SLIDES.md ready |

---

## Skill Ledger
| Skill | Stage | State | Note (reason / revisit trigger / result) |
|---|---|---|---|
| `hackathon-orchestrator` | 0–7 | ✅ done | Active first-call router |
| `hackathon-idea-hack` | 1 | ✅ done | Gap identified: Behavioral divergence during AI modernization |
| `winsznx-ui` | 2 | ✅ done | 10-repo pull & benchmark calibrated against winsznx obsidian density |
| `naming` | 2 | ✅ done | Name locked: **Parity** (Monosyllabic, authoritative, zero compound slop) |
| `spec` | 2 | ✅ done | Scaffolded PRD.md, Architecture.md, Tasks.md, Memory.md, Handoff.md, DESIGN.md |
| `design-direction` | 2 | ✅ done | Obsidian Slate (#090d16) + emerald (#10b981) + amber/crimson metrology locked |
| `semantic-tokens` | 2–3 | ✅ done | globals.css token architecture with hairline borders and tabular numbers |
| `component-harvest` | 3 | ✅ done | Lucide React + Tailwind primitives integrated |
| `andrej-karpathy` | 3 | ✅ done | Surgical implementation, simple architecture, verifiable contracts |
| `modern-web-guidance` | 3 | ✅ done | Native Web Crypto API + client-side static export |
| `mock-hunter` | 4 | ✅ done | 5,000 vectors generated deterministically via PRNG; zero broken endpoints |
| `ship-rehearsal` | 5 | ✅ done | Netlify preview & production rehearsal -> https://tryparity.netlify.app |
| `demo-script` | 6 | ✅ done | 2:45 storyboard with 108s continuous live on-screen action (DEMO_SCRIPT.md) |
| `submission` | 6 | ✅ done | Lablab.ai submission package ready in SUBMISSION.md and SLIDES.md |

---

## Stage Gate Checklist
- [x] Repo recoverable (`git init`, branch `main`, clean commit tree)
- [x] Simple Ideology verified (Simple Name, 5-Second Traffic Light, 60-Second Judge, Visceral One-Liner)
- [x] Spec files scaffolded (PRD, Architecture, Tasks, Memory, Handoff, DESIGN.md)
- [x] Next.js 15 project initialized with Tailwind CSS and static export
- [x] Differential fuzzing engine operational in browser across 3 enterprise scenarios
- [x] 3 Surfaces fully implemented and interactive with 0 console errors
- [x] Live Netlify Edge deployment verified at https://tryparity.netlify.app
- [x] Public GitHub repository live at https://github.com/A-Raphie/parity
- [x] Demo storyboard (2:45 with 108s live solution), submission copy, and slides ready
