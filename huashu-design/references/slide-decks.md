# Slide Decks: HTML Slide Production Rules

Slide design is a high-frequency design task. This document explains how to do HTML slides well, from architectural choices and single-slide design to the full export path for PDF/PPTX.

**This skill covers**:
- **HTML presentation version (the base deliverable, always the default and always required)** → one HTML file per slide + `assets/deck_index.html` as the aggregator, with keyboard navigation and fullscreen presenting in the browser
- HTML → PDF export → `scripts/export_deck_pdf.mjs` / `scripts/export_deck_stage_pdf.mjs`
- HTML → editable PPTX export → `references/editable-pptx.md` + `scripts/html2pptx.js` + `scripts/export_deck_pptx.mjs` (requires the HTML to follow 4 hard constraints)

> **⚠️ HTML is the source; PDF/PPTX are derivatives.** No matter what the final delivery format is, you **must** first build the HTML aggregated presentation version (`index.html` + `slides/*.html`). That is the slide work's source of truth. PDF/PPTX are snapshots exported from HTML with a one-line command.
>
> **Why HTML comes first**:
> - Best for live speaking/presenting (fullscreen directly on a projector or shared screen, keyboard navigation, no dependence on Keynote/PPT software)
> - During production, each slide can be opened and verified independently without re-running export every time
> - It is the only upstream source for PDF/PPTX export, avoiding the dead loop of "export first, then discover HTML needs fixing, then export again"
> - The deliverable can be both `HTML + PDF` or `HTML + PPTX`, and the receiver can use whichever they prefer
>
> Real-world test on the 2026-04-22 moxt brochure: after finishing 13 HTML slides plus an aggregated `index.html`, `export_deck_pdf.mjs` exported a PDF in one line with zero modifications. The HTML version itself was already a browser-ready presentation deliverable.

---

## 🛑 Confirm the delivery format before starting (the hardest checkpoint)

**This decision comes even earlier than "single-file or multi-file".** Real-world validation from the 2026-04-20 options private-board project: **failing to confirm the delivery format before building = 2-3 hours of rework.**

### Decision tree (HTML-first architecture)

All deliveries start from the same aggregated HTML set (`index.html` + `slides/*.html`). The delivery format only determines the **authoring constraints on the HTML** and the **export command**:

```
【Always default · required】 HTML aggregated presentation version (index.html + slides/*.html)
   │
   ├── Browser presentation / local HTML archive only   → already complete here, maximum visual freedom in HTML
   │
   ├── Also need PDF (print / sharing / archive)        → run export_deck_pdf.mjs in one command
   │                                                      HTML authoring stays visually unconstrained
   │
   └── Also need editable PPTX (teammates will edit text)
                                                          → author HTML from line 1 under the 4 hard constraints
                                                          → run export_deck_pptx.mjs in one command
                                                          → sacrifice gradients / web components / complex SVG
```

### Suggested kickoff wording

> No matter whether the final deliverable is HTML, PDF, or PPTX, I will first build an aggregated HTML version that can be navigated and presented in the browser (`index.html` with keyboard navigation). That is the default base deliverable. On top of that, I’ll ask whether you also want a PDF or PPTX snapshot.
>
> Which export format do you need?
> - **HTML only** (presentation/archive) → full visual freedom
> - **Also PDF** → same HTML, plus one export command
> - **Also editable PPTX** (someone will edit the text in PowerPoint) → I must author the HTML under 4 hard constraints from the first line, which sacrifices some visual capabilities (no gradients, no web components, no complex SVG)

### Why "if you need PPTX, you must follow the 4 hard constraints from the start"

Editable PPTX works only if `html2pptx.js` can translate the DOM element by element into PowerPoint objects. That requires **4 hard constraints**:

1. `body` fixed at `960pt × 540pt` (matching `LAYOUT_WIDE`, `13.333″ × 7.5″`, not `1920×1080px`)
2. All text wrapped in `<p>` / `<h1>`-`<h6>` (no direct text in `div`, no using `<span>` as the primary text carrier)
3. `<p>` / `<h*>` elements cannot carry their own background/border/shadow (put those on an outer `div`)
4. `<div>` must not use `background-image` (use `<img>` tags)
5. No CSS gradients, no web components, no complex decorative SVG

