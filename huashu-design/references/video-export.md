# Video Export: Export HTML Animation to MP4/GIF

Once an animation HTML file is done, users often ask, "Can this be exported as video?" This guide gives the full workflow.

## When to Export

**Export only when**:
- The animation runs end-to-end and has been visually verified (Playwright screenshots confirm correct states at each time point)
- The user has watched it in the browser at least once and confirmed the result looks right
- **Do not** export while animation bugs are still being fixed. Once it is turned into video, iteration gets more expensive

**Common trigger phrases from users**:
- "Can you export it as a video?"
- "Convert it to MP4"
- "Make it a GIF"
- "60fps"

## Output Specs

By default, deliver all three formats at once and let the user choose:

| Format | Spec | Best for | Typical size (30s) |
|---|---|---|---|
| MP4 25fps | 1920×1080 · H.264 · CRF 18 | Embedded posts, WeChat video accounts, YouTube | 1-2 MB |
| MP4 60fps | 1920×1080 · minterpolate frame interpolation · H.264 · CRF 18 | High-frame-rate showcase, Bilibili, portfolios | 1.5-3 MB |
| GIF | 960×540 · 15fps · palette-optimized | Twitter/X, README, Slack previews | 2-4 MB |

## Toolchain

There are three scripts under `scripts/`:

### 1. `render-video.js` — HTML → MP4

Records a base 25fps MP4. Depends on global Playwright.

```bash
NODE_PATH=$(npm root -g) node /path/to/huashu-design/scripts/render-video.js <html-file>
```

Optional arguments:
- `--duration=30` animation duration (seconds)
- `--width=1920 --height=1080` resolution
- `--trim=2.2` seconds to cut from the beginning of the video (removes reload + font load time)
- `--fontwait=1.5` font loading wait time (seconds); increase if many fonts are involved

Output: a `.mp4` with the same name in the same directory as the HTML.

### 2. `add-music.sh` — MP4 + BGM → MP4

Mixes background music into a silent MP4. It can pick from the built-in BGM library by mood, or accept your own audio. Automatically matches duration and applies fade-in/fade-out.

```bash
bash add-music.sh <input.mp4> [--mood=<name>] [--music=<path>] [--out=<path>]
```

**Built-in BGM library** (stored at `assets/bgm-<mood>.mp3`):

| `--mood=` | Style | Best for |
|-----------|------|---------|
| `tech` (default) | Apple Silicon / Apple keynote, minimal synth + piano | Product launches, AI tools, skill promos |
| `ad` | Upbeat modern electronic with build + drop | Social ads, product teasers, promo spots |
| `educational` | Warm and bright, light guitar/electric piano, inviting | Explainers, course intros, tutorials |
| `educational-alt` | Alternate track in the same family | Same as above |
| `tutorial` | Lo-fi ambient, almost invisible | Software demos, coding tutorials, long demos |
| `tutorial-alt` | Alternate track in the same family | Same as above |

**Behavior**:
- Music is trimmed to match the video duration
- 0.3s fade-in + 1s fade-out (avoids hard cuts)
- Video stream uses `-c:v copy` with no re-encode; audio is AAC 192k
- `--music=<path>` takes priority over `--mood`, so you can directly use any external audio file
- An invalid mood name will list all valid options instead of failing silently

**Typical pipeline** (the full animation export trio + soundtrack):
```bash
node render-video.js animation.html                        # Screen-record
bash convert-formats.sh animation.mp4                      # Derive 60fps + GIF
bash add-music.sh animation-60fps.mp4                      # Add default tech BGM
# Or pick by scenario:
bash add-music.sh tutorial-demo.mp4 --mood=tutorial
bash add-music.sh product-promo.mp4 --mood=ad --out=promo-final.mp4
```

### 3. `convert-formats.sh` — MP4 → 60fps MP4 + GIF

Generates a 60fps version and a GIF from an existing MP4.

```bash
bash /path/to/huashu-design/scripts/convert-formats.sh <input.mp4> [gif_width] [--minterpolate]
```

Outputs (in the same directory as the input):
- `<name>-60fps.mp4` — uses `fps=60` frame duplication by default (broad compatibility); add `--minterpolate` for higher-quality interpolation
- `<name>.gif` — palette-optimized GIF (default width 960, configurable)

**60fps mode selection**:

| Mode | Command | Compatibility | Best for |
|---|---|---|---|
| Frame duplication (default) | `convert-formats.sh in.mp4` | Works in QuickTime/Safari/Chrome/VLC | General delivery, upload platforms, social media |
| `minterpolate` interpolation | `convert-formats.sh in.mp4 --minterpolate` | Some macOS QuickTime/Safari versions may refuse to play it | Bilibili and other cases that truly need interpolated 60fps, **must be tested locally before delivery** |

