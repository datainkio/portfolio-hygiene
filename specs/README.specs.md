---
aix:
  id: aix.specs.readme
  role: Specs index and usage guidance.
  status: stable
  surface: internal
  owner: AIX
  tags:
    -  #specs
    -  #index
    -  #guidance
  type: guide
  scope: aix
  audience: maintainers
  perf:
    readPriority: high
    cacheSafe: true
    critical: true
---

# Technical & Product Specifications

This contains structured specifications that define how the system is
designed to work. Specs provide answers to:

- What are the inputs?
- What are the outputs?
- What constraints are non-negotiable?
- What does “done” mean?

Specs improve _correctness_ by providing agents with valuable _constraints_:

- clear boundaries,
- deterministic outputs,
- fewer retries,
- higher compliance with edge cases,
- better test generation

Good specs will reduce occurrences of elegant solutions that don't actually meet requirements.

## Target Audiences

Humans and AI agents

## Defining specs

Specs describe contracts between systems (e.g. Sanity → 11ty), component structures, routing, animation patterns, and other implementation-critical details. Unlike context documents, specs are _prescriptive_ and _testable_.

## The specs folder

A specs folder typically includes:

- Feature specs
- API contracts
- Data schemas
- Interaction specs
- Acceptance criteria
- Edge cases
- Accessibility requirements
- Performance budgets

These documents are more stable than notes and more detailed than context summaries.

Both humans and AI agents should reference them before making non-trivial changes.

## Index

- GitHub Pages documentation site (MkDocs/Material): [specs/features/brower-accessible-documentation.md](features/brower-accessible-documentation.md)
- File-level AIX hygiene (drift-neutral additions): [specs/features/file-aix-hygiene.md](features/file-aix-hygiene.md)
- Workspace link maintenance automation: [specs/features/workspace-link-maintenance.md](features/workspace-link-maintenance.md)

### AI specs

- [specs/ai/context-drift-without-timestamps.spec.md](ai/context-drift-without-timestamps.spec.md)
- [specs/ai/documentation-steward.spec.md](ai/documentation-steward.spec.md)
- [specs/ai/ceremonial-response-spec.md](ai/ceremonial-response-spec.md)
- [specs/ai/domain-agent-probes.spec.md](ai/domain-agent-probes.spec.md)
- [specs/ai/domain-specialized-coding-agent.spec.md](ai/domain-specialized-coding-agent.spec.md)

### Animation (frontend-owned, sibling repo)

Lives in `frontend/specs/animation/` in the frontend workspace folder; not linked here to keep this index repo-local.

### Architecture

- [specs/architecture/README.architecture.md](architecture/README.architecture.md)
- [specs/architecture/template.md](architecture/template.md)

### CMS

- [specs/cms/README.cms.md](cms/README.cms.md)
- [specs/cms/template.md](cms/template.md)

### Components

- [specs/components/README.components.md](components/README.components.md)
- [specs/components/template.md](components/template.md)

### Data

- [specs/data/README.data.md](dataink.io/aix/specs/data/README.data.md)
- [specs/data/template.md](data/template.md)

### Features

- [specs/features/README.features.md](features/README.features.md)
- [specs/features/adr-spec-sync.spec.md](features/adr-spec-sync.spec.md)
- [specs/features/concierge-11ty-module-boundary.md](features/concierge-11ty-module-boundary.md)
- [specs/features/concierge-sanity-module-boundary.md](features/concierge-sanity-module-boundary.md)
- [specs/features/concierge-mounted-project-aix.md](features/concierge-mounted-project-aix.md)
- [specs/features/concierge-project-aix.todo.md](features/concierge-project-aix.todo.md)
- [specs/features/js-frontmatter-schema.md](features/js-frontmatter-schema.md)
- [specs/features/todo-format-discoverability.md](features/todo-format-discoverability.md)
- [specs/features/template.md](features/template.md)

### Performance

- [specs/performance/README.aix.md](performance/README.aix.md)
- [specs/performance/template.md](performance/template.md)

### Routes & Content

- [specs/routes-content/README.routes-content.md](routes-content/README.routes-content.md)
- [specs/routes-content/template.md](routes-content/template.md)

### UX

- [specs/ux/README.ux.md](ux/README.ux.md)
- [specs/ux/accessibility.md](ux/accessibility.md)
- [specs/ux/design-system.md](ux/design-system.md)
- [specs/ux/interactions.md](ux/interactions.md)
- [specs/ux/template.md](ux/template.md)
