---
aix:
  id: aix.copilot.context.workspace-map
  role: Compact canonical-file manifest for agent orientation.
  status: stable
---

# Workspace Map

Multi-root workspace: `aix/` (this repo), `frontend/`, `backend/`, `content-model/` are siblings.

## Canonical files

```yaml
routing:
  concierge:   aix/.copilot/prompts/concierge.prompt.md
  module_index: aix/.copilot/prompts/_module-index.md

context:
  project:       aix/context/project.md
  current_goals: aix/context/current-goals.md
  constraints:   aix/context/constraints.md
  decisions:     aix/context/decisions.md

specs:           aix/specs/   # subdirs: ai/ ux/ features/ architecture/ cms/ data/ components/ routes-content/ performance/

docs:
  agents:        aix/docs/agents.md
  decisions:     aix/docs/decisions/
  runbooks:      aix/docs/runbooks/
  notes:         aix/docs/notes/

scripts:         aix/scripts/
copilot_config:  aix/.copilot/README.copilot.md
agent_entries:   aix/.github/agents/
```

## Authority rule
When in doubt: `context/` > `specs/` > `docs/`. Latest accepted ADR overrides all.
