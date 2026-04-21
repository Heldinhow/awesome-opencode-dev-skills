# Content Guidelines: Anti-AI Slop, Content Rules, and Scale Standards

This is the easiest trap to fall into in AI-assisted design. This is primarily a list of what **not** to do, and that matters more than a list of what to do, because AI slop is the default state. If you do not actively avoid it, it will happen.

## Full AI Slop Blacklist

### Visual Traps

**❌ Aggressive gradient backgrounds**
- Purple -> pink -> blue full-screen gradients (the classic AI-generated website look)
- Rainbow gradients in any direction
- Mesh gradients covering the whole background
- ✅ If you do use gradients: keep them subtle, monochromatic, and intentional, such as a button hover accent

**❌ Rounded cards + left accent border**
```css
/* This is a signature of the generic AI-looking card */
.card {
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  padding: 16px;
}
```
These cards are everywhere in AI-generated dashboards. If you need emphasis, use a more designed approach: background contrast, weight / size contrast, plain dividers, or no card separation at all.

**❌ Decorative emoji**
Unless the brand itself uses emoji (such as Notion or Slack), do not put emoji into the UI. **Especially avoid**:
- 🚀 ⚡️ ✨ 🎯 💡 before headings
- ✅ in feature lists
- → inside CTA buttons (a standalone arrow is fine, an emoji arrow is not)

If you do not have icons, use a real icon library (Lucide / Heroicons / Phosphor) or use placeholders.

**❌ SVG-drawn imagery**
Do not try to draw people, scenes, devices, objects, or abstract art in SVG. AI-generated SVG imagery is instantly recognizable as AI-made, childish, and cheap. **A gray rectangle with a text label like "illustration placeholder 1200×800" is 100x better than a clumsy SVG hero illustration**.

The only acceptable SVG use cases:
- Real icons (roughly 16×16 to 32×32)
- Geometric decorative elements
- Data-viz charts

**❌ Too much iconography**
Not every title, feature, or section needs an icon. Overusing icons makes the interface feel like a toy. Less is more.

**❌ "Data slop"**
Made-up stats used as decoration:
- "10,000+ happy customers" (you do not know whether that is true)
- "99.9% uptime" (do not write it without real data)
- Decorative metric cards made of icon + number + label
- Over-styled fake data in mock tables

If you do not have real data, leave a placeholder or ask the user.

**❌ "Quote slop"**
Fake testimonials and decorative quotes. Leave a placeholder and ask the user for a real quote.

### Typography Traps

**❌ Avoid these overused fonts**:
- Inter (the default AI-generated website font)
- Roboto
- Arial / Helvetica
- Pure system font stacks
- Fraunces (AI discovered it and started overusing it)
- Space Grotesk (the recent AI favorite)

**✅ Use display + body pairings with character**. Directional ideas:
- Serif display + sans body (editorial feel)
- Mono display + sans body (technical feel)
- Heavy display + light body (contrast)
- Variable font weight animation in the hero

Font sources:
- Less-common but strong choices on Google Fonts (Instrument Serif, Cormorant, Bricolage Grotesque, JetBrains Mono)
- Open font sites (siblings of Fraunces, Adobe Fonts)
- Do not invent font names out of nowhere

### Color Traps

**❌ Do not invent a color system from nothing**
Do not design an entire unfamiliar palette from scratch. It usually becomes incoherent.

**✅ Strategy**:
1. If brand colors exist -> use the brand colors, and interpolate missing tokens with `oklch`
2. If there are no brand colors but there are references -> sample colors from the reference screenshots
3. If everything starts from zero -> choose a known color system (Radix Colors / Tailwind default palette / Anthropic brand) instead of tuning one yourself

**Defining colors with `oklch`** is the most modern approach:
```css
:root {
  --primary: oklch(0.65 0.18 25);      /* Warm terracotta */
  --primary-light: oklch(0.85 0.08 25); /* Lighter version in the same family */
  --primary-dark: oklch(0.45 0.20 25);  /* Darker version in the same family */
}
```
`oklch` keeps hue stable when adjusting lightness, which makes it more reliable than `hsl`.

**❌ Do not add dark mode as a quick inverted palette**
It is not just color inversion. Good dark mode requires rebalancing saturation, contrast, and accent colors. If you do not want to design dark mode properly, do not add it.

### Layout Traps

**❌ Bento grids are overused**
Every AI-generated landing page wants to use a bento layout. Unless the information structure actually suits it, use another layout.

**❌ Large hero + 3-column features + testimonials + CTA**
This landing page template has been overused. If you want innovation, actually innovate.

