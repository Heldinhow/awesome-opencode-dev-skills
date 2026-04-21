# Editable PPTX Export: HTML Hard Constraints + Size Decisions + Common Errors

This document covers the path of using **`scripts/html2pptx.js` + `pptxgenjs` to translate HTML element by element into real editable PowerPoint text boxes**, which is also the only path supported by `export_deck_pptx.mjs`.

> **Core premise**: to use this path, the HTML must be written according to the four constraints below from the very first line. **This is not a write-first-then-convert workflow**. Retrofitting it afterward leads to 2-3 hours of rework (confirmed in the 2026-04-20 options private-board project).
>
> If visual freedom is the priority (animation / web components / CSS gradients / complex SVG), use the PDF path instead (`export_deck_pdf.mjs` / `export_deck_stage_pdf.mjs`). **Do not** expect PPTX export to preserve full visual fidelity while also staying editable. That is a physical limitation of the PPTX file format itself (see the section at the end: "Why the 4 constraints are not a bug but a physical constraint").

---

## Canvas size: use `960×540pt` (`LAYOUT_WIDE`)

PPTX uses **inches** (physical dimensions), not pixels. The decision rule is: the computed size of the HTML body must **match the inch dimensions of the presentation layout** (within `±0.1"`, enforced by `validateDimensions` in `html2pptx.js`).

### Comparison of three candidate sizes

| HTML body | Physical size | Matching PPT layout | When to use |
|---|---|---|---|
| **`960pt × 540pt`** | **13.333″ × 7.5″** | **pptxgenjs `LAYOUT_WIDE`** | ✅ **Default recommendation** (modern PowerPoint 16:9 standard) |
| `720pt × 405pt` | 10″ × 5.625″ | Custom | Only when the user explicitly asks for an older PowerPoint widescreen template |
| `1920px × 1080px` | 20″ × 11.25″ | Custom | ❌ Non-standard size; projected text appears abnormally small |

**Do not think of HTML size as resolution.** PPTX is a vector document. The body size determines **physical dimensions**, not sharpness. An oversized body (`20″×11.25″`) does not make text clearer. It only makes font sizes smaller relative to the canvas, which looks worse when projected or printed.

### Three equivalent ways to write `body`

```css
body { width: 960pt;  height: 540pt; }    /* Clearest, recommended */
body { width: 1280px; height: 720px; }    /* Equivalent, for px habits */
body { width: 13.333in; height: 7.5in; }  /* Equivalent, for inch-based thinking */
```

Matching `pptxgenjs` code:

```js
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';  // 13.333 x 7.5 inch, no custom layout needed
```

---

## Four hard constraints (violations fail immediately)

`html2pptx.js` translates the HTML DOM into PowerPoint objects element by element. The formatting limitations of PowerPoint, projected back into HTML, become the four rules below.

### Rule 1: no direct text inside `DIV` elements, wrap it in `<p>` or `<h1>`-`<h6>`

```html
<!-- ❌ Wrong: text sits directly inside a div -->
<div class="title">Q3 revenue grew 23%</div>

<!-- ✅ Correct: put text inside <p> or <h1>-<h6> -->
<div class="title"><h1>Q3 revenue grew 23%</h1></div>
<div class="body"><p>New users were the main growth driver</p></div>
```

**Why**: in PowerPoint, text must live inside a text frame. A text frame maps to block-level HTML text elements such as `p`, `h*`, and `li`. A bare `<div>` has no matching text container in PPTX.

You also **cannot use `<span>` as the main text container**. `span` is an inline element and cannot become an independently aligned text box. A `span` may only appear **inside `p`/`h*`** for local styling such as bold or color changes.

### Rule 2: CSS gradients are not supported, use solid colors only

```css
/* ❌ Wrong */
background: linear-gradient(to right, #FF6B6B, #4ECDC4);

/* ✅ Correct: solid color */
background: #FF6B6B;

/* ✅ If you need multi-color stripes, use solid-color flex children */
.stripe-bar { display: flex; }
.stripe-bar div { flex: 1; }
.red   { background: #FF6B6B; }
.teal  { background: #4ECDC4; }
```

**Why**: PowerPoint shape fills support only solid fills and native gradient fills, but `pptxgenjs` via `fill: { color: ... }` only maps to solid fills. Using native PowerPoint gradients would require a separate structure, which the current toolchain does not support.

### Rule 3: backgrounds / borders / shadows belong on `DIV`, not text tags

```html
<!-- ❌ Wrong: <p> carries a background color -->
<p style="background: #FFD700; border-radius: 4px;">Key content</p>

<!-- ✅ Correct: outer div carries background/border, <p> handles text only -->
<div style="background: #FFD700; border-radius: 4px; padding: 8pt 12pt;">
  <p>Key content</p>
</div>
```

**Why**: in PowerPoint, a shape (box / rounded rectangle) and a text frame are two separate objects. HTML `<p>` only translates into a text frame. Background, border, and shadow belong to the shape, so they must be defined on the **div wrapping the text**.

