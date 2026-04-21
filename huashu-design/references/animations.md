# Animations: Timeline Animation Engine

Read this when building animation/motion design HTML. Principles, usage, and common patterns.

## Core Pattern: Stage + Sprite

Our animation system (`assets/animations.jsx`) provides a timeline-driven engine:

- **`<Stage>`**: The container for the entire animation. Automatically provides auto-scale (fit viewport) + scrubber + play/pause/loop controls.
- **`<Sprite start end>`**: A time slice. A Sprite is only visible between `start` and `end`. Inside it, you can read its local progress `t` (0→1) through the `useSprite()` hook.
- **`useTime()`**: Read the current global time (seconds).
- **`Easing.easeInOut` / `Easing.easeOut` / ...**: Easing functions.
- **`interpolate(t, from, to, easing?)`**: Interpolate based on `t`.

This pattern borrows from the Remotion/After Effects mindset, but stays lightweight and dependency-free.

## Getting Started

```html
<script type="text/babel" src="animations.jsx"></script>
<script type="text/babel">
  const { Stage, Sprite, useTime, useSprite, Easing, interpolate } = window.Animations;

  function Title() {
    const { t } = useSprite();  // Local progress 0→1
    const opacity = interpolate(t, [0, 1], [0, 1], Easing.easeOut);
    const y = interpolate(t, [0, 1], [40, 0], Easing.easeOut);
    return (
      <h1 style={{ 
        opacity, 
        transform: `translateY(${y}px)`,
        fontSize: 120,
        fontWeight: 900,
      }}>
        Hello.
      </h1>
    );
  }

  function Scene() {
    return (
      <Stage duration={10}>  {/* 10-second animation */}
        <Sprite start={0} end={3}>
          <Title />
        </Sprite>
        <Sprite start={2} end={5}>
          <SubTitle />
        </Sprite>
        {/* ... */}
      </Stage>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Scene />);
</script>
```

## Common Animation Patterns

### 1. Fade In / Fade Out

```jsx
function FadeIn({ children }) {
  const { t } = useSprite();
  const opacity = interpolate(t, [0, 0.3], [0, 1], Easing.easeOut);
  return <div style={{ opacity }}>{children}</div>;
}
```

**Pay attention to the range**: `[0, 0.3]` means the fade-in completes during the first 30% of the sprite, then `opacity=1` is held for the rest.

### 2. Slide In

```jsx
function SlideIn({ children, from = 'left' }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, 0.4], [0, 1], Easing.easeOut);
  const offset = (1 - progress) * 100;
  const directions = {
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    top: `translateY(-${offset}px)`,
    bottom: `translateY(${offset}px)`,
  };
  return (
    <div style={{
      transform: directions[from],
      opacity: progress,
    }}>
      {children}
    </div>
  );
}
```

### 3. Character-by-character Typewriter

```jsx
function Typewriter({ text }) {
  const { t } = useSprite();
  const charCount = Math.floor(text.length * Math.min(t * 2, 1));
  return <span>{text.slice(0, charCount)}</span>;
}
```

### 4. Number Count-up

```jsx
function CountUp({ from = 0, to = 100, duration = 0.6 }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, duration], [0, 1], Easing.easeOut);
  const value = Math.floor(from + (to - from) * progress);
  return <span>{value.toLocaleString()}</span>;
}
```

### 5. Sectioned Explanation (Typical Teaching Animation)

```jsx
function Scene() {
  return (
    <Stage duration={20}>
      {/* Phase 1: Show the problem */}
      <Sprite start={0} end={4}>
        <Problem />
      </Sprite>

      {/* Phase 2: Show the approach */}
      <Sprite start={4} end={10}>
        <Approach />
      </Sprite>

      {/* Phase 3: Show the result */}
      <Sprite start={10} end={16}>
        <Result />
      </Sprite>

      {/* Captions shown throughout */}
      <Sprite start={0} end={20}>
        <Caption />
      </Sprite>
    </Stage>
  );
}
```

## Easing Functions

Preset easing curves:

| Easing | Characteristic | Best used for |
|--------|------|------|
| `linear` | Constant speed | Crawling captions, continuous motion |
| `easeIn` | Slow→fast | Exits and disappearances |
| `easeOut` | Fast→slow | Entrances and reveals |
| `easeInOut` | Slow→fast→slow | Position changes |
| **`expoOut`** ⭐ | **Exponential ease-out** | **Anthropic-grade primary easing** (physical sense of weight) |
| **`overshoot`** ⭐ | **Elastic rebound** | **Toggles / button pop-outs / emphasized interactions** |
| `spring` | Spring motion | Interaction feedback, geometry settling |
| `anticipation` | Reverse first, then forward | Emphasized actions |

**Use `expoOut` as the default primary easing** (not `easeOut`) — see `animation-best-practices.md` §2.
Use `expoOut` for entrances, `easeIn` for exits, and `overshoot` for toggles. This is the basic law behind Anthropic-grade motion.

## Rhythm and Duration Guide

### Micro-interactions (0.1-0.3s)
- Button hover
- Card expand
- Tooltip appearance

### UI transitions (0.3-0.8s)
- Page switch
- Modal appearance
- List item insertion

### Narrative animation (2-10s per segment)
- One explanatory phase for a concept
- Chart reveal
- Scene transition

### A single narrative segment should not exceed 10 seconds
Human attention is limited. Use 10 seconds to say one thing, then move on.

## The Thinking Order for Designing Animation

### 1. Content/story comes first, animation comes second

**Wrong**: Start by wanting a fancy animation, then stuff content into it.
**Right**: First get clear on what information you want to communicate, then use animation to serve that information.

Animation is a **signal**, not **decoration**. A fade-in says, "this matters, look here." If everything fades in, the signal stops working.

### 2. Write the timeline by scene

```
0:00 - 0:03   Problem appears (fade in)
0:03 - 0:06   Problem expands / zooms in (zoom+pan)
0:06 - 0:09   Solution appears (slide in from right)
0:09 - 0:12   Solution is explained (typewriter)
0:12 - 0:15   Result demo (counter up + chart reveal)
0:15 - 0:18   One-line summary (static, read for 3 seconds)
0:18 - 0:20   CTA or fade out
```

Write the timeline first, then write components.

### 3. Assets first

Prepare the images/icons/fonts the animation needs **before** you start. Do not stop mid-build to hunt for assets. It kills your momentum.

## Common Issues

**Animation stutters**
→ Usually layout thrashing. Use `transform` and `opacity`; do not animate `top`/`left`/`width`/`height`/`margin`. Browsers GPU-accelerate `transform`.

**Animation is too fast to read**
→ A person needs 100-150ms to read one Chinese character and 300-500ms for a word. If text is carrying the story, leave at least 3 seconds per sentence.

**Animation is too slow and the audience gets bored**
→ Interesting visual changes need to stay dense. A static frame lasting more than 5 seconds usually feels dull.

**Multiple animations interfere with each other**
→ Use CSS `will-change: transform` to tell the browser in advance that an element will move, reducing reflow.

**Recording to video**
→ Use the skill's built-in toolchain (one command outputs three formats): see `video-export.md`
- `scripts/render-video.js` — HTML → 25fps MP4 (Playwright + ffmpeg)
- `scripts/convert-formats.sh` — 25fps MP4 → 60fps MP4 + optimized GIF
- Need more precise frame rendering? Make `render(t)` a pure function, see item 5 in `animation-pitfalls.md`

## Working With Video Tools

This skill is for **HTML animation** (running in the browser). If the final deliverable needs to become video media:

- **Short animations / concept demos**: Build the HTML animation here → screen-record it
- **Long videos / narrative pieces**: This skill focuses on HTML animation; use an AI video generation skill or professional video software for long-form video
- **Motion graphics**: Professional tools like After Effects or Motion Canvas are more suitable

## About libraries like Popmotion

If you really need physics animation (spring, decay, keyframes with precise timing) and our engine cannot handle it, you can fall back to Popmotion:

```html
<script src="https://unpkg.com/popmotion@11.0.5/dist/popmotion.min.js"></script>
```

But **try our engine first**. It is enough in 90% of cases.
