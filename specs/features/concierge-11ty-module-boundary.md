# Feature Spec: Concierge 11ty Module Boundary

- **Title:** Concierge 11ty Module Boundary (Frontend Templates + Build-Time Content)
- **Owner(s):** AIX + Frontend maintainers
- **Status:** draft
- **Last reviewed:** 2026-04-24
- **Scope:** Requests targeting `frontend/` template/content surfaces (11ty, Nunjucks, Eleventy config and build-time usage)
- **Links:** context `/aix/context/projects/portfolio-frontend.md`, router contract `/aix/.copilot/prompts/concierge.prompt.md`, frontend module index `../../../frontend/.copilot/prompts/index.md`, mounted-project routing spec `/aix/specs/features/concierge-mounted-project-aix.md`

## Goals & Non-Goals

### Goals

- Define deterministic Concierge boundaries for 11ty-focused requests.
- Ensure frontend template/content work is routed to mounted frontend prompt modules.
- Prevent accidental routing to backend/Sanity implementation surfaces for 11ty-only tasks.
- Keep module selection auditable and testable via clear signal rules.

### Non-Goals

- Defining backend schema architecture or Sanity Studio operations.
- Replacing Concierge as the only router.
- Broad frontend refactors beyond the user-requested 11ty scope.

## User Stories & Journeys

- As a user editing Nunjucks templates, I want Concierge to route directly to the correct frontend module with minimal clarification.
- As a user updating Eleventy collections/filters or page frontmatter behavior, I want routing to stay within frontend project boundaries unless I explicitly request backend schema work.
- As a user requesting both template updates and choreography changes, I want predictable module pairing without backend drift.

## Functional Requirements

- **FR1: 11ty signal detection**
  - Detect frontend/11ty scope from explicit paths and stack cues, including: `frontend/`, `njk/`, `ia/`, `eleventy`, `11ty`, `Nunjucks`, page/layout/macro/edit-template language.

- **FR2: Primary module selection (mounted frontend index)**
  - Template/layout/macros/semantic HTML: `display.prompt.md`.
  - Browser interaction glue tied to templates: `js.prompt.md`.
  - Choreography planning (no code): `choreography-planning.prompt.md`.
  - Choreography implementation (code): `choreography-implementation.prompt.md`.
  - Cross-cutting frontend work: `domain.prompt.md`.

- **FR3: Boundary against Sanity/backend routing**
  - 11ty-scoped requests must not default to backend/Sanity implementation work.
  - If request includes backend schema intent (`backend/`, `schemaTypes`, `sanity.config.ts`, Studio structure), follow Sanity boundary rules from `concierge-sanity-module-boundary.md`.

- **FR4: Clarification policy**
  - If frontend vs backend intent is genuinely ambiguous, ask one blocking question.
  - If not blocked, proceed with explicit assumptions and keep edits in the inferred frontend scope.

- **FR5: Path guardrails**
  - Prefer edits within frontend 11ty surfaces (`frontend/njk/`, `frontend/ia/`, `frontend/eleventy/`, related frontend docs/prompts) unless user explicitly broadens scope.
  - Avoid generated outputs (for example `frontend/_site/`).

- **FR6: Output contract**
  - Responses must follow Concierge output structure:
    1. Classification (intent + module(s))
    2. Deliverable
    3. Assumptions
    4. Next actions

## Acceptance Criteria

- **AC1:** Prompt “Update this Nunjucks macro in `frontend/njk/_includes/...`” selects a mounted frontend module (`display.prompt.md`) with no backend detour.
- **AC2:** Prompt “Add an 11ty collection/filter in frontend” selects frontend module(s) and keeps file edits in frontend paths.
- **AC3:** Prompt “Update page templates and hero choreography” uses at most two tightly-coupled frontend modules and does not invoke backend schema edits.
- **AC4:** Prompt mentioning backend schema terms alongside 11ty asks one disambiguation question or clearly declares assumptions before proceeding.

## Dependencies & Risks

- Dependency: `/frontend/.copilot/prompts/index.md` remains accurate and discoverable.
- Dependency: Concierge router contract remains aligned with mounted-project guidance.
- Risk: Drift between this boundary spec and mounted frontend prompt inventory.

## Rollout & Analytics

- Add this spec to AIX feature spec indexes.
- Validate with a small probe set (template edit, collection edit, mixed choreography request).
- Track routing misclassification rate and clarifying-question frequency in AIX logs.

## Decisions

- Concierge remains the sole router.
- 11ty work is frontend-module-first, backend-module-second only when explicit schema/studio intent is present.

## Open Questions

- Should backend-aware query contract prompts be modeled as a dedicated bridge module, or remain split across existing modules?
