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

- [ ] Create a page template to display the complete view of a project.
- [ ] Confirm require project data from Sanity is available to 11ty.
- [ ] Design the page template and render the project data.
- [ ] Test and confirm responsiveness at default breakpoints defined by Tailwind (base, sm, md, lg, xl).
- \[ \] Issue URL: https://github.com/datainkio/portfolio-governance/issues/43
- [ ] Address any weirdness on Safari/iOS.
- [x] Complete the active landing-page UX flow with seamless choreography (video -> hero -> bio -> awards) and a clean handoff into downstream content.
- [x] Display block content within the Bio section.

## Next

- [ ] Execute cinematic pacing pass: tighten video/hero handoff overlap and verify scroll re-entry behavior.
- [ ] Complete AIX hygiene pass closeout: canonicalize backlog ownership and record a dated validation snapshot.
- [ ] Build the migration plan away from the current state of prod to this newest version.
- [ ] Validate landing sequence behavior with focused runtime checks and update choreography docs/context where behavior contracts changed.
- [ ] Tune cinematic pacing and overlap between sections (video/hero handoff, hero/bio/awards transitions, reduced-motion behavior).
- [x] Support content strategy through frontmatter and templates.
- [ ] Document coding conventions and standards.
- [x] Complete Sanity adoption hardening and remove residual legacy migration wording from active docs.
- [x] Iterate on the frontend domain module (post-MVP refinements) after MVP behavior stabilizes.

## Done (recent)

- [x] Prepare to share project with Sam by updating /aix/README. Prioritize high-level documentation of the agent modules.
- [x] Preserve preload UX contract: Hero intro must follow BG Video intro completion (no early hero start).
- [x] Keep AIX optimized for this workstream by maintaining accurate context and routing signals (especially `current-goals.md`) so execution stays focused.
- [x] Stabilized choreography baseline for landing flow (hero/awards lifecycle reliability, hero re-entry event semantics, and DOM contract alignment).
- [x] Removed inline "Last updated" stamps and codified repo-signal freshness policy.
- [x] Added the AIX hygiene recovery pass to active execution and scoped it to conservative checks first.

## Not Now

- [ ] Integrate project management tasks into the Majordomo custom agent. For example, automating synchronization of the project backlog with current-goals.md.
- [ ] Develop the browser-accessible documentation spec for making documentation available to remote agents.
- [ ] Improve drift gate messaging surfaced by VS Code (keep it short and actionable)
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
