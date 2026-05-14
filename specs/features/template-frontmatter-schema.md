---
aix:
  id: aix.specs.features.template-frontmatter-schema
  role: Define the YAML frontmatter standard for Nunjucks template files to support DX and AIX discoverability.
  status: draft
  surface: internal
  owner: AIX
  tags:
    - templates
    - frontmatter
    - nunjucks
    - 11ty
    - discoverability
    - dx
    - aix-hygiene
  type: spec
  scope: frontend
  audience: maintainers
  perf:
    readPriority: high
    cacheSafe: true
    critical: false
---

# Template Frontmatter Schema

- **Title:** Template Frontmatter Schema
- **Owner(s):** AIX maintainers, Template Steward
- **Status:** draft
- **Scope:** Nunjucks template files in `frontend/views/` — layouts, pages, organisms, molecules, atoms. Does not apply to partials that are pure HTML fragments with no data contract.
- **Links:** [specs/features/markdown-frontmatter-schema.md](markdown-frontmatter-schema.md), [specs/features/js-frontmatter-schema.md](js-frontmatter-schema.md), [specs/features/file-aix-hygiene.md](file-aix-hygiene.md), [context/constraints.md](../../context/constraints.md)

---

## Goals

- Make template files self-describing so IDEs, Obsidian, and AIX agents can understand intent without reading markup or logic.
- Provide a stable, queryable metadata surface for tooling (linting, graph traversal, dependency auditing).
- Express the data contract (what a template expects and what it produces) inline with the source.
- Support safe-edit guidance for agents: what can be changed, what must not, and what changes should trigger review.
- Align with the AIX hygiene principle: metadata is drift-neutral — adding it does not change rendered output.

## Non-Goals

- Not a runtime config system; Eleventy must not rely on these fields for build behavior.
- Not a substitute for component or spec documentation.
- No freshness timestamps (use git metadata).
- Not required for pure-utility partials that carry no data contract (e.g., icon SVG wrappers).

---

## Format

Template frontmatter uses native YAML front matter at the top of the `.njk` file, delimited by `---` lines. Eleventy parses this block natively; the metadata keys defined here are intentionally namespaced to avoid collision with Eleventy-reserved keys.

### Canonical wrapper

```njk
---
template:
  id: "templates.home"
  name: "Home Page"
  type: "page"
  status: "active"

source:
  path: "frontend/views/pages/home.njk"
  engine: "nunjucks"
  eleventyLayout: true

purpose:
  summary: "Renders the primary landing page."
  role: "Combines hero, value proposition, featured work, and calls to action."

data:
  expects:
    - "landing"
    - "projects"
    - "recognition"
  provides:
    - "page structure"
    - "section ordering"

components:
  uses:
    - "organisms/hero/hero.njk"
    - "organisms/project-teasers/project-teasers.njk"
    - "molecules/card/project-card.njk"

contentModel:
  sanityTypes:
    - "landingPage"
    - "project"
    - "recognitionItem"

a11y:
  landmarks:
    - "main"
  headingContext:
    baseLevel: 1
    notes: "Section headings begin at h2; card headings should be context-aware."

design:
  system:
    - "portfolio"
    - "kinetic scroll"
    - "print-inspired layout"
  interactions:
    - "GSAP ScrollTrigger section intro/outro"
    - "pinned project card imagery"

dependencies:
  styles:
    - "tailwind"
  scripts:
    - "gsap"
    - "scrolltrigger"

agent:
  owner: "Template Steward"
  safeToEdit:
    - "frontmatter"
    - "comments"
  doNotEdit:
    - "rendered markup"
    - "Nunjucks logic"
  reviewTriggers:
    - "component path changes"
    - "Sanity schema changes"
    - "heading-level changes"

tags:
  - "template"
  - "homepage"
  - "11ty"
  - "nunjucks"
  - "sanity"
  - "gsap"
---
```

> **Eleventy `tags` note:** `tags` is also an Eleventy frontmatter key used for collection membership. This is intentional — Eleventy adding template files to tagged collections is acceptable and may be useful for tooling. If collection membership is explicitly undesired for a given file, add `eleventyExcludeFromCollections: true` to its frontmatter instead.

---

## Schema

All fields are optional unless marked **required**.

### `template` — Template identity

| Field             | Type   | Required | Description                                                                                                |
| ----------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `template.id`     | string | ✓        | Dot-delimited unique identifier. Convention: `templates.<scope>.<name>` (e.g. `templates.molecules.card`). |
| `template.name`   | string | ✓        | Human-readable display name.                                                                               |
| `template.type`   | enum   | ✓        | `page \| layout \| organism \| molecule \| atom \| partial`                                                |
| `template.status` | enum   | ✓        | `active \| draft \| deprecated \| experimental`                                                            |

### `source` — File provenance

| Field                   | Type    | Required | Description                                                                |
| ----------------------- | ------- | -------- | -------------------------------------------------------------------------- |
| `source.path`           | string  | ✓        | Workspace-relative path to this file.                                      |
| `source.engine`         | enum    |          | Template engine. Default: `nunjucks`.                                      |
| `source.eleventyLayout` | boolean |          | `true` if this file is used as an Eleventy layout (lives in `_includes/`). |

### `purpose` — Intent declaration

| Field             | Type   | Required | Description                                          |
| ----------------- | ------ | -------- | ---------------------------------------------------- |
| `purpose.summary` | string | ✓        | One sentence: what this template renders.            |
| `purpose.role`    | string |          | One sentence: how it fits the larger page or system. |

### `data` — Data contract

