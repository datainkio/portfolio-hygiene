# Project Context: Portfolio Backend (Sanity Studio + Schema Runtime)

## Owner

- Backend/CMS maintainers (Russell)

## Scope

This context pack helps Concierge and downstream modules operate safely in `backend/`.

It is intentionally concise and focuses on high-signal constraints, authority boundaries, and canonical sources.

## What this project is

- Sanity Studio workspace and schema runtime for portfolio content modeling
- Schema source for documents, objects, and component primitives under `backend/schemaTypes/`
- Backend scripts for migration/import workflows and studio operations

## Hard constraints

- Treat `backend/schemaTypes/` as canonical for content structure contracts.
- Do not edit generated or derived paths directly:
  - `backend/.sanity/`
  - `backend/dist/`
  - `backend/cache-export/`
  - `backend/node_modules/`
- Use npm scripts from `/backend/package.json` for studio/build/migration tasks instead of ad-hoc commands.
- Coordinate schema-affecting changes with frontend content consumers (queries/templates) before declaring completion.
- Keep backend docs/spec references aligned with current file layout when changing behavior or workflow.

## Canonical links

- Backend package/scripts: [backend/package.json](../../../backend/package.json)
- Studio config: [backend/sanity.config.ts](../../../backend/sanity.config.ts)
- Studio structure: [backend/structure.ts](../../../backend/structure.ts)
- Schema barrel: [backend/schemaTypes/index.ts](../../../backend/schemaTypes/index.ts)
- Schema architecture notes: [backend/schemaTypes/SCHEMA_ARCHITECTURE.md](../../../backend/schemaTypes/SCHEMA_ARCHITECTURE.md)
- Backend docs hub: [backend/docs/index.md](../../../backend/docs/index.md)
- Backend schema guide: [backend/docs/SCHEMA_GUIDE.md](../../../backend/docs/SCHEMA_GUIDE.md)
- Backend decisions: [backend/docs/decisions/](../../../backend/docs/decisions/)
- Migration notes (legacy/migration workflows): [backend/MIGRATION.md](../../../backend/MIGRATION.md)

## Multi-root authority boundary (platform vs project)

- `aix/` is authoritative for routing policy, AIX measurement, and workspace-level hygiene.
- `backend/` is authoritative for Sanity schema/runtime implementation and backend workflow conventions.

If there is a conflict:

1. Prefer backend source files for backend implementation truth.
2. Prefer `aix/` for routing/output-shape policy and cross-workspace guardrails.

## Common pitfalls to avoid

- Do not infer backend behavior from generated artifacts in `.sanity/` or `dist/`.
- Do not treat migration docs as universal runtime truth for day-to-day schema work.
- Do not change schema contracts without checking downstream frontend query impact.
