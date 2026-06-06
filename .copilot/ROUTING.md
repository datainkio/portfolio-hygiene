## Copilot Routing Canon

> [!warning] DEPRECATED — superseded by Claude-native routing
> Claude Code auto-routes to subagents in `.claude/agents/` by their description; there is no single "Concierge" router. See [cleanup,-revise,-and-optimize-aix-for-cl](../../context/goals/AIX_tasks/cleanup,-revise,-and-optimize-aix-for-cl.md). Kept for reference pending deletion.

- There is exactly one user-facing agent: Concierge.
- All work is performed by applying ONE prompt module (max two if tightly coupled).
- Prefer domain-specific modules over generic ones.
- If unsure between two modules, choose the one with the clearer Primary Output.
- Do not invent new modules.
- Do not ask to switch agents.