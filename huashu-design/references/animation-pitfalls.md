# Animation Pitfalls: HTML Animation Failure Cases and Rules

The bugs you are most likely to hit while building animation, and how to avoid them. Every rule here comes from a real failure case.

Read this before you start writing animation. It can save you an entire iteration.

## 1. Layered Layouts: `position: relative` Is the Default Obligation

**Pitfall**: a `sentence-wrap` element contained 3 `bracket-layer` children (`position: absolute`). Because `sentence-wrap` did not get `position: relative`, those absolute brackets used `.canvas` as their coordinate system and drifted 200px below the screen.

**Rule**:
- Any container with `position: absolute` children **must** explicitly set `position: relative`
- Even if the container does not visually need offsetting, still write `position: relative` as the coordinate anchor
- If you are writing `.parent { ... }` and one of its children has `.child { position: absolute }`, add `relative` to the parent by reflex

**Quick check**: every time you use `position: absolute`, count upward through the ancestors and make sure the nearest positioned ancestor is the coordinate system you *intended*.

## 2. Character Traps: Do Not Depend on Rare Unicode

**Pitfall**: we tried to use `␣` (U+2423 OPEN BOX) to visualize a space token. Neither Noto Serif SC nor Cormorant Garamond included that glyph, so it rendered as blank/tofu and the audience saw nothing.

**Rule**:
- **Every character that appears in an animation must exist in the font you selected**
- Common rare-character blacklist: `␣ ␀ ␐ ␋ ␨ ↩ ⏎ ⌘ ⌥ ⌃ ⇧ ␦ ␖ ␛`
- For metacharacters like “space / return / tab,” use a **semantic box built in CSS**:
  ```html
  <span class="space-key">Space</span>
  ```
  ```css
  .space-key {
    display: inline-flex;
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.3em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  ```
- Validate emoji too. In fonts outside Noto Emoji, some emoji fall back to gray square boxes, so it is safer to use an `emoji` font-family or SVG

## 3. Data-Driven Grid/Flex Templates

**Pitfall**: the code had `const N = 6` tokens, but the CSS hard-coded `grid-template-columns: 80px repeat(5, 1fr)`. The sixth token got no column, and the whole matrix misaligned.

**Rule**:
- When the count comes from a JS array (`TOKENS.length`), the CSS template should also be data-driven
- Option A: inject a CSS variable from JS
  ```js
  el.style.setProperty('--cols', N);
  ```
  ```css
  .grid { grid-template-columns: 80px repeat(var(--cols), 1fr); }
  ```
- Option B: use `grid-auto-flow: column` so the browser expands automatically
- **Ban the “fixed number + JS constant” combo**. If `N` changes, CSS will not automatically stay in sync

## 4. Transition Gaps: Scene Switches Must Stay Continuous

**Pitfall**: between `zoom1` (13-19s) and `zoom2` (19.2-23s), the main sentence was already hidden. `zoom1` faded out for 0.6s + `zoom2` faded in for 0.6s + stagger delay (0.2s+) created roughly one full second of dead blank screen. The viewer thought the animation had frozen.

**Rule**:
- For continuous scene transitions, the fade-out and fade-in should **overlap**, not happen sequentially
  ```js
  // Bad:
  if (t >= 19) hideZoom('zoom1');      // 19.0s out
  if (t >= 19.4) showZoom('zoom2');    // 19.4s in → 0.4s blank in the middle

  // Good:
  if (t >= 18.6) hideZoom('zoom1');    // Start fade out 0.4s early
  if (t >= 18.6) showZoom('zoom2');    // Fade in at the same time (cross-fade)
  ```
- Or use an “anchor element” (such as the main sentence) as a visual bridge between scenes, briefly re-showing it during the zoom transition
- Always calculate CSS transition durations carefully. Do not trigger the next one before the previous one has actually finished

## 5. Pure Render Principle: Animation State Must Be Seekable