### Rule 4: do not use `background-image` on `DIV`, use an `<img>` tag

```html
<!-- ❌ Wrong -->
<div style="background-image: url('chart.png')"></div>

<!-- ✅ Correct -->
<img src="chart.png" style="position: absolute; left: 50%; top: 20%; width: 300pt; height: 200pt;" />
```

**Why**: `html2pptx.js` only extracts image paths from `<img>` elements. It does not parse CSS `background-image` URLs.

---

## Path A HTML template skeleton

Each slide should be an independent HTML file, so scopes stay isolated from each other and avoid the CSS pollution of single-file decks.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 960pt; height: 540pt;           /* ⚠️ Matches LAYOUT_WIDE */
    font-family: system-ui, -apple-system, "PingFang SC", sans-serif;
    background: #FEFEF9;                    /* Solid color only, no gradients */
    overflow: hidden;
  }
  /* DIV handles layout/background/border */
  .card {
    position: absolute;
    background: #1A4A8A;                    /* Background lives on the DIV */
    border-radius: 4pt;
    padding: 12pt 16pt;
  }
  /* Text tags handle typography only, not background/border */
  .card h2 { font-size: 24pt; color: #FFFFFF; font-weight: 700; }
  .card p  { font-size: 14pt; color: rgba(255,255,255,0.85); }
</style>
</head>
<body>

  <!-- Title area: outer div handles positioning, inner text tags handle copy -->
  <div style="position: absolute; top: 40pt; left: 60pt; right: 60pt;">
    <h1 style="font-size: 36pt; color: #1A1A1A; font-weight: 700;">Use an assertive sentence as the title, not a topic noun</h1>
    <p style="font-size: 16pt; color: #555555; margin-top: 10pt;">Subtitle with supporting detail</p>
  </div>

  <!-- Content card: div handles background, h2/p handle text -->
  <div class="card" style="top: 130pt; left: 60pt; width: 240pt; height: 160pt;">
    <h2>Key point one</h2>
    <p>Short explanatory text</p>
  </div>

  <!-- List: use ul/li instead of manually typed bullet symbols -->
  <div style="position: absolute; top: 320pt; left: 60pt; width: 540pt;">
    <ul style="font-size: 16pt; color: #1A1A1A; padding-left: 24pt; list-style: disc;">
      <li>First key point</li>
      <li>Second key point</li>
      <li>Third key point</li>
    </ul>
  </div>

  <!-- Illustration: use an <img> tag, not background-image -->
  <img src="illustration.png" style="position: absolute; right: 60pt; top: 110pt; width: 320pt; height: 240pt;" />

</body>
</html>
```

---

## Common error quick reference

| Error message | Cause | Fix |
|---------|------|---------|
| `DIV element contains unwrapped text "XXX"` | A div contains bare text | Wrap the text in `<p>` or `<h1>`-`<h6>` |
| `CSS gradients are not supported` | Uses `linear-gradient` / `radial-gradient` | Change to solid colors, or segment with flex children |
| `Text element <p> has background` | A `<p>` tag has a background color | Move the background to an outer `<div>` and let `<p>` handle text only |
| `Background images on DIV elements are not supported` | A div uses `background-image` | Change it to an `<img>` tag |
| `HTML content overflows body by Xpt vertically` | Content exceeds `540pt` | Reduce content, shrink font size, or clip with `overflow: hidden` |
| `HTML dimensions don't match presentation layout` | Body dimensions do not match the presentation layout | Use `960pt × 540pt` with `LAYOUT_WIDE`, or use `defineLayout` for a custom size |
| `Text box "XXX" ends too close to bottom edge` | A large-font `<p>` is less than `0.5 inch` from the bottom edge | Move it upward and leave more bottom margin; PowerPoint bottoms are partially occluded by default |

---

## Basic workflow (PPTX in 3 steps)

### Step 1: write each slide as an independent HTML file under the constraints

```
my-deck/
├── slides/
│   ├── 01-cover.html    # Each file is a complete 960×540pt HTML slide
│   ├── 02-agenda.html
│   └── ...
└── illustration/        # All images referenced by <img>
    ├── chart1.png
    └── ...
```

### Step 2: write `build.js` to call `html2pptx.js`

```js
const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx.js');  // Script from this skill

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';  // 13.333 x 7.5 inch, matching the HTML 960×540pt canvas

  const slides = ['01-cover.html', '02-agenda.html', '03-content.html'];
  for (const file of slides) {
    await html2pptx(`./slides/${file}`, pres);
  }

  await pres.writeFile({ fileName: 'deck.pptx' });
})();
```

### Step 3: open and inspect

- Open the exported PPTX in PowerPoint/Keynote
- Double-click any text: it should be directly editable (if it is an image instead, Rule 1 was violated)
- Check for overflow: every slide should stay within the body bounds and nothing should be clipped

---

## This path vs other options: when to choose what

| Need | Choose |
|------|------|
| Teammates will edit text in the PPTX / you need to hand it off for non-technical editing | **This path** (editable, but the HTML must follow the 4 constraints from the start) |
| Only for presenting / archiving, no further edits | `export_deck_pdf.mjs` (multi-file) or `export_deck_stage_pdf.mjs` (single-file `deck-stage`) to generate a vector PDF |
| Visual freedom is the priority (animation, web components, CSS gradients, complex SVG) and non-editable output is acceptable | **PDF** (same as above). PDF is both faithful and cross-platform, and is more appropriate than an "image PPTX" |

**Never force `html2pptx` onto visually freeform HTML that was already designed that way**. In practice, visually driven HTML has a pass rate below 30% through `html2pptx`, and manually fixing the rest page by page is slower than rewriting. In that situation, the correct output is PDF, not forcing PPTX.

---

## Fallback: you already have a visual draft but the user insists on editable PPTX

This sometimes happens: you or the user already created a visually driven HTML draft, using gradients, web components, complex SVG, and so on. PDF would be the correct output, but the user explicitly says, "No, it must be an editable PPTX."

**Do not just run `html2pptx` and hope it passes**. In practice, visually driven HTML has a pass rate below 30% through `html2pptx`; the remaining 70% will either error or deform. The correct fallback is:

### Step 1 · communicate the limitations clearly

Tell the user these three things in one sentence:

> "Your current HTML uses [list specific items: gradients / web components / complex SVG / ...]. Converting it directly to an editable PPTX will fail. I have two options:
> - A. **Export PDF** (recommended): preserves visuals 100%; recipients can view and print it but not edit text
> - B. **Rewrite an editable HTML version based on the visual draft**: keep the design decisions around color, layout, and copy, but reorganize the HTML under the 4 hard constraints, which means **giving up** gradients, web components, complex SVG, and similar visual capabilities, then export an editable PPTX
>
> Which do you want?"

Do not make Option B sound trivial. Be explicit about **what will be lost**. Let the user make the tradeoff.

### Step 2 · if the user picks B: the AI should rewrite proactively, not ask the user to do it

The doctrine here is: **the user provides design intent; you are responsible for translating that intent into a compliant implementation**. Do not ask the user to learn the four hard constraints and rewrite it themselves.

Principles for the rewrite:
- **Preserve**: color system (primary / secondary / neutrals), information hierarchy (title / subtitle / body / annotation), core copy, layout skeleton (top-middle-bottom / left-right columns / grid), page rhythm
- **Downgrade**: CSS gradients → solid colors or segmented flex blocks, web components → paragraph-level HTML, complex SVG → simplified `<img>` or solid geometry, shadows → remove or weaken significantly, custom fonts → move closer to system fonts
- **Rewrite**: bare text → wrap in `<p>` / `<h*>`, `background-image` → `<img>` tag, background/border on `<p>` → outer `div`

### Step 3 · deliver a comparison checklist for transparency

After the rewrite, give the user a before/after list so they know which visual details were simplified:

```
Original design -> editable-version adjustments
- Purple gradient in title area -> solid brand color #5B3DE8 background
- Shadows on data cards -> removed (replaced with a 2pt outline for separation)
- Complex SVG line chart -> simplified to an <img> PNG (generated from an HTML screenshot)
- Hero-area web component animation -> static first frame (web components cannot be translated)
```

### Step 4 · export and deliver both formats

- Run `scripts/export_deck_pptx.mjs` on the editable HTML version to generate an editable PPTX
- **Also keep** the original visual draft and run `scripts/export_deck_pdf.mjs` to generate a high-fidelity PDF
- Deliver both formats: the PDF of the visual draft and the editable PPTX, each serving its own purpose

### When to reject Option B outright

In some cases the rewrite cost is too high, and you should advise the user to give up on editable PPTX:
- The core value of the HTML is animation or interaction (after rewriting, only a static first frame remains, losing 50%+ of the information value)
- More than 30 pages, with rewrite cost exceeding 2 hours
- The visual design depends heavily on precise SVG or custom filters (after rewriting it would barely resemble the original)

In those cases, tell the user: "The rewrite cost for this deck is too high. I recommend exporting PDF instead of PPTX. If the recipient truly needs PPTX format, then we have to accept that the visuals will become much more plain. Do you want to switch to PDF instead?"

---

## Why the 4 constraints are not a bug but a physical constraint

These four rules are not the `html2pptx.js` author's laziness. They are the result of **the PowerPoint file format itself (OOXML) projecting its constraints back into HTML**:

- In PPTX, text must live inside a text frame (`<a:txBody>`), which corresponds to paragraph-level HTML elements
- In PPTX, a shape and a text frame are separate objects, so one element cannot both draw a background and hold text
- PPTX shape fills have limited gradient support (only certain preset gradients, not arbitrary CSS-angle gradients)
- PPTX picture objects must reference real image files, not CSS properties

Once you understand this, **do not expect the tool to become smarter**. It is the HTML authoring style that must adapt to the PPTX format, not the other way around.
