# Feature Spec: Concierge Sanity Module Boundary

- **Title:** Concierge Sanity Module Boundary (Backend Studio + Schema Operations)
- **Owner(s):** AIX + Backend/CMS maintainers
- **Status:** draft
- **Last reviewed:** 2026-04-24
- **Scope:** Requests targeting `backend/` Sanity Studio runtime, schema modeling, and backend CMS operations
- **Links:** context `/aix/context/projects/portfolio-backend.md`, router contract `/aix/.copilot/prompts/concierge.prompt.md`, module index `/aix/.copilot/prompts/_module-index.md`, backend quickstart `/backend/QUICKSTART.md`, backend schema docs `/backend/docs/SCHEMA_GUIDE.md`

## Goals & Non-Goals

### Goals

- Define clear Concierge boundaries for Sanity/backend requests.
- Prevent frontend 11ty modules from being selected for backend schema/studio tasks.
- Keep backend routing predictable while backend-specific prompt modules are not yet mounted.

### Non-Goals

- Designing frontend template/choreography behavior.
- Replacing Concierge routing contract.
- Re-activating legacy migration workflows.

## User Stories & Journeys

- As a user changing schema types, I want Concierge to keep work in `backend/schemaTypes/**` and related backend config/docs.
- As a user fixing Studio build/runtime issues, I want backend troubleshooting to route through build/tooling paths, not frontend prompt modules.
- As a user making cross-system changes (schema plus frontend rendering), I want boundaries explicit and sequencing clear.

## Functional Requirements

- **FR1: Sanity signal detection**
  - Detect backend scope from explicit path and stack cues, including: `backend/`, `sanity`, `schemaTypes`, `sanity.config.ts`, `structure.ts`, Studio/build/deploy commands.

- **FR2: Current routing profile (v1 without mounted backend prompt index)**
  - Schema/studio implementation changes: `implementer.prompt.md` with explicit backend scope.
  - Backend build/tooling failures: `mechanic.prompt.md` with explicit backend scope.
  - Backend docs/structure updates: `librarian.prompt.md` and/or `navigator.prompt.md` as needed.
  - Architecture decisions around schema boundaries: `architect.prompt.md`.

- **FR3: Boundary against frontend module routing**
  - Sanity-scoped requests must not default to mounted frontend prompt modules.
  - If request explicitly combines backend schema and frontend template concerns, use at most two tightly-coupled modules and state assumptions.

- **FR4: Path guardrails**
  - Prefer backend implementation surfaces (`/backend/schemaTypes/`, `/backend/sanity.config.ts`, `/backend/structure.ts`, backend docs) for Sanity tasks.
  - Avoid generated/derived paths (`/backend/.sanity/`, `/backend/dist/`, `/backend/cache-export/`, `/backend/node_modules/`).

- **FR5: Clarification policy**
  - If frontend/backend intent is ambiguous, ask one blocking question.
  - Otherwise proceed with explicit assumptions and keep edits scoped.

- **FR6: Migration boundary**
  - Treat migration as legacy unless user explicitly requests reactivation work.
  - Do not assume migration commands are valid current workflow.

## Acceptance Criteria

- **AC1:** Prompt “Add field to a Sanity document type” routes to backend-scoped implementation flow and edits backend schema files.
- **AC2:** Prompt “Fix Sanity Studio build/dev issue” routes to backend-scoped mechanic flow.
- **AC3:** Prompt “Update frontend template from schema change” either asks one disambiguation question or uses tightly-coupled module selection with explicit backend+frontend boundaries.
- **AC4:** Sanity-only prompts do not select mounted frontend prompt modules by default.

## Dependencies & Risks

- Dependency: backend context pack remains current and authoritative.
- Dependency: Concierge routing contract and module index remain synchronized.
- Risk: Without a dedicated mounted backend prompt index, generic modules may require stronger scope declarations to avoid drift.

## Rollout & Analytics

- Add this spec to AIX feature spec indexes.
- Validate with three prompts: schema edit, studio failure triage, mixed backend+frontend request.
- Track routing correctness and boundary violations in AIX logs.

## Decisions

- Concierge remains the only router.
- Until dedicated backend mounted prompts exist, Sanity work uses existing generic modules with explicit backend scope constraints.

## Open Questions

- Should `<backend/.copilot/prompts/index.md>` be introduced for first-class mounted backend routing parity with frontend?
