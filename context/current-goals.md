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

- [ ] Display the singleton User Guide on its own page.
- [ ] Fix [[userGuideProjection.js]]: `pageAbstract` is traversed as Portable Text but is a plain `string`; `pageBody` is not projected at all.
- [ ] Fix [[transforms/user-guide.js]]: reads `valuePropRichText` to build `bodyHtml`; the correct field is `pageBody`.
- [ ] Write the spec for the project page view.
- [ ] Create a page template to display the complete view of a project.
- [ ] Confirm require project data from Sanity is available to 11ty.
- [ ] Design the page template and render the project data.
- [ ] Test and confirm responsiveness at default breakpoints defined by Tailwind (base, sm, md, lg, xl).
- \[ \] Issue URL: https://github.com/datainkio/portfolio-governance/issues/44
- [ ] Address any weirdness on Safari/iOS.

## Next

**User guide — content-model drift:**

- [ ] Update [[singletons/userGuide|content-model/documents/singletons/userGuide.md]]: rename body field `valuePropRichText` → `pageBody` and add the `pageAbstract` string field.
- [ ] Update [[pages/user-guide|content-model/contracts/pages/user-guide.md]]: document `pageAbstract` and its computed `abstract` key.
- [ ] Update [[patterns/userGuide|content-model/patterns/userGuide.md]]: correct layout reference from `landing.njk` to `base.njk`.

**Workspace context drift:**

- [ ] Update [[README.content-model|content-model/README.content-model.md]]: add `contracts/`, `objects/`, and `taxonomies/` to the folder structure map.
- [ ] Fix [[portfolio-frontend|aix/context/projects/portfolio-frontend.md]]: correct stale template path `njk/` → `views/`.

**11ty config improvements (from code review):**

- [ ] Gate the HTML minifier transform in [[eleventy/plugins/plugins.js]] behind `NODE_ENV === 'production'` so dev builds stay readable.
- [ ] Replace the module-scope SVG cache in [[eleventy/filters/file.js]] (`inlineSvgFromUrl`) with `@11ty/eleventy-fetch` so the cache is file-system backed and consistent across build modes.
- [ ] Remove or implement the placeholder [[eleventy/collections/documentation.js]] — an empty-array collection occupies a name and misleads readers of `index.js`.
- [ ] Add Sanity fetch freshness logging (cache hit vs. network) to match the `TailwindLogger` pattern — closes a DX blind spot during local development.
- [ ] Refactor `NavigationBuilder.buildNestedStructure()` from O(n²) to O(n) using a Map-based parent lookup.
- [ ] Reconcile the two-file `_registry` split: merge `_registry.md` docs into `_registry.njk` or make their distinct roles explicit.

**Other:**

- [ ] Add sidecar files for JS files.
- [ ] Document coding conventions and standards.
- [ ] Complete cinematic pacing pass: tighten video/hero handoff overlap, tune section transitions (hero/bio/awards), verify scroll re-entry behavior, and update choreography docs/context.
- [ ] Validate landing sequence behavior with focused runtime checks and update choreography docs/context where behavior contracts changed.
- [ ] Complete AIX hygiene pass closeout: canonicalize backlog ownership and record a dated validation snapshot.
- [ ] Build the migration plan away from the current state of prod to this newest version.

## Not Now

- [ ] Update links in sidecar files to target the relevant sidecar files, not the implementation. The goal is to improve findability and discoverability within Obsidian, which is designed for Markdown files only.
- [ ] Tighten up documentation for /eleventy/services/NavigationBuilder.njk. That shit is wayyy to long and unreadable.
- [ ] Integrate project management tasks into the Majordomo custom agent. For example, automating synchronization of the project backlog with current-goals.md.
- [ ] Develop the browser-accessible documentation spec for making documentation available to remote agents.
- [ ] Auto-generated global inventories (a full ToC of every log file) in the workspace map.
- [ ] Heavy automation for logging/indexing until the evidence loop stabilizes and proves it saves time.
- [ ] Broad refactors inside mounted projects in the name of “cleanup” (unless explicitly approved).

## Notes

- Keep each section between 3 and 7 bullets for signal quality.
- Promote stable constraints or workflows into `specs/` and remove them from active goals.
- Track long-form implementation logs in `docs/logs/` rather than expanding this file.
- Tracking issue: https://github.com/datainkio/portfolio-governance/issues/16

### What good looks like (AIX-first)

- Lower TTUO: it is obvious where to put and find Concierge outputs.
- Lower CR: fewer ambiguous module selections and fewer competing sources of truth.
- Higher CUS: outputs consistently cite the relevant constraints, runbooks, and artifacts.
- Less drift: navigation pointers stay stable, and detailed inventories live near what they index.
