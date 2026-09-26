# Parity — Design System & UI Specification

The source of truth for the frontend. Every screen defers to this file; deviations update this file, not just the code.

---

## 1. Feel
**Metrological — dense, authoritative, calm, surgical.**  
Parity is an enterprise verification engine. It feels like an industrial precision instrument (a digital caliper or spectrophotometer) built for Fortune 500 infrastructure architects. Zero fluff, zero cartoonish SaaS gradients.

---

## 2. Audience
Enterprise software architects, VP of Engineering, cloud modernization leads, and IBM Bob 2.0 hackathon judges. They evaluate tools within 60–90 seconds and value clarity, statistical precision, and demonstrable enterprise safety over gimmickry.

---

## 3. Visual Direction
- **Style Family:** Dark Precision Console (Obsidian Slate `#090d16` canvas with crisp hairline borders `#1e293b`).
- **Typography Pairing:**
  - Headings & Primary Copy: `Inter` / `Geist Sans` (clean, objective, neutral).
  - Code, Hashes, Metrics & Traces: `JetBrains Mono` / `Geist Mono` with `font-variant-numeric: tabular-nums`.
- **Palette Reference:**
  - Background Base: `#090d16` (Deep Obsidian)
  - Surface Raised: `#0f172a` (Charcoal Slate)
  - Surface Elevated: `#1e293b` (Hairline Border & Card Surface)
  - Primary Accent (Equivalence / Success): `#10b981` (Vibrant Emerald)
  - Divergence Accent (Discrepancy / Alert): `#ef4444` (Laser Crimson)
  - Warning / In-Progress: `#f59e0b` (Amber Metrology)
  - IBM Brand Blue / System: `#3b82f6` (Cobalt Precision)
  - Text Primary: `#f8fafc` (Clean Optical White)
  - Text Secondary: `#94a3b8` (Muted Slate)
  - Text Muted: `#64748b` (Hairline Subtext)

---

## 4. Semantic Design Tokens

```css
:root {
  /* Canvas & Elevation Ladder */
  --bg-canvas: #090d16;
  --bg-surface-subtle: #0f172a;
  --bg-surface-raised: #141e33;
  --bg-surface-elevated: #1a2744;
  
  /* Hairline Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.16);
  --border-active: rgba(59, 130, 246, 0.4);
  
  /* Text Tiers */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-code: #38bdf8;

  /* Status Colors */
  --status-pass: #10b981;
  --status-pass-bg: rgba(16, 185, 129, 0.1);
  --status-pass-border: rgba(16, 185, 129, 0.3);

  --status-fail: #ef4444;
  --status-fail-bg: rgba(239, 68, 68, 0.1);
  --status-fail-border: rgba(239, 68, 68, 0.3);

  --status-warning: #f59e0b;
  --status-warning-bg: rgba(245, 158, 11, 0.1);

  --status-ibm: #3b82f6;
  --status-ibm-bg: rgba(59, 130, 246, 0.12);
}
```

---

## 5. Copy Tone
- **Direct, visceral, executive.**
- **No generic AI fluff:** Never write "Supercharge your coding with next-gen AI power".
- **Real enterprise statements:**
  - *"Compilers check syntax. Parity checks truth."*
  - *"Never ship modernized legacy code blind. Differential fuzzing catches silent enterprise rounding and boundary drift before production."*
  - *"100.00% Behavioral Parity Verified across 5,000 Boundary Vectors."*

---

## 6. User Flow (Screen Build Order)

### Surface 1: High-Authority Front Door (Hero & Friction Grid)
1. **Single Chrome-Row Header:**
   - Left: Wordmark `PARITY` + live system pill `[IBM BOB 2.0 PROTOCOL ENGINE]`.
   - Right: Status badge `● SANDBOX READY` + Primary Action `Launch Cockpit →`.
