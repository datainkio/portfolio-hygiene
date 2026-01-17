# Agent/AIX Performance Evaluation – 2026-01-15

Scope: Portfolio frontend repo AIX (Copilot ergonomics, prompt surfaces, discoverability, and risk of misrouting).

Evidence sources:

- Frontend repo authoritative docs (paths are cross-root; not link-checked from `aix/`):
	- `frontend/.github/copilot-instructions.md`
	- `frontend/.copilot/README.md`
	- `frontend/.copilot/prompts/index.md`
	- `frontend/docs/ai/START_HERE.md`
	- `frontend/docs/ai/audits/`
- Prior evaluation logs: [agent-evaluation.md](agent-evaluation.md)

---

## 1) AIX Signals (discoverability + constraints)

### Strengths

- Strong project-specific operating context (11ty/Figma/Airtable/Tailwind/GSAP) with concrete commands and “gotchas” (see `frontend/.github/copilot-instructions.md`).
- Clear prompt authority chain and task-scoped prompt modules (see `frontend/.copilot/README.md`, `frontend/.copilot/prompts/index.md`).
- Single AI entrypoint exists and points to the “high-signal pack” (see `frontend/docs/ai/START_HERE.md`).
- Explicit “do-not-touch” list for generated output reduces noise-driven HF (see `frontend/.copilot/context/do-not-touch.md`).

### Weaknesses / risks

- `.github/agents/` existed in-project and may create agent-selection ambiguity in multi-root workspaces (see `frontend/docs/ai/audits/2026-01-15T165423Z--aix-audit--MP.md`).
- `docs/logs/` previously lacked an index file, which reduces discoverability and can increase TTUO when a user is trying to find “the latest evaluation” (now handled by the scaffold project-log index).

---

## 2) Measured Snapshot (heuristic, tool-generated)

The mounted-project discovery runner produced a scored heuristic snapshot:

- Audit: `frontend/docs/ai/audits/2026-01-15T165423Z--aix-audit--MP.md`
- Snapshot JSON: `frontend/docs/ai/audits/2026-01-15T165423Z--aix-snapshot--MP.json`

Heuristic scores (0–5):

- FRA: 4.5
- CR: 3.0
- HF: 4.5
- TTUO: 4.5
- CUS: 4.5
- Overall: 4.2

Notes:

- These are discovery/heuristic scores (good for trend + “is the repo legible to AI?”), not a substitute for scoring real chat transcripts.

---

## 3) Rubric Evaluation (1–5)

### Context awareness — 4

- High-quality repo-specific context exists and is well organized (`.github/copilot-instructions.md`, `.copilot/`, `docs/ai/START_HERE.md`).
- Remaining gap is not content absence, but multi-root ambiguity risk due to `.github/agents/`.

### Routing & scope control — 3

- Prompt modules are well-scoped.
- Risk: if multiple selectable agents are present (vitaixmen Concierge + frontend agents), routing becomes user-dependent and less predictable.

### Output quality — 3

- Without stored transcripts of actual Copilot/agent runs, output correctness can’t be fully verified (same limitation noted in [agent-evaluation.md](agent-evaluation.md)).

### Consistency & predictability — 3

- Strong potential for consistency via prompt authority, but limited direct evidence of repeated runs.

### Workspace hygiene & DX support — 4

- “Do-not-touch” and maintenance checklist are strong guardrails.

Overall effectiveness (qualitative): 3.4/5

---

## 4) Recommendations (highest impact)

1. Deconflict agent selection in multi-root setups

- Remove `.github/agents/*.agent.md` from the project repo when vitaixmen Concierge is present, and route choreography planning/implementation via AIX prompt modules instead.

2. Add lightweight run evidence

- Store minimal “run logs” (date, task, prompt module, outcome) in `docs/logs/` to support real FRA/TTUO scoring.

3. Keep the authority chain tight

- Continue the monthly loop in `frontend/docs/ai/aix-maintenance.md` and prune noise before adding prompts.
