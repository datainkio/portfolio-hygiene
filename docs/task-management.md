# Task Management Conventions (Taskmaster)

This doc covers the *why* and *where* of file-embedded TODOs. For the canonical format specification — syntax, grammar, lifecycle states, prefix taxonomy, and formatting rules — see [taskmaster.prompt.md](../.copilot/prompts/taskmaster.prompt.md).

## Why embed TODOs in files?

- Tasks stay close to the code/docs they affect.
- They survive chat sessions.
- They work with TODO Tree / ripgrep / IDE search.

## GitHub Issues workflow

TODOs are the source of truth. The TODO-to-Issue GitHub Action creates, updates, and closes GitHub Issues based on committed TODOs. Removing a TODO closes its linked Issue.

Key points:

- Use a prefix from the canonical taxonomy (`TODO`, `BUG`, `CHORE`, etc.).
- Add optional metadata lines beneath the TODO to set issue fields (`labels:`, `assignees:`, `milestone:`).
- Avoid multiline TODOs; use short, actionable statements.

## Placement

- Put TODOs near the code, function, or section they reference.
- For cross-cutting work, prefer adding TODOs to the most relevant top-level doc (README, ARCHITECTURE.md, etc.).
- If no good home exists, consider `TASKS.md` (optional).

## 1:1 Task ↔ TODO

- Each task has exactly one primary TODO anchor; additional related TODOs may exist where locality requires.
- Track substeps in chat or the task spec, not as additional TODOs.

## Task completion

Remove the TODO when the work is complete. Convert to a `NOTE` only if future context is valuable. Do not leave completed TODOs behind — git history preserves the evidence.
