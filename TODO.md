# Project Backlog

This file tracks AIX and developer-experience backlog priorities.

## Canonical ownership

- `context/current-goals.md` is the source of truth for active 3-7 priorities.
- This file is the durable backlog for AIX and DX follow-ups.
- `docs/notes/README.md` is exploratory and should not carry active TODO ownership.

## Now (P0 reliability + hygiene)

- [ ] BUG: Reduce syntax errors from AI edits (e.g., unexpected token and malformed frontmatter failures).
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/36
- [ ] BUG: Resolve Concierge stopping mid-task when no user input is required.
- [ ] BUG: Handle EOF and syntax errors (e.g., unexpected end of JSON input) during file processing.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/29
- [ ] FEAT: Improve drift gate pre-commit output so commit-block messaging is concise and actionable.
- [ ] TODO: Improve terminal task output guidance (especially how to adjust `context/current-goals.md`).
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/35

## Next (P1 routing + validation)

- [ ] TODO: Run a benchmark-grade AIX snapshot with 2-3 probes from [docs/maintenance/aix-probe-bank.md](docs/maintenance/aix-probe-bank.md) and log results under [docs/logs/](docs/logs/).
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/34
- [ ] TODO: Extend probe bank with explicit multi-root safety probe and scope-discipline scoring notes.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/33
- [ ] TODO: Update prompt triage to route to default Copilot agent when appropriate.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/32
- [ ] TODO: Improve repo discoverability by adding lightweight index pages to key folders.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/31
- [ ] TODO: Provide direction for keeping READMEs current and aligned with folder state.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/38
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/30

## Later / Parked

- [ ] TODO: Account for terminal EOF errors and stuck heredoc modes.
- [ ] FEAT: Create explicit frontmatter schema for workspace.
- [ ] FEAT: Open permissions for running VS Code tasks without extra user input (including sensitive paths where approved).
- [ ] FEAT: Add user feedback loops for multi-step agent responses and apply feedback into drift updates.
- [ ] TODO: Learn user's UX style/preferences/priorities.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/37
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/28
- [ ] TODO: Tune agent cautiousness to reduce overlong completions and overengineered solutions.
- Issue URL: https://github.com/datainkio/portfolio-governance/issues/27
- [ ] FEAT: Hook up ChatGPT browser instance to repos.

## Done

- [x] Integrate maintenance of constraints and decisions.
- [x] Reinforce constraint that context management should not require humans editing meta lines.
- [x] Test drift check on commit.
- [x] Add allowlisted Agent Ops tasks (safe file ops + cross-repo scripts) to reduce terminal confirmation friction.
