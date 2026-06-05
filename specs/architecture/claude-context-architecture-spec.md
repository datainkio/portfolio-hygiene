---
title: Claude Context Architecture Spec
aliases:
  - Claude AIX Context Spec
  - AIX Context Architecture
  - Claude Code Context Strategy
  - Claude VS Code Agent Context Spec
id: aix.claude.context-architecture
type: spec
status: draft
created: 2026-05-29
updated: 2026-05-29
version: 0.1.0
owner: Russell Lebo
project: AIX
scope:
  - Claude Code
  - VS Code
  - AIX hygiene
  - DX hygiene
summary: A complete specification for using Claude project memory, skills, and subagents to improve token efficiency, response accuracy, and response time for a creative technologist workflow.
audience:
  - Creative technologists
  - UX designers
  - Frontend developers
  - AI workflow maintainers
stack:
  frontend:
    - 11ty
    - Nunjucks
    - Tailwind CSS
    - GSAP
  backend:
    - Sanity
  methods:
    - Atomic design
    - Accessibility-first implementation
    - Reduced-motion support
    - Responsive breakpoint testing
tools:
  - Claude Code
  - VS Code
  - Obsidian
  - Sanity Studio
  - Eleventy
tags:
  - "#aix"
  - "#dx"
  - "#aix/claude"
  - "#aix/claude-code"
  - "#tooling/vscode"
  - "#aix/agents"
  - "#aix/skills"
  - "#aix/context"
  - "#aix/context-engineering"
  - "#dx/optimization"
  - "#aix/token-efficiency"
  - "#frontend/eleventy"
  - "#frontend/nunjucks"
  - "#style/tailwindcss"
  - "#design/motion/gsap"
  - "#backend/sanity"
  - "#design/atomic-design"
  - "#ux/accessibility"
  - "#ux/accessibility/reduced-motion"
links:
  - "[[knowledge management/tags/aix]]"
  - "[[Claude Code]]"
  - "[[VS Code]]"
  - "[[11ty]]"
  - "[[Nunjucks]]"
  - "[[Tailwind CSS]]"
  - "[[GSAP]]"
  - "[[Sanity]]"
  - "[[Atomic Design]]"
  - "[[Accessibility]]"
  - "[[Reduced Motion]]"
related:
  - "[[AIX Hygiene]]"
  - "[[DX Hygiene]]"
  - "[[Agent Architecture]]"
  - "[[Skill Architecture]]"
  - "[[Portfolio]]"
---

# Claude Context Architecture Spec

## 0. Purpose

This specification defines how to build and maintain Claude context for an AIX project whose goal is to improve:

- token efficiency
- response accuracy
- response time
- implementation consistency
- accessibility discipline
- DX and AIX hygiene

The project supports a creative technologist workflow centered on:

- 11ty and Nunjucks for static-site architecture
- Tailwind CSS for utility-first styling
- GSAP for kinetic interaction design and scroll choreography
- Sanity for structured content modeling
- atomic design principles for component architecture
- accessibility, responsive breakpoints, and reduced-motion support as non-negotiable implementation constraints

The core principle is:

> Always-on context should orient. Skills should instruct. Agents should isolate. Reviews should enforce.

Claude context should be treated as an actively maintained design system for collaboration with AI agents, not as a dumping ground for project notes.

---

## 1. Split context into three layers

### 1.1 Goal

Separate project context into layers so Claude receives the smallest useful context for the task at hand.

This improves token efficiency by avoiding unnecessary context, and improves accuracy by keeping instructions scoped and conflict-free.

### 1.2 Context layers

| Layer                        | Location                          | Purpose                                                                     | Token behavior                      |
| ---------------------------- | --------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- |
| Always-on project context    | `CLAUDE.md`                       | Orient Claude to the project, stack, values, and non-negotiable constraints | Loaded broadly                      |
| On-demand procedural context | `.claude/skills/<skill>/SKILL.md` | Provide task-specific methods, checklists, and examples                     | Loaded when relevant                |
| Isolated working context     | `.claude/agents/<agent>.md`       | Delegate bounded work to specialized agents                                 | Isolated from the main conversation |

