# Animation Best Practices · Positive Motion Design Grammar

> Distilled from a deep breakdown of Anthropic's three official product animations (Claude Design / Claude Code Desktop / Claude for Word), this file captures the rules behind “Anthropic-grade” motion design.
>
> Use it together with `animation-pitfalls.md` (the avoidance checklist). This file is the “**do this**” side; pitfalls is the “**don’t do this**” side. They are orthogonal, and you should read both.
>
> **Constraint statement**: this file includes only **motion logic and expressive style**. It **does not include any concrete brand color values**.
> Color choices should come from §1.a core asset protocol (extract from brand spec) or from the “design direction advisor”
> (20 philosophies, each with its own palette). This reference is about **how things move**, not **what color they are**.

---

## §0 · Who You Are · Identity and Taste

> Read this section before any of the technical rules below. Rules **emerge from identity**,
> not the other way around.

### §0.1 Identity anchor

**You are a motion designer who has studied the motion archives of Anthropic / Apple / Pentagram / Field.io.**

When you animate, you are not tweaking CSS transitions. You are using digital elements to **simulate a physical world**, so the viewer subconsciously believes “these are objects with weight, inertia, and overflow.”

You do not make PowerPoint-style animation. You do not make generic “fade in fade out” animation. The animation you make should **convince people the screen is a space they could reach into**.

### §0.2 Core beliefs (3)

1. **Animation is physics, not animation curves**
   `linear` is a number. `expoOut` is an object. You believe the pixels on screen deserve to be treated as objects.
   Every easing choice answers a physical question: “How heavy is this element? How much friction does it have?”

2. **Time allocation matters more than curve shape**
   Slow-Fast-Boom-Stop is your breathing pattern. **Evenly timed animation is a technical demo; rhythmic animation is narrative.**
   Slowing down at the right moment matters more than choosing the right easing at the wrong moment.

3. **Yielding to the audience is harder than showing off**
   Pausing for 0.5 seconds before the key result is a **technique**, not a compromise. **Giving the human brain reaction time is the highest form of animation literacy.**
   AI defaults to making non-stop, maximum-density motion with no pause. That is beginner behavior. Your job is restraint.

### §0.3 Taste criteria · What counts as beautiful

Your standard for “good” vs “great” is below. Each line includes **how to recognize it**. When evaluating a candidate animation, ask these questions instead of mechanically checking 14 rules.

| Dimension of beauty | Recognition test (audience reaction) |
|---|---|
| **Physical weight** | When the motion ends, the element **lands** steadily rather than merely **stopping**. The viewer subconsciously feels “this has weight” |
| **Courtesy to the viewer** | There is a perceptible pause (≥300ms) before key information appears, giving the viewer time to **see it** before the animation continues |
| **Negative space** | The ending is a decisive stop + hold, not a fade to black. The final frame is clear, assertive, and resolved |
| **Restraint** | Only one moment in the whole piece is “120% exquisite”; the other 80% is just right. **Showing off everywhere is a cheap signal** |
| **Hand-feel** | Curves rather than straight lines, irregularity rather than `setInterval` rhythm, a sense of breathing |
| **Respect** | Show the tweak process, show the bug fix. **Do not hide the work and do not fake “magic.”** AI is a collaborator, not a magician |

### §0.4 Self-check · First audience reaction test

After finishing an animation, ask: **what is the audience’s first reaction after watching it?** That is the only metric worth optimizing.

| Audience reaction | Rating | Diagnosis |
|---|---|---|
| “Looks pretty smooth” | good | Acceptable but generic; you are making PowerPoint |
| “This animation feels really smooth” | good+ | Technically right, but not striking |
| “This thing actually looks like it is **floating up off the desktop**” | great | You touched physical weight |
| “This does not look AI-made” | great+ | You reached Anthropic’s threshold |
| “I want to **screenshot this** and share it” | great++ | You made something viewers want to propagate |

**The difference between great and good is not technical correctness; it is taste judgment.** Technical correctness + correct taste = great.
Technical correctness + empty taste = good. Technical error = not even started.

### §0.5 Relationship between identity and rules

The technical rules in §1-§8 below are the **execution methods** of this identity in concrete situations, not an isolated checklist.

- If you hit a case the rules do not cover → return to §0 and judge from **identity**, not guesswork
- If rules conflict → return to §0 and use the **taste criteria** to decide which one matters more
- If you want to break a rule → first answer: “Which beauty criterion in §0.3 does this serve?” If you can answer it, break the rule. If not, do not.

Good. Continue.

---

## Overview · Animation Is Physics Unfolded in Three Layers