**Pitfall**: animation state was chained using `setTimeout` + `fireOnce(key, fn)`. Normal playback worked, but frame-by-frame recording / seeking to arbitrary timestamps broke because once those timeouts had already fired, the animation could not “go back in time.”

**Rule**:
- Ideally, `render(t)` is a **pure function**: given `t`, it produces one and only one DOM state
- If you must use side effects (like toggling classes), pair them with a `fired` set plus an explicit reset:
  ```js
  const fired = new Set();
  function fireOnce(key, fn) { if (!fired.has(key)) { fired.add(key); fn(); } }
  function reset() { fired.clear(); /* clear all .show classes */ }
  ```
- Expose `window.__seek(t)` for Playwright / debugging:
  ```js
  window.__seek = (t) => { reset(); render(t); };
  ```
- Do not let animation-related `setTimeout` span more than 1 second, or seek/back-jump behavior will become chaotic

## 6. Measuring Before Fonts Load = Measuring the Wrong Thing

**Pitfall**: as soon as `DOMContentLoaded` fired, the page called `charRect(idx)` to measure bracket positions. Fonts had not loaded yet, so each character width came from the fallback font. Once the real font finished loading (~500ms later), the bracket `left: Xpx` values were still based on the old measurements and stayed permanently offset.

**Rule**:
- Any layout code that depends on DOM measurement (`getBoundingClientRect`, `offsetWidth`) **must** be wrapped in `document.fonts.ready.then()`
  ```js
  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      buildBrackets(...);  // Fonts are ready here, measurements are accurate
      tick();              // Start animation
    });
  });
  ```
- The extra `requestAnimationFrame` gives the browser one frame to commit layout
- If using Google Fonts CDN, add `<link rel="preconnect">` to speed up the initial load

## 7. Recording Prep: Leave Recording Hooks for Video Export

**Pitfall**: Playwright `recordVideo` defaults to 25fps and starts recording as soon as the context is created. The first 2 seconds of page load and font load were captured too, so the delivered video began with 2 seconds of blank / flashing white.

**Rule**:
- Provide a `render-video.js` tool that handles warmup navigate → reload to restart animation → wait for duration → ffmpeg trim head + transcode to H.264 MP4
- Frame 0 of the animation **must** already be a fully laid-out initial state, not a blank/loading state
- Want 60fps? Use ffmpeg `minterpolate` as post-processing; do not depend on browser source frame rate
- Want a GIF? Use a two-phase palette pipeline (`palettegen` + `paletteuse`), which can compress a 30s 1080p animation down to about 3MB

See `video-export.md` for the full script workflow.

## 8. Batch Export: Temp Directories Must Include PID to Avoid Parallel Collisions

**Pitfall**: `render-video.js` was used in 3 processes in parallel to record 3 HTML files. Since `TMP_DIR` used only `Date.now()` for naming, the 3 processes launched within the same millisecond and shared a single temp directory. The first process to finish deleted it, and the other two crashed with `ENOENT` when they tried to read from it.

**Rule**:
- Any temporary directory that may be shared across multiple processes must include **PID or a random suffix** in its name:
  ```js
  const TMP_DIR = path.join(DIR, '.video-tmp-' + Date.now() + '-' + process.pid);
  ```
- If you really want parallel multi-file export, use shell `&` + `wait` rather than forking inside one Node script
- Conservative rule for recording multiple HTML files: run them **serially** (2 or fewer can run in parallel, 3+ should queue)

## 9. Progress Bars / Replay Buttons Showing Up in Recorded Video: Chrome UI Pollutes the Output

**Pitfall**: the animation HTML included a `.progress` bar, `.replay` button, and `.counter` timestamp for human debugging. When exported to MP4, they appeared at the bottom of the delivered video like captured dev tooling.

**Rule**:
- Manage human-facing “chrome elements” (progress bar / replay button / footer / masthead / counter / phase labels) separately from the actual video content
- Standardize the class name **`.no-record`**: any element with that class is automatically hidden by the recording script
- On the script side (`render-video.js`), inject CSS to hide common chrome class names by default:
  ```
  .progress .counter .phases .replay .masthead .footer .no-record [data-role="chrome"]
  ```