| Field           | Type     | Description                                                                                                       |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `data.expects`  | string[] | Named data sources this template depends on (Eleventy global data keys, frontmatter fields, or collection names). |
| `data.provides` | string[] | Structural outputs this template contributes (e.g. `"page structure"`, `"navigation context"`).                   |

### `components` — Composition graph

| Field             | Type     | Description                                                                             |
| ----------------- | -------- | --------------------------------------------------------------------------------------- |
| `components.uses` | string[] | Workspace-relative paths to child templates, partials, or macros included by this file. |

### `contentModel` — CMS binding

| Field                      | Type     | Description                                                   |
| -------------------------- | -------- | ------------------------------------------------------------- |
| `contentModel.sanityTypes` | string[] | Sanity schema type names this template renders or depends on. |

### `a11y` — Accessibility contract

| Field                           | Type     | Description                                                                                |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `a11y.landmarks`                | string[] | ARIA landmark roles present in this template's markup (e.g. `"main"`, `"nav"`, `"aside"`). |
| `a11y.headingContext.baseLevel` | integer  | The heading level this template introduces as its entry point (1–6).                       |
| `a11y.headingContext.notes`     | string   | Free-text notes about heading strategy within this template.                               |

### `design` — Design system membership

| Field                 | Type     | Description                                                                                                  |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `design.system`       | string[] | Named design systems or tokens this template belongs to (e.g. `"portfolio"`, `"kinetic scroll"`).            |
| `design.interactions` | string[] | Named interaction patterns or animation behaviors present (e.g. `"GSAP ScrollTrigger section intro/outro"`). |

### `dependencies` — Runtime dependencies

| Field                  | Type     | Description                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------------- |
| `dependencies.styles`  | string[] | CSS frameworks or token systems required (e.g. `"tailwind"`).                |
| `dependencies.scripts` | string[] | JavaScript libraries required at runtime (e.g. `"gsap"`, `"scrolltrigger"`). |

### `agent` — Agent guidance

| Field                  | Type     | Description                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `agent.owner`          | string   | Role or team responsible for this template.                                                                     |
| `agent.safeToEdit`     | string[] | Zones an agent may safely modify (e.g. `"frontmatter"`, `"comments"`).                                          |
| `agent.doNotEdit`      | string[] | Zones that must not be modified without explicit human approval (e.g. `"rendered markup"`, `"Nunjucks logic"`). |
| `agent.reviewTriggers` | string[] | Changes elsewhere that should prompt a review of this template (e.g. `"Sanity schema changes"`).                |

### `tags` — Discovery labels

| Field  | Type     | Description                                                                                                                                                       |
| ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tags` | string[] | Short labels for search, graph traversal, and Obsidian linking. Eleventy will add files bearing these tags to matching collections — this is acceptable behavior. |

---

## Parsing rules

- The frontmatter block must be the **first content** in the file — no leading whitespace, BOM, or Nunjucks comments above it.
- Only the first `---`-delimited block is parsed.
- All values are informational metadata. No field in this schema controls Eleventy build behavior.
- Fields may be omitted when not applicable to a given template type (e.g., `a11y.headingContext` is irrelevant for icon partials).
- `template.id` must be unique across the `frontend/views/` tree. Convention: mirror directory structure (`templates.organisms.hero`).

---

## Acceptance Criteria

- [ ] Every template file in `frontend/views/` that carries a data contract has a conforming frontmatter block.
- [ ] `template.id` values are unique across the template tree.
- [ ] `source.path` resolves to the file's actual workspace-relative location.
- [ ] `agent.doNotEdit` is present on all page and layout templates.
- [ ] No frontmatter key collides with an Eleventy-reserved key in a way that alters build output.
- [ ] Files are findable in Obsidian via `tags` or `template.type` property search.
- [ ] A lint rule or AIX hygiene check can validate required fields without reading past the frontmatter block.

---

## Dependencies & Risks

- **Eleventy `tags` behavior:** The `tags` key is consumed by Eleventy for collection membership. This is accepted — template files appearing in tagged collections is harmless and potentially useful. If a specific file must be excluded, add `eleventyExcludeFromCollections: true` to its frontmatter.
- **Eleventy `layout` collision:** Do not add a `layout:` key here; use `source.eleventyLayout` instead.
- **Parser performance:** Frontmatter is parsed at build time by Eleventy for all template files. Schema fields are exposed as template data variables — keep values inert (no callable objects).
- **Drift risk:** `components.uses` and `contentModel.sanityTypes` can become stale if refactors are not accompanied by frontmatter updates. `agent.reviewTriggers` exists to flag this.

---

## Decisions

- **Why native YAML frontmatter, not Nunjucks comments?** Obsidian, VS Code YAML extensions, and most IDE tooling parse native `---` frontmatter. Nunjucks `{# #}` comments are invisible to non-Nunjucks tooling.
- **Why namespace under domain keys (`template:`, `source:`, etc.) rather than under `aix:`?** Template metadata has value beyond AIX — IDE hover, Obsidian graph, human readers. The `aix:` namespace is reserved for AIX hygiene fields on Markdown and JS files. Cross-file schema consistency is maintained by keeping `aix:` off template files.
- **Why include `agent` guidance inline?** Keeps the edit contract co-located with the file it governs, reducing the chance an agent modifies the wrong zone without context.

---

## Open Questions

- Should `components.uses` be validated against the actual filesystem at lint time?
- Should `template.id` be enforced as a unique constraint by a pre-commit hook?
- Is `a11y.headingContext.baseLevel` sufficient, or do we need full heading-level maps for complex templates?