### 1.3 Always-on context

Use root-level `CLAUDE.md` for project assumptions that should apply in nearly every session.

#### Include

- Project purpose
- Core stack
- Repository layout
- Atomic design conventions
- Accessibility expectations
- Responsive breakpoint expectations
- Reduced-motion policy
- Preferred edit behavior
- Preferred communication style
- Rules against broad, unrequested refactors

#### Exclude

- Long tutorials
- API reference dumps
- Full examples that belong in skills
- Debugging playbooks
- Historical project context that is not normally actionable
- Tool-specific procedures
- Repeated local notes that only apply to one folder or feature

### 1.4 Recommended `CLAUDE.md` shape

`CLAUDE.md` should be short enough to scan and stable enough to remain true across most tasks.

Recommended sections:

1. Project identity
2. Stack and architecture
3. Component conventions
4. Accessibility and motion requirements
5. Editing constraints
6. Agent routing expectations
7. Review expectations

### 1.5 Example project constitution

```md
# Project Context

This project supports a creative technologist portfolio and AIX/DX workflow.

Frontend work uses 11ty, Nunjucks, Tailwind CSS, and GSAP. Backend content modeling uses Sanity. Components follow atomic design principles.

Implementation must preserve semantic HTML, accessibility, responsive breakpoints, and reduced-motion fallbacks.

Before editing, identify the relevant template, component, schema, choreography module, or content model.

Prefer scoped, full-file changes when patching would be fragile. Do not invent files, APIs, or conventions that are not present in the repository.

When unsure, produce a file map, diagnosis, or plan before implementation.
```

### 1.6 Acceptance criteria

This section is successful when:

- Claude can explain the project purpose in one paragraph.
- Claude knows the stack without being reminded.
- Claude avoids loading tool-specific detail unless needed.
- Claude stops repeating corrections that belong in persistent context.
- `CLAUDE.md` remains short, stable, and broadly applicable.

---

## 2. Use skills for reusable procedures and domain knowledge

### 2.1 Goal

Use skills for context that is valuable but should not be loaded into every session.

Skills are the right place for reusable procedures, checklists, examples, and toolkit-specific decision trees.

### 2.2 Skill design principle

A skill should answer:

> When this kind of task appears, what does Claude need to know to do it correctly without dragging unrelated project context into the conversation?

Each skill should be scoped narrowly enough that its activation improves the response rather than merely adding more text.

### 2.3 Recommended skills

The current structure already includes useful skills such as `eleventy`, `tailwindcss`, `obsidian-markdown`, and related folders. The following additions or refinements would strengthen the system.

| Skill               | Purpose                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `sanity`            | Schema design, GROQ, Portable Text, singletons, content modeling, Studio UX conventions           |
| `nunjucks`          | Template composition, macros, includes, filters, frontmatter and collection patterns              |
| `gsap-motion`       | Timeline orchestration, ScrollTrigger, MotionPath, card choreography, reduced-motion alternatives |
| `accessibility`     | Semantic HTML, landmarks, heading order, keyboard support, reduced-motion checks                  |
| `atomic-design`     | Atoms, molecules, organisms, templates, pages, naming, boundaries, file placement                 |
| `portfolio-context` | Project-specific visual language, interaction language, Hanko/chop logic, print-system references |
| `aix-hygiene`       | Rules for maintaining agents, skills, prompts, module indexes, and context files                  |

### 2.4 Skill file structure

Recommended structure:

```txt
.claude/
  skills/
    gsap-motion/
      SKILL.md
      examples/
        card-motionpath.md
        reduced-motion-fallback.md
      references/
        easing-guidelines.md
        scrolltrigger-checklist.md
```

### 2.5 Recommended `SKILL.md` sections

Each skill should contain:

