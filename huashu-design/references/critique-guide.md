# In-Depth Design Critique Guide

> Detailed reference for Phase 7. Provides scoring criteria, scenario-specific focus areas, and a checklist of common issues.

---

## Scoring Criteria Explained

### 1. Philosophy Alignment

| Score | Standard |
|------|------|
| 9-10 | The design fully embodies the core spirit of the chosen philosophy, and every detail has a philosophical basis |
| 7-8 | The overall direction is correct, the core traits are present, and only a few details drift |
| 5-6 | The intention is visible, but execution mixes in elements from other styles and lacks purity |
| 3-4 | Only superficial imitation, without understanding the philosophical core |
| 1-2 | Largely unrelated to the chosen philosophy |

**Review points**:
- Does it use the signature techniques of the chosen designer or studio?
- Do the color, typography, and layout match that philosophical system?
- Are there any self-contradictory elements? (For example, choosing Kenya Hara but cramming in content)

### 2. Visual Hierarchy

| Score | Standard |
|------|------|
| 9-10 | The viewer's eye naturally flows along the intended path, with near-zero friction in understanding the information |
| 7-8 | The primary and secondary relationships are clear, with only 1-2 slightly ambiguous moments |
| 5-6 | Title vs body can be distinguished, but the middle layers are messy |
| 3-4 | Information is flattened, with no clear visual entry point |
| 1-2 | Chaotic; the viewer does not know where to look first |

**Review points**:
- Is the type-size contrast between title and body strong enough? (At least 2.5x)
- Do color / weight / size establish 3-4 clear hierarchy levels?
- Does whitespace guide the eye?
- The squint test: if you squint, is the hierarchy still obvious?

### 3. Craft Quality

| Score | Standard |
|------|------|
| 9-10 | Pixel-level precision; alignment, spacing, and color use show no visible flaws |
| 7-8 | Polished overall, with only 1-2 minor alignment or spacing issues |
| 5-6 | Basically aligned, but spacing is inconsistent and color usage lacks system |
| 3-4 | Obvious alignment mistakes, messy spacing, too many colors |
| 1-2 | Rough and draft-like |

**Review points**:
- Is there a consistent spacing system (such as an 8pt grid)?
- Is spacing consistent across similar elements?
- Is the number of colors controlled? (Usually no more than 3-4)
- Are font families controlled? (Usually no more than 2)
- Are edge alignments precise?

### 4. Functionality

| Score | Standard |
|------|------|
| 9-10 | Every design element serves the goal, with zero redundancy |
| 7-8 | Clearly functional, with only a small amount of removable decoration |
| 5-6 | Basically usable, but decorative elements noticeably distract from the message |
| 3-4 | Form dominates function, and the user has to work to find information |
| 1-2 | Completely buried under decoration and loses its ability to communicate |

**Review points**:
- If you remove any one element, does the design get worse? (If not, remove it)
- Are the CTA and key information in the most prominent positions?
- Are there elements that were added only because they "look nice"?
- Does the information density match the medium? (PPT should not be too dense; PDF can be denser)

### 5. Originality

| Score | Standard |
|------|------|
| 9-10 | Refreshing and memorable; finds a distinct expression within the chosen philosophy |
| 7-8 | Shows independent thinking instead of simple template reuse |
| 5-6 | Competent but template-like |
| 3-4 | Relies heavily on clichés (such as gradient spheres to represent AI) |
| 1-2 | Pure template or asset collage |

**Review points**:
- Does it avoid common clichés? (See "Common Issue Checklist" below)
- Does it preserve personal expression while following the design philosophy?
- Are there design decisions that feel "unexpected but right"?

---

## Scenario-Specific Review Focus

Different output types need different review priorities:

| Scenario | Most Important Dimension | Second Priority | Can Be Relaxed |
|------|-----------|--------|--------|
| WeChat article cover / supporting visual | Originality, visual hierarchy | Philosophy alignment | Functionality (single image, no interaction) |
| Infographic | Functionality, visual hierarchy | Craft quality | Originality (accuracy first) |
| PPT / Keynote | Visual hierarchy, functionality | Craft quality | Originality (clarity first) |
| PDF / white paper | Craft quality, functionality | Visual hierarchy | Originality (professionalism first) |
| Landing page / website | Functionality, visual hierarchy | Originality | - (all dimensions matter) |
| App UI | Functionality, craft quality | Visual hierarchy | Philosophy alignment (usability first) |
| Xiaohongshu visual | Originality, visual hierarchy | Philosophy alignment | Craft quality (atmosphere first) |

