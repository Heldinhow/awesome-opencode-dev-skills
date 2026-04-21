# Scene Template Library: Organized by Output Type

> Use in combination with the "prompt DNA" from `design-styles.md`.
> Formula: `[style prompt DNA] + [scene template] + [specific content description]`

---

## 1. WeChat article cover / header image

**Specs**:
- Cover image: 2.35:1 (`900×383px` or `1200×510px`)
- Inline article image: 16:9 (`1200×675px`) or 4:3 (`1200×900px`)

**Key design factors**:
- Prioritize visual impact (users scroll fast in the feed)
- Very little or no text (the WeChat article title will overlay above)
- Moderate color saturation (the WeChat reading environment is visually white)
- Avoid excessive detail (it still needs to read as a thumbnail)

**Recommended styles**: 01 Pentagram / 11 Build / 12 Sagmeister / 18 Kenya Hara / 07 Field.io

**Scene prompt template**:
```
[Insert style DNA here]
- Article cover image for WeChat subscription
- Landscape format, 2.35:1 aspect ratio
- Bold visual impact, minimal or no text
- Moderate color saturation for white reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point
```

---

## 2. Inline article illustration / concept illustration

**Specs**:
- 16:9 (`1200×675px`) is the most universal
- 1:1 (`800×800px`) works well for emphasis
- 4:3 (`1200×900px`) suits information-dense content

**Key design factors**:
- Serve the article's argument, not decoration
- Create visual rhythm with surrounding content
- Express one core concept simply
- Prefer AI generation; use HTML screenshots only for precise data tables

**Recommended styles**: choose based on article tone; commonly 01/04/10/17/18

**Scene prompt template**:
```
[Insert style DNA here]
- Article illustration, concept visualization
- [16:9 / 1:1 / 4:3] aspect ratio
- Single clear concept: [describe the core concept]
- Serve the argument, not decoration
- [Light/Dark] background to match article tone
```

---

## 3. Infographic / data visualization

**Specs**:
- Vertical long image: `1080×1920px` (phone reading)
- Horizontal: `1920×1080px` (embedded in articles)
- Square: `1080×1080px` (social media)

**Key design factors**:
- Clear information hierarchy (title → key data → details)
- Accurate data, no fabrication
- Visual guidance lines (the user's reading path)
- Use icons/charts appropriately to aid understanding

**Recommended styles**: 04 Fathom / 10 Müller-Brockmann / 02 Stamen / 17 Takram

**Scene prompt template**:
```
[Insert style DNA here]
- Infographic / data visualization
- [Vertical 1080x1920 / Horizontal 1920x1080 / Square 1080x1080]
- Clear information hierarchy: title → key data → details
- Visual flow guiding reader's eye path
- Icons and charts for comprehension
- Data-accurate, no decorative distortion
```

---

## 4. PPT / Keynote presentation

**Specs**:
- Standard: 16:9 (`1920×1080px`)
- Widescreen: 16:10 (`1920×1200px`)

**Key design factors**:
- One core message per slide (no piling on)
- Clear type hierarchy (`title 40pt+ / body 24pt+ / notes 16pt+`)
- Lots of whitespace for projection clarity
- Image/text ratio of at least 60:40
- A consistent visual system (color, type, spacing)

**Recommended styles**: 01 Pentagram / 10 Müller-Brockmann / 11 Build / 18 Kenya Hara / 04 Fathom

**Scene prompt template**:
```
[Insert style DNA here]
- Presentation slide design, 16:9
- One core message per slide
- Clear type hierarchy (title 40pt+, body 24pt+)
- Generous whitespace for projection clarity
- Consistent visual system throughout
- [Light/Dark] theme
```

---

## 5. PDF white paper / technical report

**Specs**:
- A4 portrait (`210×297mm / 595×842pt`)
- Letter portrait (`216×279mm / 612×792pt`)

**Key design factors**:
- Optimized for long-form reading (66-character line width, 1.5-1.8 line height)
- Clear chapter navigation system
- Unified header/footer/page-number design
- Elegant coexistence of charts and body text
- Citation / annotation system
- A refined cover page design

**Recommended styles**: 10 Müller-Brockmann / 04 Fathom / 03 Information Architects / 17 Takram / 19 Irma Boom

**Scene prompt template**:
```
[Insert style DNA here]
- PDF document / white paper design
- A4 portrait format (210×297mm)
- Long-form reading optimized (66 char line width, 1.5 line height)
- Clear chapter navigation system
- Elegant header/footer/page number design
- Charts integrated with body text
- Professional cover page
```

---

## 6. Landing page / product website

**Specs**:
- Desktop: `1440px` design width (responsive down to `320px`)
- Hero height: `100vh`

**Key design factors**:
- Communicate the core value within the first 5 seconds
- Clear CTA (action button)
- Scroll narrative structure (problem → solution → proof → action)
- Mobile adaptation
- Loading speed

**Recommended styles**: 05 Locomotive / 01 Pentagram / 11 Build / 08 Resn / 06 Active Theory

**Scene prompt template**:
```
[Insert style DNA here]
- Landing page / product website
- Desktop 1440px width, responsive
- Hero section 100vh, core value in 5 seconds
- Clear CTA button design
- Scroll narrative: problem → solution → proof → action
- Modern web aesthetic
```

---

## 7. App UI / prototype interface

**Specs**:
- iOS: `390×844pt` (iPhone 15)
- Android: `360×800dp`
- Tablet: `1024×1366pt` (iPad Pro)

**Key design factors**:
- Touch friendly (minimum tap area `44×44pt`)
- Consistency with the platform design language
- Standard handling of status bar / navigation bar / tab bar
- Moderate information density (mobile should not be too dense)

**Recommended styles**: 17 Takram / 11 Build / 03 Information Architects / 01 Pentagram

**Scene prompt template**:
```
[Insert style DNA here]
- Mobile app UI design
- iOS [390×844pt] / Android [360×800dp]
- Touch-friendly (44pt minimum tap targets)
- Consistent design system
- Standard status bar / navigation / tab bar
- Moderate information density
```

---

## 8. Xiaohongshu companion image

**Specs**:
- Vertical: 3:4 (`1080×1440px`) is best
- Square: 1:1 (`1080×1080px`)
- The first image determines click-through rate

**Key design factors**:
- Visual attraction comes first (competing inside a waterfall feed)
- A small amount of text is okay, but no more than 20% of the image
- Bright but not tacky color
- A sense of lifestyle / texture / atmosphere

**Recommended styles**: 12 Sagmeister / 11 Build / 20 Neo Shen / 09 Experimental Jetset

**Scene prompt template**:
```
[Insert style DNA here]
- Social media image for Xiaohongshu (RED)
- Vertical 3:4 (1080×1440px)
- Eye-catching in waterfall feed
- Minimal text overlay (under 20% of area)
- Vivid but tasteful colors
- Lifestyle/texture/atmosphere feel
```

---

## Combination example

**Scenario**: a WeChat article cover introducing an AI coding tool, aiming for something professional but warm

**Step 1**: choose a style → 17 Takram (professional + warm)
**Step 2**: combine Takram prompt DNA with the WeChat cover template

```
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry

Article cover image for WeChat subscription
- Landscape format, 2.35:1 aspect ratio (1200×510px)
- Bold visual impact, minimal text
- Moderate color saturation for white reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point

Content: An AI coding assistant tool, showing the concept of human-AI collaboration
in software development, warm and professional atmosphere
```

---

**Version**: v1.0
**Updated**: 2026-02-13
