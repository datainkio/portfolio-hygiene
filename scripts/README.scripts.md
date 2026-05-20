# Workspace Scripts

This folder contains small utility scripts used to support development, automation,
and maintenance tasks across the workspace.

Scripts should be safe to run locally, documented inline, and avoid hard-coded paths
when possible. When a script is required for a workflow, it should be referenced from
a task, runbook, or agent workflow.

## Scripts

### agent-ops.mjs

Safe wrapper for common file ops inside mounted projects (open, move, delete, mkdir, touch). Used by VS Code tasks.

### context-drift-watch.mjs

Watches context/specs/docs drift versus the baseline and reports aggregate drift (CI-friendly monitor).

### mounted-project-aix-audit.mjs

Report-only, dependency-free discovery runner that writes timestamped audit artifacts into a mounted project.

- Usage: `node scripts/mounted-project-aix-audit.mjs --project /absolute/path/to/mounted/project --probeSubset MP`
- Output (default): `/project-root/docs/ai/audits/<timestamp>--aix-audit--MP.md` and `/project-root/docs/ai/audits/<timestamp>--aix-snapshot--MP.json`
- Notes:
  - The manifest is optional; if present, its `auditsDir` hint is used when possible.
  - This runner is discovery-only (no LLM scoring) and does not modify existing project files.

### context-refresh.mjs

Drift-guided context refresher that reports the top contributors to context/specs/docs drift using the shared drift scoring model (no timestamps).

- Usage: `node scripts/context-refresh.mjs [--warn-threshold N] [--fail-threshold N] [--baseline HASH] [--path GLOB] [--open] [--json]`
- Behavior: computes drift vs `context/drift-baseline.json` (or `origin/main`), marks recommended when aggregate ≥ warn threshold, and optionally opens the top drifted files in VS Code.
- Notes: does not use file timestamps or sidecar reviewedAt; recommendations are purely drift-based.

### current-goals-check.mjs

Checks `context/current-goals.md` freshness and signals updates when goals are stale.

### install-git-hooks.mjs

Installs the repo-managed git hooks (e.g., to refresh context sidecar on commit).

### markdown-link-check.mjs / markdown-link-check-local.mjs

Validates Markdown links.

- `markdown-link-check-local.mjs` is the preferred checker for docs/workspace hygiene tasks.
  - Existence-only checks for local links.
  - Better behavior for repo-root-style links (for example, `/docs/...`).
  - Used by Pre-PR and AIX docs link-check tasks.
- `markdown-link-check.mjs` is retained for compatibility and ad hoc scans.
  - Emits `Warnings` instead of crashing on unreadable paths/files.
  - Skips common build/cache directories and symlink entries by default.

### pre-pr-check.mjs

Aggregates CI-style checks: goals freshness, context drift, markdown links, plus syntax checks for helper scripts.

### update-context-freshness.mjs

Manages drift baselines: compute drift vs baseline or set a new baseline (`context/drift-baseline.json`) with optional note.