**This skill's default HTML path assumes high visual freedom**: lots of `span`, nested flex layouts, complex SVG, web components such as `<deck-stage>`, CSS gradients. **Almost none of that passes `html2pptx` naturally**. In practice, visually driven HTML passed under 30% of the time when sent directly into `html2pptx`.

### Real cost comparison between the two paths (actual pitfalls from 2026-04-20)

| Path | Approach | Result | Cost |
|------|------|------|------|
| ❌ **Write freeform HTML first, rescue PPTX later** | Single-file `deck-stage` + lots of SVG / span decoration | If you later need editable PPTX, only two paths remain:<br>A. hand-write hundreds of lines of `pptxgenjs` coordinates<br>B. rewrite 17 HTML slides into Path A format | 2-3 hours of rework, plus **permanent maintenance cost** for the hand-written version (change one word in HTML, sync it manually in PPTX again) |
| ✅ **Write under Path A constraints from the first step** | Independent HTML per slide + 4 hard constraints + `960×540pt` | One command exports a 100% editable PPTX, while the HTML also works for fullscreen browser presenting | Spend 5 extra minutes while authoring HTML thinking "how should this text be wrapped in `<p>`"; zero rework |

### What about mixed delivery?

If the user says, "I want HTML presentation **and** editable PPTX," **that is not mixed**. PPTX requirements simply override HTML authoring freedom. HTML written under Path A already works for fullscreen browser presentation as-is (just add the `deck_index.html` aggregator). **There is no extra cost.**

If the user says, "I want PPTX **and** animation / web components," **that is a real contradiction**. Tell the user plainly: editable PPTX requires giving up those visual capabilities. Make them choose. Do not quietly build a hand-written `pptxgenjs` solution, because that turns into permanent maintenance debt.

### What if you only learn about the PPTX requirement afterward? (emergency fallback)

In rare cases the HTML is already built before you learn that PPTX is required. Recommended **fallback process** (full details at the end of `references/editable-pptx.md`, in the section "Fallback: existing visual draft but the user insists on editable PPTX"):

1. **Preferred**: export a PDF instead. Visual fidelity stays 100%, it is cross-platform, and the receiver can still view and print it. If the real need is presentation/archive, PDF is the best deliverable.
2. **Second choice**: use AI to rewrite an editable HTML version based on the visual draft, then export editable PPTX. This preserves design decisions around color, layout, and copy, while sacrificing gradients, web components, complex SVG, and similar visual capabilities.
3. **Not recommended**: hand-rebuild the slides in `pptxgenjs`. Positions, fonts, and alignment all need manual tuning, maintenance cost is high, and every future HTML text change must be synced by hand again.

Always surface the choice to the user and let them decide. **Do not jump straight to hand-writing `pptxgenjs`**. That is the last-resort fallback.

---

## 🛑 Before batch production: build 2 showcase slides first to lock the grammar

**As soon as a deck is 5 slides or more, you must not write straight from slide 1 to the final slide.** The validated workflow from the 2026-04-22 moxt brochure project:

1. Pick **2 page types with the largest visual difference** and build them first as showcases (for example, "cover" + "mood/quote page", or "cover" + "product showcase page")
2. Screenshot them and ask the user to confirm the grammar (`masthead / typography / color / spacing / structure / bilingual ratio`)
3. Only after the direction is approved do you batch the remaining `N-2` slides, reusing the established grammar on each slide
4. After all slides are finished, aggregate them into HTML and derive PDF/PPTX from there

**Why**: if you write all 13 slides first and the user says "the direction is wrong," you rework 13 slides. If you build 2 showcase slides first and the direction is wrong, you rework only 2. Once the visual grammar is established, later decisions narrow dramatically and only the content placement remains.

**Principle for choosing showcase slides**: pick the two slides with the most different visual structures. If those two pass, the in-between states usually pass too.

| Deck type | Recommended showcase pair |
|-----------|---------------------------|
| B2B brochure / product launch | Cover + content page (concept/emotion page) |
| Brand launch | Cover + product feature page |
| Data report | Big-data chart page + analytical conclusion page |
| Teaching deck | Section opener + detailed concept page |

---

## 📐 Publication grammar template (reusable, proven on moxt)

Best for B2B brochures, product launch decks, and long reports. Reusing this structure on every slide yields full consistency across a 13-slide deck with zero rework.

### Per-slide skeleton