The cheapness in most AI-generated animation comes from one root cause: **it behaves like “digits,” not “objects.”**
Objects in the real world have mass, inertia, elasticity, and overflow. The sense of sophistication in Anthropic’s three films comes from applying a **physical set of motion rules** to digital elements.

This rule set has 3 layers:

1. **Narrative rhythm layer**: the timing distribution of Slow-Fast-Boom-Stop
2. **Motion-curve layer**: Expo Out / Overshoot / Spring; reject linear
3. **Expressive-language layer**: show process, mouse arcs, logo morph closure

---

## 1. Narrative Rhythm · Slow-Fast-Boom-Stop Five-Part Structure

Anthropic’s three films all follow this structure without exception:

| Section | Share | Rhythm | Function |
|---|---|---|---|
| **S1 Trigger** | ~15% | Slow | Gives humans reaction time, establishes realism |
| **S2 Generation** | ~15% | Medium | Introduces the visual wow moment |
| **S3 Process** | ~40% | Fast | Shows controllability / density / detail |
| **S4 Burst** | ~20% | Boom | Camera pulls back / 3D pop-out / multi-panel emergence |
| **S5 Landing** | ~10% | Still | Brand Logo + hard stop |

**Concrete duration mapping** (for a 15-second piece):
S1 trigger 2s · S2 generation 2s · S3 process 6s · S4 burst 3s · S5 landing 2s

**Things you must not do**:
- ❌ Uniform rhythm (same information density every second) — tires the viewer
- ❌ Constant high density — no peaks, no memory points
- ❌ Fading ending (fade to transparent) — it should **stop decisively**

**Self-check**: draw 5 thumbnails on paper, each representing the peak frame of one section. If the 5 images are too similar, the rhythm has not been built.

---

## 2. Easing Philosophy · Reject Linear, Embrace Physics

Anthropic’s motion always uses Bezier curves with a sense of damping. Default cubic `easeOut`
(`1-(1-t)³`) is **not sharp enough** — it does not launch fast enough and does not settle firmly enough.

### Three core easings (built into `animations.jsx`)

```js
// 1. Expo Out · fast launch, slow brake (most common, default primary easing)
// CSS equivalent: cubic-bezier(0.16, 1, 0.3, 1)
Easing.expoOut(t) // = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

// 2. Overshoot · elastic pop for toggles / buttons
// CSS equivalent: cubic-bezier(0.34, 1.56, 0.64, 1)
Easing.overshoot(t)

// 3. Spring physics · geometry returning to rest, natural landing
Easing.spring(t)
```

### Usage mapping

| Scenario | Which easing |
|---|---|
| Card rise-in / panel entrance / terminal fade / focus overlay | **`expoOut`** (primary easing, most common) |
| Toggle switch / button pop-out / emphasized interaction | `overshoot` |
| Preview geometry settling / physical landing / UI bounce | `spring` |
| Continuous movement (e.g. cursor path interpolation) | `easeInOut` (preserve symmetry) |

### Counterintuitive insight

Most product-promo animation is **too fast and too stiff**. `linear` makes digital elements feel machine-like. `easeOut` is the passing grade.
`expoOut` is the actual technical root of “premium feel” — it gives digital objects a **sense of physical weight**.

---

## 3. Motion Language · 8 Shared Principles

### 3.1 Do not use pure black or pure white as the base color

Anthropic’s three films do not use `#FFFFFF` or `#000000` as the main background. **Temperature-tinted neutrals**
(warm or cool) create the material feel of paper / canvas / desktop, reducing the machine feel.

Specific color values should come from §1.a core asset protocol or the design direction advisor. This reference intentionally avoids hard-coded values because those are **brand decisions**, not motion rules.

### 3.2 Easing should never be linear

See §2.

### 3.3 Slow-Fast-Boom-Stop narrative

See §1.

### 3.4 Show the process, not magical results

- Claude Design shows tweak parameters and slider adjustments rather than one-click perfection
- Claude Code shows code errors + AI fixing them rather than one-shot success
- Claude for Word shows Redline revisions rather than jumping directly to the final draft

**Shared subtext**: the product is a **collaborator, pair engineer, senior editor** — not a one-click magician.
That directly addresses professional users’ need for controllability and realism.

**Anti-AI-slop principle**: AI defaults to “one-click magic success” animation (generate once → perfect result).
Do the opposite: show the process, show the tweaks, show the bug and the fix. That is where brand recognizability comes from.

### 3.5 Hand-drawn mouse paths (arcs + Perlin noise)

Real human mouse movement is not a straight line. It is “accelerate → arc → decelerate and correct → click.”
AI-generated straight-line cursor interpolation creates a subconscious feeling of machine rejection.

