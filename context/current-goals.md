---
aix:
  id: aix.context.current-goals
  role: Time-bound priorities for the workspace.
  status: stable
  surface: internal
  owner: AIX
  type: context
  scope: aix
  audience: maintainers
  perf:
    readPriority: high
    cacheSafe: true
    critical: true
---

# Current Goals

This file is the single-source-of-truth for what matters _right now_.

## Now

- [ ] TODO: Write the spec for the project page view.
- [ ] TODO: Confirm required project data from Sanity is available to 11ty.
- [ ] FEAT: Create a page template to display the complete view of a project.
- [ ] FEAT: Design the page template and render the project data.
- [ ] TODO: Test and confirm responsiveness at default breakpoints defined by Tailwind (base, sm, md, lg, xl).
- [ ] TODO: Address any weirdness on Safari/iOS.
  - Issue: [#44](https://github.com/datainkio/portfolio-governance/issues/44)

## Next

**User guide — content-model drift:**

- [ ] BUG: Update [patterns/userGuide](content-model/patterns/userGuide.md): correct layout reference from `landing.njk` to `base.njk`.
- [ ] TODO: Update [singletons/userGuide](content-model/documents/singletons/userGuide.md): rename body field `valuePropRichText` → `pageBody` and add the `pageAbstract` string field.
- [ ] TODO: Update [pages/user-guide](content-model/contracts/pages/user-guide.md): document `pageAbstract` and its computed `abstract` key.

**Workspace context drift:**

- [ ] BUG: Fix [portfolio-frontend](aix/context/projects/portfolio-frontend.md): correct stale template path `njk/` → `views/`.
- [ ] TODO: Update [README.content-model](content-model/README.content-model.md): add `contracts/`, `objects/`, and `taxonomies/` to the folder structure map.

**11ty config improvements (from code review):**

- [ ] TODO: Remove or implement the placeholder [eleventy/collections/documentation.js](frontend/eleventy/collections/documentation.js) — an empty-array collection occupies a name and misleads readers of `index.js`.
- [ ] TODO: Gate the HTML minifier transform in [eleventy/plugins/plugins.js](frontend/eleventy/plugins/plugins.js) behind `NODE_ENV === 'production'` so dev builds stay readable.
- [ ] TODO: Refactor `NavigationBuilder.buildNestedStructure()` from O(n²) to O(n) using a Map-based parent lookup.
- [ ] TODO: Reconcile the two-file `_registry` split: merge `_registry.md` docs into `_registry.njk` or make their distinct roles explicit.
- [ ] TODO: Replace the module-scope SVG cache in [eleventy/filters/file.js](frontend/eleventy/filters/file.js) (`inlineSvgFromUrl`) with `@11ty/eleventy-fetch` so the cache is file-system backed and consistent across build modes.
- [ ] FEAT: Add Sanity fetch freshness logging (cache hit vs. network) to match the `TailwindLogger` pattern — closes a DX blind spot during local development.

**Other:**

- [ ] TODO: Build the migration plan away from the current state of prod to this newest version.
- [ ] TODO: Complete AIX hygiene pass closeout: canonicalize backlog ownership and record a dated validation snapshot.
- [ ] TODO: Complete cinematic pacing pass: tighten video/hero handoff overlap, tune section transitions (hero/bio/awards), verify scroll re-entry behavior, and update choreography docs/context.
- [ ] TODO: Validate landing sequence behavior with focused runtime checks and update choreography docs/context where behavior contracts changed.
- [ ] TODO: Document coding conventions and standards.
- [ ] TODO: Add sidecar files for JS files.

## Not Now

- [ ] TODO: Tighten documentation for `eleventy/services/NavigationBuilder.njk` — current file is excessively long and difficult to navigate.
- [ ] TODO: Update links in sidecar files to target the relevant sidecar files, not the implementation. Goal: improve findability and discoverability within Obsidian.
- [ ] TODO: Develop the browser-accessible documentation spec for making documentation available to remote agents.
- [ ] FEAT: Integrate project management tasks into the Majordomo custom agent (e.g., automated sync of project backlog with `current-goals.md`).
- [ ] TODO: Auto-generated global inventories (a full ToC of every log file) in the workspace map.
- Do not implement heavy automation for logging/indexing until the evidence loop stabilizes and proves it saves time.
- Do not run broad refactors inside mounted projects in the name of "cleanup" unless explicitly approved.

## Notes

- Keep each section between 3 and 7 bullets for signal quality.
- Promote stable constraints or workflows into `specs/` and remove them from active goals.
- Track long-form implementation logs in `docs/logs/` rather than expanding this file.
- Tracking issue: [#16](https://github.com/datainkio/portfolio-governance/issues/16)

### What good looks like (AIX-first)

- Lower TTUO: it is obvious where to put and find Concierge outputs.
- Lower CR: fewer ambiguous module selections and fewer competing sources of truth.
- Higher CUS: outputs consistently cite the relevant constraints, runbooks, and artifacts.
- Less drift: navigation pointers stay stable, and detailed inventories live near what they index.
