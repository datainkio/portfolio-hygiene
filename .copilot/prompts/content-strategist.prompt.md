---
id: content-strategist
title: Content Strategist
type: prompt-module
version: 0.1.0
status: draft
owner: aix
created: 2026-01-26
updated: 2026-01-26
purpose: Shape confident, human-centered copy that emphasizes clarity, collaboration, and long-term impact over self-promotion.
audience: Smart, experienced stakeholders who value judgment, substance, and stewardship.
tone:
  - calm
  - declarative
  - collaborative
  - outcome-driven
inputs:
  required:
    - surface: One of [homepage-hero, services, case-study, about, cta, general]
    - context: What is being written (project/page), who it's for, and what it must accomplish
  optional:
    - constraints: word counts, SEO terms, brand terms to include/avoid, reading level
    - references: existing copy snippets to match or improve
outputs:
  - draft copy for the requested surface
  - optional: rewrite variants (tight, standard, expansive) when asked
  - optional: CTA set (5-15 options) when asked
avoid:
  - hype
  - buzzwords
  - résumé language
  - tool lists (unless directly relevant)
  - hedging CTAs
triggers:
  - "write homepage hero"
  - "rewrite my about page"
  - "services copy"
  - "case study"
  - "CTA"
  - "tone match"
  - "brand voice"
success_criteria:
  - leads with purpose/outcome over credentials
  - uses active voice and restrained language
  - frames work as collaborative sense-making and stewardship
  - ends with calm, confident invitation (when appropriate)
---

# content-strategist.prompt.md

**Purpose:** Shape confident, human-centered copy that emphasizes clarity, collaboration, and long-term impact over self-promotion.  
**Audience:** Smart, experienced stakeholders who value judgment, substance, and stewardship.  
**Tone:** Calm, declarative, collaborative, outcome-driven.  
**Avoid:** Hype, buzzwords, résumé language, tool lists (unless directly relevant), hedging CTAs.

---

## Module Scope
This module generates and refines copy for key portfolio and brand surfaces using a disciplined, narrative-first approach informed by best-in-class experience design studios—adapted for an independent practice.

Primary surfaces covered:
- Homepage hero
- Services / capabilities
- Case studies
- About page
- Calls to action
- General-purpose refinement

---

## 2. Homepage Hero Prompt

**Use when:** Writing or refining the homepage introduction.

**Prompt:**
Write a homepage hero for an independent designer and creative technologist. Lead with purpose and outcome, not credentials. Use a confident, declarative headline followed by a concise subhead that frames the work as collaborative problem-solving. Emphasize clarity, systems thinking, and human-centered outcomes. Avoid résumé language, hype, and tool lists. Close with a calm, confident call to action that signals partnership rather than availability.

---

## 3. Services / Capabilities Prompt

**Use when:** Writing a “What I Do” or “Services” section.

**Prompt:**
Write a services section that groups work by intent rather than tools. Frame services as responses to real organizational needs (e.g., sense-making, alignment, stewardship). Use short section headers, brief explanatory copy, and restrained lists. Emphasize collaboration, adaptability, and long-term impact. Avoid sales language, buzzwords, and exhaustive deliverables. Assume competence and speak to an experienced audience.

---

## 4. Case Study Prompt

**Use when:** Writing or revising project case studies.

**Prompt:**
Write a case study that reads as a narrative, not a project report. Begin with the underlying problem or tension rather than the solution. Describe context, constraints, and human impact before process or artifacts. Position the author as a thinking partner working across disciplines. Emphasize insight, decision-making, and outcomes over tools and outputs. Use clear, confident language and avoid self-congratulatory tone.

**Optional structure:**
Context → Framing the Problem → Approach → Key Decisions → Outcome & Learning

---

## 5. About Page Prompt

**Use when:** Writing or refining the About page.

**Prompt:**
Write an About page focused on how the author thinks and works rather than who they are. Emphasize values, approach, and judgment. Use calm, declarative language to describe interests in systems, people, and long-term stewardship. Assume credibility; reference experience only when it supports philosophy. Avoid personal trivia, career timelines, or exaggerated self-description.

---

## 6. Calls to Action (CTA) Prompt

**Use when:** Generating CTAs across the site.

**Prompt:**
Write short, confident calls to action that invite collaboration without hedging or sales pressure. Use direct, human language. Avoid phrases like “feel free,” “I’d love to,” or “might be a good fit.” Each CTA should suggest shared intent and agency, not availability or permission.

---

## All-Purpose Writing Prompt

**Use when:** General drafting or refinement across any surface.

**Prompt:**
Write confident, human-centered copy for an experienced designer and creative technologist. Prioritize clarity, shared goals, and long-term impact over self-promotion. Use declarative statements, active voice, and restrained language. Frame work as collaborative sense-making across systems, people, and technology. Avoid hype, buzzwords, résumé language, and tool lists unless directly relevant. Write for a smart, skeptical audience that values judgment and substance.

---

## Output Guidelines
- Prefer short paragraphs and clear headers.
- Assume reader intelligence; do not over-explain.
- Optimize for legibility, not persuasion tricks.
- End sections with calm, confident invitations to engage.
