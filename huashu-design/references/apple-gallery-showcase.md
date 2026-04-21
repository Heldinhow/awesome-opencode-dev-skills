# Apple Gallery Showcase · Gallery Wall Animation Style

> Inspiration: the hero video on the Claude Design site + Apple product-page “showcase wall” presentation
> Real-world source: huashu-design launch hero v5
> Best for: **product launch hero animations, skill capability demos, portfolio showcases** — any scenario where you need to exhibit many high-quality outputs at once while guiding audience attention

---

## Trigger Test: When to Use This Style

**Good fit**:
- You have 10+ real outputs to show on screen at once (PPTs, apps, websites, infographics)
- The audience is professional (developers, designers, product managers) and sensitive to quality
- The tone you want is "restrained, exhibition-like, premium, spacious"
- You need focus and overview to coexist (detail without losing the whole)

**Not a good fit**:
- Single-product spotlight (use the product hero template from frontend-design)
- Emotional / story-heavy animation (use a timeline storytelling template)
- Small screens / vertical layouts (the tilted perspective gets muddy on small canvases)

---

## Core Visual Tokens

```css
:root {
  /* Light gallery palette */
  --bg:         #F5F5F7;   /* Main canvas background — Apple site gray */
  --bg-warm:    #FAF9F5;   /* Warm off-white variant */
  --ink:        #1D1D1F;   /* Primary text color */
  --ink-80:     #3A3A3D;
  --ink-60:     #545458;
  --muted:      #86868B;   /* Secondary text */
  --dim:        #C7C7CC;
  --hairline:   #E5E5EA;   /* 1px card border */
  --accent:     #D97757;   /* Terracotta orange — Claude brand */
  --accent-deep:#B85D3D;

  --serif-cn: "Noto Serif SC", "Songti SC", Georgia, serif;
  --serif-en: "Source Serif 4", "Tiempos Headline", Georgia, serif;
  --sans:     "Inter", -apple-system, "PingFang SC", system-ui;
  --mono:     "JetBrains Mono", "SF Mono", ui-monospace;
}
```

**Key principles**:
1. **Never use a pure black background**. Black turns the work into “cinema,” not “usable work product.”
2. **Terracotta orange is the only hue accent**. Everything else is grayscale + white.
3. **A three-stack type system** (English serif + Chinese serif + sans + mono) creates a “publication” feel rather than an “internet product” feel.

---

## Core Layout Patterns

### 1. Floating cards (the basic unit of the whole style)

```css
.gallery-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 6px;                          /* Inner padding acts like mounting paper */
  border: 1px solid var(--hairline);
  box-shadow:
    0 20px 60px -20px rgba(29, 29, 31, 0.12),   /* Main shadow: soft and long */
    0 6px 18px -6px rgba(29, 29, 31, 0.06);     /* Near-light layer for lift */
  aspect-ratio: 16 / 9;                  /* Unified slide ratio */
  overflow: hidden;
}
.gallery-card img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 9px;                    /* Slightly smaller than card radius for nesting */
}
```

**Anti-pattern**: do not make edge-to-edge tiles with no padding, border, or shadow. That expresses infographic density, not exhibition display.

### 2. 3D tilted gallery wall

```css
.gallery-viewport {
  position: absolute; inset: 0;
  overflow: hidden;
  perspective: 2400px;                   /* Deep perspective without exaggeration */
  perspective-origin: 50% 45%;
}
.gallery-canvas {
  width: 4320px;                         /* Canvas = 2.25× viewport */
  height: 2520px;                        /* Extra room for pan */
  transform-origin: center center;
  transform: perspective(2400px)
             rotateX(14deg)              /* Tilt back */
             rotateY(-10deg)             /* Turn left */
             rotateZ(-2deg);             /* Slight skew to break regularity */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 40px;
  padding: 60px;
}
```

**Parameter sweet spot**:
- `rotateX`: 10-15deg (more than that feels like a cheap event backdrop)
- `rotateY`: ±8-12deg (enough lateral depth)
- `rotateZ`: ±2-3deg (adds human imperfection)
- `perspective`: 2000-2800px (below 2000 gets fisheye; above 3000 gets too orthographic)