**❌ Every card in the grid looks identical**
Asymmetry, different card sizes, some with images and some without, some spanning columns: that is what real design work looks like.

## Content Rules

### 1. Do Not Add Filler Content

Every element must earn its place. Empty space is a design problem to solve with **composition**: contrast, rhythm, and whitespace. It is **not** something to patch by filling the page with more content.

**Questions to detect filler**:
- If you remove this content, does the design get worse? If the answer is "no," remove it.
- What real problem does this element solve? If the answer is "so the page feels less empty," delete it.
- Does this stat / quote / feature have real data behind it? If not, do not invent it.

"One thousand no's for every yes."

### 2. Ask Before Adding Material

If you think an extra paragraph, page, or section would help, ask the user first. Do not add it unilaterally.

Why:
- The user understands their audience better than you do
- Extra content has a cost, and the user may not want it
- Adding content on your own breaks the junior-designer-reporting-to-manager relationship

### 3. Create a System Up Front

After exploring the design context, **state the system you will use before building anything**, and let the user confirm it:

```markdown
My design system:
- Color: #1A1A1A base + #F0EEE6 background + #D97757 accent (from your brand)
- Typography: Instrument Serif for display + Geist Sans for body
- Rhythm: section titles use full-bleed color backgrounds with white text; regular sections use white backgrounds
- Imagery: full-bleed photo in the hero; placeholders in the feature section until you provide assets
- Use at most 2 background colors to avoid visual clutter

If this direction looks right, I will start building.
```

Only start after the user confirms. This check-in avoids the "halfway done and the direction is wrong" problem.

## Scale Standards

### Slides (1920×1080)

- Minimum body text: **24px**, ideal 28-36px
- Titles: 60-120px
- Section titles: 80-160px
- Hero headlines can go as large as 180-240px
- Never use text smaller than 24px on slides

### Print Documents

- Minimum body text: **10pt** (≈13.3px), ideal 11-12pt
- Titles: 18-36pt
- Captions: 8-9pt

### Web and Mobile

- Minimum body text: **14px** (use 16px for better accessibility with older users)
- Mobile body text: **16px** (to avoid iOS auto-zoom)
- Minimum hit target for clickable elements: **44×44px**
- Line height: 1.5-1.7 (for Chinese: 1.7-1.8)

### Contrast

- Body text vs background: **at least 4.5:1** (WCAG AA)
- Large text vs background: **at least 3:1**
- Check with the accessibility tools in Chrome DevTools

## Powerful CSS Tools

**Advanced CSS features** are a designer's friend. Use them boldly:

### Typography

```css
/* Makes heading line breaks more natural so the last line is not stranded with one word */
h1, h2, h3 { text-wrap: balance; }

/* Improves paragraph wrapping and reduces widows/orphans */
p { text-wrap: pretty; }

/* Great for Chinese typography: punctuation compression and line-edge control */
p {
  text-spacing-trim: space-all;
  hanging-punctuation: first;
}
```

### Layout

```css
/* CSS Grid + named areas = highly readable layout code */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* Use subgrid to align content inside cards */
.card { display: grid; grid-template-rows: subgrid; }
```

### Visual Effects

```css
/* Tasteful scrollbars */
* { scrollbar-width: thin; scrollbar-color: #666 transparent; }

/* Glassmorphism (use with restraint) */
.glass {
  backdrop-filter: blur(20px) saturate(150%);
  background: color-mix(in oklch, white 70%, transparent);
}

/* View Transitions API for smooth page changes */
@view-transition { navigation: auto; }
```

### Interaction

```css
/* The :has() selector makes conditional styling much easier */
.card:has(img) { padding-top: 0; } /* Cards with images do not need top padding */

/* Container queries make components truly responsive */
@container (min-width: 500px) { ... }

/* The newer color-mix function */
.button:hover {
  background: color-mix(in oklch, var(--primary) 85%, black);
}
```

## Quick Decision Guide: When You Are Hesitating

- Want to add a gradient? -> Probably do not add it
- Want to add an emoji? -> Do not add it
- Want to give a card rounded corners + a left accent border? -> Do not; find another approach
- Want to draw a hero illustration in SVG? -> Do not; use a placeholder instead
- Want to add a decorative quote? -> Ask the user for a real quote first
- Want to add a row of icon features? -> Ask whether icons are even needed
- Using Inter? -> Switch to something with more character
- Using a purple gradient? -> Switch to a color system grounded in a real reference

**Whenever you think "adding this will make it prettier," that is often a sign of AI slop**. Build the simplest strong version first, and add more only when the user asks for it.
