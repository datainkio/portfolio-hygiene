---
aix:
  id: aix.readme
  role: Workspace scaffold overview and entrypoint.
  status: stable
  surface: internal
  owner: AIX
  tags:
    - "#readme"
    - "#overview"
    - "#onboarding"
  type: guide
  scope: aix
  audience: maintainers
  perf:
    readPriority: high
    cacheSafe: true
    critical: true
---

# Vitaixmin

A lightweight scaffold for building VS Code workspaces with dual AI platform support:

- **GitHub Copilot**: `Concierge` is the single user-facing entrypoint; routes each request to the best-fit module
- **Claude Code**: `CLAUDE.md` is the auto-loaded entrypoint; Claude self-routes to sub-agents based on intent
- Both platforms share the same canonical authority: [context/](context/), [specs/](specs/), [docs/](docs/)
- Modules/agents specialize by outcome (analysis, architecture, implementation, docs, review, hygiene)

This scaffold is designed to improve both AIX and DX:

- **AIX benefits**: lower routing ambiguity, less context drift, and more predictable task execution
- **DX benefits**: faster onboarding, clearer file ownership, and fewer workflow dead ends

Core capabilities:

- strong repo hygiene (ignores, structure, low-noise indexing)
- calibrated Copilot routing (Concierge + prompt modules)
- Claude Code sub-agent system (14 agents, tool-scoped, auto-routed)
- reusable documentation and context patterns for AIX performance

## Getting Started

This repository is **Vitaixmin**, a reusable VS Code workspace starter.

It is intended to be used as a **template** when starting a new project — not cloned and detached.

Important: Do not regenerate agent instructions from the default Copilot dialog. This workspace uses a custom Concierge + module routing system calibrated for AIX.

**To start a new project:**

1. Create a new repository using this repo as a **template**
2. Clone your new project locally
3. Follow the step-by-step guide in [docs/getting-started.md](docs/getting-started.md)

> **Important:** Do not clone this repository directly to start a project.
> Use Concierge + the `migrator.updater` module to apply scaffold updates to existing projects.

## What this repo does (and does not)

- Maintains hygiene and AIX performance for the workspace
- Provides templates and doc structure for consistent project documentation
- Does not implement your product code (that belongs in project repos)

## Agent System (Current State)

Concierge is the single user-facing entrypoint. It routes each request to one primary module based on intent.

Canonical sources:

- Router contract: [.copilot/prompts/concierge.prompt.md](.copilot/prompts/concierge.prompt.md)
- Module index: [.copilot/prompts/_module-index.md](.copilot/prompts/_module-index.md)
- Routing canon pointer: [ROUTING.md](ROUTING.md) → [.copilot/ROUTING.md](.copilot/ROUTING.md)

### Module roles

The canonical list (with triggers and Primary Output types) lives in [.copilot/prompts/\_module-index.md](.copilot/prompts/_module-index.md). Summary:

- `concierge` — routing contract and response schema
- `analyst` — analysis briefs, tradeoffs, recommendations
- `architect` — architecture and standards decisions
- `content-strategist` — messaging, copywriting, microcopy
- `editor` — rewriting and structural clarity for prose/docs
- `housekeeper` — workspace hygiene, naming, ignores, cleanup
- `implementer` — implementation execution and validation reporting
- `librarian` — documentation curation, cross-linking, discoverability
- `mechanic` — build/test/tooling triage and minimal fixes
- `migrator.updater` — safe scaffold upgrades for existing projects
- `navigator` — file/entrypoint discovery and placement guidance
- `planner` — actionable execution plans and checkpoints
- `reviewer` — quality/risk/completeness reviews
- `taskmaster` — task framing, anti-drift TODO discipline

### Mounted project modules

For mounted repos (for example `frontend/`), Concierge can route to project-local modules when stack signals match. Current frontend modules are indexed via [frontend/.copilot/prompts/index.md](../frontend/.copilot/prompts/index.md) and cover display/templates, JS runtime, choreography planning/implementation, and domain workflows.

