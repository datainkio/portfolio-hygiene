---
aix:
  id: aix.docs.onboarding.claude-code
  role: Onboarding guide for Claude Code agents entering this workspace cold.
  status: draft
  surface: internal
  owner: AIX
  tags:
    -  #onboarding
    -  #claude-code
    -  #agent
  type: guide
  scope: aix
  audience: agents
  perf:
    readPriority: high
    cacheSafe: true
    critical: true
---

# Claude Code Onboarding

This document is written for Claude Code (Anthropic's CLI agent) entering this workspace in a new conversation. It captures what took a full cold-start session to learn. Read it before reading anything else.

---

## What This Workspace Is

This is a **web portfolio project** for a practitioner (Russell Lebo, russell@dataink.io). It is organized as four discrete but complementary folders, each with a distinct role and authority boundary:

| Folder           | Role                                                                                                     | Stack                                           |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `aix/`           | AI agent experience hygiene — the workspace scaffold that makes the other three folders work well for AI | Vitaixmin (custom scaffold)                     |
| `backend/`       | CMS — content modeling and Sanity Studio                                                                 | Sanity Studio + TypeScript                      |
| `frontend/`      | Presentation layer — static site                                                                         | Eleventy (11ty) + Nunjucks + Tailwind v4 + GSAP |
| `content-model/` | Cross-cutting content contract authority — defines data structure for both `backend/` and `frontend/`    | Markdown specs (documents + patterns)           |

Russ spends roughly 40% of his time working in `frontend`, 30% in `backend/`, 20% in `aix/`, and 10% in `content-model`. His workspace is design to give him visibility across all four folders.

---

## Orientation Protocol (Read This First)

When starting a new conversation, orient in this order:

1. **`aix/context/current-goals.md`** — what is actively being worked on right now
2. **`aix/context/constraints.md`** — non-negotiables you must never violate
3. **`aix/context/decisions.md`** — accepted ADRs; flag conflicts before proceeding
4. **Project-specific context** for the repo you're about to touch:
   - Backend: `aix/context/projects/portfolio-backend.md`
   - Frontend: `aix/context/projects/portfolio-frontend.md`

Do not infer intent from code until you have read the context files.

---

## Authority Model

### Where truth lives

```
aix/context/   → canonical truth: "why this exists, how to think here"
aix/specs/     → prescriptive contracts: "what must be true"
aix/docs/      → explanatory/narrative: "how things work, why decisions were made"
content-model/ → cross-cutting content structure: "what data looks like and how pages compose it"
```

**Decision precedence:**

1. Latest accepted ADR (in `aix/docs/decisions/`)
2. `aix/specs/` contracts
3. `aix/context/current-goals.md` (time-bound — not architecture authority)

### Per-repo authority boundaries

- `aix/` owns: routing policy, AIX measurement, cross-workspace hygiene
- `backend/` owns: Sanity schema/runtime, backend workflow conventions
- `frontend/` owns: 11ty/Nunjucks/Tailwind/GSAP conventions, project-local AIX guardrails
- `content-model/` owns: field-level content contracts and page composition patterns that both backend schema and frontend templates must respect

When in conflict: prefer file-scoped source for implementation truth, defer to `aix/` for routing and output-shape policy.

---

## The Content-Model Folder

`content-model/` is a new fourth authority layer alongside the three repos. It is intentionally separate from both `backend/` and `frontend/` because content structure decisions need to be made before (and independent of) either Sanity schema choices or template implementation.

### Structure

```
content-model/
  documents/        → long-form, addressable content types
    README.documents.md
    work/
      project.md    → content contract for the portfolio project document
  patterns/         → page-level composition patterns
    project-page.md → how the project document composes into a page
```

### Authority flow — two phases

- **Bootstrap phase (current):** The existing Sanity schemas are the source of truth. Read them to derive and populate `content-model/` contracts. The content-model is being built to reflect and formalize what the schema already encodes.
- **Steady-state (after bootstrap):** `content-model/` becomes the authority. The backend schema must match the contract; frontend adapts to what the content-model specifies.

### How to use it

- **Before touching `backend/schemaTypes/`**: check `content-model/documents/` for the content contract. During the bootstrap phase, also read the schema to verify the contract accurately reflects it.
- **Before touching `frontend/` templates**: check `content-model/patterns/` for the composition spec. The template should render the pattern, not improvise it.
- **When content structure questions arise**: the answer belongs in `content-model/`, not scattered across backend schema comments or frontend specs.

### Current state (as of 2026-05-22)

A skeleton, scoped to the project page view currently being built. Intended to eventually cover all content types.

- `documents/work/project.md` — content contract for the `project` document type; bootstrapped from the Sanity schema
- `patterns/project-page.md` — page composition pattern with 8 ordered regions; substantive but still has open questions (PDF pipeline, SEO surface, navigation affordances)

Both files link bidirectionally to the Sanity schema (`backend/schemaTypes/documents/content/project.ts`) and the frontend view spec (`frontend/specs/views/project-page.views-spec.md`).

---

## The Agent System

Both GitHub Copilot and Claude Code are first-class AI surfaces in this workspace. Each has a platform-native agent layer backed by the same shared authority model.

**GitHub Copilot** routes through the Concierge agent (`.github/agents/Concierge.md`) and a set of prompt modules in `.copilot/prompts/`. Users interact via `@Concierge` in VS Code Chat.

**Claude Code** uses a parallel set of purpose-built sub-agents in `.claude/agents/`. Each agent maps to the same module roles (analyst, implementer, navigator, etc.) with descriptions tuned for Claude's routing logic. `CLAUDE.md` at the aix root is the primary entrypoint.

**Shared by both surfaces:**
- The guiding principles (clarity, consistency, accessibility, performance, scope discipline)
- The context hierarchy and authority model (`context/` → `specs/` → `docs/`)
- The behavioral constraints (no broad refactors, no new patterns without instruction, flag ADR conflicts)
- The content-model as an authority layer
- The handoff note convention (`aix/docs/notes/handoff-<slug>.md`)

**Platform-specific (do not cross-apply):**
- `.copilot/prompts/` — Copilot Chat prompt modules; not Claude's configuration
- `.claude/agents/` — Claude Code sub-agents; not Copilot's configuration
- Concierge ceremonial content — Copilot-specific interaction pattern

When uncertain about intent, follow the same decision protocol regardless of platform: check `context/` → `specs/` → `docs/` → mirror existing patterns → ask only if ambiguity affects correctness.

**Getting started (Claude Code):** See `aix/CLAUDE.md` for the workspace orientation protocol and agent index.

---

## Active Work (as of 2026-05-22)

**Now:** Building the project page view.

- Spec: `frontend/specs/views/project-page.views-spec.md` (may not exist yet)
- Content contract: `content-model/documents/work/project.md`
- Page pattern: `content-model/patterns/project-page.md`
- Sanity schema: `backend/schemaTypes/documents/content/project.ts`
- Tracking issue: https://github.com/datainkio/portfolio-governance/issues/44

**Recently stabilized:** Landing page choreography (video → hero → bio → awards). Do not touch choreography contracts without reading `aix/context/projects/portfolio-frontend.md` first.

**Not now:** Global automation, broad refactors, heavy cleanup inside mounted projects.

---

## Behavioral Constraints

These are non-negotiable:

- **Read context before inferring.** The context files exist to prevent "technically correct but wrong" suggestions.
- **Keep scope tight.** Do not refactor beyond the request. Do not introduce new tools or patterns without explicit instruction.
- **Flag ADR conflicts.** If a request contradicts an accepted ADR, call it out as a drift risk before proceeding.
- **Backend paths that are never hand-edited:** `backend/.sanity/`, `backend/dist/`, `backend/cache-export/`, `backend/node_modules/`
- **Frontend paths never inferred from:** `frontend/_site/` (generated build output)
- **No inline timestamps** in context/specs files — use git signals and `aix/context/.freshness.json`
- **Coordinate schema changes** with frontend consumers before declaring completion
- **Secrets:** never commit tokens; use `.env` / CI secrets

---

## Getting Unstuck

| Situation                          | Where to look                                                                          |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| Unclear what to work on            | `aix/context/current-goals.md`                                                         |
| Unclear what's allowed             | `aix/context/constraints.md`                                                           |
| Contradicting an accepted decision | `aix/context/decisions.md` + full ADR in `aix/docs/decisions/`                         |
| Backend schema question            | `backend/schemaTypes/SCHEMA_ARCHITECTURE.md`, `backend/docs/SCHEMA_GUIDE.md`           |
| Frontend implementation question   | `aix/context/projects/portfolio-frontend.md`, `frontend/.github/copilot-instructions.md` |
| Content structure question         | `content-model/documents/` or `content-model/patterns/`                                |
| Where a file belongs               | Mirror what's already there; consult `aix/context/project.md` folder semantics section |

---

## What Good Looks Like

From the AIX system's own success criteria:

- **Lower TTUO**: it is obvious where to put and find outputs
- **Lower CR**: fewer ambiguous decisions and fewer competing sources of truth
- **Higher CUS**: outputs consistently cite the relevant constraints, runbooks, and artifacts
- **Less drift**: navigation pointers stay stable; detailed inventories live near what they index

For Claude Code specifically: a good response cites the relevant context file, stays within the scope of the request, and leaves the workspace in a state where the next agent (or human) can orient without re-deriving everything.
