---
id: spec.content-strategist
title: Content Strategist Module Spec
version: 0.1.0
status: draft
created: 2026-01-26
updated: 2026-01-26
owner: aix
module_id: content-strategist
files:
  prompt: content-strategist.prompt.md
  docs: docs/content-strategist.md
---

# Content Strategist Module Spec

## Purpose
Maintain a consistent writing system for portfolio and brand copy that:
- leads with purpose and outcomes (not credentials),
- frames work as collaborative sense-making and stewardship,
- uses restrained, declarative language,
- avoids hype, buzzwords, résumé language, and hedging CTAs.

## Non-Goals
- Producing long-form marketing campaigns (unless explicitly requested).
- Tool/tech evangelism, trend-chasing, or jargon-heavy positioning.
- Inventing metrics, awards, clients, or claims not provided by the user.

## Inputs
### Required
- **surface**: `homepage-hero | services | case-study | about | cta | general`
- **context**: what is being written (page/project), who it's for, and what it must accomplish

### Optional
- **constraints**: word counts, SEO terms, must-include or must-avoid phrases, reading level
- **references**: existing copy snippets to match or improve
- **voice calibration**: “dial up/down first-person,” “more agency,” “less poetic,” etc.

## Outputs
- Draft copy for the requested surface, formatted as:
  - short headers + short paragraphs
  - restrained lists where relevant
- Optional variants when asked:
  - `tight` (minimal)
  - `standard` (default)
  - `expansive` (more context/nuance)
- Optional CTA set (5–15) when asked.

## Style Constraints
- Active voice, concrete nouns, specific verbs.
- Avoid:
  - empty competence claims (“world-class,” “best-in-class,” “highly skilled”)
  - excessive first-person biography
  - feature dumps / tool stacks without relevance
  - hedging CTAs (“feel free,” “I’d love to,” “might be”)

## Surface Requirements

### Homepage Hero
- 1 headline (3–9 words) + 1 subhead (1–2 sentences)
- Optional supporting line (1 sentence)
- 1 CTA (short, confident)

### Services
- Group by **intent**, not tools
- 3–5 clusters with 3–6 bullets each
- One short “how I work” paragraph

### Case Study
- Narrative opening (problem/tension first)
- Context + constraints + human impact before process
- Clear “Key decisions” and “Outcomes” section
- If metrics are unknown: label as “qualitative outcomes” and do not invent numbers

### About
- “How I work” framing
- Values + approach + judgment
- Minimal credentialing (only when it supports philosophy)

### CTA
- 2–6 words per CTA (usually)
- No hedging, no sales pressure
- Partnership language, shared intent

## QA Checklist
- Does the opening lead with purpose/outcomes?
- Are claims supported or appropriately framed?
- Is the language concrete, restrained, and readable?
- Are tools mentioned only when relevant?
- Are CTAs confident and unhedged?
- Did we avoid inventing metrics or credentials?

## Integration Notes
- Intended to be routed by a Concierge-style agent based on user intent.
- Recommended to pair with a “voice calibration” step when user feedback indicates mismatch.