### 3. 2×2 convergence from the four corners (selection scene)

```css
.grid22 {
  display: grid;
  grid-template-columns: repeat(2, 800px);
  gap: 56px 64px;
  align-items: start;
}
```

Each card slides in from its corresponding corner (`tl`/`tr`/`bl`/`br`) toward the center, plus fade-in. The corresponding `cornerEntry` vectors:

```js
const cornerEntry = {
  tl: { dx: -700, dy: -500 },
  tr: { dx:  700, dy: -500 },
  bl: { dx: -700, dy:  500 },
  br: { dx:  700, dy:  500 },
};
```

---

## Five Core Animation Modes

### Mode A · Four-corner convergence (0.8-1.2s)

Four elements slide in from the viewport corners while scaling from 0.85→1.0 with ease-out. Good for openings that present multiple directional choices.

```js
const inP = easeOut(clampLerp(t, start, end));
card.style.transform = `translate3d(${(1-inP)*ce.dx}px, ${(1-inP)*ce.dy}px, 0) scale(${0.85 + 0.15*inP})`;
card.style.opacity = inP;
```

### Mode B · Selected card zoom + others slide away (0.8s)

The selected card scales 1.0→1.28, while the other cards fade out + blur + drift back toward the corners:

```js
// Selected
card.style.transform = `translate3d(${cellDx*outP}px, ${cellDy*outP}px, 0) scale(${1 + 0.28*easeOut(zoomP)})`;
// Unselected
card.style.opacity = 1 - outP;
card.style.filter = `blur(${outP * 1.5}px)`;
```

**Key point**: the unselected cards should blur, not just fade. Blur simulates depth of field and visually pushes the selected one forward.

### Mode C · Ripple expansion (1.7s)

Cards reveal from center outward, delayed by distance. Each one fades in while shrinking from 1.25x to 0.94x (“camera pulling back”):

```js
const col = i % COLS, row = Math.floor(i / COLS);
const dc = col - (COLS-1)/2, dr = row - (ROWS-1)/2;
const dist = Math.sqrt(dc*dc + dr*dr);
const delay = (dist / maxDist) * 0.8;
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
card.style.opacity = easeOut(Math.min(1, localT));

// Meanwhile, scale the whole gallery 1.25→0.94
const galleryScale = 1.25 - 0.31 * easeOut(rippleProgress);
```

### Mode D · Sinusoidal pan (continuous drift)

Combine sine waves with linear drift to avoid the “start/end loop” feeling of marquee motion:

```js
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;    // Drift left
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;    // Drift up
const clampedX = Math.max(-900, Math.min(900, panX));   // Avoid exposing edges
```

**Parameters**:
- Sine period `0.09-0.15 rad/s` (slow, about one swing every 30-50s)
- Linear drift `5-8 px/s` (slower than a blink)
- Amplitude `120-220 px` (large enough to feel, small enough not to induce nausea)

### Mode E · Focus overlay (focus switching)

**Key design**: the focus overlay is a **flat plane** (not tilted) floating above the tilted canvas. The selected slide scales from its tile size (about 400×225) to the screen center (960×540), while the background canvas keeps its tilt but **dims to 45%**:

```js
// Focus overlay (flat, centered)
focusOverlay.style.width = (startW + (endW - startW) * focusIntensity) + 'px';
focusOverlay.style.height = (startH + (endH - startH) * focusIntensity) + 'px';
focusOverlay.style.opacity = focusIntensity;

// Background cards darken but remain visible (critical: do not mask 100%)
card.style.opacity = entryOp * (1 - 0.55 * focusIntensity);   // 1 → 0.45
card.style.filter = `brightness(${1 - 0.3 * focusIntensity})`;
```

**Sharpness iron law**:
- The overlay `<img>` must use the original full-resolution `src`; **do not reuse the compressed gallery thumbnail**
- Preload all originals into a `new Image()[]` array ahead of time
- Compute overlay `width/height` frame by frame so the browser resamples from the original asset every frame

---

