# Project Backlog

This file tracks AIX and developer-experience backlog priorities.

## Canonical ownership

- `context/current-goals.md` is the source of truth for active 3-7 priorities.
- This file is the durable backlog for AIX and DX follow-ups.
- `docs/notes/README.md` is exploratory and should not carry active TODO ownership.

## Now (P0 — reliability + hygiene)

- [ ] BUG Reduce AI-edit errors: syntax errors, malformed frontmatter, and unexpected EOF/JSON failures during file processing.
  - Issues: [#36](https://github.com/datainkio/portfolio-governance/issues/36), [#29](https://github.com/datainkio/portfolio-governance/issues/29)
- [ ] BUG Resolve Concierge stopping mid-task when no user input is required.
- [ ] TODO Improve terminal task output guidance (especially how to adjust `context/current-goals.md`).
  - Issue: [#35](https://github.com/datainkio/portfolio-governance/issues/35)

## Next (P1 — routing + validation)

- [ ] TODO Run a benchmark-grade AIX snapshot (2-3 probes from [docs/maintenance/aix-probe-bank.md](docs/maintenance/aix-probe-bank.md)) and extend probe bank with a multi-root safety probe; log results under [docs/logs/](docs/logs/).
  - Issues: [#34](https://github.com/datainkio/portfolio-governance/issues/34), [#33](https://github.com/datainkio/portfolio-governance/issues/33)
- [ ] TODO Update prompt triage to route to default Copilot agent when appropriate.
  - Issue: [#32](https://github.com/datainkio/portfolio-governance/issues/32)
- [ ] TODO Improve discoverability: add lightweight index pages to key folders and provide direction for keeping READMEs current.
  - Issues: [#31](https://github.com/datainkio/portfolio-governance/issues/31), [#38](https://github.com/datainkio/portfolio-governance/issues/38), [#30](https://github.com/datainkio/portfolio-governance/issues/30)

## Frontend Code Quality

- [ ] TODO Clean up 11ty config: remove/implement placeholder `eleventy/collections/documentation.js`, gate HTML minifier behind `NODE_ENV === 'production'`, reconcile the `_registry` split.
- [ ] TODO `NavigationBuilder`: refactor `buildNestedStructure()` from O(n²) to O(n) using a Map-based parent lookup; tighten its documentation.
- [ ] TODO Replace the module-scope SVG cache in `eleventy/filters/file.js` (`inlineSvgFromUrl`) with `@11ty/eleventy-fetch` so the cache is filesystem-backed across build modes.
- [ ] FEAT Add Sanity fetch freshness logging (cache hit vs. network) to match the `TailwindLogger` pattern — closes a DX blind spot during local development.
- [ ] TODO Document coding conventions and standards; add sidecar files for JS files.

## Later / Parked

- [ ] FEAT When refactoring begins, create skills for preferred technologies (Tailwind, GSAP, 11ty, Sanity, accessibility, AIX) and evaluate dedicated library-specific agent modules.
- [ ] TODO Account for terminal EOF errors and stuck heredoc modes.
- [ ] FEAT Implement template frontmatter schema per [specs/features/template-frontmatter-schema.md](specs/features/template-frontmatter-schema.md).
- [ ] FEAT Open permissions for running VS Code tasks without extra user input (including sensitive paths where approved).
- [ ] FEAT Improve drift gate pre-commit output so commit-block messaging is concise and actionable.
- [ ] FEAT Add user feedback loops for multi-step agent responses and apply feedback into drift updates.
- [ ] TODO Tune agent behavior: learn user's UX style/preferences and reduce overlong completions and overengineered solutions.
  - Issues: [#37](https://github.com/datainkio/portfolio-governance/issues/37), [#28](https://github.com/datainkio/portfolio-governance/issues/28), [#27](https://github.com/datainkio/portfolio-governance/issues/27)

## Concierge: AIX Maintenance Feature

A planned feature for Concierge to audit, score, and optionally auto-fix AIX hygiene across mounted projects. Sub-task detail belongs in a spec file when the feature activates.

- [ ] TODO Define permissions and guardrails: doc-optimization policy, allowlist/denylist, apply-all vs. apply-selected modes.
- [ ] TODO Implement benchmarking and scoring: extend probe bank for mounted projects, baseline capture, re-score + delta, structured logging.
- [ ] TODO Implement discovery and project profiling: inventory AIX surfaces, design Project AIX Profile format, specify multi-root discovery algorithm.
- [ ] TODO Define recommendations UX and output: audit summary, hygiene checklist generation, routing rules for imported projects.
- [ ] TODO Define optional auto-fix: remediation action spec, dry-run UX, rollback strategy.
- [ ] TODO Define optimization and maintenance workflows; draft spec for auto-fix categories and validation plan.
