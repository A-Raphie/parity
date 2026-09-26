# Parity — Handoff

Read this first if you're picking up the project. Mirrors current state; updated as work progresses.

---

## Current State
Parity is fully built, tested, and deployed to production on Netlify Edge CDN. The live application, GitHub repository, 5,000-vector differential fuzzing engine, 3 enterprise scenarios, demo script, slides, and Lablab.ai submission package are complete.

---

## What's Done
- [x] Project repository live on GitHub: `https://github.com/A-Raphie/parity`
- [x] Production deployment live on Netlify: `https://tryparity.netlify.app`
- [x] Rule 6 (`generate_image`) purged across global agent configs.
- [x] Winsznx 10-repo visual benchmark calibrated (`~/.cache/winsznx-references`).
- [x] 3 Surfaces fully implemented and interactive:
  - Surface 1: High-Authority Front Door (1-chrome-row header, 5-beat hero, 3-card economic friction grid)
  - Surface 2: Working Cockpit (5-second traffic light banner, dual code panes, 5,000-vector scrubber, 1-click Bob 2.0 patch simulator with confetti)
  - Surface 3: Cryptographic Proof Rail (IBM Bob 2.0 MCP packet, SHA-256 Parity Certificate, CLI CI/CD gate)
- [x] 3 Enterprise Modernization Scenarios calibrated:
  - Banking Interest (Vector #1,429 floating-point drift)
  - Healthcare Claims (Vector #840 century leap-year ghost day)
  - FinCEN Sanctions (Vector #620 Turkish dotted 'İ' bypass)
- [x] Automated Playwright E2E verification passed with 0 console errors.
- [x] `DEMO_SCRIPT.md` timed for 2:45 total with 108s continuous live on-screen demo.
- [x] `SUBMISSION.md` with Problem/Solution Statement and Bob 2.0 Usage Statement.
- [x] `SLIDES.md` 7-slide judge presentation deck.

---

## Next Steps / Actions for User
1. Record the 2:45 demo video following `DEMO_SCRIPT.md` (or run automated recording take).
2. Open Lablab.ai submission form and paste fields from `SUBMISSION.md`.

---

## How to Run It (Once Scaffolding Complete)
```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

---

## Static Build & Netlify Verification
```bash
npm run build
# Produces static output in out/
```
