# ADR 0005 — Developer-Facing Narrative Channels (HTML comments + console)

- **Status:** accepted
- **Date:** 2026-06-29
- **Owners:** Russ Lebo

## Context

A target audience for the site is designers and developers evaluating the
strategy and architecture behind the build. Their implicit question is *"will
working with this person make me look like a hero to my bosses?"* The visible
HTML answers that only indirectly. We have two underused, zero-UI-cost channels
that speak this audience's native language:

1. **HTML comments** (`<!-- … -->`) — read passively via *View Source* / the
   Inspector. Adjacent to the markup they explain.
2. **`console.log`** — read actively after opening DevTools. Unfolds in runtime
   order.

Both already have a working precedent in the repo:
- Console: `frontend/views/templates/partials/dev-note.njk` (styled `%c` block).
- HTML comments: the render-blocking-font rationale in `head.njk` (`<!-- … -->`).

Constraints: must add **zero** render-blocking or layout cost; must not leak to
the on-screen UX; must honor the existing `{# … #}` (compiled-away) vs `<!-- -->`
(shipped) distinction; copy lives co-located with the emitter, not centralized.

## Decision

Treat the two channels as **one complementary documentation system** with a
fixed division of labor:

| Channel | Documents | Why |
| --- | --- | --- |
| HTML comments | **templating / authoring strategy** — structure, atomic composition, layout contract, CMS seam, a11y posture | comment sits next to the markup it explains |
| `console.log` | **IXD / motion strategy** — boot sequence, director architecture, motion intent, reduced-motion, perf budget | runtime narration of an invisible machine |

Channels **cross-reference, never duplicate** (e.g. a console line points to the
HTML source for the layout contract). Each channel's content outline lives in the
sidecar of the file that emits it:
- Console outline → `frontend/views/templates/partials/dev-note.md`
- Comment outline → `frontend/views/pages/home/home.md`

## Rationale

- **Audience fit:** speaks to evaluators in the medium they already inspect.
- **Maintainability signal:** the channels themselves demonstrate the rigor they
  describe (legible markup, observable runtime).
- **Zero UX risk:** no on-screen change; no critical-path cost.
- **Co-location:** outline → sidecar → implementation keeps copy from drifting.

## Consequences

- `dev-note.njk` needs a sidecar (currently missing — a constraint violation this
  ADR resolves).
- The console channel's mount point must be corrected before it grows (see defect
  task below).
- New cross-cutting content concern: keep the two outlines in sync as sections
  change.

## Scope boundary

This ADR records the **design decision only**. The defects discovered while
refreshing the project (duplicate `</head>`, stale provenance/BUG comments,
`dev-note.njk` mount placement, dead `sizzle-background` import, stale `home.md`
links, `metaDescription` placeholder) are **out of scope** and tracked
separately in Frontend task `fix-dev-channel-defects`.

## Links

- Console emitter: `frontend/views/templates/partials/dev-note.njk` / `.md`
- Comment host page: `frontend/views/pages/home/home.njk` / `.md`
- Defect task: `context/goals/Frontend_tasks/fix-dev-channel-defects.md`
- Decision index: `context/decisions.md`
