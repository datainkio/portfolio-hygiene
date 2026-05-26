# Agent Index

Concierge is the only agent registered in Copilot Chat; it routes to specialists.
Copilot Chat discovers Concierge via [copilot-agents.json](../copilot-agents.json) and loads the entrypoint in [.github/agents/Concierge.md](../.github/agents/Concierge.md).

Concierge occasionally emits a ceremonial callout (p = 1/6) before the standard response when the user sends a short advance/continue confirmation; see the "Ceremonial response prefix" section in [.copilot/prompts/concierge.prompt.md](../.copilot/prompts/concierge.prompt.md) for the gate and phrase pools.

## Agents

- Concierge — router; classifies intent and emits handoff requests. Entrypoint: [.github/agents/Concierge.md](../.github/agents/Concierge.md); Prompt: [.copilot/prompts/concierge.prompt.md](../.copilot/prompts/concierge.prompt.md)

## Specialist Modules (selected by Concierge)

Full triggers and output types live in [aix/.copilot/prompts/\_module-index.md](../.copilot/prompts/_module-index.md).

- Analyst — analysis briefs, tradeoffs, requirements, acceptance criteria. Prompt: [.copilot/prompts/analyst.prompt.md](../.copilot/prompts/analyst.prompt.md)
- Architect — repo/workspace structure, agent/module strategy, standards. Prompt: [.copilot/prompts/architect.prompt.md](../.copilot/prompts/architect.prompt.md)
- Content Strategist — copywriting, messaging, voice/tone, microcopy. Prompt: [.copilot/prompts/content-strategist.prompt.md](../.copilot/prompts/content-strategist.prompt.md); Doc: [content-strategist.md](content-strategist.md)
- Editor — rewrite/refine existing prose without changing intent. Prompt: [.copilot/prompts/editor.prompt.md](../.copilot/prompts/editor.prompt.md)
- Housekeeper — workspace hygiene, ignores, naming, drift; logs AIX snapshots. Prompt: [.copilot/prompts/housekeeper.prompt.md](../.copilot/prompts/housekeeper.prompt.md); Workflow notes: [agent-roles-and-workflows.md](agent-roles-and-workflows.md)
- Implementer — implement an approved change end-to-end (edit, verify, report). Prompt: [.copilot/prompts/implementer.prompt.md](../.copilot/prompts/implementer.prompt.md)
- Librarian — documentation curation, READMEs, cross-linking, discoverability. Prompt: [.copilot/prompts/librarian.prompt.md](../.copilot/prompts/librarian.prompt.md)
- Mechanic — diagnose build/test/CI/tooling failures with minimal fixes. Prompt: [.copilot/prompts/mechanic.prompt.md](../.copilot/prompts/mechanic.prompt.md)
- Migrator — scaffold migration/upgrades; audits differences, applies safe updates, writes changelogs. Prompt: [.copilot/prompts/migrator.updater.prompt.md](../.copilot/prompts/migrator.updater.prompt.md); Guide: [migration.md](migration.md)
- Navigator — file/entrypoint discovery; minimal context packs; flags drift. Prompt: [.copilot/prompts/navigator.prompt.md](../.copilot/prompts/navigator.prompt.md)
- Planner — convert a request into a sequenced execution plan with checkpoints. Prompt: [.copilot/prompts/planner.prompt.md](../.copilot/prompts/planner.prompt.md)
- Reviewer — review a plan/spec/diff/text for correctness, risk, completeness, AIX impact. Prompt: [.copilot/prompts/reviewer.prompt.md](../.copilot/prompts/reviewer.prompt.md)
- Taskmaster — frame the active task, embed TODOs in files, guard against drift. Prompt: [.copilot/prompts/taskmaster.prompt.md](../.copilot/prompts/taskmaster.prompt.md); Conventions: [task-management.md](task-management.md)

## Project Domain Modules (selected by Concierge when in-scope)