```
┌─ masthead (top strip + horizontal rule) ────────────┐
│  [logo 22-28px] · A Product Brochure                Issue · Date · URL │
├──────────────────────────────────────────┤
│                                          │
│  ── kicker (green short rule + uppercase label)     │
│  CHAPTER XX · SECTION NAME                 │
│                                          │
│  H1 (Chinese Noto Serif SC 900)                      │
│  Key words alone get the brand accent color          │
│                                          │
│  English subtitle (Lora italic, subtitle)            │
│  ─────────── divider ──────────                       │
│                                          │
│  [Actual content: two-column 60/40 / 2x2 grid / list]│
│                                          │
├──────────────────────────────────────────┤
│ section name                     XX / total │
└──────────────────────────────────────────┘
```

### Style conventions (copy directly)

- **H1**: Chinese `Noto Serif SC 900`, `80-140px` depending on information density, with only key words highlighted in the brand color (do not color the entire line)
- **English subtitle**: `Lora italic 26-46px`; signature brand phrases (such as `AI team`) use bold + brand-color italics
- **Body text**: `Noto Serif SC 17-21px`, `line-height 1.75-1.85`
- **Accent highlights**: use bold + brand color to mark key words in body copy, no more than 3 instances per slide or the anchor effect is lost
- **Background**: warm beige `#FAFAFA` plus extremely subtle radial-gradient noise (`rgba(33,33,33,0.015)`) for paper texture

### The visual lead must vary

If 13 slides are all just "text + one screenshot," the deck becomes monotonous. **Rotate the type of visual lead on each slide**:

| Visual type | Best for |
|---------|---------------|
| Cover typography (big headline + masthead + pillar) | Opening page / section opener |
| Single-character portrait (one huge momo, etc.) | Introducing one concept / role |
| Group portrait / parallel avatar cards | Team / user cases |
| Timeline card progression | Showing "long-term relationship" or "evolution" |
| Knowledge map / connected-node diagram | Showing collaboration / flow |
| Before/After comparison cards + center arrow | Showing change / difference |
| Product UI screenshot + outlined device frame | Feature showcase |
| Big quote (half-slide giant typography) | Mood page / problem page / quotation page |
| Human portrait + quote card (2×2 or 1×4) | Testimonials / use cases |
| Big-type closing page + URL pill button | CTA / ending |

---

## ⚠️ Common pitfalls (moxt field notes)

### 1. Emoji do not render in Chromium / Playwright exports

Chromium does not ship with color emoji fonts by default, so during `page.pdf()` or `page.screenshot()`, emoji appear as empty squares.

**Fix**: replace them with Unicode text symbols such as `✦` `✓` `✕` `→` `·` `—`, or rewrite as plain text (`Email · 23` rather than `📧 23 emails`).

### 2. `export_deck_pdf.mjs` throws `Cannot find package 'playwright'`

Cause: ESM module resolution searches upward from the script location for `node_modules`. The script lives under `~/.claude/skills/huashu-design/scripts/`, which does not have dependencies.

**Fix**: copy the script into the deck project directory (for example `brochure/build-pdf.mjs`), run `npm install playwright pdf-lib` from the project root, then run `node build-pdf.mjs --slides slides --out output/deck.pdf`.

### 3. Google Fonts have not finished loading before capture, so Chinese falls back to system black sans

Before Playwright screenshot/PDF capture, wait at least `3500ms` so the webfont can download and paint. Or self-host the fonts in `shared/fonts/` to reduce network dependency.

### 4. Information density imbalance: content slides are overstuffed

The first version of the moxt philosophy page used a `2×2` layout = 4 sections plus 3 principles at the bottom = 7 content blocks, which felt cramped and repetitive. Reworking it into a `1×3` layout brought the breathing room back immediately.

**Fix**: each slide should contain only "1 core message + 3-4 supporting points + 1 visual lead." Anything more should be split into a new slide. **Less is more**. The audience spends 10 seconds per slide. One memorable idea is easier to retain than four mediocre ones.

---

## 🛑 Decide the architecture first: single file or multi-file?

**This is the first step in slide production. If you choose wrong, you will step into the same problems repeatedly. Read this section before building.**

### Comparison of the two architectures