```js
// Quadratic Bezier interpolation (start → control point → end)
function bezierQuadratic(p0, p1, p2, t) {
  const x = (1-t)*(1-t)*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0];
  const y = (1-t)*(1-t)*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1];
  return [x, y];
}

// Path: start → offset midpoint → target (forms an arc)
const path = [[100, 100], [targetX - 200, targetY + 80], [targetX, targetY]];

// Add a tiny amount of Perlin Noise (±2px) to create hand jitter
const jitterX = (simpleNoise(t * 10) - 0.5) * 4;
const jitterY = (simpleNoise(t * 10 + 100) - 0.5) * 4;
```

### 3.6 Logo “morph closure”

Anthropic’s logos do **not** appear via simple fade-in. They **morph from the previous visual element**.

**Shared pattern**: in the final 1-2 seconds, use Morph / Rotate / Converge so the entire narrative “collapses” into the brand point.

**Low-cost implementation** (without true morphing):
let the previous visual element collapse into a color block (`scale → 0.1`, translate toward center),
then let the color block expand into the wordmark. Use a 150ms snap cut + motion blur
(`filter: blur(6px)` → `0`).

```js
<Sprite start={13} end={14}>
  {/* Collapse: previous element scales to 0.1, opacity holds, blur increases */}
  const scale = interpolate(t, [0, 0.5], [1, 0.1], Easing.expoOut);
  const blur = interpolate(t, [0, 0.5], [0, 6]);
</Sprite>
<Sprite start={13.5} end={15}>
  {/* Expand: Logo scales from 0.1 → 1 at the center, blur 6 → 0 */}
  const scale = interpolate(t, [0, 0.6], [0.1, 1], Easing.overshoot);
  const blur = interpolate(t, [0, 0.6], [6, 0]);
</Sprite>
```

### 3.7 Serif + sans pairing

- **Brand / narration**: serif (signals scholarship / publishing / taste)
- **UI / code / data**: sans + mono

**A single-font system is wrong here.** Serif gives taste; sans gives function.

Specific font selection should come from brand spec (`brand-spec.md` Display / Body / Mono stacks) or the design direction advisor. This reference does not prescribe concrete fonts because that is a **brand decision**.

### 3.8 Focus switching = weaken background + sharpen foreground + flash guide

Focus switching is **not just** lowering opacity. The full formula is:

```js
// Filter stack for non-focus elements
tile.style.filter = `
  brightness(${1 - 0.5 * focusIntensity})
  saturate(${1 - 0.3 * focusIntensity})
  blur(${focusIntensity * 4}px)        // ← Critical: blur is what makes it really recede
`;
tile.style.opacity = 0.4 + 0.6 * (1 - focusIntensity);

// After focus completes, add a 150ms Flash highlight at the focus position to guide the eye back in
focusOverlay.animate([
  { background: 'rgba(255,255,255,0.3)' },
  { background: 'rgba(255,255,255,0)' }
], { duration: 150, easing: 'ease-out' });
```

**Why blur is required**: opacity + brightness alone still leave background elements visually sharp. Without blur, they do not feel pushed into the background layer.

---

## 4. Concrete Motion Techniques (Directly Reusable Snippets)

### 4.1 FLIP / Shared Element Transition

When a button “expands” into an input box, it should **not** be a disappearing button + a new panel appearing. The core idea is the **same DOM element** transitioning between two states.

```jsx
// With Framer Motion layoutId
<motion.div layoutId="design-button">Design</motion.div>
// ↓ After click, same layoutId
<motion.div layoutId="design-button">
  <input placeholder="Describe your design..." />
</motion.div>
```

Native implementation reference: https://aerotwist.com/blog/flip-your-animations/

### 4.2 “Breathing” expansion (width→height)

Panels should **not** expand width and height at the same time. Instead:
- First 40%: grow width only, keep height small
- Last 60%: hold width, then grow height

That simulates the physical feeling of “unfold first, then fill.”

```js
const widthT = interpolate(t, [0, 0.4], [0, 1], Easing.expoOut);
const heightT = interpolate(t, [0.3, 1], [0, 1], Easing.expoOut);
style.width = `${widthT * targetW}px`;
style.height = `${heightT * targetH}px`;
```

### 4.3 Staggered fade-up (30ms stagger)

For table rows, card columns, list items: each element should enter **30ms later** than the previous one, with `translateY` returning from 10px to 0.