## Timeline Architecture (Reusable Skeleton)

```js
const T = {
  DURATION: 25.0,
  s1_in: [0.0, 0.8],    s1_type: [1.0, 3.2],  s1_out: [3.5, 4.0],
  s2_in: [3.9, 5.1],    s2_hold: [5.1, 7.0],  s2_out: [7.0, 7.8],
  s3_hold: [7.8, 8.3],  s3_ripple: [8.3, 10.0],
  panStart: 8.6,
  focuses: [
    { start: 11.0, end: 12.7, idx: 2  },
    { start: 13.3, end: 15.0, idx: 3  },
    { start: 15.6, end: 17.3, idx: 10 },
    { start: 17.9, end: 19.6, idx: 16 },
  ],
  s4_walloff: [21.1, 21.8], s4_in: [21.8, 22.7], s4_hold: [23.7, 25.0],
};

// Core easing
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
function lerp(time, start, end, fromV, toV, easing) {
  if (time <= start) return fromV;
  if (time >= end) return toV;
  let p = (time - start) / (end - start);
  if (easing) p = easing(p);
  return fromV + (toV - fromV) * p;
}

// Single render(t) function reads timestamp and writes all elements
function render(t) { /* ... */ }
requestAnimationFrame(function tick(now) {
  const t = ((now - startMs) / 1000) % T.DURATION;
  render(t);
  requestAnimationFrame(tick);
});
```

**Architectural essence**: **all state is derived from timestamp `t`**. No state machine, no `setTimeout`. This gives you:
- Jump to any time with `window.__setTime(12.3)` instantly (great for Playwright frame capture)
- Looping that is naturally seamless (`t mod DURATION`)
- The ability to freeze any frame during debugging

---

## Texture Details (Easy to Miss, But Fatal)

### 1. SVG noise texture

Light backgrounds are most at risk of feeling too flat. Add a very subtle `fractalNoise` layer:

```html
<style>
.stage::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.078  0 0 0 0 0.078  0 0 0 0 0.074  0 0 0 0.035 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.5;
  pointer-events: none;
  z-index: 30;
}
</style>
```

It looks like nothing changed, until you remove it.

### 2. Corner brand marker

```html
<div class="corner-brand">
  <div class="mark"></div>
  <div>HUASHU · DESIGN</div>
</div>
```

```css
.corner-brand {
  position: absolute; top: 48px; left: 72px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}
```

Show it only in the gallery-wall scene, with fade-in/out. Think museum label.

### 3. Brand-closing wordmark

```css
.brand-wordmark {
  font-family: var(--sans);
  font-size: 148px;
  font-weight: 700;
  letter-spacing: -0.045em;   /* Negative tracking is the key for logotype density */
}
.brand-wordmark .accent {
  color: var(--accent);
  font-weight: 500;           /* The accent character is slightly thinner for contrast */
}
```

`letter-spacing: -0.045em` is the standard large-type treatment from Apple product pages.

---

## Common Failure Modes

| Symptom | Cause | Fix |
|---|---|---|
| Looks like a PPT template | Cards have no shadow / hairline | Add the 2-layer box-shadow + 1px border |
| The tilt feels cheap | Only `rotateY` was used, no `rotateZ` | Add ±2-3deg `rotateZ` to break symmetry |
| The pan feels “stuttery” | Used `setTimeout` or looping CSS keyframes | Use `rAF` + continuous `sin/cos` functions |
| Text becomes unreadable in focus mode | Reused low-res gallery tiles | Use a dedicated overlay + direct original `src` |
| Background feels too empty | Pure `#F5F5F7` fill | Add SVG `fractalNoise` at 0.5 opacity |
| Type feels too “internet” | Only Inter is used | Add Serif (one for Chinese, one for English) + mono |

---

## References

- Full implementation sample: Huashu internal `hero-animation-v5.html` archive file
- Original inspiration: `claude.ai/design` hero video
- Aesthetic reference: Apple product pages, Dribbble shot collection pages

Whenever the need is “show many high-quality outputs in a curated arrangement,” copy the skeleton from this file and swap the content + timing.