- Inject it with Playwright `addInitScript` so it applies before every navigation and stays stable across reloads
- To view the original HTML with chrome intact, add the `--keep-chrome` flag

## 10. Repeated Opening Animation in Screen Recording: Warmup Frames Leaked

**Pitfall**: the old `render-video.js` flow was `goto → wait fonts 1.5s → reload → wait duration`. Recording starts when the context is created, so the animation had already played partway through during warmup, then restarted from 0 after reload. The beginning of the video became “middle of the animation + switch + animation restarts from 0,” which felt repetitive and broken.

**Rule**:
- **Warmup and Record must use separate contexts**:
  - Warmup context (no `recordVideo`): only load URL, wait for fonts, then close
  - Record context (with `recordVideo`): fresh state, record from animation `t=0`
- ffmpeg `-ss trim` can only cut a little Playwright startup latency (~0.3s). It **cannot** hide warmup frames; the source must be clean
- Closing the recording context is what flushes the webm file to disk. That is a Playwright constraint
- Recommended pattern:
  ```js
  // Phase 1: warmup (throwaway)
  const warmupCtx = await browser.newContext({ viewport });
  const warmupPage = await warmupCtx.newPage();
  await warmupPage.goto(url, { waitUntil: 'networkidle' });
  await warmupPage.waitForTimeout(1200);
  await warmupCtx.close();

  // Phase 2: record (fresh)
  const recordCtx = await browser.newContext({ viewport, recordVideo });
  const page = await recordCtx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(DURATION * 1000);
  await page.close();
  await recordCtx.close();
  ```

## 11. Do Not Draw “Fake Chrome” Inside the Frame: Decorative Player UI Collides with Real Chrome

**Pitfall**: the animation used the `Stage` component, which already has a built-in scrubber + timecode + pause button (all `.no-record` chrome, automatically hidden during export). Then an extra decorative bottom bar was added inside the canvas, like `00:60 ──── CLAUDE-DESIGN / ANATOMY`, intended to feel like magazine-style pagination. Result: users saw two progress bars, one from Stage and one decorative. It immediately read as a bug: “Why is there another progress bar in the video?”

**Rule**:
- Stage already provides a scrubber + timecode + pause/replay buttons. **Do not draw** another progress indicator, current timecode, copyright strip, or chapter counter inside the frame. They either collide with chrome or become filler slop (violating the “earn its place” principle)
- “Page number feel,” “magazine feel,” and “bottom signature bar” are high-frequency AI filler patterns. Each time one appears, ask whether it conveys irreplaceable information or just fills empty space
- If you truly believe a bottom strip must exist (for example, the animation is literally about player UI), then it must be **narratively necessary** and **visually distinct from the Stage scrubber** (different placement, form, and tone)

**Element ownership test** (every element drawn into the canvas must answer this):

| It belongs to | Treatment |
|------------|------|
| Narrative content of a specific scene | OK, keep it |
| Global chrome (controls/debugging) | Add `.no-record` class so it is hidden during export |
| **Neither a scene element nor chrome** | **Delete it**. It is ownerless filler slop |

**3-second pre-delivery self-check**: take a still frame and ask yourself:

- Is there anything that looks like video player UI in the frame (horizontal progress bar, timecode, control-button shape)?
- If yes, does deleting it hurt the narrative? If not, delete it
- Is the same kind of information (progress / time / signature) shown twice? Merge it into one chrome location

**Anti-examples**: drawing `00:42 ──── PROJECT NAME` along the bottom, putting `CH 03 / 06` chapter count in the lower-right corner, or `v0.3.1` along the edge — all of these are fake-chrome filler.

## 12. Blank Video Intro + Misaligned Recording Start: The `__ready` × tick × lastTick Triple Trap