```js
rows.forEach((row, i) => {
  const localT = Math.max(0, t - i * 0.03);  // 30ms stagger
  row.style.opacity = interpolate(localT, [0, 0.3], [0, 1], Easing.expoOut);
  row.style.transform = `translateY(${ 
    interpolate(localT, [0, 0.3], [10, 0], Easing.expoOut)
  }px)`;
});
```

### 4.4 Nonlinear breathing: hover 0.5s before the key result

Machines execute fast and continuously, but **pause 0.5 seconds before the key result appears** so the viewer’s brain has reaction time.

```jsx
// Typical scenario: AI finishes generating → hover 0.5s → result appears
<Sprite start={8} end={8.5}>
  {/* 0.5s pause — nothing moves, let the audience stare at the loading state */}
  <LoadingState />
</Sprite>
<Sprite start={8.5} end={10}>
  <ResultAppear />
</Sprite>
```

**Anti-example**: switching immediately from “generation done” to “result shown” with no pause. The audience has no time to react, and information is lost.

### 4.5 Chunk reveal: simulate token streaming

AI-generated text should **not** appear one character at a time with `setInterval` (like old subtitles). Use **chunk reveal** instead:
reveal 2-5 characters at a time with irregular intervals, simulating real token streaming.

```js
// Split into chunks rather than characters
const chunks = text.split(/(\s+|,\s*|\.\s*|;\s*)/);  // split by words + punctuation
let i = 0;
function reveal() {
  if (i >= chunks.length) return;
  element.textContent += chunks[i++];
  const delay = 40 + Math.random() * 80;  // irregular 40-120ms
  setTimeout(reveal, delay);
}
reveal();
```

### 4.6 Anticipation → Action → Follow-through

Three of Disney’s 12 principles, used very explicitly by Anthropic:

- **Anticipation**: a small reverse motion before the main action (e.g. button shrinks slightly before popping)
- **Action**: the main motion itself
- **Follow-through**: residual motion after the action (e.g. card lands, then bounces slightly)

```js
// Full three-stage card entrance
const anticip = interpolate(t, [0, 0.2], [1, 0.95], Easing.easeIn);     // Anticipation
const action  = interpolate(t, [0.2, 0.7], [0.95, 1.05], Easing.expoOut); // Action
const settle  = interpolate(t, [0.7, 1], [1.05, 1], Easing.spring);       // Settle
// Final scale = product of the three stages, or applied piecewise
```

**Anti-example**: an animation with only Action and no Anticipation + Follow-through feels like “PowerPoint animation.”

### 4.7 3D perspective + layered `translateZ`

If you want the “tilted 3D + floating cards” mood, add perspective to the container and vary `translateZ` across elements:

```css
.stage-wrap {
  perspective: 2400px;
  perspective-origin: 50% 30%;  /* Slight top-down view */
}
.card-grid {
  transform-style: preserve-3d;
  transform: rotateX(8deg) rotateY(-4deg);  /* Golden ratio */
}
.card:nth-child(3n) { transform: translateZ(30px); }
.card:nth-child(5n) { transform: translateZ(-20px); }
.card:nth-child(7n) { transform: translateZ(60px); }
```

**Why `rotateX 8° / rotateY -4°` is the golden ratio**:
- More than 10° → feels too distorted, like it is falling over
- Less than 5° → feels like skew rather than perspective
- The asymmetric 8° × -4° combination simulates a natural camera angle looking down from the upper-left of a desk

### 4.8 Diagonal pan: move X and Y together

Camera motion should not be purely vertical or purely horizontal. Move **both X and Y** to simulate diagonal drift:

```js
const panX = Math.sin(flowT * 0.22) * 40;
const panY = Math.sin(flowT * 0.35) * 30;
stage.style.transform = `
  translate(-50%, -50%)
  rotateX(8deg) rotateY(-4deg)
  translate3d(${panX}px, ${panY}px, 0)
`;
```

**Key point**: X and Y use different frequencies (`0.22` vs `0.35`) so the motion does not settle into a predictable Lissajous loop.

---

## 5. Scene Recipes (Three Narrative Templates)

The three reference videos map to three product personalities. **Pick the one that best fits your product**. Do not mix them casually.

### Recipe A · Apple-keynote dramatic (Claude Design type)

**Best for**: major launches, hero animation, visual spectacle first
**Rhythm**: strong Slow-Fast-Boom-Stop arc
**Easing**: `expoOut` throughout + a little `overshoot`
**SFX density**: high (`~0.4/s`), with SFX pitch tuned to the BGM scale
**BGM**: IDM / minimalist tech electronic, calm + precise
**Closure**: camera pulls sharply back → drop → Logo morph → airy single note → hard stop

### Recipe B · One-take tool flow (Claude Code type)

