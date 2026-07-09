---
tags:
  - aix
  - claude
  - entrypoint
  - workspace
aix:
  id: aix.claude.entrypoint
  role: Claude Code workspace entrypoint for the dataink.io portfolio.
  status: stable
  surface: internal
  owner: AIX
  tags:
    - "#aix"
    - "#claude"
    - "#entrypoint"
    - "#workspace"
  type: entrypoint
  scope: workspace
  audience: agents
  perf:
    readPriority: critical
    cacheSafe: true
    critical: true
---

# Vitaixmin: AIX Workspace for dataink.io

AI agent experience (AIX) scaffold for the dataink.io portfolio. Four discrete folders, each with its own authority boundary.

## Workspace Layout

| Folder | Role | Stack |
|--------|------|-------|
| `aix/` | AIX hygiene, routing, context authority | Vitaixmin scaffold |
| `backend/` | CMS | Sanity Studio + TypeScript |
| `frontend/` | Presentation layer | Eleventy + Nunjucks + Tailwind v4 + GSAP |
| `content-model/` | Cross-cutting content contracts | Markdown specs |

## Orientation Protocol

At the start of any task, read in this order:

1. [`current-goals.md`](../context/current-goals.md) — what is being worked on now (root `context/` is the authority)
2. [`constraints.md`](../context/constraints.md) — non-negotiables; never violate
3. [`decisions.md`](context/decisions.md) — accepted ADRs; flag conflicts before proceeding
4. Project-specific context for the target repo:
   - Frontend: [`portfolio-frontend.md`](context/projects/portfolio-frontend.md)
   - Backend: [`portfolio-backend.md`](context/projects/portfolio-backend.md)

**Context load tier:**
- Fast path (navigation, location, quick lookup): user request + workspace map only
- Full path (implementation, architecture, calibration): also read `constraints.md` + `current-goals.md`

Do not infer intent from code until you have read the context files.

## Authority Model

```
context/       → canonical truth (root tree): goals, constraints, memory, handoffs
aix/context/   → aix-scaffold-specific material only (decisions.md, projects/)
aix/specs/     → prescriptive contracts: "what must be true"
aix/docs/      → explanatory/narrative: "how things work, why decisions were made"
content-model/ → cross-cutting content structure and page composition
```

Decision precedence: latest accepted ADR > `aix/specs/` > `context/current-goals.md`

## Available Agents (`.claude/agents/`)

| Agent | Purpose | Primary Output |
|-------|---------|----------------|
| [analyst](.claude/agents/analyst.md) | Compare options, recommend direction | Analysis Brief |
| [architect](.claude/agents/architect.md) | Workspace/repo architecture decisions | Architecture Proposal |
| [calibrator](.claude/agents/calibrator.md) | Constraint alignment check before execution | Calibration Snapshot |
| [choreographer](.claude/agents/choreographer.md) | GSAP motion, section choreography, scroll behavior | Choreography Report |
| [content-strategist](.claude/agents/content-strategist.md) | Portfolio copy and brand content | Content Draft |
| [editor](.claude/agents/editor.md) | Rewrite/edit existing prose | Edited Draft |
| [housekeeper](.claude/agents/housekeeper.md) | Workspace hygiene, naming, ignores | Hygiene Plan |
| [implementer](.claude/agents/implementer.md) | Implement approved changes end-to-end | Implementation Report |
| [librarian](.claude/agents/librarian.md) | Docs curation, cross-linking, READMEs | Documentation Pack |
| [mechanic](.claude/agents/mechanic.md) | Build/test/tooling failures | Triage Report |
| [migrator-updater](.claude/agents/migrator-updater.md) | Safe scaffold upgrades | Migration Plan |
| [navigator](.claude/agents/navigator.md) | File/folder location guidance | Context Bundle |
| [planner](.claude/agents/planner.md) | Sequenced execution plans | Execution Plan |
| [reviewer](.claude/agents/reviewer.md) | Quality/risk/completeness review | Review Report |
| [taskmaster](.claude/agents/taskmaster.md) | File-embedded TODOs, GitHub Issues | Task Snapshot |

## Cross-Cutting Rules (All Agents)

**Handoff notes** — at a stable decision point (plan approved, blocker identified, exploration end) write to [docs/notes/](docs/notes/)handoff-\<slug\>.md:
- Required fields: title, Updated, Status (`in-progress` | `paused` | `awaiting-review` | `ready-to-implement`), Goal, Files involved, Decisions, Constraints, Rejected approaches, Next action
- Bullets only inside sections; workspace-relative paths; empty sections write `(none)`

**Scope discipline:**
- Never refactor beyond the request scope
- Never introduce new tools, libraries, or patterns without explicit instruction
- Flag ADR conflicts before proceeding; do not silently override
- Prefer minimal, reversible changes

**Path restrictions — never edit:**
- `backend/.sanity/`, `backend/dist/`, `backend/cache-export/`, `backend/node_modules/`
- `frontend/_site/` (generated build output; never infer behavior from it)
- No inline timestamps in `context/` or `specs/` — use git signals + `.freshness.json`

**Frontend constraints:** `aix/context/projects/portfolio-frontend.md` is authoritative for frontend scope. Also see `frontend/.github/copilot-instructions.md` for do-not-edit and build-order constraints.

**Secrets:** Never commit tokens, API keys, or credentials. Use `.env` / CI secrets.

## AIX Hygiene Routing

This file is the routing home for workspace-hygiene checks:

| Responsibility | Route to |
|---|---|
| Context/doc drift, stale docs, broken links | `drift-check` skill |
| Sidecar + frontmatter conventions (`.njk`/`.js` → `.md`) | `frontmatter-lint` skill |
| AIX session scoring/logging → `aix/docs/logs/` | `aix-snapshot` skill |
| File/folder hygiene, naming, ignores | [`housekeeper`](.claude/agents/housekeeper.md) agent |
| Doc curation, cross-links, READMEs | [`librarian`](.claude/agents/librarian.md) agent |

Automated hooks (`.claude/hooks/`: `log-tokens.sh`, `warn-sidecar.sh`, `warn-commit-prefix.sh`) enforce logging, sidecar, and commit-prefix checks at tool level — agents do not re-implement these.

## Model Selection

Workspace/AIX task tiers — applied via Agent tool `model` param when dispatching subagents:

| Task type | Model |
|---|---|
| Planning, ADRs, architecture | `opus` |
| Doc curation, edits | `sonnet` |
| Hygiene checks (drift, lint, sidecar), logging, snapshots | `haiku` |

## Current Goals

Domain goals: maintain [AIX.md](../context/goals/AIX.md) — implementation steps specific to this domain. Every goal MUST reference its parent goal in [current-goals.md](../context/current-goals.md). Update the domain file as steps complete; never fork or restate root goals locally — link to them. Root `context/current-goals.md` is the authority.

## Shared Platform

This workspace also supports GitHub Copilot agents (`.copilot/` and `.github/agents/`). Both surfaces read the same `aix/context/`, `aix/specs/`, and `aix/docs/` — routing and module layers are platform-specific; the authority model is shared.
