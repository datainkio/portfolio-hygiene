---
aix:
  id: aix.copilot.reference.module-defaults
  role: Shared defaults and conventions that apply to all prompt modules.
  status: stable
---

# Module Defaults

These conventions apply to every prompt module. Individual module files only document what differs.

## Standard inputs (always read first)
Every module should read the user request and any explicitly referenced files before producing output. These are not listed in individual module files.

## Blocking question policy
Ask **at most one** blocking question per response, and only if you cannot produce a safe or usable output without the answer. When blocked, also provide a provisional best-effort output with clearly labeled assumptions.

## Non-trigger (all modules)
Do not use any module when the user wants prompt-module normalization or routing-rule updates — route to concierge or handle in the routing contract directly.

## Cross-cutting rules
Conversation compaction and stable-decision handoff notes are defined in `concierge.prompt.md` and are binding on all modules. See that file for the full contract.