1. `Use when`
2. `Do not use when`
3. `Required inputs`
4. `Inspect first`
5. `Procedure`
6. `Output format`
7. `Acceptance criteria`
8. `Supporting files`

### 2.6 Example: `gsap-motion/SKILL.md`

```md
---
title: "GSAP Motion Skill"
id: "skill.gsap-motion"
type: "skill"
status: "draft"
tags:
  - "gsap"
  - "scrolltrigger"
  - "motionpath"
  - "reduced-motion"
  - "frontend"
---

# GSAP Motion Skill

## Use when

Use this skill when modifying scroll-linked animation, pinned sections, card choreography, MotionPath behavior, timeline easing, staggered motion, or reduced-motion fallbacks.

## Do not use when

Do not use this skill for static CSS transitions unless GSAP is involved. Do not use it for content-only changes.

## Required inputs

- Animated element selector
- Trigger element selector
- Current timeline or tween
- Desired motion behavior
- Reduced-motion expectation
- Relevant breakpoint behavior

## Inspect first

- Existing animation module
- Current GSAP imports
- ScrollTrigger registration
- Whether MotionPathPlugin is available
- Reduced-motion utility or media query handling
- Current breakpoint-specific behavior

## Procedure

1. Identify the current motion model.
2. Determine whether the existing timeline should be extended or replaced.
3. Preserve semantic structure and component boundaries.
4. Prefer named constants for path, timing, duration, and easing.
5. Confirm reduced-motion fallback.
6. Avoid broad rewrites unless explicitly requested.

## Output format

Return:

1. Diagnosis
2. Proposed motion model
3. Files to edit
4. Implementation notes
5. Reduced-motion behavior
6. Risks and verification steps
```

### 2.7 Acceptance criteria

This section is successful when:

- Skills activate only when relevant.
- Skills reduce repeated prompting.
- Skills contain procedures rather than broad personality instructions.
- Skill entry files stay concise.
- Long examples and references move into supporting files.

---

## 3. Use agents to protect the main context window

### 3.1 Goal

Use specialized agents to isolate noisy work from the main conversation.

Agents are most valuable when a task requires file searching, diagnosis, diff review, or implementation detail that would otherwise pollute the main context window.

### 3.2 Agent design principle

Agents should be bounded workers, not generic personas.

Each agent should have:

- one primary purpose
- one primary output type
- clear triggers
- clear anti-triggers
- a defined editing policy
- a defined handoff behavior

### 3.3 Recommended agent roles

| Agent                | Best use                                                                   | Primary output                  |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------- |
| `navigator`          | Finds relevant files and explains where to work                            | File map                        |
| `librarian`          | Maintains docs, indexes, metadata, and Obsidian-facing sidecars            | Documentation update            |
| `analyst`            | Diagnoses a problem and names likely causes                                | Diagnosis                       |
| `architect`          | Produces structure: component boundaries, schemas, IA, data flow           | Architecture proposal           |
| `planner`            | Converts intent into sequenced tasks and acceptance criteria               | Task plan                       |
| `implementer`        | Makes scoped code changes after context is clear                           | Code changes                    |
| `reviewer`           | Reviews diffs for correctness, accessibility, regressions, and conventions | Review report                   |
| `mechanic`           | Fixes build, runtime, dependency, and tooling failures                     | Repair plan or fix              |
| `migrator-updater`   | Updates dependencies, schemas, folder conventions, or old patterns         | Migration plan                  |
| `housekeeper`        | Audits AIX/DX hygiene and context drift                                    | Hygiene audit                   |
| `editor`             | Refines copy while preserving tone and content strategy                    | Edited copy                     |
| `content-strategist` | Handles narrative architecture, taxonomy, and case-study positioning       | Content strategy recommendation |

### 3.4 Agents to scrutinize

`collaborator` and `taskmaster` may be useful, but they risk overlapping with `planner`, `architect`, or `housekeeper`.

Keep them only if they have distinct primary outputs.

Possible distinctions:

