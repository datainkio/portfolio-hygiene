# Project Backlog

This file tracks AIX and developer-experience backlog priorities.

## Canonical ownership

- `context/current-goals.md` is the source of truth for active 3-7 priorities.
- This file is the durable backlog for AIX and DX follow-ups.
- `docs/notes/README.md` is exploratory and should not carry active TODO ownership.

## Now (P0 — reliability + hygiene)

- [ ] BUG Reduce syntax errors from AI edits (e.g., unexpected token and malformed frontmatter failures).
  - Issue: [#36](https://github.com/datainkio/portfolio-governance/issues/36)
- [ ] BUG Resolve Concierge stopping mid-task when no user input is required.
- [ ] BUG Handle EOF and syntax errors (e.g., unexpected end of JSON input) during file processing.
  - Issue: [#29](https://github.com/datainkio/portfolio-governance/issues/29)
- [ ] TODO Improve terminal task output guidance (especially how to adjust `context/current-goals.md`).
  - Issue: [#35](https://github.com/datainkio/portfolio-governance/issues/35)

## Next (P1 — routing + validation)

- [ ] TODO Run a benchmark-grade AIX snapshot with 2-3 probes from [docs/maintenance/aix-probe-bank.md](docs/maintenance/aix-probe-bank.md) and log results under [docs/logs/](docs/logs/).
  - Issue: [#34](https://github.com/datainkio/portfolio-governance/issues/34)
- [ ] TODO Extend probe bank with explicit multi-root safety probe and scope-discipline scoring notes.
  - Issue: [#33](https://github.com/datainkio/portfolio-governance/issues/33)
- [ ] TODO Update prompt triage to route to default Copilot agent when appropriate.
  - Issue: [#32](https://github.com/datainkio/portfolio-governance/issues/32)
- [ ] TODO Improve repo discoverability by adding lightweight index pages to key folders.
  - Issue: [#31](https://github.com/datainkio/portfolio-governance/issues/31)
- [ ] TODO Provide direction for keeping READMEs current and aligned with folder state.
  - Issue: [#38](https://github.com/datainkio/portfolio-governance/issues/38), [#30](https://github.com/datainkio/portfolio-governance/issues/30)

## Later / Parked

- [ ] FEAT When refactoring begins, create skills for preferred technologies: Tailwind, GSAP, 11ty, Sanity, accessibility, DX, AIX, personality, response style, commit messages.
- [ ] FEAT Instruct appropriate module to prioritize semantically meaningful DOM elements over divs.
- [ ] TODO Account for terminal EOF errors and stuck heredoc modes.
- [ ] FEAT Implement template frontmatter schema per [specs/features/template-frontmatter-schema.md](specs/features/template-frontmatter-schema.md).
- [ ] FEAT Open permissions for running VS Code tasks without extra user input (including sensitive paths where approved).
- [ ] FEAT Improve drift gate pre-commit output so commit-block messaging is concise and actionable.
- [ ] FEAT Add user feedback loops for multi-step agent responses and apply feedback into drift updates.
- [ ] TODO Learn user's UX style/preferences/priorities.
  - Issue: [#37](https://github.com/datainkio/portfolio-governance/issues/37), [#28](https://github.com/datainkio/portfolio-governance/issues/28)
- [ ] TODO Tune agent cautiousness to reduce overlong completions and overengineered solutions.
  - Issue: [#27](https://github.com/datainkio/portfolio-governance/issues/27)
- [ ] FEAT Hook up ChatGPT browser instance to repos.
- [ ] TODO Evaluate creating agent modules dedicated to specific libraries/platforms (e.g. GSAP, Sanity).

## Concierge: AIX Maintenance Feature

A planned feature for Concierge to audit, score, and optionally auto-fix AIX hygiene across mounted projects.

### Permissions & Guardrails

- [ ] Define doc-optimization policy (allowed: discoverability/cross-linking, consolidate prompts/modules, reduce duplication; forbidden: rewrite product docs for style).
- [ ] Define doc-optimization allowlist (which doc areas may be changed, e.g. `docs/ai/`, prompt indexes).
- [ ] Define doc-optimization denylist (product docs, marketing copy, narrative docs unless explicitly requested).
- [ ] Denylist: production source behavior files (templates/JS/CSS) unless explicitly requested.
- [ ] Auto-fix must support: apply-all vs apply-selected changes.

### Benchmarking & Scoring

- [ ] Extend probe bank with a mounted-project subset (project discovery + prompt routing + safe auto-fix dry-run).
- [ ] Implement baseline benchmark capture per project (store snapshot artifacts).
- [ ] Implement re-score + comparison (run probes; write snapshots; produce deltas).
- [ ] Implement logging + measurement hooks (emit structured run summaries).
- [ ] Implement: deterministic manifest discovery (root + fallback).
- [ ] Implement: audit directory resolution + safe creation (auto-fix only).
- [ ] Implement: snapshot writer + baseline/previous selector.
- [ ] Implement: delta generator + report formatter.
- [ ] Implement: confirmation-gated validation command runner.

### Discovery (Mounted Project Profiling)

- [ ] Inventory current AIX surfaces in imported projects (`.copilot/`, `docs/ai/`, `<mounted-project>/.github/copilot-instructions.md`, legacy agents).
- [ ] Design "Project AIX Profile" format (derived facts: prompts, context packs, entrypoints, ignored paths, build artifacts).
- [ ] Specify discovery algorithm (multi-root scan + heuristic scoring + duplicate/overlap detection).

### Recommendations & Output (Report Mode)

- [ ] Add UX for Concierge output (audit summary, recommended moves, one-command/one-patch options).
- [ ] Define "AIX hygiene checklist" generation (project-local, actionable, links to files).
- [ ] Define Concierge routing rules for imported projects (module selection precedence; conflict resolution).

### Optional Auto-fix

- [ ] Specify remediation actions (report-first suggestions + optional auto-fix; never touch generated/build outputs).
- [ ] Define auto-fix invocation UX (dry-run default; confirm/apply; patch preview).
- [ ] Define rollback strategy (revert prompt/module moves; preserve legacy references).

### Workflows

- [ ] Define optimization workflow (one-time improvements): identify highest-leverage fixes → propose patches → optional apply → validate with scoring deltas.
- [ ] Define maintenance workflow (ongoing hygiene): detect drift/noise regressions → suggest pruning/realignment → optional apply → validate with scoring deltas.

### Spec Drafting

- [ ] Spec: Auto-fix categories (docs optimization, prompt modularization, ignore hygiene, agent deconfliction).
- [ ] Spec: Validation plan (before/after comparison, regression guardrails, logs).