2. **5-Beat Hero:**
   - Beat 1: Eyebrow `IBM BOB 2.0 VERIFICATION SUITE`.
   - Beat 2: Headline `Compilers check syntax. Parity checks truth.`
   - Beat 3: Body `AI modernization without behavioral equivalence is a $40M production incident waiting to happen. Parity fuzzes 5,000 edge vectors in-browser to mathematically prove modern rewrites match legacy code.`
   - Beat 4: Action Row `Launch Verification Cockpit` (primary) + `Explore Enterprise Presets` (secondary).
   - Beat 5: 3-Card Economic Friction Grid:
     - Card A: `$42M` Average Modernization Outage Risk.
     - Card B: `0.38ms` In-Browser Sandbox Execution Latency.
     - Card C: `100.00%` Bit-for-Bit Parity Verification Guarantee.

### Surface 2: Working Cockpit (Dual-Pane Differential Execution Console)
1. **Scenario Selector Bar:**
   - Tabs: `1. Banking Tax & Interest (Floating Point)` · `2. Healthcare Claims (Leap-Year Boundary)` · `3. Sanction Filter (Unicode Normalization)`.
2. **5-Second Traffic Light Banner:**
   - When Divergent: Massive crimson alert banner: `🔴 BEHAVIORAL DIVERGENCE DETECTED ON VECTOR #1,429 — 98.42% PARITY`.
   - When Patched / Parity: Massive emerald confirmation banner: `🟢 100.00% BEHAVIORAL PARITY — ALL 5,000 VECTORS BIT-IDENTICAL`.
3. **Dual Code Panes:**
   - Left: `Legacy Engine (v1.2.0 - COBOL/Java Logic)`.
   - Right: `IBM Bob 2.0 Modern Engine (v2.0.0 - TypeScript Logic)`.
   - Inline visual diffing of the critical divergence statement.
4. **Differential Vector Execution Strip:**
   - Progress bar running through 5,000 test vectors with real-time vector counter.
   - Vector Scrubber allowing the user to scrub from vector #0 to #5,000 and view real-time input/output values.
5. **Divergence Delta Inspector:**
   - Side-by-side comparison table of Input, Legacy Output, Modern Output, and Exact Delta.
6. **1-Click Bob 2.0 Patch Simulator:**
   - Button: `Apply IBM Bob 2.0 Autonomous Patch ✨`.
   - Clicking immediately triggers the convergence animation, updates the modern code pane with the precision fix, re-executes the 5,000 vectors, and turns the Traffic Light green!

### Surface 3: Cryptographic Proof Rail & MCP Loop
1. **IBM Bob 2.0 MCP Divergence Packet:**
   - Formatted JSON-RPC tool-call payload ready to feed into Bob's autonomous agent loop.
   - 1-Click `Copy MCP Packet` button with toast feedback.
2. **Cryptographic Parity Attestation Certificate:**
   - SHA-256 State Root hash computed over the execution trace.
   - Timestamped and cryptographically signed release gate artifact.
   - `Download Parity Certificate (.json)` button.

---

## 7. Folds Used
- **Fold 1:** High-Authority Hero + Economic Friction Grid (Full-bleed 100vh with seamless cockpit trigger).
- **Fold 2:** Dual-Pane Working Cockpit with 5-Second Traffic Light and interactive scrubber.
- **Fold 3:** Cryptographic Proof Rail, MCP Agent Output, and Attestation Certificate.

---

## 8. Avoid-List (Strictly Enforced)
- ❌ NO generic purple/cyan gradient backgrounds or "glowing orb" CSS clichés.
- ❌ NO AI-generated image illustrations or placeholder stock graphics.
- ❌ NO complex dev-tool terminal spam blocking the front door (5-Second Traffic Light rule).
- ❌ NO fake buttons or dead mockups; every scenario, slider, copy button, and patch trigger must be 100% interactive.
- ❌ NO persistent server dependencies (must compile cleanly to static HTML/JS for Netlify).