**Best for**: developer tools, productivity apps, flow-state scenes
**Rhythm**: continuous steady flow, no obvious peak
**Easing**: `spring` physics + `expoOut`
**SFX density**: **0** (the BGM alone drives edit rhythm)
**BGM**: Lo-fi hip-hop / boom-bap, 85-90 BPM
**Core technique**: key UI actions land on BGM kick/snare transients — “**musical groove becomes interaction sound**”

### Recipe C · Office-productivity narrative (Claude for Word type)

**Best for**: enterprise software, docs/spreadsheets/calendar products, professionalism first
**Rhythm**: multiple hard scene cuts + dolly in/out
**Easing**: `overshoot` (toggles) + `expoOut` (panels)
**SFX density**: medium (`~0.3/s`), mostly UI clicks
**BGM**: jazzy instrumental, minor key, BPM 90-95
**Core highlight**: one scene must contain the “hero moment” of the whole film — 3D pop-out / element lifting out of the plane

---

## 6. Anti-Examples · This Is What AI Slop Looks Like

| Anti-pattern | Why it is wrong | Correct approach |
|---|---|---|
| `transition: all 0.3s ease` | `ease` is linear’s cousin; all elements move at the same speed | Use `expoOut` + element-level stagger |
| Every entrance is `opacity 0→1` | No sense of motion direction | Pair with `translateY 10→0` + Anticipation |
| Logo fades in | No narrative closure | Morph / Converge / collapse-then-expand |
| Cursor moves in a straight line | Subconscious machine feel | Bezier arc + Perlin noise |
| Single-character typing with `setInterval` | Feels like old subtitles | Chunk Reveal with random intervals |
| No hover before the key result | Audience gets no reaction time | Add a 0.5s hover before the result |
| Focus switch only changes opacity | Background stays visually sharp | opacity + brightness + **blur** |
| Pure black / pure white base | Cyber feel / reflective fatigue | Temperature-tinted neutral (from brand spec) |
| All animations run equally fast | No rhythm | Slow-Fast-Boom-Stop |
| Fade-out ending | No decisiveness | Hard stop (hold final frame) |

---

## 7. Self-Check Checklist (60 Seconds Before Delivery)

- [ ] Is the narrative structure Slow-Fast-Boom-Stop rather than uniform rhythm?
- [ ] Is the default easing `expoOut`, not `easeOut` or `linear`?
- [ ] Do toggles / button pops use `overshoot`?
- [ ] Do card / list entrances use 30ms stagger?
- [ ] Is there a 0.5s hover before the key result?
- [ ] Does typing use Chunk Reveal rather than single-character `setInterval`?
- [ ] Does focus switching add blur, not just opacity?
- [ ] Is the Logo reveal a morph closure rather than a fade-in?
- [ ] Is the base color neither pure black nor pure white, but temperature-tinted?
- [ ] Is there hierarchy between serif and sans?
- [ ] Does the ending stop decisively rather than fade away?
- [ ] If there is a cursor, does its path arc instead of moving in a straight line?
- [ ] Does the SFX density match the product personality (see Recipe A/B/C)?
- [ ] Is there a 6-8dB loudness gap between BGM and SFX? (see `audio-design-rules.md`)

---

## 8. Relationship to the Other References

| Reference | Role | Relationship |
|---|---|---|
| `animation-pitfalls.md` | Technical avoidance guide (16 items) | “**Don’t do this**” · the inverse of this file |
| `animations.md` | Stage/Sprite engine usage | The basis for **how to write** the animation |
| `audio-design-rules.md` | Two-track audio rules | The rules for **how to score** animation |
| `sfx-library.md` | 37-item SFX catalog | The **sound asset library** |
| `apple-gallery-showcase.md` | Apple gallery showcase style | A focused study of one specific motion style |
| **This file** | Positive motion design grammar | “**Do this**” |

**Suggested order of use**:
1. Start with SKILL.md workflow Step 3 and its four positioning questions (to decide narrative role and visual temperature)
2. After the direction is chosen, read this file to define the **motion language** (Recipe A/B/C)
3. While coding, refer to `animations.md` and `animation-pitfalls.md`
4. When exporting video, follow `audio-design-rules.md` + `sfx-library.md`

---

## Appendix · Source Material Behind This File

- Anthropic official animation analysis notes from the Huashu project archive
- Anthropic audio analysis notes from the same archive
- Three internal reference videos plus matching `gemini-ref-*.md` / `audio-ref-*.md` notes
- **Strict filtering**: this reference intentionally excludes all concrete brand color values, font names, and product names.
  Color and type decisions must come from §1.a core asset protocol or the 20 design philosophies.
