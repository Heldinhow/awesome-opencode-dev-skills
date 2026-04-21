# Gallery Ripple + Multi-Focus · Scene-Orchestration Philosophy

> A **reusable visual orchestration structure** distilled from the huashu-design hero animation v9 (25 seconds, 8 scenes).
> This is not an animation production pipeline. It is about **when this kind of orchestration is the right fit**.
> Production reference: [demos/hero-animation-v9.mp4](../demos/hero-animation-v9.mp4) · [https://www.huasheng.ai/huashu-design-hero/](https://www.huasheng.ai/huashu-design-hero/)

## One-sentence version

> **When you have 20+ visually similar assets and the scene needs to express scale and depth, prefer the Gallery Ripple + Multi-Focus structure over piling up layout.**

Generic SaaS feature animation, product launches, skill promotion, serialized portfolio showcases: as long as the asset count is high enough and the style is coherent, this structure almost always works.

---

## What This Technique Actually Expresses

It is not “showing off assets.” It tells a story through **two rhythm changes**:

**Beat 1 · Ripple expansion (~1.5s)**: 48 cards spread outward from the center. The audience is hit by the sheer quantity: “Oh, this thing has that much output.”

**Beat 2 · Multi-Focus (~8s, 4 cycles)**: while the camera slowly pans, the background dims + desaturates four times, and one selected card enlarges into the screen center each time. The audience shifts from “quantity shock” to “quality gaze,” with a stable 1.7s rhythm per focus.

**Core narrative structure**: **Scale (Ripple) → Gaze (Focus × 4) → Fade-off (Walloff)**. Together these three beats express “Breadth × Depth”: not just that it can make a lot, but that each individual piece is worth stopping for.

Compare that with the anti-patterns:

| Approach | Audience perception |
|------|---------|
| 48 cards arranged statically (no Ripple) | Looks nice but has no narrative; like a grid screenshot |
| Fast-cut one card at a time (no Gallery context) | Feels like a slideshow; loses the sense of scale |
| Ripple only, no Focus | Impressive, but nothing specific stays in memory |
| **Ripple + Focus × 4 (this formula)** | **First overwhelmed by quantity, then drawn into quality, then released gently — a complete emotional arc** |

---

## Preconditions (All Must Be True)

This structure is **not universal**. All four conditions below must hold:

1. **Asset volume ≥ 20, ideally 30+**
   Below 20, the Ripple feels sparse. The density only works when the 48-cell field is visibly alive. v9 used a 48-cell grid with 32 images loop-filled.

2. **The assets share a coherent visual style**
   All 16:9 slide previews / all app screenshots / all cover designs: aspect ratio, color tone, and layout should feel like one family. Mixing styles makes the gallery feel like a clipboard.

3. **Each asset still contains readable information when enlarged alone**
   Focus blows one card up to 960px wide. If the source turns mushy or has too little information at that size, the whole beat collapses. Reverse test: can you pick 4 representative cards out of the 48? If not, quality consistency is not there.

4. **The scene is landscape or square, not vertical**
   The gallery’s 3D tilt (`rotateX(14deg) rotateY(-10deg)`) needs horizontal spread. In vertical composition it feels cramped and awkward.

**Fallback paths when conditions fail**:

| Missing condition | Fallback |
|-------|-----------|
| Fewer than 20 assets | Switch to “3-5 static items side by side + focus each one in turn” |
| Inconsistent style | Switch to “cover + 3 chapter hero images” keynote-style |
| Information too thin | Switch to a “data-driven dashboard” or “quote + big type” structure |
| Vertical format | Switch to “vertical scroll + sticky cards” |

---

## Technical Formula (v9 Production Parameters)

### 4-Layer structure

```
viewport (1920×1080, perspective: 2400px)
  └─ canvas (4320×2520, oversized overflow) → 3D tilt + pan
      └─ 8×6 grid = 48 cards (gap 40px, padding 60px)
          └─ img (16:9, border-radius 9px)
      └─ focus-overlay (absolute center, z-index 40)
          └─ img (matches selected slide)
```

**Key point**: the canvas is 2.25× larger than the viewport. That is what gives the pan the feeling of “peeking into a larger world.”

### Ripple expansion (distance-delay algorithm)

```js
// Each card’s start time = distance from center × 0.8s delay
const col = i % 8, row = Math.floor(i / 8);
const dc = col - 3.5, dr = row - 2.5;       // Offset to the center
const dist = Math.hypot(dc, dr);
const maxDist = Math.hypot(3.5, 2.5);
const delay = (dist / maxDist) * 0.8;       // 0 → 0.8s
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
const opacity = expoOut(Math.min(1, localT));
```

**Core parameters**:
- Total duration 1.7s (`T.s3_ripple: [8.3, 10.0]`)
- Max delay 0.8s (center appears first, corners last)
- Per-card entrance duration 0.7s
- Easing: `expoOut` (explosive, not gentle)

**What happens in parallel**: the canvas scale moves from 1.25 → 0.94 (zoom out to reveal), which makes the overall spread feel more forceful.

### Multi-Focus (4-beat rhythm)

```js
T.focuses = [
  { start: 11.0, end: 12.7, idx: 2  },  // 1.7s
  { start: 13.3, end: 15.0, idx: 3  },  // 1.7s
  { start: 15.6, end: 17.3, idx: 10 },  // 1.7s
  { start: 17.9, end: 19.6, idx: 16 },  // 1.7s
];
```

**Rhythm rule**: each focus lasts 1.7s, with 0.6s of breathing room between them. Total: 8s (11.0–19.6s).

**Inside each focus**:
- In ramp: 0.4s (`expoOut`)
- Hold: middle 0.9s (`focusIntensity = 1`)
- Out ramp: 0.4s (`easeOut`)

**Background treatment (this is the key)**:

```js
if (focusIntensity > 0) {
  const dimOp = entryOp * (1 - 0.6 * focusIntensity);  // dim to 40%
  const brt = 1 - 0.32 * focusIntensity;                // brightness 68%
  const sat = 1 - 0.35 * focusIntensity;                // saturate 65%
  card.style.filter = `brightness(${brt}) saturate(${sat})`;
}
```

It is **not just opacity**. You darken and desaturate at the same time. That is what makes the foreground overlay pop in color instead of merely looking “a bit brighter.”

**Focus overlay size animation**:
- From 400×225 (entrance) → 960×540 (hold)
- Surrounded by 3 shadow layers + a 3px accent-color outline ring, creating a “framed” feeling

### Pan (continuous motion keeps stillness from getting dull)

```js
const panT = Math.max(0, t - 8.6);
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;
```

- Two-layer motion: sine wave + linear drift. Not a pure loop, so the position is different at every moment
- X/Y frequencies differ (`0.12` vs `0.09`) to avoid visually obvious looping
- Clamp at ±900/500px to prevent drifting out of bounds

**Why not pure linear pan**: with pure linear motion, the audience can predict where the camera will be one second later. Sine + drift makes every second feel fresh, and under 3D tilt it creates a slight “micro-seasick” effect, in the good sense, which holds attention.

---

## Five Reusable Patterns (Distilled from v6→v9)

### 1. **Use `expoOut` as the primary easing, not `cubicOut`**

`easeOut = 1 - (1-t)³` (smooth) vs `expoOut = 1 - 2^(-10t)` (explosive then quickly convergent).

**Why**: the first 30% of `expoOut` reaches 90% very quickly. It feels more like physical damping and better matches the intuition of “something heavy settling.” Especially good for:
- Card entrances (sense of weight)
- Ripple spread (shockwave quality)
- Brand lift / landing (settledness)

**When to still use `cubicOut`**: focus out-ramp, symmetric micro-motion.

### 2. **Paper-like background + terracotta accent (Anthropic lineage)**

```css
--bg: #F7F4EE;        /* Warm paper */
--ink: #1D1D1F;       /* Almost black */
--accent: #D97757;    /* Terracotta orange */
--hairline: #E4DED2;  /* Warm line */
```

**Why**: warm backgrounds retain “breath” after GIF compression; pure white just looks like a screen. Terracotta orange acts as the sole accent across terminal prompt, dir-card selection, cursor, brand hyphen, focus ring — one color threads all visual anchors together.

**v5 lesson**: we added a noise overlay to simulate paper grain, but GIF frame compression destroyed it because every frame differed. In v6 we switched to “background color + warm shadow only,” keeping 90% of the paper feel while cutting GIF size by 60%.

### 3. **Two shadow tiers simulate depth without real 3D**

```css
.gallery-card.depth-near { box-shadow: 0 32px 80px -22px rgba(60,40,20,0.22), ... }
.gallery-card.depth-far  { box-shadow: 0 14px 40px -16px rgba(60,40,20,0.10), ... }
```

Use a deterministic formula like `sin(i × 1.7) + cos(i × 0.73)` to assign each card near/mid/far shadow tiers. **Visually you get a stacked 3D feel, but per-frame transform cost stays at zero.**

**The cost of real 3D**: giving each card its own `translateZ` forces the GPU to compute 48 transforms + shadow blurs every frame. We tried it in v4. Even Playwright struggled at 25fps. v6’s two-tier shadow looks within <5% of the real thing but costs 10× less.

### 4. **Weight changes (`font-variation-settings`) feel more cinematic than font-size changes**

```js
const wght = 100 + (700 - 100) * morphP;  // 100 → 700 over 0.9s
wordmark.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
```

The brand wordmark moves from Thin → Bold over 0.9s, combined with tiny letter-spacing shifts (`-0.045 → -0.048em`).

**Why this beats scaling**:
- Viewers have seen scaling too many times already
- Weight change feels like “internal filling,” as if a balloon is filling up, rather than being pushed closer
- Variable fonts are a 2020+ capability, so they subconsciously read as modern

**Limitation**: you need a font with variable-weight support (Inter / Roboto Flex / Recursive, etc.). Static fonts can only fake it by switching between discrete weights, which causes jumps.

### 5. **Low-intensity corner brand as a persistent signature**

During the gallery phase, the upper-left corner shows a small `HUASHU · DESIGN` signature at 16% opacity, 12px size, wide tracking.

**Why add this**:
- After the Ripple burst, viewers can lose orientation. The small upper-left label re-anchors them
- It feels more sophisticated than a giant full-screen logo. People who understand branding know a signature does not need to shout
- If the GIF gets screenshotted and shared, it still carries an ownership marker

**Rule**: show it only during the busy middle section; keep it off during the opening (do not block the terminal) and off during the ending (the brand reveal is the lead there)

---

## Anti-Examples: When Not to Use This Structure

**❌ Product demos (where users need to understand features)**: the gallery makes each card flash by too fast; viewers retain no specific function. Use “single-screen focus + tooltip callouts” instead.

**❌ Data-driven content**: the audience needs time to read numbers. The gallery rhythm is too fast. Use charts + item-by-item reveal instead.

**❌ Storytelling**: the gallery is a parallel structure; stories need causality. Use keynote-style chapter transitions instead.

**❌ Only 3-5 assets**: the Ripple lacks density and looks patched together. Use a static arrangement + one-by-one highlighting instead.

**❌ Vertical (9:16)**: the 3D tilt needs horizontal spread. In vertical format it feels slanted rather than expansive.

---

## How to Decide Whether Your Task Fits This Structure

Three quick checks:

**Step 1 · Asset count**: count how many same-family visual assets you have. `< 15` → stop. `15-25` → maybe. `25+` → use it directly.

**Step 2 · Consistency test**: place 4 random assets side by side. Do they feel like one family? If not, unify the style first or choose a different structure.

**Step 3 · Narrative fit**: are you trying to express “Breadth × Depth” (quantity × quality), or are you trying to express “process,” “features,” or “story”? If it is not the former, do not force this template onto it.

If all three are yes, just fork the v6 HTML, swap the `SLIDE_FILES` array and timeline, and you are reusing the structure. Change the palette through `--bg / --accent / --ink` and the skin changes while the skeleton stays intact.

---

## Related References

- Full technical workflow: [references/animations.md](animations.md) · [references/animation-best-practices.md](animation-best-practices.md)
- Animation export pipeline: [references/video-export.md](video-export.md)
- Audio configuration (BGM + SFX two-track system): [references/audio-design-rules.md](audio-design-rules.md)
- Horizontal reference for Apple-style gallery treatment: [references/apple-gallery-showcase.md](apple-gallery-showcase.md)
- Source HTML (v6 + audio-integrated version): `www.huasheng.ai/huashu-design-hero/index.html`