| Dimension | Single file + `deck_stage.js` | **Multi-file + `deck_index.html` aggregator** |
|------|-------------------------------|----------------------------------------------|
| Code structure | One HTML file, every slide is a `<section>` | One HTML file per slide, `index.html` stitches them with iframes |
| CSS scope | ❌ Global, one slide's styles can affect all slides | ✅ Naturally isolated, each iframe is its own world |
| Verification granularity | ❌ Must use JS `goTo` to inspect a given slide | ✅ Double-click any single slide file to inspect it directly |
| Parallel development | ❌ One file, multiple agents will conflict | ✅ Multiple agents can build different slides in parallel, zero merge conflicts |
| Debugging difficulty | ❌ One CSS mistake can wreck the whole deck | ✅ One slide failing affects only itself |
| Embedded interactivity | ✅ Shared cross-slide state is simple | 🟡 Cross-iframe communication needs `postMessage` |
| Print to PDF | ✅ Built in | ✅ Aggregator iterates iframes in `beforeprint` |
| Keyboard navigation | ✅ Built in | ✅ Built in |

### Which one should you choose? (decision tree)

```
│ Question: how many slides will the deck have?
├── ≤10 slides, needs in-deck animation or cross-slide interaction, pitch deck → single file
└── ≥10 slides, academic lecture, teaching deck, long deck, parallel multi-agent work → multi-file (recommended)
```

**Default to the multi-file path**. It is not an alternative; it is the **main path for long decks and team collaboration**. Every advantage the single-file architecture has (keyboard navigation, print, scale) also exists in the multi-file path, while multi-file isolation and debuggability cannot be recovered once lost.

### Why this rule is so strict (real incident record)

The single-file architecture caused four consecutive failures in an AI psychology lecture deck:

1. **CSS specificity override**: `.emotion-slide { display: grid }` (specificity 10) overrode `deck-stage > section { display: none }` (specificity 2), causing all slides to render at once and stack.
2. **Shadow DOM slot rules were overridden by outer CSS**: `::slotted(section) { display: none }` still could not prevent outer rules from forcing sections visible.
3. **Race condition between `localStorage` and hash navigation**: after refresh, the deck landed on the old `localStorage` position instead of the hash target.
4. **High verification cost**: you had to call `page.evaluate(d => d.goTo(n))` to screenshot a given slide, which was slower and less reliable than directly `goto(file://.../slides/05-X.html)`.

The shared root cause was **a single global namespace**. The multi-file architecture eliminates these issues physically.

---

## Path A (default): multi-file architecture

### Directory structure

```
my-deck/
├── index.html              # Copy from assets/deck_index.html, then edit MANIFEST
├── shared/
│   ├── tokens.css          # Shared design tokens (palette/type scale/common chrome)
│   └── fonts.html          # <link> imports for Google Fonts (included per slide)
└── slides/
    ├── 01-cover.html       # Each file is a complete 1920×1080 HTML slide
    ├── 02-agenda.html
    ├── 03-problem.html
    └── ...
```

### Template skeleton for each slide

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>P05 · Chapter Title</title>
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
<link rel="stylesheet" href="../shared/tokens.css">
<style>
  /* Styles unique to this slide. Any class name here stays isolated. */
  body { padding: 120px; }
  .my-thing { ... }
</style>
</head>
<body>
  <!-- 1920×1080 content (body width/height are locked in tokens.css) -->
  <div class="page-header">...</div>
  <div>...</div>
  <div class="page-footer">...</div>