Why the default was changed to frame duplication: the H.264 elementary stream produced by minterpolate has a known compatibility bug. We repeatedly hit the "macOS QuickTime cannot open it" problem when minterpolate was the default. See `animation-pitfalls.md` §14 for details.

`gif_width` values:
- 960 (default) — standard for social platforms
- 1280 — clearer but larger files
- 600 — optimized for fast Twitter/X loading

## Full Workflow (Recommended Standard)

When the user says "export the video":

```bash
cd <project-directory>

# Assume $SKILL points to the root of this skill (replace it according to your install path)

# 1. Record the base 25fps MP4
NODE_PATH=$(npm root -g) node "$SKILL/scripts/render-video.js" my-animation.html

# 2. Derive the 60fps MP4 and GIF
bash "$SKILL/scripts/convert-formats.sh" my-animation.mp4

# Output files:
# my-animation.mp4         (25fps · 1-2 MB)
# my-animation-60fps.mp4   (60fps · 1.5-3 MB)
# my-animation.gif         (15fps · 2-4 MB)
```

## Technical Details (For Troubleshooting)

### Playwright `recordVideo` pitfalls

- Frame rate is fixed at 25fps; it cannot directly record 60fps (Chromium headless compositor limit)
- Recording starts as soon as the context is created, so you must use `trim` to cut the loading time at the front
- The default output is webm; it must be transcoded with ffmpeg to H.264 MP4 for broad playback support

`render-video.js` already handles all of this.

### ffmpeg `minterpolate` parameters

Current configuration: `minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`

- `mi_mode=mci` — motion compensation interpolation
- `mc_mode=aobmc` — adaptive overlapped block motion compensation
- `me_mode=bidir` — bidirectional motion estimation
- `vsbmc=1` — variable-size block motion compensation

Works well for CSS **transform animations** (`translate`/`scale`/`rotate`).
For **pure fades**, it can produce slight ghosting. If the user dislikes it, downgrade to simple frame duplication:

```bash
ffmpeg -i input.mp4 -r 60 -c:v libx264 ... output.mp4
```

### Why GIF palette generation is two-pass

GIF supports only 256 colors. A one-pass GIF compresses the whole animation into one generic 256-color palette, which muddies subtle palettes like beige backgrounds with orange accents.

Two-pass process:
1. `palettegen=stats_mode=diff` — first scan the whole animation and generate an **optimal palette for this specific animation**
2. `paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle` — encode using that palette; rectangle diff updates only changing regions and greatly reduces file size

For fade transitions, `dither=bayer` looks smoother than `none`, though the file is slightly larger.

## Pre-flight Check (Before Export)

30-second checklist before exporting:

- [ ] The HTML has been played through fully in the browser with no console errors
- [ ] Frame 0 of the animation is a complete initial state (not a blank loading frame)
- [ ] The last frame is a stable ending state (not cut off mid-transition)
- [ ] Fonts/images/emoji all render correctly (see `animation-pitfalls.md`)
- [ ] The `duration` argument matches the actual animation duration in the HTML
- [ ] The HTML Stage checks `window.__recording` and forces `loop=false` (required for hand-written Stage; built in if using `assets/animations.jsx`)
- [ ] The ending Sprite uses `fadeOut={0}` (the final video frame should not fade away)
- [ ] Includes the "Created by Huashu-Design" watermark (required only for animation scenarios; third-party branded work should add the prefix "Unofficial production · ". See SKILL.md section "Skill Promotion Watermark")

## Delivery Note to Include

Standard format to send the user after export finishes:

```
**Complete Delivery**

| File | Format | Spec | Size |
|---|---|---|---|
| foo.mp4 | MP4 | 1920×1080 · 25fps · H.264 | X MB |
| foo-60fps.mp4 | MP4 | 1920×1080 · 60fps (motion interpolation) · H.264 | X MB |
| foo.gif | GIF | 960×540 · 15fps · palette-optimized | X MB |

**Notes**
- 60fps uses minterpolate for motion-estimated frame interpolation, which works well for transform animations
- The GIF uses palette optimization, so a 30-second animation can be compressed to around 3MB

Say the word if you want a different size or frame rate.
```

## Common Follow-up Requests

| User says | Response |
|---|---|
| "It is too large" | MP4: raise CRF to 23-28; GIF: reduce resolution to 600 or fps to 10 |
| "The GIF is too blurry" | Increase `gif_width` to 1280, or suggest MP4 instead (WeChat Moments supports it too) |
| "Make it vertical 9:16" | Re-record the source HTML with `--width=1080 --height=1920` |
| "Add a watermark" | Use ffmpeg with `-vf "drawtext=..."` or `overlay=` a PNG |
| "Need a transparent background" | MP4 does not support alpha; use WebM VP9 + alpha or APNG |
| "Need lossless" | Set CRF to 0 + preset `veryslow` (files will be roughly 10x larger) |
