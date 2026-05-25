<!-- @format -->

# Handoff — Concierge `/compact` + handoff-note policy

- Updated: 2026-05-21
- Status: ready-to-implement (mirror complete)

## Goal

- Add explicit `/compact` preservation rules and a stable-decision-point handoff-note discipline to the Concierge agent contract, without touching implementation files.

## Files involved

- [aix/.github/agents/Concierge.md](../../.github/agents/Concierge.md) — edited; canonical entrypoint loaded by the chatmode
- [aix/.copilot/prompts/concierge.prompt.md](../../.copilot/prompts/concierge.prompt.md) — edited; compaction + handoff-note sections mirrored, downstream modules bound by them
- [aix/.copilot/prompts/\_module-index.md](../../.copilot/prompts/_module-index.md) — edited; added Cross-cutting rules section pointing at concierge.prompt.md
- [aix/docs/notes/README.md](dataink.io/aix/docs/notes/README.md) — referenced; defines notes promotion workflow

## Decisions made

- Edit only the agent entrypoint (`.github/agents/Concierge.md`); it is the loaded surface.
- `/compact` preserve list: current task goal, approved architectural decisions, real file paths already inspected, explicit constraints, unresolved TODOs, rejected approaches with reasons.
- `/compact` drop list: exploratory chatter, repeated explanations, tool-call narration, speculative unselected options, ceremonial content.
- Compaction output shape: single compact block under the six preserve headings; no prose preamble.
- Handoff notes live at `aix/docs/notes/handoff-<short-slug>.md`, reuse same file across updates, treated as exploratory per the notes promotion workflow.
- Handoff-note template fields: title, Updated, Status (`in-progress` | `paused` | `awaiting-review` | `ready-to-implement`), Goal, Files involved, Decisions made, Constraints, Rejected approaches, Next action.

## Constraints

- Do not change implementation files in the same turn a handoff note is written.
- Use workspace-relative paths only.
- Bullets only inside sections; empty sections write `- (none)`.

## Rejected approaches

- Duplicating the full rule text inside each downstream module file — chose a single source of truth in `concierge.prompt.md` with a binding pointer from `_module-index.md`.
- Adding a new standalone module under `aix/.copilot/prompts/` for compaction — over-engineered for a routing-level discipline.

## Next action

- Optional: add a `handoff-` glob to TODO Tree / search scopes for discoverability.
- Optional: spot-check Implementer/Planner/Reviewer prompts to confirm none redefine compaction behavior in a conflicting way.