### When to edit what (Copilot)

- Change routing behavior: [.copilot/prompts/concierge.prompt.md](.copilot/prompts/concierge.prompt.md)
- Add/remove module definitions: [.copilot/prompts/_module-index.md](.copilot/prompts/_module-index.md)
- Edit module behavior: `.copilot/prompts/*.prompt.md`
- Update project-specific routing context: [context/projects/](context/projects/)

## Claude Code Agent System

Claude Code auto-routes requests to sub-agents based on the `description:` field in each agent file. No Concierge layer — intent matching is direct.

Entrypoint: [CLAUDE.md](CLAUDE.md) (auto-loaded every session)
Agent files: [.claude/agents/](.claude/agents/)

### Ideal use cases for sub-agents

Sub-agents earn their cost when isolation matters. Spawn an agent for:

| Use case | Agent | Why it helps |
|---|---|---|
| Multi-step implementation across several files | `implementer` | Isolated context; no conversation history noise |
| Pre-implementation constraint check | `calibrator` | Reads only constraints + decisions; fast, focused |
| Architecture decision before coding | `architect` | Scoped to design output; won't drift into implementation |
| Pre-merge quality check | `reviewer` | Read-only tools enforced; can't accidentally change files |
| Build or test failure triage | `mechanic` | Minimal-fix scope enforced at the tool level |
| Sequencing a complex task | `planner` | No write tools; planning stays separate from execution |

Not worth spawning for: single-file edits, quick lookups, questions, short Q&A tasks. Inline is faster.

### DX changes when using Claude Code agents

The agent system only delivers efficiency gains when invoked correctly. Three behavior changes matter:

**1. Frame requests by outcome, not method**
Claude routes based on what you want, not how to do it. Trigger phrases in each agent's `description:` are the matching signal.

| Less effective | More effective |
|---|---|
| "Help me analyze these two options..." | "Compare these two approaches and recommend one" |
| "Can you plan out what needs to happen for..." | "Plan the steps before we start coding on X" |
| "Look at this diff and tell me if there are issues" | "Review this for issues before I merge" |

**2. Approve sub-agent spawning when prompted**
When Claude proposes spawning an agent, you'll see an `Agent` tool call in the permission prompt. Approving it creates the isolated context window where token efficiency lives. Denying it runs everything inline — no isolation, no savings.

**3. Name the agent explicitly for non-trivial tasks**
Skip routing inference by leading with the agent name:

```
Calibrator: check this change against constraints before we proceed
Planner: sequence the work for adding the project detail page
Reviewer: pre-merge check on this diff
```

### When to edit what (Claude Code)

- Change agent behavior: `.claude/agents/<agent>.md`
- Add a new agent: create `.claude/agents/<name>.md` with required `name:`, `description:`, `tools:`, and `aix:` frontmatter
- Update workspace instructions: [CLAUDE.md](CLAUDE.md)
- Update shared context: [context/](context/) (affects both platforms)

## Concierge prompts

Concierge is the single Copilot Chat entrypoint for this workspace. Copy/paste prompts below.

### First sitting (high TTUO)

1. “Concierge: Summarize current goals, constraints, and decisions; cite the relevant files; call out contradictions.”
2. “Concierge: Assemble a minimal context pack (3–7 sources) to work on **[task]**; flag any drift.”
3. “Concierge: Turn this into requirements + acceptance criteria: **[paste request]**.”
4. “Concierge: Draft a UX spec for **[feature]** (states, edge cases, a11y, responsive rules) + an implementation checklist.”
5. “Concierge: Propose a component inventory + variant matrix for **[page/feature]**; keep it implementable.”
6. “Concierge: Propose a Sanity content model for **[page/feature]** and map content → UI states (missing fields, defaults).”
7. “Concierge: Diagnose this error: **[paste error]**. Constraints: minimal fix + file/line links + validation steps.”
8. “Concierge: Run a quick hygiene scan (ignores/excludes/noisy outputs). Constraints: non-invasive; list fixes.”

