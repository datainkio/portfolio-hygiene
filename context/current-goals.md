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
- [ ] FEAT: Create and design the project page template; render the project data.
- [ ] TODO: Test and confirm responsiveness at default breakpoints defined by Tailwind (base, sm, md, lg, xl).
- [ ] TODO: Address any weirdness on Safari/iOS.
  - Issue: [#44](https://github.com/datainkio/portfolio-governance/issues/44)

## Next

**User guide — content-model drift:**

- [ ] TODO: Update [singletons/userGuide](content-model/documents/singletons/userGuide.md) and [pages/user-guide](content-model/contracts/pages/user-guide.md): rename `valuePropRichText` → `pageBody`, add `pageAbstract` field, and document its computed `abstract` key.

**Workspace context drift:**

- [ ] TODO: Update [README.content-model](content-model/README.content-model.md): add `contracts/`, `objects/`, and `taxonomies/` to the folder structure map.

**Other:**

- [ ] TODO: Build the migration plan away from the current state of prod to this newest version.
- [ ] TODO: Complete cinematic pacing pass: tighten video/hero handoff overlap, tune section transitions (hero/bio/awards), verify scroll re-entry behavior, validate landing sequence, and update choreography docs/context.
- [ ] TODO: Complete AIX hygiene pass closeout: canonicalize backlog ownership and record a dated validation snapshot.

## Not Now

- [ ] TODO: Update links in sidecar files to target the relevant sidecar files, not the implementation. Goal: improve findability and discoverability within Obsidian.
- [ ] TODO: Develop the browser-accessible documentation spec for making documentation available to remote agents.
- [ ] FEAT: Integrate project management tasks into the Majordomo custom agent (e.g., automated sync of project backlog with `current-goals.md`).
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
