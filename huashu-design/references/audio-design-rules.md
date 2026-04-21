# Audio Design Rules · huashu-design

> The audio application formula for all animation demos. Use together with `sfx-library.md` (asset inventory).
> Forged in practice: huashu-design launch hero v1-v9 iterations · deep Gemini breakdowns of Anthropic's three official films · 8000+ A/B comparisons

---

## Core Principle · Two-Track Audio System (Iron Law)

Animation audio **must be designed in two independent layers**. One layer alone is not enough:

| Layer | Purpose | Timescale | Relationship to visuals | Frequency range |
|---|---|---|---|---|
| **SFX (beat layer)** | Marks each visual beat | Short bursts of 0.2-2s | **Strong sync** (frame-level alignment) | **High frequency 800Hz+** |
| **BGM (atmosphere bed)** | Emotional base, sound field | Continuous 20-60s | Weak sync (section-level) | **Mid/low frequency <4kHz** |

**An animation with only BGM is crippled**. Viewers subconsciously sense that "the visuals are moving but no sound responds to them," and that is the root of the cheap feeling.

---

## Gold Standard · Golden Ratios

These values are **hard engineering parameters** derived from measured comparison against Anthropic's three official films and our own v9 final. Apply them directly.

### Volume
- **BGM volume**: `0.40-0.50` (relative to full scale `1.0`)
- **SFX volume**: `1.00`
- **Loudness gap**: BGM peak should be **-6 to -8 dB** below SFX peak (the contrast comes from the loudness difference, not from making SFX absolutely loud)
- **`amix` parameter**: `normalize=0` (never use `normalize=1`, which flattens dynamic range)

### Frequency separation (P1 hard optimization)
Anthropic's trick is not "loud SFX". It is **frequency-layer separation**:

```bash
[bgm_raw]lowpass=f=4000[bgm]      # Restrict BGM to <4kHz mids and lows
[sfx_raw]highpass=f=800[sfx]      # Push SFX into the 800Hz+ mid/high range
[bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]
```

Why: the human ear is most sensitive to the 2-5kHz range (the "presence" band). If SFX also lives there while BGM covers the full spectrum, **the high-frequency content of the BGM masks the SFX**. High-passing the SFX and low-passing the BGM gives each one its own territory in the spectrum, which immediately improves SFX clarity.

### Fade
- BGM in: `afade=in:st=0:d=0.3` (0.3s, avoids a hard cut)
- BGM out: `afade=out:st=N-1.5:d=1.5` (1.5s tail, gives a sense of closure)
- SFX already carries its own envelope and does not need extra fade

---

## SFX Cue Design Rules

### Density (how many SFX every 10 seconds)
Measured SFX density across Anthropic's three films falls into three tiers:

| Film | SFX per 10s | Product personality | Scenario |
|---|---|---|---|
| Artifacts (ref-1) | **~9 / 10s** | Feature-dense, information-heavy | Complex tool demo |
| Code Desktop (ref-2) | **0** | Pure atmosphere, meditative | Focused developer tool |
| Word (ref-3) | **~4 / 10s** | Balanced, office rhythm | Productivity tool |

**Heuristics**:
- Calm/focused products → low SFX density (0-3/10s), BGM-driven
- Lively/information-dense products → high SFX density (6-9/10s), SFX-driven rhythm
- **Do not fill every visual beat**. Negative space is more sophisticated than density. **Deleting 30-50% of the cues makes the remaining ones more dramatic.**

### Cue priority
Not every visual beat needs SFX. Pick by this priority:

**P0 required** (omitting these feels wrong):
- Typing (terminal/input)
- Click/selection (moments of user decision)
- Focus change (the visual lead moves)
- Logo reveal (brand closure)

**P1 recommended**:
- Element entrance/exit (modal / card)
- Completion/success feedback
- AI generation start/end
- Major transitions (scene cuts)

**P2 optional** (too many becomes messy):
- hover / focus-in
- progress tick
- decorative ambient

### Timestamp alignment precision
- **Same-frame alignment** (0ms error): click/focus switch/logo landing
- **Lead by 1-2 frames** (-33ms): fast whoosh (gives psychological anticipation)
- **Lag by 1-2 frames** (+33ms): object landing/impact (matches real-world physics)

---

## BGM Selection Decision Tree

The huashu-design skill ships with 6 BGM tracks (`assets/bgm-*.mp3`):

```
What is the animation's personality?
├─ Product launch / technical demo → bgm-tech.mp3 (minimal synth + piano)
├─ Tutorial / tool usage → bgm-tutorial.mp3 (warm, instructional)
├─ Education / concept explanation → bgm-educational.mp3 (curious, thoughtful)
├─ Marketing ad / brand promo → bgm-ad.mp3 (upbeat, promotional)
└─ Need a variant in the same family → bgm-*-alt.mp3 (alternate versions)
```

### Scenarios with no BGM (worth considering)
See Anthropic Code Desktop (ref-2): **0 SFX + pure Lo-fi BGM** can also feel very premium.

**When to choose no BGM**:
- Animation duration <10s (there is no time for BGM to establish itself)
- The product personality is "focused/meditative"
- The scene already contains ambient sound or voiceover
- SFX density is already very high (avoid auditory overload)

---

## Scene Formulas (Ready to Use)

### Formula A · Product launch hero (same class as huashu-design v9)
```
Duration: 25s
BGM: bgm-tech.mp3 · 45% · frequency band <4kHz
SFX density: ~6/10s

cue:
  terminal typing → type × 4 (0.6s apart)
  enter           → enter
  card convergence → card × 4 (staggered by 0.2s)
  selection       → click
  Ripple          → whoosh
  4 focus shifts  → focus × 4
  Logo            → thud (1.5s)

Volume: BGM 0.45 / SFX 1.0 · amix normalize=0
```

