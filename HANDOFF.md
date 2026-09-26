# Parity — Handoff

Read this first if you're picking up the project. Mirrors current state; updated as work progresses.

---

## Current State
Stage 2 (Plan + Design) complete. Core specification files (`PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `TASKS.md`, `MEMORY.md`, `ORCHESTRATOR.md`) are scaffolded and fully aligned with hackathon constraints.

---

## What's Done
- [x] Project repository initialized at `/Users/raphie/Documents/Hackathons/parity` on branch `main`.
- [x] Rule 6 (`generate_image`) purged across global agent configs.
- [x] Winsznx 10-repo visual benchmark captured and calibrated (`~/.cache/winsznx-references`).
- [x] PRD, Architecture, Design, Tasks, Memory, and Handoff specifications created.

---

## In Progress / Next Up
- Phase 0: Initialize Next.js 15 app with Tailwind CSS, Lucide icons, and static export configuration.
- Phase 1: Implement differential fuzzing engine in `lib/engine/` with the 3 enterprise modernization scenarios.
- Phase 2 & 3: Build Surface 1 (Front Door) and Surface 2 (Working Cockpit with 5-Second Traffic Light).

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