</body>
</html>
```

**Key constraints**:
- `<body>` is the canvas. Lay out directly on it. Do not wrap the slide in `<section>` or another root wrapper.
- `width: 1920px; height: 1080px` is locked by the `body` rule in `shared/tokens.css`.
- Import `shared/tokens.css` to share design tokens (palette, type scale, `page-header/footer`, etc.).
- Each slide writes its own font `<link>` tags. Importing fonts per slide is cheap and guarantees every slide remains independently openable.

### Aggregator: `deck_index.html`

**Copy it directly from `assets/deck_index.html`.** You only need to edit one place: the `window.DECK_MANIFEST` array, listing every slide file and human-readable label in order:

```js
window.DECK_MANIFEST = [
  { file: "slides/01-cover.html",    label: "Cover" },
  { file: "slides/02-agenda.html",   label: "Agenda" },
  { file: "slides/03-problem.html",  label: "Problem Statement" },
  // ...
];
```

The aggregator already includes keyboard navigation (`←/→/Home/End/number keys/P print`), scale + letterboxing, a bottom-right counter, `localStorage` memory, hash navigation, and print mode (iterate all iframes and output a multi-page PDF).

### Single-slide verification (the killer advantage of multi-file)

Every slide is an independent HTML file. **As soon as you finish one slide, double-click and inspect it in the browser**:

```bash
open slides/05-personas.html
```

Playwright screenshots also go directly to `goto(file://.../slides/05-personas.html)` without JS slide jumps and without cross-slide CSS interference. That makes the "change a bit, verify a bit" workflow almost free.

### Parallel development

Split slide tasks across different agents and run them at the same time. The HTML files are independent, so merges have no conflicts. On long decks, this can reduce production time roughly to `1/N`.

### What should go into `shared/tokens.css`

Only include things that are **truly shared across slides**:

- CSS variables (palette, type scale, spacing scale)
- Canvas locking such as `body { width: 1920px; height: 1080px; }`
- Reusable chrome like `.page-header` / `.page-footer`

**Do not** put single-slide layout classes there, or you drift back toward the global pollution of the single-file architecture.

---

## Path B (small decks): single file + `deck_stage.js`

Use this for decks of 10 slides or fewer, for cross-slide shared state (for example, one React tweaks panel controlling all slides), or for ultra-tight pitch-deck demos.

### Basic usage

1. Copy the contents of `assets/deck_stage.js` into your HTML `<script>` (or load it with `<script src="deck_stage.js">`)
2. Wrap slides inside `<deck-stage>` in the `body`
3. 🛑 **The script tag must appear after `</deck-stage>`** (see hard constraint below)

```html
<body>

  <deck-stage>
    <section>
      <h1>Slide 1</h1>
    </section>
    <section>
      <h1>Slide 2</h1>
    </section>
  </deck-stage>

  <!-- ✅ Correct: script comes after deck-stage -->
  <script src="deck_stage.js"></script>

</body>
```

### 🛑 Hard constraint on script position (real pitfall from 2026-04-20)

**Do not put `<script src="deck_stage.js">` in `<head>`.** Even if it defines the custom element there, the parser triggers `connectedCallback` the moment it hits the opening `<deck-stage>` tag. At that moment the child `<section>` nodes have not been parsed yet, `_collectSlides()` gets an empty array, the counter shows `1 / 0`, and all slides stack visibly at once.

**Three compliant patterns** (choose any one):

```html
<!-- ✅ Most recommended: script after </deck-stage> -->
</deck-stage>
<script src="deck_stage.js"></script>

<!-- ✅ Also fine: script in head with defer -->
<head><script src="deck_stage.js" defer></script></head>

<!-- ✅ Also fine: module scripts are deferred by default -->
<head><script src="deck_stage.js" type="module"></script></head>
```

`deck_stage.js` already contains a `DOMContentLoaded`-delayed slide collection safeguard, so placing the script in `head` will not completely destroy the deck. But using `defer` or placing the script at the bottom of `body` is still cleaner and avoids relying on the defensive branch.

### ⚠️ CSS trap in single-file architecture (must read)

The most common failure in single-file decks is that the **`display` property gets stolen by slide-level CSS**.

Common bad pattern 1 (assigning `display: flex` directly on `section`):

```css
/* ❌ Outer CSS specificity 2 overrides shadow DOM ::slotted(section){display:none} (also 2) */
deck-stage > section {
  display: flex;            /* All slides will render stacked at once! */
  flex-direction: column;
  padding: 80px;
  ...
}
```

Common bad pattern 2 (a slide section has a more specific class):

```css
.emotion-slide { display: grid; }   /* Specificity: 10, even worse */
```

Both patterns cause **all slides to render and stack at once**. The counter may still pretend everything is normal and show `1 / 10`, but visually page 1 overlays page 2 overlays page 3.

### ✅ Starter CSS (copy this and avoid the trap)

The **section itself** should only manage visibility; the **layout** (`flex/grid`) should live on `.active`:

```css
/* section defines only shared non-display styles */
deck-stage > section {
  background: var(--paper);
  padding: 80px 120px;
  overflow: hidden;
  position: relative;
  /* ⚠️ Do not set display here! */
}

/* Lock in "inactive means hidden" with both specificity and weight */
deck-stage > section:not(.active) {
  display: none !important;
}

/* Only the active slide gets the needed display + layout */
deck-stage > section.active {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Print mode: all slides must be visible, overriding :not(.active) */
@media print {
  deck-stage > section { display: flex !important; }
  deck-stage > section:not(.active) { display: flex !important; }
}
```

Alternative: **put slide-level `flex/grid` on an inner wrapper `<div>`**, while `section` remains only a `display: block/none` switcher. This is the cleanest solution:

```html
<deck-stage>
  <section>
    <div class="slide-content flex-layout">...</div>
  </section>
</deck-stage>
```

### Custom sizes

```html
<deck-stage width="1080" height="1920">
  <!-- 9:16 portrait -->
</deck-stage>
```

---

## Slide labels

Both `deck_stage` and `deck_index` label slides for the counter. Give them **meaningful labels**:

**Multi-file**: put `{ file, label: "04 Problem Statement" }` in `MANIFEST`
**Single-file**: put `<section data-screen-label="04 Problem Statement">` on the section

**Critical**: slide numbering starts at 1, not 0.

When a user says "slide 5," they mean the fifth slide, never array index `[4]`. Humans do not speak in zero-based indexing.

---

## Speaker notes

**Do not add them by default.** Only add speaker notes when the user explicitly asks for them.

Once you add speaker notes, the visible text on the slide can shrink to the minimum and focus on impactful visuals, while the notes carry the full script.

### Format

**Multi-file**: put this into the `<head>` of `index.html`:

```html
<script type="application/json" id="speaker-notes">
[
  "Script for slide 1...",
  "Script for slide 2...",
  "..."
]
</script>
```

**Single-file**: same placement.

### Notes writing principles

- **Complete**: not an outline, the actual words to say
- **Conversational**: spoken language, not formal prose
- **Mapped**: the Nth array item corresponds to the Nth slide
- **Length**: `200-400` Chinese characters is best
- **Emotional arc**: mark emphasis, pauses, and stress points

---

## Slide design patterns

### 1. Establish one system first (required)

After exploring the design context, **say the system out loud first**:

```markdown
Deck system:
- Background colors: at most 2 (90% white + 10% dark section dividers)
- Typography: Instrument Serif for display, Geist Sans for body
- Rhythm: section dividers use full-bleed color + white text, regular slides use white backgrounds
- Imagery: hero slides use full-bleed photography, data slides use charts

I will work within this system. Tell me if you want any changes.
```

Only continue after the user confirms it.

### 2. Common slide layouts

- **Title slide**: solid background + giant title + subtitle + author/date
- **Section divider**: colored background + chapter number + section title
- **Content slide**: white background + title + 1-3 bullet points
- **Data slide**: title + one large chart/number + short explanation
- **Image slide**: full-bleed photo + small bottom caption
- **Quote slide**: whitespace + giant quote + attribution
- **Two-column**: left/right comparison (`vs / before-after / problem-solution`)

Use no more than 4-5 layouts in one deck.

### 3. Scale (repeating this deliberately)

- Minimum body text: **24px**, ideally `28-36px`
- Titles: **60-120px**
- Hero text: **180-240px**
- Slides are for people 10 meters away. The type must be large enough.

### 4. Visual rhythm

A deck needs **intentional variety**:

- Color rhythm: mostly white slides + occasional colored section dividers + occasional dark slides
- Density rhythm: some text-heavy slides + some image-heavy slides + some quote/whitespace slides
- Type-size rhythm: standard titles + occasional oversized hero typography

**Do not make every slide look the same**. That is a PPT template, not design.

### 5. Breathing room (required reading for data-dense slides)

**The most common beginner mistake**: putting every possible piece of information onto one slide.

Information density is not the same as effective communication. Academic and presentation decks especially require restraint:

- On list/matrix slides, do not give all `N` elements equal visual weight. Use **hierarchy**. The 5 items you are discussing today should be enlarged as the lead; the remaining 16 should shrink into background hints.
- On big-number slides, the number itself is the visual lead. Supporting captions should stay within 3 lines, or the eye keeps bouncing around.
- On quote slides, the quote and attribution need whitespace between them; do not jam them together.

Self-audit against these two questions: "Is the data actually the visual lead?" and "Is the text crowded together?" Keep editing until the whitespace feels slightly uncomfortable.

---

## Print to PDF

**Multi-file**: `deck_index.html` already handles the `beforeprint` event and outputs one PDF page per slide.

**Single-file**: `deck_stage.js` handles it as well.

The print styles are already written. You do not need extra `@media print` CSS.

---

## Export to PPTX / PDF (self-serve scripts)

HTML-first remains the primary path. But users often need PPTX/PDF delivery. Two generic scripts are provided under `scripts/`, and **any multi-file deck can use them**:

### `export_deck_pdf.mjs` — export vector PDF (multi-file architecture)

```bash
node scripts/export_deck_pdf.mjs --slides <slides-dir> --out deck.pdf
```

**Properties**:
- Text **remains vector** (copyable, searchable)
- Visual output is 100% faithful (Playwright renders in embedded Chromium, then prints)
- **No need to change a single character of the HTML**
- Each slide runs through independent `page.pdf()`, then `pdf-lib` merges them

**Dependencies**: `npm install playwright pdf-lib`

**Limit**: the PDF is not further editable. To make changes, go back to the HTML.

### `export_deck_stage_pdf.mjs` — dedicated to single-file `deck-stage` architecture ⚠️

**When to use**: the deck is one HTML file using the `<deck-stage>` web component around N `<section>` nodes (Path B architecture). In that case, the per-HTML `page.pdf()` strategy from `export_deck_pdf.mjs` does not apply, so you need this dedicated script.

```bash
node scripts/export_deck_stage_pdf.mjs --html deck.html --out deck.pdf
```

**Why `export_deck_pdf.mjs` cannot be reused** (real pitfalls from 2026-04-20):

1. **Shadow DOM beats `!important`**: the shadow CSS inside `deck-stage` includes `::slotted(section) { display: none }`, leaving only the active slide visible. Even if the light DOM adds `@media print { deck-stage > section { display: block !important } }`, Chromium still prints only the active slide. Result: **the PDF has only 1 page**.

2. **Looping with `goto` per slide still prints only 1 page**: the intuitive workaround, "navigate to each `#slide-N` and call `page.pdf({ pageRanges: '1' })` each time," also fails. Because shadow DOM print behavior still wins, the final render keeps being the first section in the list. Result: 17 exported pages that are all P01.

3. **Absolutely positioned children spill to the next page**: even if all sections are made visible, if a section is `position: static`, absolutely positioned elements like `cover-footer` / `slide-footer` are positioned relative to the initial containing block. Once print forces the section to `1080px` height, that footer may land on the next page, creating an extra orphan footer page.

**Fix strategy** (already implemented in the script):

```js
// After opening the HTML, use page.evaluate to pull the sections out of the deck-stage slot,
// mount them into a normal div under body, and inline styles to guarantee position:relative + fixed size
await page.evaluate(() => {
  const stage = document.querySelector('deck-stage');
  const sections = Array.from(stage.querySelectorAll(':scope > section'));
  document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
      @page { size: 1920px 1080px; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; }
      deck-stage { display: none !important; }
    `,
  }));
  const container = document.createElement('div');
  sections.forEach(s => {
    s.style.cssText = 'width:1920px!important;height:1080px!important;display:block!important;position:relative!important;overflow:hidden!important;page-break-after:always!important;break-after:page!important;background:#F7F4EF;margin:0!important;padding:0!important;';
    container.appendChild(s);
  });
  // Disable page breaking on the last slide to avoid a trailing blank page
  sections[sections.length - 1].style.pageBreakAfter = 'auto';
  sections[sections.length - 1].style.breakAfter = 'auto';
  document.body.appendChild(container);
});

