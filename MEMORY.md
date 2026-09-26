# Parity — Memory

Running log of decisions, conventions, and gotchas. Newest at the top.

---

## Decisions
- **2026-09-26 — Pure Static In-Browser Sandbox (No Backend Daemons):** Decided to run the differential fuzzing engine entirely in the browser using Web Workers / client-side execution loops rather than server containers. Guarantees 100% static hosting on Netlify, zero cold start latency, and zero risk of backend downtime during hackathon judging.
- **2026-09-26 — 5-Second Traffic Light Rule as First-Class Element:** Rather than defaulting to a wall of hex/AST debug output, Parity displays an unmistakable Red/Green status banner at the center of the cockpit. Hackathon judges can instantly grasp what problem Parity solves in 5 seconds.
- **2026-09-26 — IBM Bob 2.0 Integration via MCP Toolchain:** Selected Model Context Protocol (MCP) tool format (`patch_behavioral_divergence`) as the output artifact. This directly aligns with IBM Bob 2.0's subagent repo-editing architecture, creating a closed-loop modernization repair workflow.
- **2026-09-26 — 3 Distinct Enterprise Scenarios:** Chose Floating-Point Banking, Leap-Year Healthcare, and Unicode Sanctions to reflect authentic Fortune 500 legacy migration failure modes.
- **2026-09-26 — Demo Video Budgeted for 2:45 with ≥90s Live Demo:** Strictly adhering to hackathon mandate (max 3 minutes / 180s, at least 90s live solution on screen).
- **2026-09-26 — Image Generation Rule Purged:** Image generation skill (`generate_image` / Nano Banana) was permanently removed per user instruction.

---

## Conventions
- **Palette:** Obsidian Slate `#090d16` base, Hairline Slate `#1e293b` borders, Emerald `#10b981` parity, Crimson `#ef4444` divergence, Cobalt `#3b82f6` IBM system.
- **Typography:** Tabular numbers `tabular-nums` for all metrics, percentages, hashes, and vector indices.
- **Component File Structure:** Next.js App Router in `app/`, reusable UI primitives in `components/ui/`, cockpit components in `components/cockpit/`, differential engine in `lib/engine/`.

---

## Gotchas
- Netlify static export requires `output: 'export'` in `next.config.js` and `next/image` requires unoptimized images (`images: { unoptimized: true }`).
- Client-side fuzzing must avoid blocking the main UI thread during 5,000 vector runs by utilizing asynchronous batching or Web Workers.