### Regular lifecycle (high leverage)

1. “Concierge: After a context refresh, run a drift sweep and log an AIX snapshot (FRA/CR/HF/TTUO/CUS).”
2. “Concierge: Pre-PR check — hygiene + docs pointer check. Output: short, actionable fix list.”
3. “Concierge: Update current-goals if the work shifted; keep it 3–7 bullets per section.”
4. “Concierge: Draft/update an ADR for **[decision]** with options + tradeoffs; keep it short and linkable.”
5. “Concierge: Audit docs for stale commands/links and patch to match current scripts.”
6. “Concierge: Sanity change review — assess impact of **[schema/content changes]** on UI and build; propose updates.”
7. “Concierge: Scaffold upgrade — audit against latest scaffold; apply safe updates only + write changelog.”

Full menu: [docs/concierge-prompt-catalog.md](docs/concierge-prompt-catalog.md)

## Docs

- Getting started: [docs/getting-started.md](docs/getting-started.md)
- Docs hub: [docs/README.docs.md](docs/README.docs.md)
- Agent index: [docs/agents.md](docs/agents.md)
- Concierge prompt catalog: [docs/concierge-prompt-catalog.md](docs/concierge-prompt-catalog.md)
- AIX backlog: [TODO.md](TODO.md)
- Template notes: [template_notes.md](template_notes.md)

## AI configuration

### Claude Code
- Workspace entrypoint: [CLAUDE.md](CLAUDE.md)
- Agent index: [.claude/agents/](.claude/agents/)
- Onboarding guide: [docs/onboarding/claude-code-onboarding.md](docs/onboarding/claude-code-onboarding.md)

### GitHub Copilot
- Copilot/agent config hub: [.copilot/README.copilot.md](.copilot/README.copilot.md)
- Module index (routing): [.copilot/prompts/\_module-index.md](.copilot/prompts/_module-index.md)
- Curated agent context: [.copilot/context/README.context.md](.copilot/context/README.context.md)
- Agent entrypoints: [.github/README.md](.github/README.md)
- Workspace Copilot instructions: [../.github/copilot-instructions.md](../.github/copilot-instructions.md)

### Shared authority
- Context: [context/README.context.md](context/README.context.md)
- Specs: [specs/README.specs.md](specs/README.specs.md)
- Docs: [docs/README.docs.md](docs/README.docs.md)

## Tooling

This scaffold is intentionally **tool-agnostic**. Use what your project needs.

### Utilities & manifests

- Scripts hub: [scripts/README.scripts.md](scripts/README.scripts.md)
- Assets manifest: [assets/README.assets.md](assets/README.assets.md)
- Data manifest: [data/README.data.md](data/README.data.md)

### Agent Ops tasks (recommended)

This workspace defines a small allowlisted task set in `.vscode/tasks.json` so routine work can be run via VS Code tasks (less ad-hoc terminal friction).

Key tasks:

- AIX: Pre-PR Check
- AIX: Pre-PR Check (Strict Sidecar)
- AIX: Docs Link Check (Local)
- Agent Ops: Drift Watch (AIX)
- Agent Ops: Drift Watch (All Repos)
- Agent Ops: Open File (Safe)
- Agent Ops: Move/Rename (Safe)
- Agent Ops: Delete (Safe)

There are also cross-repo shortcuts like:

- Frontend: Dev / Build / Test / Validate / Format
- Backend: Dev / Build / Migrate

### Mermaid

Mermaid is great for lightweight diagrams in Markdown. Example prompt:

> “Review the XYZ package. Create a Mermaid diagram illustrating the initialization sequence.”

### Obsidian

The workspace includes an `.obsidian/` folder so the repo can be opened as an Obsidian vault.

- If you don’t use Obsidian, delete `.obsidian/` locally.
- If you do use Obsidian, keep notes wherever you like (committed Markdown, Obsidian Sync, iCloud, etc.).
- This repo defaults to **not tracking** `.obsidian/` in Git (to avoid editor state creep).