| Agent          | Keep only if it means                                        |
| -------------- | ------------------------------------------------------------ |
| `collaborator` | Facilitates exploratory thinking without editing or planning |
| `taskmaster`   | Produces issue-ready task breakdowns, not general plans      |

### 3.5 Recommended agent contract

Every agent should include:

```md
# Agent Name

## Purpose

One sentence.

## Use when

Specific trigger language.

## Do not use when

Neighboring tasks that belong to other agents.

## Primary output

One output type only.

## Inputs required

Files, paths, diffs, problem statements, or acceptance criteria.

## Tool and edit policy

Read-only, doc-only, plan-only, or implementation allowed.

## Procedure

Ordered steps.

## Output format

Fixed structure.

## Handoff behavior

When to return to the main conversation or another agent.
```

### 3.6 Example: `navigator.md`

```md
---
name: navigator
description: "Use to locate relevant files, modules, templates, schemas, and docs before planning or editing."
tools: ["Read", "Glob", "Grep"]
---

# Navigator

## Purpose

Find the smallest relevant working set of files for a requested task.

## Use when

- The user asks where something lives.
- The requested change touches unfamiliar architecture.
- The implementer needs a bounded file list before editing.
- A bug may span templates, scripts, styles, schemas, or data.

## Do not use when

- The relevant file is already known.
- The user asks for copy editing only.
- The user asks for a code change in a specific file and no discovery is needed.

## Primary output

File map.

## Edit policy

Read-only. Do not modify files.

## Output format

Return:

1. Relevant files
2. Why each file matters
3. Suggested next agent
4. Open questions
```

### 3.7 Acceptance criteria

This section is successful when:

- Agents do not overlap heavily.
- Claude delegates discovery and review work instead of bloating the main thread.
- Implementation agents receive bounded file sets.
- Review agents evaluate diffs against explicit criteria.
- Each agent has one clear output type.

---

## 4. Put trigger and anti-trigger language everywhere

### 4.1 Goal

Improve routing accuracy by making each agent and skill explicit about when it should and should not be used.

Trigger language prevents Claude from choosing a vaguely related context file just because it shares keywords with the task.

### 4.2 Required routing fields

Every agent and skill should include:

| Field                 | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| `Use when`            | Activates the context intentionally             |
| `Do not use when`     | Prevents nearby false positives                 |
| `Inputs required`     | Prevents premature action                       |
| `Output must include` | Standardizes useful responses                   |
| `Stop condition`      | Prevents endless analysis or unauthorized edits |
| `Handoff`             | Names the next appropriate agent or workflow    |

### 4.3 Trigger examples

#### Good trigger

```md
Use when modifying scroll-linked animation, pinned sections, card choreography, MotionPath behavior, timeline easing, or reduced-motion fallbacks.
```

#### Weak trigger

```md
Use for GSAP.
```

The weak trigger is too broad. It will likely load the skill for generic animation discussion, static CSS transitions, or unrelated frontend work.

### 4.4 Anti-trigger examples

```md
Do not use for static CSS transitions unless GSAP is involved.

Do not use for Sanity schema modeling.

Do not use for copy editing unless animation language is part of the copy.

Do not edit files unless the user explicitly asks for implementation.
```

### 4.5 Stop conditions

Each agent or skill should know when to stop.

Examples:

| Context       | Stop condition                                           |
| ------------- | -------------------------------------------------------- |
| `navigator`   | Stop after producing file map                            |
| `analyst`     | Stop after diagnosis and likely causes                   |
| `architect`   | Stop after architecture proposal                         |
| `planner`     | Stop after task plan and acceptance criteria             |
| `implementer` | Stop after scoped edits and verification notes           |
| `reviewer`    | Stop after review report                                 |
| `housekeeper` | Stop after hygiene audit and prioritized recommendations |

### 4.6 Acceptance criteria

This section is successful when:

- Claude chooses the correct skill or agent more often.
- Agents do not self-assign unrelated tasks.
- Implementation does not start before discovery, diagnosis, or planning when those steps are needed.
- The user can predict which agent will be used for a task.

