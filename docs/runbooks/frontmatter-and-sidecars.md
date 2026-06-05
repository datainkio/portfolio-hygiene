---
title: "Runbook: Frontmatter and Sidecars"
description: "How to add frontmatter to every file and create sidecar .md files for non-Markdown source files."
docType: "guide"
status: "active"
owner: "aix"
tags:
  - system/frontmatter
  - dx/sidecars
  - tooling/Obsidian
  - aix
  - dx/conventions
  - aix/runbook
permalink: false
aliases:
  - "Frontmatter Runbook"
  - "Sidecar Conventions"
aix:
  intent: "guide"
  audience:
    - frontend
    - backend
    - aix
  canonical: true
---

# Runbook: Frontmatter and Sidecars

## Rule

Every file authored or created in this workspace must have frontmatter. If the file type cannot carry frontmatter (`.js`, `.ts`, `.njk`, `.css`, etc.), create a co-located `.md` sidecar.

**Primary consumers:** Obsidian (discoverability, vault search, graph) and AIX (intent classification, audience routing, context indexing).

---

## When to add to the file vs. a sidecar

| File type            | Action                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------- |
| `.md`                | Add frontmatter directly at the top of the file                                         |
| `.njk`               | Create a sibling `.md` sidecar (e.g. `bio.njk` → `bio.md`)                              |
| `.js` / `.ts`        | Create a sibling `.md` sidecar                                                          |
| `.css`               | Create a sibling `.md` sidecar only if the file is a significant design-system artifact |
| Auto-generated files | No frontmatter or sidecar — annotate the generator instead                              |

---

## Frontmatter schema

Canonical schema for reference and documentation `.md` files. See [`frontend/docs/ia/frontmatter.md`](../../../frontend/docs/ia/frontmatter.md) for the Eleventy IA variant.

```yaml
---
title: "Human-readable title"
description: "One-sentence summary of purpose."
docType: "reference" # reference | index | pattern | guide | content-contract
status: "active" # draft | active | deprecated | archived
owner: "frontend" # frontend | backend | content | aix
tags:
  - hyphenated-tag # Obsidian: hyphenated list items, NOT inline array
  - another-tag
permalink: false # include on non-page docs to suppress Eleventy output
aliases:
  - "Alternate Name" # Obsidian vault search aliases
aix:
  intent: "reference" # reference | index | guide | content-contract | pattern
  audience:
    - frontend
  canonical: true
---
```

### Required fields (minimum viable frontmatter)

`title`, `description`, `docType`, `status`, `owner`, `tags`

---

## Sidecar schema (template / component files)

For `.njk` sidecars, extend the base schema with template-specific fields. Use existing sidecars in `frontend/views/` as the reference (e.g. [`frontend/views/pages/project/project.md`](../../../frontend/views/pages/project/project.md)).

```yaml
---
title: "ComponentName"
description: "One-sentence summary."
template: "[[component.njk]]" # Obsidian wiki-link to the source file
templatePath: "views/path/to/component.njk"
engine: "Nunjucks"
system: "Eleventy"
type: "template"
templateRole: "page" # page | layout | partial | macro
atomicLevel: "molecule" # atom | molecule | organism | template | page
status: "active"
tags:
  - nunjucks
  - template
  - molecule
---
```

---

## Obsidian conventions

- **Tags:** always as hyphenated list items — `- my-tag` — not inline `[my-tag, other-tag]`.
- **Internal links:** use wiki-link format `[[filename]]` for cross-references within the vault.
- **`aliases`:** add alternate names so Obsidian's `[[` autocomplete and graph search surface the file under multiple names.
- **`permalink: false`:** include on all non-routable docs inside the `ia/` or `views/` trees to prevent Eleventy from trying to output them as pages.

---

## Decision rules for docType

| docType            | Use when                                                       |
| ------------------ | -------------------------------------------------------------- |
| `reference`        | Lookup doc: schema, API, field table, projection/query anatomy |
| `index`            | Lists and links to child docs; no content of its own           |
| `guide`            | How-to / runbook with ordered steps                            |
| `pattern`          | Composition / page-level structure doc                         |
| `content-contract` | CMS document shape and field contract                          |

---

## Checks

After creating or editing a file:

- [ ] Frontmatter is present (either in the file or a sidecar)
- [ ] `title` and `description` are filled in (not placeholder text)
- [ ] Tags are hyphenated list items
- [ ] `permalink: false` is set on non-routable docs
- [ ] Sidecar filename matches source file exactly (only extension differs)

---

## Related

- Canonical Eleventy frontmatter schema: [`frontend/docs/ia/frontmatter.md`](../../../frontend/docs/ia/frontmatter.md)
- Example sidecar: [`frontend/views/pages/project/project.md`](../../../frontend/views/pages/project/project.md)
- Constraint entry: [`context/constraints.md`](../../context/constraints.md)
