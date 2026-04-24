# Feature Spec

- **Title:** TODO Format for GitHub Issue Quality and Obsidian/VS Code Discoverability
- **Owner(s):** AIX maintainers
- **Status:** draft
- **Last reviewed:** 2026-04-24
- **Scope:** Workspace TODO documents (primary: root TODO.md; optional project-local TODO files) and TODO extraction workflows for issue creation
- **Links:** context `/aix/context/current-goals.md`, backlog `/TODO.md`, related spec `/aix/specs/features/concierge-mounted-project-aix.md`

## Goals & Non-Goals

### Goals

- Define a consistent TODO item structure that improves issue quality when items are copied or synced into GitHub.
- Improve discoverability and filtering in Obsidian and VS Code search.
- Keep the format lightweight enough for manual editing and AI-assisted updates.
- Preserve compatibility with Markdown checklists and existing section-based backlog flows.

### Non-Goals

- Introducing a required external task management tool.
- Enforcing automated sync in v1.
- Replacing project-specific planning artifacts beyond TODO lists.

## User Stories & Journeys

- As a maintainer, I can scan TODO items quickly by section and metadata.
- As a maintainer, I can convert a TODO item into a GitHub issue with enough context and acceptance detail.
- As an AI agent, I can update TODO status and metadata without corrupting list structure.
- As a user of Obsidian/VS Code, I can search by tags such as owner, effort, type, and status with predictable patterns.

## Functional Requirements

- **FR1: Canonical checklist line structure**
  - Each TODO item uses Markdown checklist format:
    - `- [ ] TYPE: Summary sentence. [Owner: X | Effort: S/M/L]`
    - `- [x] TYPE: Summary sentence. [Owner: X | Effort: S/M/L]`
  - `TYPE` is uppercase and short (for example `FEAT`, `BUG`, `DOC`, `SPEC`, `TODO`).

- **FR2: Mandatory metadata fields (v1)**
  - `Owner` required.
  - `Effort` required with allowed values `S`, `M`, `L`.
  - Summary text must be action-oriented and specific enough for issue title reuse.

- **FR3: Optional metadata extensions (v1 compatible)**
  - Optional keys may be appended in same bracket block, for example:
    - `Priority: P0/P1/P2`
    - `Area: frontend/backend/aix`
    - `Issue: #123` or URL
  - Order for readability: `Owner`, `Effort`, then optional keys.

- **FR4: Section semantics**
  - Lists are grouped under stable headings:
    - `Now`
    - `Next`
    - `Later / Parked`
    - `Done`
  - Moving an item between sections is valid workflow and does not change item identity.

- **FR5: Discoverability conventions**
  - Keep `TYPE:` token and bracket metadata on the same line as the checkbox for searchability.
  - Avoid multi-line metadata blocks for v1.
  - Use consistent key casing (`Owner`, `Effort`, `Priority`, `Area`, `Issue`).

- **FR6: GitHub issue quality mapping**
  - Each item should be directly mappable to an issue draft with:
    - title from `TYPE + summary`
    - labels from `TYPE`, `Area`, `Priority` (when present)
    - assignee hint from `Owner`
    - effort hint from `Effort`
  - For larger items, add one follow-up note line immediately below the checklist item with acceptance hints.

- **FR7: Agent edit safety rules**
  - Agents should preserve checklist syntax and metadata delimiters.
  - Agents should not reorder unrelated sections or rewrite unchanged items while updating a specific task.

## Acceptance Criteria

- **AC1:** New TODO items in root TODO.md follow `TYPE + summary + [Owner | Effort]` format.
- **AC2:** Searching `Owner:` or `Effort:` in VS Code returns all formatted TODO items.
- **AC3:** Searching `TYPE:` tokens (for example `SPEC:`) in Obsidian returns predictable task subsets.
- **AC4:** At least 90% of new TODO items can be copied into GitHub issues without requiring title rewrite.
- **AC5:** Agent updates to TODO status preserve item text and metadata format unless the task explicitly asks for rewrite.

## Dependencies & Risks

- Dependency: Maintainers and agents consistently follow formatting rules.
- Risk: Overly strict formatting can reduce writing speed; mitigation is to keep required fields minimal in v1.
- Risk: Legacy items may remain mixed-format; mitigation is gradual normalization during routine edits.

## Rollout & Analytics

- Introduce format in root TODO.md first.
- Normalize existing items incrementally when touched.
- Optional monthly review metrics:
  - percentage of TODO items with complete metadata
  - percentage of items with direct issue-ready titles
  - search hit consistency by `Owner`, `Effort`, and `TYPE`

## Decisions

- Keep metadata inline (single-line) for maximum editor/search compatibility.
- Require `Owner` and `Effort` only in v1; other fields optional.
- Use section-based prioritization rather than numeric IDs in v1.

## Open Questions

- Should `Priority` become mandatory in v2?
- Should we add an `Issue` field to all items once issue-sync workflow is formalized?
- Should project-local TODO files inherit this format verbatim or allow scoped extensions?