---

## 5. Route work through a deliberate loop

### 5.1 Goal

Use a repeatable workflow that protects accuracy without slowing down simple tasks.

The default loop is:

1. Navigate
2. Analyze or architect
3. Plan
4. Implement
5. Review
6. Maintain

Not every task needs every step. The value is in choosing the smallest safe loop.

### 5.2 Workflow map

| Task type                  | Recommended route                                                           |
| -------------------------- | --------------------------------------------------------------------------- |
| Unknown file location      | `navigator`                                                                 |
| Bug or unexpected behavior | `navigator` → `analyst` → `mechanic` or `implementer` → `reviewer`          |
| New component              | `architect` → `planner` → `implementer` → `reviewer`                        |
| Existing component change  | `navigator` → `implementer` → `reviewer`                                    |
| Sanity schema change       | `sanity` skill → `architect` → `implementer` → `reviewer`                   |
| Motion/choreography change | `gsap-motion` skill → `analyst` or `architect` → `implementer` → `reviewer` |
| Content strategy           | `content-strategist` → `editor`                                             |
| Documentation/indexing     | `librarian`                                                                 |
| Agent/skill cleanup        | `housekeeper`                                                               |

### 5.3 Default prompts

#### Discovery prompt

```txt
Use the navigator agent. Find the files involved in this behavior. Do not edit. Return a file map and recommended next step.
```

#### Diagnosis prompt

```txt
Use the analyst agent. Diagnose the likely cause of this behavior based on the files identified. Do not edit. Return likely causes, evidence, and the smallest safe intervention.
```

#### Architecture prompt

```txt
Use the architect agent. Propose the component, schema, or motion architecture. Do not edit. Include boundaries, affected files, risks, and acceptance criteria.
```

#### Implementation prompt

```txt
Use the implementer agent. Modify only the files named in the plan. Preserve public APIs and existing conventions. Respect semantic HTML, breakpoints, and reduced-motion behavior. Report touched files and verification steps.
```

#### Review prompt

```txt
Use the reviewer agent. Review the diff for correctness, regressions, accessibility, semantic HTML, responsive behavior, reduced-motion support, Tailwind class hygiene, and consistency with project conventions.
```

### 5.4 When to skip steps

Skip navigation when:

- the user named the exact file
- the task is copy-only
- the change is contained in a known module

Skip architecture when:

- the implementation pattern already exists
- the task is a small bug fix
- the user requests a direct edit

Skip implementation when:

- the user asks for diagnosis only
- the context is incomplete
- the agent cannot identify the relevant files
- the change would require broad refactoring without approval

### 5.5 Acceptance criteria

This section is successful when:

- Claude does not edit before understanding the relevant architecture.
- Simple tasks remain simple.
- Complex tasks produce useful intermediate artifacts.
- Review catches accessibility, motion, and breakpoint regressions.
- The main conversation remains focused on decisions rather than file noise.

---

## 6. Treat AIX hygiene as maintenance, not setup

### 6.1 Goal

Keep the Claude context system healthy over time.

AIX context decays when instructions duplicate, agents overlap, skills grow too long, examples become stale, or implementation behavior drifts away from project values.

### 6.2 Housekeeper role

The `housekeeper` agent should periodically audit the `.claude` directory and related project context files.

It should inspect:

- `CLAUDE.md`
- `.claude/agents/*.md`
- `.claude/skills/*/SKILL.md`
- supporting skill files
- module indexes
- onboarding docs
- workspace or repo conventions that influence AI behavior

### 6.3 Hygiene checks

