---
aix:
	id: aix.context.design-philosophy
	role: Durable design philosophy and decision posture.
	status: stable
	surface: internal
	owner: AIX
	tags:
		- context
		- design-philosophy
		- principles
	type: context
	scope: aix
	audience: maintainers
	perf:
		readPriority: medium
		cacheSafe: true
		critical: false
---

# Design Philosophy

This document captures the **durable** design philosophy for this workspace.
It sets the posture for UX, system choices, and agent behavior.
Temporary or tactical guidance belongs in `/specs` or `/docs`.

## Core Principles

1. **Clarity over cleverness**
	Prefer readable structures and explicit intent. If a choice feels “smart but unclear,” don’t take it.

2. **Frictionless navigation**
	Information should be easy to locate with predictable paths and minimal duplication.

3. **Accessibility as a baseline**
	Semantics, keyboard support, and reduced-motion are defaults, not add-ons.

4. **Performance with intention**
	Every dependency and animation must justify its cost. Prefer small, measurable changes.

5. **Design is systemic**
	Structure, naming, and documentation are part of the product experience for both humans and agents.

## Decision Posture

- **Default to existing patterns** unless a spec explicitly changes them.
- **Prefer minimal, reversible changes** for hygiene or structural improvements.
- **Avoid global automation** unless it demonstrably reduces cognitive load.
- **Treat `/context` and `/specs` as canonical**; `/docs` explains, but does not decide.

## Interaction Design Rules of Thumb

- Reduce motion when it doesn’t clarify intent or hierarchy.
- Animate only when it improves comprehension or flow.
- Use progressive disclosure over dense layouts.
- Favor readable typography and generous spacing for long-form content.

## Agent Behavior Expectations

- Read context before inferring intent.
- Keep scope tight; avoid broad refactors unless asked.
- Prefer deterministic, local signals over inferred or probabilistic reasoning for hygiene decisions.

## When to Update This File

Update only when the **long-term** philosophy changes.
If a change is temporary, tactical, or implementation-specific, it does not belong here.
