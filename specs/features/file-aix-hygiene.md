# Feature Spec

- **Title:** File-Level AIX Hygiene (Drift-Neutral Additions)
- **Owner(s):** vitaixmen maintainers (Russell / @datainkio)
- **Status:** draft
- **Last reviewed:** 2026-01-19
- **Scope:** Any new or updated files intended to be part of the curated AIX surface (primarily Markdown docs/specs/runbooks/context).
- **Links:** context `/context/project.md`, goals `/context/current-goals.md`, agent map `/docs/agents.md`, workspace map `.copilot/context/workspace-map.md`

## Goals & Non-Goals

### Goals
- Ensure any new or updated file is **drift-neutral**: discoverable, indexed, and grounded for agents.
- Provide a **repeatable checklist** so contributors dont guess how to wire files into AIX surfaces.
- Keep **agent grounding stable** by updating canonical maps (indexes, context hooks, agent maps).
- Minimize **false drift** from unlinked docs while keeping the doc surface bounded.

### Non-Goals
- Does not define content standards beyond AIX discoverability (style/tone live elsewhere).
- Does not automate linking; it specifies the manual/PR checklist.
- Does not cover non-doc assets (images/binaries) except when they require doc pointers.

## User Stories & Journeys

- **As a contributor**, I want to add a new doc/spec without increasing drift so CI and agents stay green.
- **As a coding agent**, I want new docs to appear in canonical indexes so I can ground recommendations correctly.
- **As a maintainer**, I want a short, enforced checklist so linking hygiene is consistent across PRs.

## Functional Requirements

- FR1: **Canonical index**  every new doc/spec must be linked from its nearest index (e.g., `specs/README.md`, `specs/features/README.md`, or sibling index where applicable).
- FR2: **Context hook**  when the file affects project-wide understanding, add a pointer under the relevant section in `context/project.md` (e.g., Docs/Publishing).
- FR3: **Goals touchpoint**  if the work is active/near-term, add a one-liner in `context/current-goals.md` referencing the file/spec.
- FR4: **Agent map**  add a line in `docs/agents.md` (or the relevant agent map) indicating where the spec/doc lives for grounding.
- FR5: **Workspace map**  if the file materially changes the curated map, update `.copilot/context/workspace-map.md` (or confirm its already covered).
- FR6: **Drift check**  run `node scripts/drift-file-report.mjs --file <path>` (or broader drift watch) to verify the addition is drift-neutral; fix links if flagged.
- FR7: **Scope control**  avoid adding non-doc/non-context files to published or indexed surfaces unless required; respect existing ignore/exclude rules.
- FR8: **Link health**  use repo-root-relative links that work in both GitHub and rendered contexts (MkDocs/Pages, if applicable).

## Acceptance Criteria

- AC1: The new/updated file is referenced from at least one canonical index appropriate to its folder.
- AC2: Relevant context hooks are present in `context/project.md` (if the file affects project-wide context).
- AC3: If active/near-term, the file is mentioned in `context/current-goals.md` with a short pointer.
- AC4: Agent-facing map (`docs/agents.md`) notes where to find the file/spec.
- AC5: Drift check reports no new drift contribution for the file after links are added.

## Risks & Mitigations

- **R1: Link omissions**  mitigation: enforce PR checklist + drift check before merge.
- **R2: Over-indexing noise**  mitigation: only add files that belong in curated surfaces; keep scope control explicit.
- **R3: Divergent link patterns**  mitigation: prefer root-relative links; document patterns in contributor guide if needed.

## Rollout Plan

1) Adopt this checklist in PR review (manual initially).
2) For new docs/specs, apply FR1FR4 (and FR5 if map changes) before merge.
3) Run drift check (FR6) and fix any flagged missing links.
4) Optionally add a brief entry to `docs/changes/` when notable specs/docs are added.

## Open Questions

- Should we add a lightweight PR template checklist item for AIX doc linking?
- Should drift check become a required pre-merge task for doc/spec changes?
- Do we want an automated linter to validate required links (indexes/context/agent map)?
