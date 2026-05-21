# Workspace Map

This file describes where everything lives in the workspace and what each folder contains.
Focus: keep AI agents oriented and fast.

This workspace includes multiple sibling repos: `aix/` (AIX scaffold), `frontend/`, and `backend/`. This map is rooted in `aix/`; sibling repos are siblings of the `aix/` workspace folder.

## Workspace Roots (repo-level)

- [aix/](../../) — AIX scaffold, docs, specs, and agent workflows.
- Sibling: `frontend/` (11ty + Nunjucks + Tailwind + GSAP) — added separately to the multi-root workspace.
- Sibling: `backend/` (Sanity Studio + tooling) — added separately to the multi-root workspace.

## Copilot Configuration

- Copilot/agent configuration hub: [.copilot/README.copilot.md](../README.copilot.md)
- Routing canon: [.copilot/ROUTING.md](../ROUTING.md)
- Module index (canonical routing surface): [.copilot/prompts/\_module-index.md](../prompts/_module-index.md)
- Prompt modules:
  - Concierge (router contract): [.copilot/prompts/concierge.prompt.md](../prompts/concierge.prompt.md)
  - Analyst: [.copilot/prompts/analyst.prompt.md](../prompts/analyst.prompt.md)
  - Architect: [.copilot/prompts/architect.prompt.md](../prompts/architect.prompt.md)
  - Content Strategist: [.copilot/prompts/content-strategist.prompt.md](../prompts/content-strategist.prompt.md)
  - Editor: [.copilot/prompts/editor.prompt.md](../prompts/editor.prompt.md)
  - Housekeeper: [.copilot/prompts/housekeeper.prompt.md](../prompts/housekeeper.prompt.md)
  - Implementer: [.copilot/prompts/implementer.prompt.md](../prompts/implementer.prompt.md)
  - Librarian: [.copilot/prompts/librarian.prompt.md](../prompts/librarian.prompt.md)
  - Mechanic: [.copilot/prompts/mechanic.prompt.md](../prompts/mechanic.prompt.md)
  - Migrator Updater: [.copilot/prompts/migrator.updater.prompt.md](../prompts/migrator.updater.prompt.md)
  - Navigator: [.copilot/prompts/navigator.prompt.md](../prompts/navigator.prompt.md)
  - Planner: [.copilot/prompts/planner.prompt.md](../prompts/planner.prompt.md)
  - Reviewer: [.copilot/prompts/reviewer.prompt.md](../prompts/reviewer.prompt.md)
  - Taskmaster: [.copilot/prompts/taskmaster.prompt.md](../prompts/taskmaster.prompt.md)

## Canonical Context (source of truth)

- [context/README.context.md](../../context/README.context.md) — what “context” means and why it’s authoritative.
- Key canonical files (all in [context/](../../context/)):
  - [context/project.md](../../context/project.md) — project intent / north star
  - [context/design-philosophy.md](../../context/design-philosophy.md) — guiding principles
  - [context/constraints.md](../../context/constraints.md) — non-negotiables
  - [context/decisions.md](../../context/decisions.md) — decisions / ADR-style notes
  - [context/example-context.md](../../context/example-context.md) — example pattern
  - [context/current-goals.md](../../context/current-goals.md) — single page of “what matters right now”.

## Curated Agent Context (orientation layer)

- [.copilot/context/README.context.md](README.context.md) — what this curated layer is.
- Curated files (keep short, point to canonical truth):
  - [.copilot/context/workspace-map.md](workspace-map.md) — this map
  - Additional curated context stubs are not present yet in this workspace snapshot.

## Specs (contracts)

- [specs/README.specs.md](../../specs/README.specs.md) — what “specs” are and how to use them.
- Specs are organized by topic folders under [specs/](../../specs/):
  - AI specs:
    - [specs/ai/context-drift-without-timestamps.spec.md](../../specs/ai/context-drift-without-timestamps.spec.md)
    - [specs/ai/documentation-steward.spec.md](../../specs/ai/documentation-steward.spec.md)
    - [specs/ai/ceremonial-response-spec.md](../../specs/ai/ceremonial-response-spec.md)
    - [specs/ai/domain-agent-probes.spec.md](../../specs/ai/domain-agent-probes.spec.md)
    - [specs/ai/domain-specialized-coding-agent.spec.md](../../specs/ai/domain-specialized-coding-agent.spec.md)
  - Animation (frontend-owned, sibling repo): see `frontend/specs/animation/` in the frontend workspace folder.
  - Architecture: [specs/architecture/](../../specs/architecture/)
    - [specs/architecture/README.architecture.md](../../specs/architecture/README.architecture.md)
    - [specs/architecture/template.md](../../specs/architecture/template.md)
  - Components: [specs/components/](../../specs/components/)
    - [specs/components/README.components.md](../../specs/components/README.components.md)
    - [specs/components/template.md](../../specs/components/template.md)
  - Routes/content: [specs/routes-content/](../../specs/routes-content/)
    - [specs/routes-content/README.routes-content.md](../../specs/routes-content/README.routes-content.md)
    - [specs/routes-content/template.md](../../specs/routes-content/template.md)
  - CMS: [specs/cms/](../../specs/cms/)
    - [specs/cms/README.cms.md](../../specs/cms/README.cms.md)
    - [specs/cms/template.md](../../specs/cms/template.md)
  - Data: [specs/data/](../../specs/data/)
    - [specs/data/README.data.md](../../specs/data/README.data.md)
    - [specs/data/template.md](../../specs/data/template.md)
  - UX (has real docs): [specs/ux/](../../specs/ux/)
    - [specs/ux/README.ux.md](../../specs/ux/README.ux.md)
    - [specs/ux/accessibility.md](../../specs/ux/accessibility.md)
    - [specs/ux/design-system.md](../../specs/ux/design-system.md)
    - [specs/ux/interactions.md](../../specs/ux/interactions.md)
    - [specs/ux/template.md](../../specs/ux/template.md)
  - Features:
    - [specs/features/README.features.md](../../specs/features/README.features.md)
    - [specs/features/adr-spec-sync.spec.md](../../specs/features/adr-spec-sync.spec.md)
    - [specs/features/concierge-mounted-project-aix.md](../../specs/features/concierge-mounted-project-aix.md)
    - [specs/features/concierge-project-aix.todo.md](../../specs/features/concierge-project-aix.todo.md)
    - [specs/features/js-frontmatter-schema.md](../../specs/features/js-frontmatter-schema.md)
    - [specs/features/template.md](../../specs/features/template.md)
  - Performance (AIX spec lives here): [specs/performance/aix.md](../../specs/performance/aix.md)
    - [specs/performance/README.aix.md](../../specs/performance/README.aix.md)
    - [specs/performance/template.md](../../specs/performance/template.md)