| Signal                                   | Possible fix                                        |
| ---------------------------------------- | --------------------------------------------------- |
| Same instruction appears in three places | Promote to `CLAUDE.md`, or keep in one skill        |
| Skill triggers too often                 | Narrow description and add anti-triggers            |
| Agent overlap                            | Split by primary output type                        |
| Claude repeatedly asks the same question | Add missing project fact                            |
| Claude makes the same mistake twice      | Add rule, skill checklist, or reviewer check        |
| Long `SKILL.md` file                     | Move detail into supporting files                   |
| Slow sessions                            | Reduce always-on context                            |
| Inaccurate edits                         | Add navigator or analyst gate before implementation |
| Skills are stale                         | Add review date and owner                           |
| Agents mutate files unexpectedly         | Tighten edit policy                                 |
| Reviewer misses common regressions       | Add explicit checklist items                        |

### 6.4 Recommended cadence

| Cadence                            | Action                                          |
| ---------------------------------- | ----------------------------------------------- |
| Weekly                             | Run a lightweight housekeeper audit             |
| After repeated Claude failure      | Add or refine a rule                            |
| After project architecture changes | Update `CLAUDE.md`, skills, and agents          |
| After adding a new tool            | Add or update relevant skill                    |
| Before major refactor              | Audit agent routing and implementation policy   |
| After major refactor               | Update file maps, examples, and review criteria |

### 6.5 Housekeeper output format

```md
# AIX Hygiene Audit

## Summary

One paragraph.

## High-priority fixes

1. Issue
2. Impact
3. Recommended change
4. File to update

## Duplicate or conflicting instructions

Table of conflicts.

## Agent overlap

Table of agents with overlapping triggers.

## Skill health

Table of skills, status, and recommended edits.

## Context weight

Notes on always-on context that should move elsewhere.

## Next actions

Ordered checklist.
```

### 6.6 Acceptance criteria

This section is successful when:

- Context does not sprawl.
- Instructions stay consistent.
- Skills remain small and useful.
- Agents remain distinct.
- Repeated Claude failures become system improvements.
- The AIX project gets better as it is used.

---

## 7. Recommended next changes to the current structure

### 7.1 Goal

Translate the architecture into concrete next actions for the current `.claude` directory.

### 7.2 Current strengths

The current structure already reflects strong separation between agents and skills.

Notable strengths:

- Dedicated `.claude/agents` directory
- Dedicated `.claude/skills` directory
- Multiple specialized agents already present
- Existing toolkit-specific skills such as `eleventy` and `tailwindcss`
- Existing Obsidian-related skills, which align well with the broader knowledge workflow

### 7.3 Priority changes

#### 1. Add missing toolkit skills

Add:

- `sanity`
- `nunjucks`
- `gsap-motion`
- `accessibility`
- `atomic-design`
- `portfolio-context`
- `aix-hygiene`

#### 2. Give every agent a single primary output type

Examples:

| Agent         | Primary output        |
| ------------- | --------------------- |
| `navigator`   | File map              |
| `analyst`     | Diagnosis             |
| `architect`   | Architecture proposal |
| `planner`     | Task plan             |
| `implementer` | Code changes          |
| `reviewer`    | Review report         |
| `housekeeper` | Hygiene audit         |

#### 3. Add anti-trigger sections

Every agent and skill should explicitly state what it should not do.

This is especially important for overlapping roles such as:

- `planner`
- `architect`
- `collaborator`
- `taskmaster`
- `housekeeper`

#### 4. Keep `CLAUDE.md` short

Move procedures into skills.

Move examples into supporting files.

Move recurring maintenance checks into `housekeeper`.

#### 5. Strengthen reviewer checks

The `reviewer` agent should explicitly check:

- semantic HTML
- heading order
- landmark usage
- keyboard access
- responsive behavior
- Tailwind class hygiene
- reduced-motion behavior
- GSAP lifecycle cleanup
- Sanity schema compatibility
- 11ty/Nunjucks template conventions
- no invented files or APIs
- no broad refactors unless approved

#### 6. Strengthen implementer edit policy

The `implementer` agent should follow these rules:

- Modify only named or discovered relevant files.
- Do not perform broad refactors without approval.
- Prefer full-file replacement when incremental patches are fragile.
- Preserve LF newlines.
- Do not invent files, APIs, routes, schemas, or utilities.
- Report every touched file.
- Include verification steps.
- Stop and ask when the plan is incomplete.

