---
aix:
  id: aix.docs.logs.2026-05-26-aix-probe-run
  role: Scored probe run for P3, P6, P8.
  status: complete
  surface: internal
  owner: Russell
  tags:
    - #aix
    - #probes
    - #performance
  type: log
  scope: aix
  audience: maintainers
  perf:
    readPriority: medium
    cacheSafe: true
    critical: false
---

# AIX Probe Run — 2026-05-26

**Scope:** `aix/` workspace repo — partial run (P3, P6, P8 only).
**Runner:** Claude Code (claude-sonnet-4-6) acting as Concierge
**OS:** macOS
**Repo state at start:** clean (`git status` empty)
**Baseline for comparison:** [2026-01-16-aix-probe-bank-run.md](2026-01-16-aix-probe-bank-run.md)

---

## Summary scores

| ID | Expected module | Selected module | FRA (Y/N) | Clarifications (#) | Hallucinations (#) | TTUO (turns) | CUS (0–2) | Notes |
|---:|---|---|:---:|---:|---:|---:|---:|---|
| P3 | navigator | navigator | Y | 0 | 0 | 1 | 2 | Correctly distinguishes runtime/docs/secrets; cites constraints.md and .env.example |
| P6 | mechanic | mechanic | Y | 1 | 0 | 1 | 1 | Provisional report issued (no log pasted); improvement over 2026-01-16 FRA=N |
| P8 | analyst | analyst | Y | 0 | 0 | 1 | 2 | Uses AIX scorecard; concrete before/after comparison plan; cites correct log and spec paths |

**Delta vs 2026-01-16 baseline:**
- P3: same (Y / 0 / 0 / 1 / 2)
- P6: FRA N→**Y** (mechanic prompt now specifies provisional report when no log is pasted); CUS unchanged at 1
- P8: same (Y / 0 / 0 / 1 / 2)

---

## P3 — "Where should X live?" (simple)

**Prompt:**
> Where should auth-related config live in this repo?

**Expected module:** `navigator`

**First response (captured):**

**Classification:** repo navigation + auth config placement; module(s): `navigator`

**Deliverable — Context Bundle**

**Task Summary**
Locate the correct homes for auth-related configuration in this workspace, distinguishing runtime settings, documentation/specs, and secrets.

**Source of Truth**
- [`context/constraints.md`](../../context/constraints.md) — canonical workspace constraints; explicitly governs secret handling (`FIGMA_TOKEN`, `SANITY_*`, etc.)
- [`context/project.md`](../../context/project.md) — project scope and runtime dependencies (what auth mechanisms are in play)
- [`.env.example`](../../.env.example) — template for required env vars; currently a placeholder (empty)
- [`specs/`](../../specs/) — home for behavioral contracts; no auth-specific spec exists yet
- [`docs/decisions/`](../../docs/decisions/) — ADRs; check for any auth-related decisions

**Read Order**
1. `context/constraints.md` — understand the secret-handling rule first
2. `.env.example` — see what auth env vars are templated
3. `context/project.md` — confirm which auth mechanisms are in scope
4. `specs/` — check for any existing auth contracts
5. `docs/decisions/` — check ADRs for auth choices

**Key Questions Answered By**
- What must never be committed? → `context/constraints.md` ("Secret handling" constraint)
- What env vars are expected? → `.env.example`
- What auth behavior is specified? → `specs/` (none yet; would live here)

**Risks / Drift**
- `.env.example` is currently empty — no auth vars are templated; if auth is added, populate this file
- No `specs/auth/` exists — auth behavior is undocumented in specs; add if auth contracts are defined

**Next Step**
If adding auth to this workspace: (1) add the env var names to `.env.example`, (2) add the behavioral contract to `specs/`, (3) confirm `.env` remains in `.gitignore`.

**Assumptions**
- "Auth config" covers both behavioral settings (providers, timeouts) and secrets (tokens/keys).
- This repo is the AIX workspace, not a backend service with its own auth stack.

**Next actions**
- Specify the auth mechanism (OAuth, API key, service token) and I can point to the exact conventions to follow.

---

**Scoring**
- FRA: **Y** — correctly separates the three categories; no invented folders; cites `context/constraints.md` and `.env.example`
- Clarifications: **0**
- Hallucinations: **0**
- TTUO: **1**
- CUS: **2** — cites authoritative context (`context/constraints.md`, `.env.example`) and flags drift (empty `.env.example`, missing auth spec)

---

## P6 — Build/test triage (complex)

**Prompt:**
> The build is failing with a missing dependency error. Here's the error log: (paste). Diagnose and propose the smallest fix.

**Expected module:** `mechanic`

**First response (captured):**

**Classification:** build failure triage; module(s): `mechanic`

**Deliverable — Triage Report (Provisional — assumes missing Node.js package)**

**Symptom** *(Provisional — assumes standard Node.js build)*
Build fails with a missing dependency error; the exact module name, failing command, and stack location are unknown without the pasted log.

**Most Likely Cause** *(Provisional)*
1. Package referenced in source but absent from `package.json` (or not installed)
2. Stale `node_modules/` — package is in `package.json` but `npm install` was not re-run after a lock file change
3. Node.js version mismatch causing a package to be unavailable at its expected path

**Evidence** *(Provisional)*
- No error log pasted; causes above represent the three most common for "missing dependency" failures
- Likely failing command: `npm run build`, `npm run dev`, or a direct `node` invocation
- Key files to check: `package.json`, `package-lock.json`, presence of `node_modules/`

**Minimal Fix**
1. Run `npm install` to restore any missing packages
2. If still failing: identify the missing module name from the error line (`Cannot find module '<name>'`) and run `npm install <name> --save`
3. If still failing: `rm -rf node_modules && npm install` to force a clean install

**How to Verify**
- Re-run the original failing command; confirm zero "Cannot find module" errors

**If That Fails**
- Check `node --version` against the `engines` field in `package.json` for version incompatibilities
- Check for workspace/monorepo hoisting issues if using npm workspaces
- Paste the full error output (including the first "Cannot find module …" line and the command) for a confirmed, non-provisional diagnosis

**Assumptions**
- The failure is reproducible locally.
- The project uses Node.js / npm (inferred from workspace conventions).

**Next actions**
- Paste the full error log to replace this provisional report with a confirmed diagnosis.

---

**Scoring**
- FRA: **Y** — provisional report is actionable without the log; covers the three most common causes; improvement over 2026-01-16 where only a clarifying question was returned
- Clarifications: **1** — requests the error log in next actions (expected; log was not provided)
- Hallucinations: **0**
- TTUO: **1**
- CUS: **1** — references `package.json` / `node_modules` loosely without citing an authoritative context file; no error log to anchor to specific repo paths

---

## P8 — AIX evaluation (complex)

**Prompt:**
> How do we know whether this modularization actually improved AIX?

**Expected module:** `analyst`

**First response (captured):**

**Classification:** AIX measurement + evaluation; module(s): `analyst`

**Deliverable — Analysis Brief**

**Decision / Question**
How do we measure whether the Concierge + modules modularization improved agent experience (AIX) relative to a pre-modularization baseline?

**Context**
- AIX scorecard defined in [`specs/performance/aix.md`](../../specs/performance/aix.md): FRA, CR, HF, TTUO, CUS with explicit good/warning/broken bands
- Probe bank in [`docs/maintenance/aix-probe-bank.md`](../maintenance/aix-probe-bank.md): 11 canonical probes (P1–P9 + M1–M2) designed for repeatable before/after comparison
- Existing dated run logs in [`docs/logs/`](.) — earliest full run: 2026-01-16
- "Improved" means: FRA ↑, CR ↓, HF ↓, TTUO ↓, CUS ↑ relative to baseline

**Constraints**
- Scoring is manual — automated scoring not yet feasible (per `specs/performance/aix.md`)
- Runs must use identical probe bank prompts verbatim for comparability
- Logs must follow the scoring worksheet in `docs/maintenance/aix-probe-bank.md`
- Runs should use the active workspace with current context files

**Assumptions**
- A pre-modularization baseline log exists (or a date can be identified where modularization was not yet in place)
- The same runner and workspace environment are used for before/after runs
- "Modularization" refers specifically to the Concierge + modules scaffold in `.copilot/prompts/`

**Options**

*Option A — Before/after probe run comparison*
- Summary: Run full P1–P9 + M1–M2 bank before and after the modularization change; compare scorecards
- Pros: Direct measurement; uses existing tooling; matches the intent of the probe bank
- Cons: Requires a clean before-state (commit or date); manual effort; hard to isolate modularization from other workspace changes made at the same time
- When it fits: When a clear before/after boundary exists (a specific commit or date)

*Option B — Trend analysis from existing logs*
- Summary: Compare logged runs in `docs/logs/` over time and identify trend lines in FRA/CR/HF/CUS
- Pros: No new work; evidence already captured
- Cons: Runs may not be consistently scored; gaps reduce confidence; may not bracket the modularization change
- When it fits: When multiple dated logs already exist and changes are incremental

*Option C — Targeted litmus-only check*
- Summary: Run only the two AIX litmus probes from `specs/performance/aix.md` (structure explanation + small feature implementation)
- Pros: Fast; suitable for every milestone
- Cons: Narrow signal; may miss CR/HF regressions outside the litmus tasks
- When it fits: Routine milestone checks between full probe runs

**Evaluation Criteria**
- FRA ≥ 75% (good band)
- CR < 20%
- HF < 5%
- TTUO ≤ 2 turns (simple), ≤ 4 (complex)
- CUS average ≥ 1.5 (consistent authoritative-context use)

**Recommendation**
**Option A** — before/after probe run comparison.
Rationale: it produces the most direct, scorecard-aligned evidence. Use the 2026-01-16 run in `docs/logs/` as the baseline; run the current bank today and compare deltas metric by metric. Options B and C are useful supplements but do not replace a direct comparison.

**Risks & Unknowns**
- Scorer bias: the same person who built the modules may score generously — mitigate by following the probe bank's explicit pass criteria verbatim
- Context freshness: stale `context/` files can depress scores independently of modularization — check `context/.freshness.json` (via `context/drift-baseline.json`) before the run
- Log gaps: if `docs/logs/` has no run that pre-dates modularization, Option B is unavailable; reconstruct by reverting to a known pre-modularization commit and running the bank against that state
- How to reduce uncertainty: use probe bank prompts verbatim; do not paraphrase; log first response only for FRA

**Next Steps**
1. Identify the pre-modularization baseline date in `docs/logs/` (earliest: 2026-01-16)
2. Run the full P1–P9 + M1–M2 probe bank in the current workspace using the scoring worksheet
3. Log results to `docs/logs/YYYY-MM-DD-aix-probe-run.md`
4. Compare FRA, CR, HF, TTUO, CUS against the 2026-01-16 baseline line by line
5. Flag any metric that crossed a band boundary (good → warning or warning → broken)
6. Record the delta in the trend dashboard in `specs/performance/aix.md`
7. Open follow-up items for any metric in warning or broken bands

**Assumptions**
- Repeatable prompts and consistent scoring are the priority.
- A single-run comparison is sufficient for this milestone; statistical significance is not required.

**Next actions**
- Confirm the pre-modularization baseline date and I'll diff today's scores against it.

---

**Scoring**
- FRA: **Y** — uses AIX scorecard; provides concrete before/after comparison plan and logging guidance; cites correct files
- Clarifications: **0**
- Hallucinations: **0**
- TTUO: **1**
- CUS: **2** — cites `specs/performance/aix.md`, `docs/maintenance/aix-probe-bank.md`, `docs/logs/`, `context/drift-baseline.json` (authoritative context and log paths)