**Pitfall (A · blank intro)**: exported a 60-second MP4 and the first 2-3 seconds were a blank page. `ffmpeg --trim=0.3` could not remove it.

**Pitfall (B · start offset, real incident on 2026-04-20)**: exported a 24-second video and the user felt “the video only starts at second 19.” In reality, the animation started recording from `t=5`, ran to `t=24`, looped back to `t=0`, then recorded 5 more seconds — so the real beginning of the animation only appeared in the last 5 seconds.

**Root cause** (shared by both failures):

Playwright `recordVideo` begins writing WebM at `newContext()`. At that point Babel/React/font loading consumes `L` seconds (2-6s). The recording script waits for `window.__ready = true` and treats that as “the animation starts here” — but that signal must pair exactly with animation `time = 0`. Two common mistakes break that pairing:

| Mistake | Symptom |
|------|------|
| `__ready` is set in `useEffect` or synchronous setup (before the first tick frame) | Recording thinks the animation has started, but the WebM is still capturing blank page → **blank intro** |
| `lastTick = performance.now()` is initialized at the **script top level** | The font-loading delay `L` gets counted into the first frame’s `dt`, so `time` jumps to `L` immediately → whole recording is offset by `L` seconds → **misaligned start** |

**✅ Correct full starter tick template** (all hand-written animations should use this skeleton):

```js
// ━━━━━━ state ━━━━━━
let time = 0;
let playing = false;   // ❗ Do not start by default; wait for fonts ready
let lastTick = null;   // ❗ Sentinel — force dt=0 on the first tick frame (do not use performance.now())
const fired = new Set();

// ━━━━━━ tick ━━━━━━
function tick(now) {
  if (lastTick === null) {
    lastTick = now;
    window.__ready = true;   // ✅ Pair “recording start” with animation t=0 on the same frame
    render(0);               // Render once more to guarantee DOM is ready (fonts are ready now)
    requestAnimationFrame(tick);
    return;
  }
  const dt = (now - lastTick) / 1000;   // Time only starts advancing after the first frame
  lastTick = now;

  if (playing) {
    let t = time + dt;
    if (t >= DURATION) {
      t = window.__recording ? DURATION - 0.001 : 0;  // Do not loop while recording; keep 0.001s so Sprite end=duration stays visible
      if (!window.__recording) fired.clear();
    }
    time = t;
    render(time);
  }
  requestAnimationFrame(tick);
}

// ━━━━━━ boot ━━━━━━
// Do not start rAF at top level — only start after fonts have loaded
document.fonts.ready.then(() => {
  render(0);                 // Draw the initial frame first (fonts are ready)
  playing = true;
  requestAnimationFrame(tick);  // First tick frame will pair __ready + t=0
});

// ━━━━━━ seek API (for defensive correction in render-video) ━━━━━━
window.__seek = (t) => { fired.clear(); time = t; lastTick = null; render(t); };
```

**Why this template is correct**:

| Part | Why it must be this way |
|------|-------------|
| `lastTick = null` + first-frame `return` | Prevents the `L` seconds between script load and first tick from being counted into animation time |
| `playing = false` by default | Even if `tick` runs while fonts are loading, `time` does not advance and layout misalignment is avoided |
| Set `__ready` on the first tick frame | The recording script starts timing here, and the frame at that moment is the real animation `t=0` |
| Start tick only inside `document.fonts.ready.then(...)` | Avoids fallback-font measurement errors and first-frame font jumps |
| `window.__seek` exists | Lets `render-video.js` actively correct timing drift as a second line of defense |

**Matching defenses on the recording-script side**:
1. Inject `window.__recording = true` via `addInitScript` (before page `goto`)
2. `waitForFunction(() => window.__ready === true)` and record that offset for ffmpeg trim
3. **Additionally**: after `__ready`, call `page.evaluate(() => window.__seek && window.__seek(0))` to force the HTML’s time state back to zero — the second line of defense against HTML that does not strictly follow the starter template

