---
title: "AIX Snapshot — 2026-06-06"
description: "Baseline AIX snapshot after the Claude-native optimization pass: Concierge abandoned, lean skills + guardrail hooks added, agent descriptions audited."
type: log
status: active
audience:
  - agents
tags:
  - aix
  - claude
  - performance
  - snapshot
---

# AIX Snapshot — 2026-06-06

## Summary

Baseline after the "optimize AIX for Claude" pass (see [cleanup,-revise,-and-optimize-aix-for-cl](../../../context/goals/AIX_tasks/cleanup,-revise,-and-optimize-aix-for-cl.md)). Concierge (the Copilot/ChatGPT router) was abandoned in favor of Claude-native primitives: native subagent routing, three lean report-only skills (`/aix-snapshot`, `/drift-check`, `/frontmatter-lint`), enforced `permissions.deny` + two warn hooks, and an audit of the 14 subagent descriptions. This is the first snapshot produced by the new `/aix-snapshot` skill, grounded in the token log.

## Drift Sweep (what was checked)

- `/drift-check` — staleness (90d, git commit dates) over `context/`, `aix/context/`, `aix/specs/`, `specs/`; broken relative Markdown links across the active Claude surface + files touched this session.
- `/frontmatter-lint` — frontmatter on tracked `.md`; co-located `.md` sidecars for `frontend/**` `.njk`/`.js`.

### Findings

- **Sidecars: clean.** 0 frontend `.njk`/`.js` missing a sidecar — the non-negotiable holds.
- **Frontmatter: 53 tracked `.md` missing it** — mostly `context/_scratchpad/*`, the legacy `concierge-*`/task filenames being deleted in the in-progress reorg, snapshot logs, and `README.datainkio.md`.
- **Staleness: none** (nothing older than 90d by commit date).
- **Broken links (all pre-existing, none introduced this session):**
  - Real: root [`CLAUDE.md`](../../../CLAUDE.md) session-start link `[…](MEMORY.md)` should target `context/memory/MEMORY.md`.
  - Many `context/handoffs/2026-06-*` links use a `dataink.io/…` or bare-filename form that doesn't resolve relative to the handoff.
  - Deprecated `.copilot/README.copilot.md → ../../README.md` (root has `README.datainkio.md`, no `README.md`).
  - Two false positives from literal doc examples (`](url)`, `](relative/path)`).

## Actions Taken (this session)

- Rewrote the task doc into a Claude-native plan; abandoned Concierge; marked 6 Concierge tasks superseded.
- Authored + registered `/aix-snapshot`, `/drift-check`, `/frontmatter-lint`.
- Added the read-cost ladder + task-classification to root `CLAUDE.md`.
- `settings.json`: 14 `permissions.deny` rules for do-not-touch paths; 2 non-blocking `PostToolUse` warn hooks (sidecar, commit-prefix); preserved the token-logging Stop hook.
- Audited 14 agent descriptions; fixed `navigator` (was loading deprecated `.copilot` map) and the `housekeeper`↔`librarian` boundary.
- Deprecated the `.copilot/` layer (banners; not yet deleted).

## Metrics Snapshot

Desk-check scoring of this session's AIX work (0–5).

| Dimension | Score | Justification |
|---|:---:|---|
| FRA (first-response accuracy) | 5 | Review correctly identified duplication, "Concierge already exists," and the two-agents-conflated issue on first pass. |
| CR (correctness) | 4 | Changes applied cleanly; one hook quoting bug, caught and fixed by the skill's pipe-test before it shipped. |
| HF (hallucination-free) | 5 | Verified file existence (e.g., disproved a linter false-positive on `constraints.md`); 0 broken links introduced. |
| TTUO (turns to useful output) | 4 | Large scope handled as a coherent review→decide→implement sequence; token log shows 92–99% cache hit. |
| CUS (context-use sensibility) | 4 | Cost-ordered reads + parallel tool calls; minor: a few full-file reads and two Read-before-Edit retries. |
| **Overall** | **4.4** | Band: **good (ship, track drift).** |

### Token telemetry (from [token-usage.csv](../../../context/token-usage.csv))

- Recent turns: **92–99% cache hit** (one 56% dip on a fresh-context turn), `total` 24k–86k tokens/turn, `effort=high`.
- High cache reuse indicates context is stable and not being re-read wastefully — consistent with the read-cost ladder.

## Recommendations / Follow-ups

1. Fix the root `CLAUDE.md` `MEMORY.md` link → `context/memory/MEMORY.md` (session-start critical).
2. Triage the 53 no-frontmatter `.md`: most clear themselves when the legacy task files are deleted in the reorg; add frontmatter to durable ones (`README.datainkio.md`, snapshot logs).
3. Normalize or archive the stale `context/handoffs/*` link style (`dataink.io/…` prefix doesn't resolve).
4. Delete `.copilot/` once nothing's lost; set the 6 superseded Concierge cards to a cancelled/archived lane.
5. Refine `/drift-check` to skip fenced-code/inline-code so literal `](url)`-style doc examples don't register as links.