---

## Top 10 Common Design Problems

### 1. AI-Tech Clichés
**Problem**: gradient spheres, digital rain, blue circuit boards, robot faces
**Why it is a problem**: users are already numb to these visuals, so they cannot distinguish your work from anyone else's
**Fix**: replace literal symbols with abstract metaphors (for example, use a metaphor of "dialogue" instead of a chat-bubble icon)

### 2. Weak Type Hierarchy
**Problem**: title and body text are too close in size (<2.5x)
**Why it is a problem**: the user cannot quickly locate key information
**Fix**: the title should be at least 3x the body size (for example, body 16px -> title 48-64px)

### 3. Too Many Colors
**Problem**: 5+ colors with no clear priority
**Why it is a problem**: visual chaos and weak brand presence
**Fix**: limit to 1 primary + 1 secondary + 1 accent + neutrals

### 4. Inconsistent Spacing
**Problem**: element spacing is arbitrary and unsystematic
**Why it is a problem**: it looks unprofessional and breaks visual rhythm
**Fix**: establish an 8pt grid system (only use 8/16/24/32/48/64px spacing)

### 5. Not Enough Whitespace
**Problem**: every area is filled with content
**Why it is a problem**: dense information creates reading fatigue and actually hurts communication
**Fix**: whitespace should occupy at least 40% of the total area (60%+ for minimal styles)

### 6. Too Many Typefaces
**Problem**: 3+ fonts are used
**Why it is a problem**: visual noise and weaker cohesion
**Fix**: use at most 2 typefaces (1 for titles + 1 for body), and create variation through weight and size

### 7. Inconsistent Alignment
**Problem**: some elements are left-aligned, some centered, some right-aligned
**Why it is a problem**: it breaks visual order
**Fix**: choose one alignment strategy (left alignment recommended) and apply it consistently

### 8. Decoration Overpowers Content
**Problem**: background patterns, gradients, or shadows steal attention from the content
**Why it is a problem**: it reverses the priority; users came for information, not decoration
**Fix**: ask, "If I remove this decoration, does the design get worse?" If not, delete it

### 9. Overused Cyber Neon
**Problem**: dark blue background (`#0D1117`) + neon glow effects
**Why it is a problem**: this falls into the default aesthetic no-go zone (the taste baseline of this skill), and it has already become one of the biggest clichés. Users may override this if it truly matches their brand
**Fix**: choose a color system with stronger distinction (refer to the color systems across the 20 styles)

### 10. Information Density Does Not Match the Medium
**Problem**: an entire page of text on a PPT slide / 10 elements crammed into a cover image
**Why it is a problem**: different media have different optimal density
**Fix**:
- PPT: one core idea per slide
- Cover image: one visual focal point
- Infographic: layered presentation
- PDF: can be denser, but needs clear navigation

---

## Critique Output Template

```
## Design Critique Report

**Overall Score**: X.X/10 [Excellent (8+)/Good (6-7.9)/Needs Improvement (4-5.9)/Fail (<4)]

**Category Scores**:
- Philosophy Alignment: X/10 [one-sentence explanation]
- Visual Hierarchy: X/10 [one-sentence explanation]
- Craft Quality: X/10 [one-sentence explanation]
- Functionality: X/10 [one-sentence explanation]
- Originality: X/10 [one-sentence explanation]

### Strengths (Keep)
- [Point to what works, using design language]

### Problems (Fix)
[Order by severity]

**1. [Problem Name]** — ⚠️ Critical / ⚡ Important / 💡 Optimization
- Current: [describe the current state]
- Problem: [why this is a problem]
- Fix: [specific action, including values]

### Quick Wins
If you only have 5 minutes, prioritize these 3 fixes first:
- [ ] [highest-impact fix]
- [ ] [second most important fix]
- [ ] [third most important fix]
```

---

**Version**: v1.0
**Updated**: 2026-02-13