### Formula B · Tool feature demo (in the spirit of Anthropic Code Desktop)
```
Duration: 30-45s
BGM: bgm-tutorial.mp3 · 50%
SFX density: 0-2/10s (very sparse)

Strategy: let the BGM + voiceover drive the piece; use SFX only at decisive moments (save file / command complete)
```

### Formula C · AI generation demo
```
Duration: 15-20s
BGM: bgm-tech.mp3 or no BGM
SFX density: ~8/10s (high density)

cue:
  user input      → type + enter
  AI starts       → magic/ai-process (1.2s loop)
  generation done → feedback/complete-done
  result reveal   → magic/sparkle
  
Highlight: ai-process can loop 2-3 times across the whole generation phase
```

### Formula D · Pure-atmosphere long take (in the spirit of Artifacts)
```
Duration: 10-15s
BGM: none
SFX: use only 3-5 carefully designed cues

Strategy: each SFX becomes the lead; without BGM muddying things together, every cue stands on its own.
Best for: slow single-product shots, close-up showcases
```

---

## ffmpeg Mixing Templates

### Template 1 · Layer one SFX onto a video
```bash
ffmpeg -y -i video.mp4 -itsoffset 2.5 -i sfx.mp3 \
  -filter_complex "[0:a][1:a]amix=inputs=2:normalize=0[a]" \
  -map 0:v -map "[a]" output.mp4
```

### Template 2 · Build a multi-SFX timeline (aligned by cue timestamps)
```bash
ffmpeg -y \
  -i sfx-type.mp3 -i sfx-enter.mp3 -i sfx-click.mp3 -i sfx-thud.mp3 \
  -filter_complex "\
[0:a]adelay=1100|1100[a0];\
[1:a]adelay=3200|3200[a1];\
[2:a]adelay=7000|7000[a2];\
[3:a]adelay=21800|21800[a3];\
[a0][a1][a2][a3]amix=inputs=4:duration=longest:normalize=0[mixed]" \
  -map "[mixed]" -t 25 sfx-track.mp3
```
**Key parameters**:
- `adelay=N|N`: left-channel delay in ms, then right-channel delay; write it twice to keep stereo aligned
- `normalize=0`: preserve dynamic range, critical
- `-t 25`: trim to the specified duration

### Template 3 · Video + SFX track + BGM (with frequency separation)
```bash
ffmpeg -y -i video.mp4 -i sfx-track.mp3 -i bgm.mp3 \
  -filter_complex "\
[2:a]atrim=0:25,afade=in:st=0:d=0.3,afade=out:st=23.5:d=1.5,\
     lowpass=f=4000,volume=0.45[bgm];\
[1:a]highpass=f=800,volume=1.0[sfx];\
[bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k final.mp4
```

---

## Failure Modes Quick Reference

| Symptom | Root cause | Fix |
|---|---|---|
| SFX is hard to hear | BGM high frequencies mask it | Add `lowpass=f=4000` to BGM + `highpass=f=800` to SFX |
| SFX is too harsh/loud | SFX absolute volume is too high | Lower SFX to 0.7 and BGM to 0.3 while keeping the gap |
| BGM rhythm conflicts with SFX | Wrong BGM choice (too beat-heavy) | Switch to ambient / minimal synth BGM |
| BGM cuts off abruptly at the end | No fade out | Use `afade=out:st=N-1.5:d=1.5` |
| SFX overlaps into mush | Cue density too high + each SFX is too long | Keep SFX under 0.5s and spacing ≥ 0.2s |
| MP4 has no sound in WeChat posts | WeChat sometimes mutes auto-play | Not a problem; sound is there when the user opens it; GIFs have no sound anyway |

---

## Coupling with Visuals (Advanced)

### SFX timbre should match the visual style
- Warm beige / paper-like visuals → use **wooden/soft** SFX timbres (Morse, paper snap, soft click)
- Cold black-tech visuals → use **metallic/digital** SFX timbres (beep, pulse, glitch)
- Hand-drawn / playful visuals → use **cartoon/exaggerated** SFX timbres (boing, pop, zap)

Our current `apple-gallery-showcase.md` warm beige base pairs with `keyboard/type.mp3` (mechanical) + `container/card-snap.mp3` (soft) + `impact/logo-reveal-v2.mp3` (cinematic bass).

### SFX can guide the visual rhythm
Advanced technique: **design the SFX timeline first, then adjust the visual animation to align to it** rather than the other way around.
Each SFX cue behaves like a clock tick. When visuals adapt to the SFX timeline, the rhythm feels very stable. When SFX tries to chase visuals instead, being off by even ±1 frame often feels wrong.

---

## Quality Checklist (Before Release)

- [ ] Loudness gap: SFX peak - BGM peak = -6 to -8 dB?
- [ ] Frequency split: BGM lowpass 4kHz + SFX highpass 800Hz?
- [ ] `amix normalize=0` (preserve dynamic range)?
- [ ] BGM fade-in 0.3s + fade-out 1.5s?
- [ ] Is the SFX count appropriate for the scenario personality?
- [ ] Is every SFX aligned to its visual beat within ±1 frame?
- [ ] Is the Logo reveal SFX long enough (recommended 1.5s)?
- [ ] Listen with BGM muted: does the SFX layer alone still feel rhythmic enough?
- [ ] Listen with SFX muted: does the BGM layer alone still carry emotional contour?

Each layer should make sense on its own. If it only sounds good when both are stacked, it was not designed well enough.

---

## References

- SFX asset catalog: `sfx-library.md`
- Visual style reference: `apple-gallery-showcase.md`
- Deep audio analysis of Anthropic's three films from the Huashu research archive
- Huashu-design v9 production case from the Huashu project archive