await page.pdf({ width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
```

**Why this works**:
- Pulls sections out of the shadow slot into a normal light-DOM `div`, completely bypassing `::slotted(section) { display: none }`
- Inlines `position: relative` so absolutely positioned children anchor to the section and do not spill
- Uses `page-break-after: always` so each section prints as its own page
- Removes the page break from the last child to avoid trailing blank pages

**When verifying with `mdls -name kMDItemNumberOfPages`**: macOS Spotlight metadata is cached. After rewriting a PDF, run `mdimport file.pdf` to force refresh, or it may show an old page count. `pdfinfo` or counting files from `pdftoppm` is the real count.

---

### `export_deck_pptx.mjs` — export editable PPTX

```bash
# Only supported mode: native editable text boxes (fonts may fall back to system fonts)
node scripts/export_deck_pptx.mjs --slides <dir> --out deck.pptx
```

How it works: `html2pptx` reads computed styles element by element and translates the DOM into PowerPoint objects (`text frame / shape / picture`). Text becomes real editable text boxes inside PowerPoint.

**Hard constraints** (the HTML must satisfy these, or the slide is skipped; full detail in `references/editable-pptx.md`):
- All text must live inside `<p>` / `<h1>`-`<h6>` / `<ul>` / `<ol>` (no bare-text `div`)
- `<p>` / `<h*>` elements cannot carry their own background/border/shadow (put that on an outer `div`)
- Do not use `::before` / `::after` for decorative text (pseudo-elements cannot be extracted)
- Inline elements (`span` / `em` / `strong`) cannot have margin
- Do not use CSS gradients (they cannot be rendered)
- Do not use `background-image` on `div` (use `<img>` instead)

The script includes an **automatic preprocessor** that wraps bare text inside leaf `div` elements into `<p>` while preserving class names. That solves the most common violation. But the other violations still have to be fixed in the source HTML.

**Font fallback caveat**:
- Playwright measures text boxes using webfonts
- PowerPoint/Keynote render using local machine fonts
- If those differ, **overflow and misalignment can happen**
- Visually inspect every slide
- Ideally install the same fonts on the target machine, or fall back to `system-ui`

**Do not use this path for visually driven decks**. Use `export_deck_pdf.mjs` to generate PDF instead. PDF gives 100% visual fidelity, vector output, cross-platform behavior, and searchable text. It is the correct destination for visual-first decks, not some "non-editable compromise."

### Make the HTML export-friendly from the start

The most stable-performing decks are the ones where the HTML is authored under the editable-PPTX constraints from the beginning. Then `export_deck_pptx.mjs` can pass everything directly. The extra cost is small:

```html
<!-- ❌ Bad -->
<div class="title">Key finding</div>

<!-- ✅ Good (wrapped in p, class preserved) -->
<p class="title">Key finding</p>

<!-- ❌ Bad (border on the p element) -->
<p class="stat" style="border-left: 3px solid red;">41%</p>

<!-- ✅ Good (border on the outer div) -->
<div class="stat-wrap" style="border-left: 3px solid red;">
  <p class="stat">41%</p>
</div>
```

### Which export should you choose?

| Scenario | Recommendation |
|------|------|
| Delivering to an organizer / archival record | **PDF** (universal, faithful, searchable text) |
| Sending to collaborators so they can tweak text | **Editable PPTX** (accepting font fallback risk) |
| On-site presenting without content changes | **PDF** (vector fidelity, cross-platform) |
| HTML is the preferred primary medium | Present directly in the browser; export only as backup |

## Deep path for editable PPTX export (long-term projects only)

If the deck will be maintained long-term, revised repeatedly, and worked on collaboratively, you should **author the HTML under `html2pptx` constraints from the beginning**, so `export_deck_pptx.mjs` can pass everything directly. See `references/editable-pptx.md` for the 4 hard constraints, HTML template, common error quick reference, and fallback flow for an existing visual draft.

---

## Common questions

**Multi-file: pages inside the iframe do not open / show a blank page**
→ Check whether the `file` paths inside `MANIFEST` are correct relative to `index.html`. Use browser DevTools to inspect whether the iframe `src` is directly reachable.

**Multi-file: one slide's styles conflict with another slide**
→ That should not happen, because iframes isolate them. If it looks like it does, it is cache. Force refresh with `Cmd+Shift+R`.

**Single-file: multiple slides render and stack at once**
→ CSS specificity problem. Re-read the section above on the CSS trap in single-file architecture.

**Single-file: scale looks wrong**
→ Check that every slide is a direct child `<section>` under `<deck-stage>`. Do not wrap them in an intermediate `<div>`.

**Single-file: jump to a specific slide**
→ Add a hash to the URL: `index.html#slide-5` jumps to slide 5.

**Applies to both architectures: text positions differ across screens**
→ Use a fixed size (`1920×1080`) and `px` units. Do not use `vw` / `vh` / `%`. Scaling should be handled uniformly by the shell.

---

## Verification checklist (must pass before the deck is done)

1. [ ] Open `index.html` directly in the browser (or the main HTML file) and confirm the first page has no broken assets and fonts are loaded
2. [ ] Press `→` through every slide; no blank slides, no broken layouts
3. [ ] Press `P` for print preview; every slide is exactly one page (`A4` or `1920×1080`) with no clipping
4. [ ] Randomly force-refresh 3 slides with `Cmd+Shift+R`; confirm `localStorage` memory still behaves correctly
5. [ ] Run batch Playwright screenshots (multi-file: iterate `slides/*.html`; single-file: use `goTo`), then visually inspect them
6. [ ] Search for lingering `TODO` / `placeholder` text and confirm it is all removed
