---
aix:
  id: aix.docs.readme
  role: Human-facing documentation hub for the workspace.
  status: stable
  surface: internal
  owner: AIX
  tags:
    -  #docs
    -  #hub
    -  #navigation
  type: guide
  scope: aix
  audience: maintainers
  perf:
    readPriority: medium
    cacheSafe: true
    critical: false
---

# Documentation

This folder is the **human-facing docs hub** for the workspace.

## Audience convention

- `docs/` is written **for humans first** (onboarding, runbooks, navigation, and narrative documentation).
- AI should benefit from it, but canonical truth lives elsewhere.
- For source-of-truth constraints and durable contracts, prefer `context/` and `specs/`.

## Start here

- New to the repo: [onboarding/README.onboarding.md](onboarding/README.onboarding.md)
- Getting started: [getting-started.md](getting-started.md)

## Key areas

- Agent Index: [agents.md](agents.md) (canonical module list: [../.copilot/prompts/\_module-index.md](../.copilot/prompts/_module-index.md))
- Concierge prompt catalog: [concierge-prompt-catalog.md](concierge-prompt-catalog.md)
- AI audits: [ai/audits/README.audits.md](ai/audits/README.audits.md)
- Decisions (ADRs): [decisions/README.decisions.md](decisions/README.decisions.md)
- Runbooks (operational how-tos): [runbooks/README.runbooks.md](runbooks/README.runbooks.md)
- Changes (migration logs): [changes/README.changes.md](changes/README.changes.md)
- Maintenance: [maintenance/aix-calibration-plan.md](maintenance/aix-calibration-plan.md)
- Validation: [maintenance/aix-validation.md](maintenance/aix-validation.md)
- Notes (exploration / not authoritative): [notes/README.md](notes/README.md)
- Logs (historical records): [logs/README.md](logs/README.md)

## Runbook highlights

- [docs/runbooks/aix-audit-report.example.md](runbooks/aix-audit-report.example.md)
- [docs/runbooks/optimize-aix-for-frontend.md](runbooks/optimize-aix-for-frontend.md)
- [docs/runbooks/context-freshness.md](runbooks/context-freshness.md)
- [docs/runbooks/current-goals.md](runbooks/current-goals.md)

## Templates

- Audit report template: [docs/audit_report_template.md](audit_report_template.md)

## Notes

- Notes hub: [notes/README.md](notes/README.md)
- Scratchpad: [notes/scratch.md](notes/scratch.md)

## Backlog

- AIX TODOs: [TODO.md](../TODO.md)

## AI configuration

- Workspace Copilot instructions: [../../.github/copilot-instructions.md](../../.github/copilot-instructions.md)

## Authority note

Some documents in `docs/` are narrative or historical.
For canonical constraints/goals and durable specs, prefer `context/` and `specs/`.
