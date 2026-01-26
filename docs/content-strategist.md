---
id: docs.content-strategist
title: Content Strategist Module Documentation
version: 0.1.0
status: draft
created: 2026-01-26
updated: 2026-01-26
module_id: content-strategist
---

# Content Strategist (Prompt Module)

## What this module does
This module drafts and refines portfolio/brand copy using a disciplined, narrative-first voice:
- purpose/outcome first
- calm confidence (no hype)
- collaboration and stewardship framing
- concise structure (headers + short paragraphs)

## When to use it
Use this module when you want:
- a homepage hero that signals intent and partnership
- services copy grouped by intent (not tools)
- case studies written as narratives with outcomes
- an About page focused on approach and judgment
- CTAs that feel firm and human (no hedging)

## How to call it
Provide:
- **surface**: `homepage-hero | services | case-study | about | cta | general`
- **context**: what you’re writing, who it’s for, what it must accomplish
Optionally provide:
- constraints (length, terms to include/avoid)
- references (existing copy to match)
- calibration notes (“more agency,” “less first-person,” etc.)

### Example calls

**Homepage hero**
- surface: homepage-hero
- context: Personal portfolio homepage for an experience design + creative tech practice focused on clarity in complex systems.
- constraints: headline <= 8 words; subhead <= 2 sentences; 1 CTA.

**Services**
- surface: services
- context: Independent practice offering research, IA, design systems, and implementation support for teams dealing with complex platforms.
- constraints: 4 clusters; each cluster 4 bullets.

**Case study**
- surface: case-study
- context: Redesign and system cleanup for a content-heavy site with unclear ownership and inconsistent IA.
- constraints: include “Key decisions” and “Outcomes”; do not mention tools unless necessary.

**CTAs**
- surface: cta
- context: CTAs for homepage and project pages; confident, partnership-oriented.
- constraints: 10 options; 2–6 words each.

## Output expectations
- Clear headers
- Short paragraphs
- No invented metrics or credentials
- Tools only when relevant
- Confident, unhedged CTA when appropriate