- Portfolio Frontend Domain — frontend implementation guardrails (11ty/Nunjucks/Tailwind v4/GSAP/Sanity). Prompt module: [frontend/.copilot/prompts/domain.prompt.md](../../frontend/.copilot/prompts/domain.prompt.md)
- Portfolio Frontend — Choreography Planning — plan-only module for motion timelines/triggers/a11y in `frontend/`. Prompt module: [frontend/.copilot/prompts/choreography-planning.prompt.md](../../frontend/.copilot/prompts/choreography-planning.prompt.md)
- Portfolio Frontend — Choreography Implementation — implement approved choreography plans in `frontend/`. Prompt module: [frontend/.copilot/prompts/choreography-implementation.prompt.md](../../frontend/.copilot/prompts/choreography-implementation.prompt.md)

Note: choreography prompt modules live under `frontend/.copilot/prompts/`.

Note: some projects may include their own domain-specific agents (e.g., choreography or framework-specific helpers). Prefer the project context packs under `context/projects/`.

## When to Use Which

Start with Concierge; it will route. Pick by the deliverable you want:

- Hygiene scan, pre-PR hygiene, gitignore/excludes alignment → Housekeeper
- Authoritative context before coding/reviewing; locate the right file → Navigator
- Fix/update docs, repair links, align commands to current scripts → Librarian
- AIX measurement after refreshes or before releases → Analyst
- Structure/route/schema decisions with options and tradeoffs → Architect
- Unblock failing builds/CI/runtime with minimal changes → Mechanic
- Rewrite existing prose for clarity (no strategy change) → Editor
- Draft new copy with voice/tone strategy (hero, services, CTAs) → Content Strategist
- Audit/upgrade a project to a newer scaffold version → Migrator
- Implement an approved change with edits + checks + report → Implementer
- Sequence a multi-step rollout with verification checkpoints → Planner
- Review a proposed plan/spec/diff for risk and completeness → Reviewer
- Frame the active task and keep file-embedded TODOs honest → Taskmaster

## Copy/Paste Prompts (project-specific)

- Concierge: "Classify and hand off: fix failing 11ty build referencing missing layout; include next steps."
- Concierge: "Route: plan GSAP animations for homepage hero; note perf/a11y constraints."
- Housekeeper: "Run a quick hygiene scan for root + frontend + backend; ensure excludes cover .obsidian/, node_modules/, frontend/\_site/, backend/.sanity/; list fixes with links."
- Navigator: "Assemble a minimal context pack for adding a new Eleventy collection; include routing/build outputs to avoid and any relevant decisions."
- Librarian: "Update docs/runbooks/refresh-ai-context.md after the latest build command changes; fix broken links you find."
- Analyst: "Run simple + complex probes (describe frontend build outputs; outline adding a Sanity content type), score FRA/CR/HF/TTUO/CUS per specs/performance/aix.md, and log in docs/logs."
- Architect: "Recommend folder/route structure for a new marketing page with Sanity-driven sections; give options/criteria."
- Mechanic: "Diagnose the 11ty build error about missing layout; propose minimal fix with file/line references."
- Editor: "Tighten the README intro to emphasize hygiene and agent workflow."
- Migrator: "Audit this project against the latest vitaixmen and summarize safe vs review-required updates."
- Migrator: "Apply safe scaffold updates only (VS Code settings + agent prompts) and write a changelog."

## Key Cadence

- After every context refresh: run drift sweep, regenerate curated context (if used), then log an AIX snapshot (FRA/CR/HF/TTUO/CUS) under [docs/logs](logs/README.md#L1-L21).
- Weekly or pre-PR: run Housekeeper’s quick scan; fix excludes and doc pointers.

## Starting Points

- Context truth: [context/README.context.md](../context/README.context.md)
- Curated map: [.copilot/context/workspace-map.md](../.copilot/context/workspace-map.md)
- Module index (canonical routing): [.copilot/prompts/\_module-index.md](../.copilot/prompts/_module-index.md)
- AIX spec: [specs/performance/aix.md](../specs/performance/aix.md)
- Refresh runbook: [runbooks/refresh-ai-context.md](runbooks/refresh-ai-context.md)
- Workspace migration guide: [migration.md](migration.md)
- Logs folder: [logs/README.md](logs/README.md)