**Validation method**: after exporting MP4,
```bash
ffmpeg -i video.mp4 -ss 0 -vframes 1 frame-0.png
ffmpeg -i video.mp4 -ss $DURATION-0.1 -vframes 1 frame-end.png
```
The first frame must be the animation’s real `t=0` starting state, and the end frame must be the animation’s final state, not some moment from a second loop.

**Reference implementation**: the `Stage` component in `assets/animations.jsx` and `scripts/render-video.js` already follow this protocol. Any hand-written HTML must use the starter tick template. Every line exists to prevent a specific bug.

## 13. Disable Looping During Recording: The `window.__recording` Handshake

**Pitfall**: the Stage animation defaulted to `loop=true` for convenient browser preview. `render-video.js` waited an extra 300ms buffer after `duration` before stopping. That was enough time for Stage to enter the next loop. When ffmpeg then cut with `-t DURATION`, the final 0.5-1s came from the next loop — so the video suddenly jumped back to Scene 1 at the end.

**Root cause**: there was no “I am recording” handshake between the recording script and the HTML. The HTML did not know it was being recorded, so it kept behaving like an interactive browser demo.

**Rule**:

1. **Recording script**: inject `window.__recording = true` via `addInitScript` before `goto`:
   ```js
   await recordCtx.addInitScript(() => { window.__recording = true; });
   ```

2. **Stage component**: detect the signal and force `loop=false`:
   ```js
   const effectiveLoop = (typeof window !== 'undefined' && window.__recording) ? false : loop;
   // ...
   if (next >= duration) return effectiveLoop ? 0 : duration - 0.001;
   //                                                       ↑ Keep 0.001 so Sprite end=duration does not get closed out
   ```

3. **Fade-out on the ending Sprite**: under recording, set `fadeOut={0}`. Otherwise the end of the video fades to transparent/dark, when users expect a clean final frame. In hand-written HTML, all ending Sprites should usually use `fadeOut={0}`.

**Reference implementation**: `assets/animations.jsx` Stage and `scripts/render-video.js` already include this handshake. Any hand-written Stage must implement `__recording` detection or it will fail during export.

**Validation**: after exporting MP4, run `ffmpeg -ss 19.8 -i video.mp4 -frames:v 1 end.png` and check that the last 0.2 seconds still show the expected final frame, with no sudden switch into another scene.

## 14. Default 60fps Video Uses Frame Duplication: `minterpolate` Has Compatibility Problems

**Pitfall**: the 60fps MP4 generated by `convert-formats.sh` using `minterpolate=fps=60:mi_mode=mci...` could not be opened in some versions of macOS QuickTime / Safari (black screen or refused playback), even though VLC / Chrome could open it.

**Root cause**: the H.264 elementary stream produced by `minterpolate` contains SEI / SPS fields that some players parse badly.

**Rule**:
- By default, use the simple `fps=60` filter (frame duplication) for 60fps output. Compatibility is broad (QuickTime/Safari/Chrome/VLC all open it)
- Use the high-quality interpolation mode only when explicitly enabled with `--minterpolate`, and **only after testing on the target player locally**
- The main value of the 60fps label is **platform recognition** (Bilibili / YouTube prioritize 60fps streams). For CSS animation, the perceptual smoothness improvement is usually minor
- Add `-profile:v high -level 4.0` to maximize H.264 compatibility

**`convert-formats.sh` now defaults to the compatibility mode**. If you need the higher-quality interpolation, enable `--minterpolate`:
```bash
bash convert-formats.sh input.mp4 --minterpolate
```

## 15. `file://` + External `.jsx` CORS Trap: Single-File Delivery Must Inline the Engine

**Pitfall**: the animation HTML used `<script type="text/babel" src="animations.jsx"></script>` to load the engine externally. Double-clicking the HTML locally (`file://`) made Babel Standalone fetch `.jsx` via XHR, and Chrome threw `Cross origin requests are only supported for protocol schemes: http, https, chrome, chrome-extension...`. The whole page went black. No `pageerror`, only a console error, which makes it easy to misdiagnose as “the animation never triggered.”

