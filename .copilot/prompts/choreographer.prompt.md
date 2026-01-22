# Copilot Prompt Module: Choreographer (GSAP vs Tailwind)
> Decide and outline motion implementation using the choreographer spec.

## Purpose
Produce a deterministic GSAP vs Tailwind recommendation and an implementation plan that conforms to the motion system.

## Triggers (use when…)
- User asks how to implement/choose motion, choreography, ScrollTrigger, or reduced-motion behavior.
- Need a GSAP vs Tailwind decision, including file paths and hooks.
- Planning a motion sequence (init/kill, scenes, tokens, hooks) without yet writing code.

## Non-triggers
- Pure code edits (route to implementer/choreography-implementation in frontend repo).
- Non-motion UI tasks.

## Primary Output (Type: Choreography Decision Packet)
Structured response with:
1) Decision + scorecard (Tailwind score, GSAP score, winner, tie-break?)
2) Rationale (3–5 bullets mapped to rubric factors)
3) Implementation plan (files/paths, hooks/selectors, token usage, teardown expectations)
4) Reduced-motion behavior (disable/simplify plan)
5) Performance risks + mitigations
6) Validation checklist (functional, visual, performance, reduced motion)
7) Assumptions/gaps

Scorecard example (embed in responses):
```
Decision: GSAP (tie-breaker not needed)
Scores: Tailwind 3 vs GSAP 7
Tailwind points: +1 CSS-native; +1 <= ~6 targets; +1 other minor factor
GSAP points: +2 timeline; +2 scroll; +1 reversible; +2 bias
```
Always list the factors contributing to each score so the choice is auditable.

## Inputs to read first
- specs/animation/choreographer.animation-spec.md (this is the contract)
- Motion tokens/configs: specs/animation/motion.tokens.js, specs/animation/tailwind.motion.config.cjs
- Motion accessibility: specs/animation/motion-accessibility-policy.md
- If provided: page/template references, asset links, user requirements

## Process (rubric -> decision)
- Start scores: GSAP +2, Tailwind 0
- Tailwind: +2 single 2-state, no scroll, no measurement; +1 CSS-native or state-class only; +1 <= ~6 targets, no sequencing
- GSAP: +2 timeline/choreography; +2 scroll-linked; +2 measurement/auto-height/FLIP; +1 reversible; +1 > ~6 targets or list/grid; +1 reusable scene
- Pick higher score; tie-breaker → GSAP
- Emit the scorecard in the output

## File/Hook conventions (cite in plan)
- Hooks: data-anim="<scene>" on root; data-anim-item on children; optional data-anim-trigger override
- GSAP scene files: frontend/js/choreography/sections/<Scene>/<Scene>.js (or sequences/ for multi-section); export init(root, opts)/kill()
- Registration: via Director/Stage wiring (e.g., Director.js) to centralize lifecycle/bus
- Shared helpers: frontend/js/choreography/{managers,utils}/ for reduced-motion guards, measurement utilities
- Tailwind: use motion-safe/motion-reduce utilities emitted by tailwind.motion.config.cjs; avoid ad-hoc durations/eases

## Reduced motion
- Always state disable vs simplify; default: disable decorative, simplify essential
- GSAP: gate with isReducedMotion(), shorten timelines, remove scroll-scrub/pin, use rest states or minimal fades
- Tailwind: provide motion-reduce variants and non-motion affordances

## Performance notes
- Prefer transform/opacity; avoid layout anims unless justified
- Minimize ScrollTrigger count; batch where possible; lazy-init scenes via hooks
- Call out measurement strategy and teardown expectations (kill removes triggers/listeners)

## Output style
- Be concise; use bullets; cite paths/hooks; include the scorecard
- If inputs are missing (no template/page info), state assumptions and mark paths as TBD

## Blocking question (only if required)
If you cannot pick GSAP vs Tailwind without page/interaction details, ask for the interaction description and target elements; otherwise proceed with reasonable assumptions.
