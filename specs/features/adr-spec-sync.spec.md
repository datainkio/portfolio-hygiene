# ADR–Spec Link Synchronization

- **Status:** draft
- **Owner:** Russell
- **Last reviewed:** 2026-01-19
- **Related:** docs/decisions/*, specs/ai/*, scripts/adr-spec-sync.mjs, scripts/update-context-auto.mjs

## Goal
Keep ADRs and specs aligned by automatically fixing ADR links to specs when filenames change (e.g., `.md` → `.spec.md`), and surface any unresolved references.

## Scope
- Paths under `docs/decisions/` (ADR markdown files)
- Specs under `specs/` (including `specs/ai/`)
- Link targets using relative paths in ADRs

## Behavior
1. Scan all ADR markdown files.
2. Detect links that point to specs and end with `.md`.
3. If the target file is missing but a sibling with `.spec.md` exists, rewrite the link to the `.spec.md` file.
4. Report unresolved links (no matching target) with the ADR filename and the missing path.
5. Exit codes:
   - `0` when all links resolve after any rewrites.
   - `1` when unresolved links remain (for gating/hygiene).

## Non-goals
- Changing ADR statuses or content.
- Editing spec files.
- Handling external URLs or non-spec links.

## Acceptance Criteria
- Running the sync on a workspace where specs were renamed from `.md` to `.spec.md` rewrites the ADR links without manual edits.
- If no matching `.spec.md` exists, the script exits non-zero and lists the missing targets.
- No modifications occur outside `docs/decisions/`.

## Follow-ups
- Extend to sync ADR status with spec status once status metadata is standardized.
- Add CI hook to run the sync before Pre-PR if desired.