Even running an HTTP server may not save you — if there is a global local proxy, `localhost` can still go through it and fail with 502 / connection errors.

**Rule**:
- For **single-file delivery** (an HTML file that should work when double-clicked), `animations.jsx` must be **inlined** inside `<script type="text/babel">...</script>`. Do not use `src="animations.jsx"`
- For a **multi-file project** served over HTTP, external loading is fine, but the delivery note must explicitly say `python3 -m http.server 8000`
- Decision rule: are you delivering a single HTML file, or a server-backed project directory? If it is the former, inline the engine
- The Stage component / `animations.jsx` is often 200+ lines. Pasting it directly into the HTML `<script>` block is completely acceptable. Do not be afraid of the size

**Minimal validation**: double-click the generated HTML. Do **not** open it through any server. If Stage shows the first animation frame correctly, it passes.

## 16. Inverted Color Context Across Scenes: In-frame Elements Must Not Hardcode Colors

**Pitfall**: in a multi-scene animation, scene-spanning elements like `ChapterLabel`, `SceneNumber`, and `Watermark` hard-coded `color: '#1A1A1A'` in the component (dark text). It was fine on the first 4 light scenes, but disappeared entirely on scene 5’s black background. No error, no check failure, just invisible critical information.

**Rule**:
- **Any in-frame element reused across multiple scenes** (chapter tags / scene numbers / timecodes / watermarks / copyright bars) must **not hardcode color values**
- Use one of these three approaches instead:
  1. **`currentColor` inheritance**: the element uses `color: currentColor`, and the parent scene container sets the actual color
  2. **`invert` prop**: the component accepts `<ChapterLabel invert />` to switch manually between light and dark
  3. **Auto-compute from background**: `color: contrast-color(var(--scene-bg))` (CSS 4 API, or JS fallback)
- Before delivery, use Playwright to capture one representative frame per scene and inspect whether all scene-spanning elements remain visible

This trap is insidious because **there is no bug signal**. Only the human eye or OCR will catch it.

## Quick Self-Check List (5 Seconds Before You Start)

- [ ] Does every `position: absolute` parent have `position: relative`?
- [ ] Do all special characters in the animation (`␣`, `⌘`, `emoji`) actually exist in the font?
- [ ] Does the Grid/Flex template count match the JS data length?
- [ ] Are scene transitions cross-faded, with no >0.3s blank gap?
- [ ] Is all DOM measurement code wrapped in `document.fonts.ready.then()`?
- [ ] Is `render(t)` pure, or is there a clear reset mechanism?
- [ ] Is frame 0 a complete initial state rather than blank?
- [ ] Is there no fake chrome decoration inside the frame (progress bar / timecode / bottom signature strip colliding with the Stage scrubber)?
- [ ] Does the first animation tick frame set `window.__ready = true` in sync? (built into `animations.jsx`; add it yourself in hand-written HTML)
- [ ] Does Stage detect `window.__recording` and force `loop=false`? (required in hand-written HTML)
- [ ] Is the ending Sprite’s `fadeOut` set to 0 (so the video ends on a sharp frame)?
- [ ] Does the 60fps MP4 default to frame duplication mode (compatibility), with `--minterpolate` only for high-quality interpolation?
- [ ] After export, did you capture frame 0 + end frame to verify they are the true initial/final animation states?
- [ ] If a specific brand is involved (Stripe / Anthropic / Lovart / ...), did you complete the “brand asset protocol” (SKILL.md §1.a five steps)? Did you write `brand-spec.md`?
- [ ] For single-file HTML delivery: is `animations.jsx` inlined rather than loaded via `src="..."`? (external `.jsx` under `file://` will CORS-black-screen)
- [ ] Do scene-spanning elements (chapter tag / watermark / scene number) avoid hardcoded colors and remain visible on every scene background?
