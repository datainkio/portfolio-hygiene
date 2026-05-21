---
aix:
  id: aix.docs.doc-debt
  role: Track high-priority documentation cleanup items.
  status: draft
  surface: internal
  owner: AIX
  type: guide
  scope: aix
  audience: maintainers
---

# AIX Documentation Debt

## Open

- Audit `frontend/.github/copilot-instructions.md` against current implementation (sections registry, scripts, Sanity flow). Drift suspected; not addressed in this pass.
- Audit `backend/` documentation (README.backend.md, IMPLEMENTATION.md, MIGRATION.md, SCHEMA_GUIDE.md) against current schemaTypes/scripts. Not addressed in this pass.

## Resolved

- Concierge agent entrypoint and module rubric updated to reflect all 14 active modules (was 7).
- `docs/agents.md`, `docs/concierge-prompt-catalog.md`, `README.aix.md` aligned with the canonical [.copilot/prompts/\_module-index.md](../.copilot/prompts/_module-index.md).
- `docs/_doc-map.md` repaired (broken absolute-style root path).
- Cross-repo `README.md` references corrected to the project's `README.<slug>.md` convention across `README.aix.md`, `docs/README.docs.md`, `docs/agents.md`, `docs/notes/README.md`, `context/README.context.md`, `specs/README.specs.md`, `.copilot/README.copilot.md`, and `.copilot/context/workspace-map.md`.
- Local link check (`scripts/markdown-link-check-local.mjs --root . --max 100`) now passes with zero broken links.