## Docs (narrative, non-canonical)

- [docs/README.docs.md](../../docs/README.docs.md) — human-facing narrative notes (not authoritative by default).
- Key doc entrypoints:
  - Agent index: [docs/agents.md](../../docs/agents.md)
  - AI audits: [docs/ai/audits/README.audits.md](../../docs/ai/audits/README.audits.md)
  - Changes: [docs/changes/README.changes.md](../../docs/changes/README.changes.md)
  - Runbooks: [docs/runbooks/](../../docs/runbooks/)
    - [docs/runbooks/aix-audit-report.example.md](../../docs/runbooks/aix-audit-report.example.md)
    - [docs/runbooks/optimize-aix-for-frontend.md](../../docs/runbooks/optimize-aix-for-frontend.md)
    - [docs/runbooks/context-freshness.md](../../docs/runbooks/context-freshness.md)
    - [docs/runbooks/current-goals.md](../../docs/runbooks/current-goals.md)
  - Logs (AIX/hygiene + project audits): [docs/logs/](../../docs/logs/)
    - Project log index: [docs/logs/projects/](../../docs/logs/projects/)
    - Project audit outputs live under `docs/logs/projects/<project-slug>/` (example: [docs/logs/projects/frontend/](../../docs/logs/projects/frontend/README.md))
  - Decisions (narrative ADRs): [docs/decisions/](../../docs/decisions/)
    - [docs/decisions/0003-context-freshness-gate.md](../../docs/decisions/0003-context-freshness-gate.md)
  - Maintenance: [docs/maintenance/aix-calibration-plan.md](../../docs/maintenance/aix-calibration-plan.md)
  - Maintenance validation: [docs/maintenance/aix-validation.md](../../docs/maintenance/aix-validation.md)
  - Notes hub: [docs/notes/README.md](../../docs/notes/README.md)
    - [docs/notes/scratch.md](../../docs/notes/scratch.md)

## Scripts

- [scripts/README.scripts.md](../../scripts/README.scripts.md) — lightweight workspace utilities (keep dependency-free when possible).

## Assets & Data

- [assets/](../../assets/) and [data/](../../data/) exist and are currently empty.
- Assets manifest: [assets/README.assets.md](../../assets/README.assets.md)
- Data manifest: [data/README.data.md](../../data/README.data.md)

## Project Context Packs

- Project-specific context lives under [context/projects/](../../context/projects/)
  - Index: [context/projects/README.projects.md](../../context/projects/README.projects.md)
- When you add files, include a small manifest (`README.md` or `manifest.json`) so agents can locate media/data fast.

## Agent Workflows (roles/playbooks)

- [docs/agent-roles-and-workflows.md](../../docs/agent-roles-and-workflows.md) — roles, workflows, and logging expectations.

## Copilot Agent Registration

- [copilot-agents.json](../../copilot-agents.json) — which agent(s) Copilot Chat can see.
- Entrypoints for registered agents live under [.github/agents/](../../.github/agents/).

## Agent Entrypoints (.github)

- [.github/README.md](../../.github/README.md) — agent discovery notes
- Concierge entrypoint: [.github/agents/Concierge.md](../../.github/agents/Concierge.md)
- Welcoming Party entrypoint: [.github/agents/WelcomingParty.md](../../.github/agents/WelcomingParty.md)

## Workspace Config

- VS Code settings/tasks live in [.vscode/](../../.vscode/) (includes agent-ops and cross-repo task shortcuts).
- Template notes: [aix/template_notes.md](../../template_notes.md)

## Agent Roles

Concierge routes to the active modules listed in [.copilot/prompts/\_module-index.md](../prompts/_module-index.md): analyst, architect, content-strategist, editor, housekeeper, implementer, librarian, mechanic, migrator.updater, navigator, planner, reviewer, taskmaster.

## Agent Notes / Next AIX actions

- Keep [context/current-goals.md](../../context/current-goals.md) current to anchor priorities.
- Fill spec templates starting with [specs/architecture/template.md](../../specs/architecture/template.md) and [specs/components/template.md](../../specs/components/template.md) to reduce ambiguity for generation.
- Add initial runbooks in `docs/runbooks/` for common workflows; link any scripts once added.
- Schedule AIX snapshots after each context refresh; store under `docs/logs/`.
