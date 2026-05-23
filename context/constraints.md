# Constraints

This file records **workspace-level constraints** that should not be violated by humans or AI agents.

If a constraint is project-specific (e.g., only `/frontend`), link to that project’s canonical doc rather than duplicating details here.

## Context freshness constraints

- **Deterministic drift only**: context freshness enforcement must remain deterministic and local (filesystem/git signals), not semantic/LLM-based.
- **Sidecar is authoritative for freshness**: review freshness is tracked in `/aix/context/.freshness.json`; avoid workflows that require humans editing meta lines to stay unblocked.
- **Commit-time enforcement is expected**: the pre-commit gate may exit non-zero to block commits; VS Code may surface that as a modal when using the Source Control UI.
- **No inline timestamps**: do not rely on in-file "Last updated" stamps in context/specs; use git metadata plus the sidecar (e.g., `/aix/context/.freshness.json`, `/aix/context/drift-baseline.json`) for freshness evidence.

## Durable constraints (always)

- **Canonical truth lives in** `/aix/context` and `/aix/specs`.
  - Use `/aix/docs` for onboarding, runbooks, and narrative; avoid treating docs as the source of truth.
- **Scope discipline**: do not introduce new tools/patterns or refactor broadly without explicit request.
- **Clarity and consistency**: prefer explicit solutions that mirror existing workspace conventions.
- **Accessibility is non-negotiable**: semantic structure, keyboard support, and reduced-motion respect by default.
- **Performance is intentional**: avoid unnecessary JS/deps; measure or justify animation cost.
- **Noise control / indexing hygiene**: keep search + watcher excludes aligned with `.gitignore` and avoid indexing build outputs, caches, and vendor directories.
- **Secret handling**: never commit tokens; prefer `.env` / CI secrets for `FIGMA_TOKEN`, `SANITY_*`, and other provider credentials.
- **Commit message format**: all commit messages must be prefixed with a conventional commit tag — e.g. `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`, `perf:`.
- **README naming**: README files must be named `README.[folder-name].md` (e.g. `README.docs.md`, `README.context.md`). Never use plain `README.md`.
- **Frontmatter on every file**: every authored file must carry frontmatter. If the file type cannot hold frontmatter (`.js`, `.ts`, `.njk`, `.css`), create a co-located `.md` sidecar instead. Auto-generated files are exempt. See [`docs/runbooks/frontmatter-and-sidecars.md`](../docs/runbooks/frontmatter-and-sidecars.md) for the full schema and decision rules.
- **Template sidecars**: every `.njk` file gets a co-located `.md` sidecar (e.g. `bio.njk` → `bio.md`). Sidecars are consumed primarily through Obsidian; match the format of existing sidecars in `frontend/views/`.

## Decision authority

- Accepted ADRs in `/aix/docs/decisions` are authoritative for architectural/process choices.
- If a request conflicts with an accepted ADR, call it out as a drift risk before proceeding.

## Phase guardrails (time-bound)

These are constraints for the current phase and may be promoted to specs or removed as goals change.

- Avoid global, auto-generated inventories (workspace-wide ToCs) unless explicitly requested.
- Avoid heavy automation for logging/indexing until there’s evidence it saves time.
- Avoid broad “cleanup” refactors inside mounted projects unless explicitly approved.

Source of truth for phase guardrails: `/aix/context/current-goals.md`.

## Mounted project constraints

Mounted repos may have additional hard constraints (e.g., generated files, build order, naming).

- `/frontend`: see `/frontend/.github/copilot-instructions.md` for do-not-edit and build-order constraints.