#### 7. Run periodic housekeeper audits

The `housekeeper` should audit for:

- duplicated context
- stale examples
- agent overlap
- skill bloat
- inconsistent naming
- unclear trigger language
- missing anti-triggers
- outdated project assumptions
- recurring mistakes that should become rules

### 7.4 Implementation backlog

#### Phase 1: Normalize existing agents

- [ ] Add `Use when` to every agent.
- [ ] Add `Do not use when` to every agent.
- [ ] Add `Primary output` to every agent.
- [ ] Add `Edit policy` to every agent.
- [ ] Add `Handoff behavior` to every agent.
- [ ] Identify overlapping agents.

#### Phase 2: Normalize existing skills

- [ ] Add `Use when` to every skill.
- [ ] Add `Do not use when` to every skill.
- [ ] Add `Required inputs` to every skill.
- [ ] Add `Procedure` to every skill.
- [ ] Add `Output format` to every skill.
- [ ] Move long examples into supporting files.

#### Phase 3: Add missing skills

- [ ] Create `sanity/SKILL.md`.
- [ ] Create `nunjucks/SKILL.md`.
- [ ] Create `gsap-motion/SKILL.md`.
- [ ] Create `accessibility/SKILL.md`.
- [ ] Create `atomic-design/SKILL.md`.
- [ ] Create `portfolio-context/SKILL.md`.
- [ ] Create `aix-hygiene/SKILL.md`.

#### Phase 4: Add review gates

- [ ] Update `reviewer.md`.
- [ ] Add accessibility checklist.
- [ ] Add reduced-motion checklist.
- [ ] Add responsive breakpoint checklist.
- [ ] Add Tailwind hygiene checklist.
- [ ] Add Sanity schema compatibility checklist.
- [ ] Add Nunjucks/11ty convention checklist.

#### Phase 5: Establish maintenance cadence

- [ ] Create housekeeper audit prompt.
- [ ] Create context drift checklist.
- [ ] Create monthly context review note.
- [ ] Track repeated Claude failures as context improvement candidates.

### 7.5 Acceptance criteria

This section is successful when:

- The `.claude` directory becomes easier to reason about.
- Claude routes tasks more predictably.
- Toolkit-specific context loads on demand.
- Agents stop overlapping.
- Implementation behavior becomes more consistent.
- Accessibility and reduced-motion checks become routine.
- Context maintenance becomes a normal part of the workflow.

---

## 8. Spec decomposition guidance

This document can remain a single complete spec until implementation begins.

If the spec grows or becomes hard to maintain, split it into the following files:

| Future spec                           | Contents                                                            |
| ------------------------------------- | ------------------------------------------------------------------- |
| `claude-context-architecture-spec.md` | Overall strategy and context layers                                 |
| `claude-agent-contracts-spec.md`      | Agent roles, trigger language, output formats, edit policies        |
| `claude-skill-architecture-spec.md`   | Skill structure, toolkit-specific skills, supporting files          |
| `claude-aix-hygiene-spec.md`          | Housekeeper audits, maintenance cadence, drift management           |
| `claude-review-gates-spec.md`         | Accessibility, reduced motion, breakpoint, and DX review checklists |

Use this split only when the single document becomes too large to maintain comfortably.

---

## 9. Source notes

Claude-specific implementation details should be checked against current official documentation before major changes.

Useful reference points:

- [Claude Code memory documentation](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Claude Code skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Claude Code subagents documentation](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Claude Code hooks guide](https://docs.anthropic.com/en/docs/claude-code/hooks-guide)
- [VS Code third-party agents documentation](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
- [VS Code agent skills documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)

---

## 10. Working rule

Use this sentence as the governing rule for future context work:

> Do not make Claude smarter by adding more context everywhere. Make Claude more reliable by putting the right context in the right place, with clear triggers, narrow responsibilities, and review gates that enforce the project’s values.
