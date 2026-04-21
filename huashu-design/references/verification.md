# Verification: Output Validation Workflow

Some design-agent-native environments (such as Claude.ai Artifacts) have built-in `fork_verifier_agent` support that spins up a subagent and checks screenshots through an iframe. Most agent environments (Claude Code / Codex / Cursor / Trae / etc.) do not have that built-in capability, but manual Playwright verification covers the same validation scenarios.

## Verification Checklist

Every time you output HTML, run through this checklist once:

### 1. Browser Render Check (Required)

The most basic check: **does the HTML open at all**? On macOS:

```bash
open -a "Google Chrome" "/path/to/your/design.html"
```

Or use Playwright screenshots (next section).

### 2. Console Error Check

The most common HTML problem is a JS error causing a blank screen. Run Playwright once:

```bash
python /path/to/huashu-design/scripts/verify.py path/to/design.html
```

This script will:
1. Open the HTML with headless Chromium
2. Save a screenshot into the project directory
3. Capture console errors
4. Report the status

See `scripts/verify.py` for details.

### 3. Multi-Viewport Check

If the design is responsive, capture multiple viewports:

```bash
python /path/to/huashu-design/scripts/verify.py design.html --viewports 1920x1080,1440x900,768x1024,375x667
```

### 4. Interaction Check

Tweaks, animation, button toggles: a default static screenshot will not catch them. **Prefer letting the user click through it in a browser**, or record a video with Playwright:

```python
page.video.record('interaction.mp4')
```

### 5. Slide-by-Slide Deck Check

For deck-style HTML, capture slide by slide:

```bash
python /path/to/huashu-design/scripts/verify.py deck.html --slides 10  # Capture the first 10 slides
```

This generates `deck-slide-01.png`, `deck-slide-02.png`, ... for fast review.

## Playwright Setup

For first-time use:

```bash
# If not installed yet
npm install -g playwright
npx playwright install chromium

# Or the Python version
pip install playwright
playwright install chromium
```

If the user already has Playwright installed globally, just use it.

## Screenshot Best Practices

### Capture the Full Page

```python
page.screenshot(path='full.png', full_page=True)
```

### Capture the Viewport

```python
page.screenshot(path='viewport.png')  # By default this captures only the visible area
```

### Capture a Specific Element

```python
element = page.query_selector('.hero-section')
element.screenshot(path='hero.png')
```

### High-Resolution Screenshots

```python
page = browser.new_page(device_scale_factor=2)  # Retina
```

### Wait for Animations to Finish Before Capturing

```python
page.wait_for_timeout(2000)  # Wait 2 seconds for animations to settle
page.screenshot(...)
```

## Sending Screenshots to the User

### Open Local Screenshots Directly

```bash
open screenshot.png
```

The user will view it in Preview / Figma / VSCode / a browser on their machine.

### Upload to an Image Host and Share the Link

If a remote collaborator needs to see it (for example in Slack / Feishu / WeChat), have the user upload it with their own image-hosting tool or MCP:

```bash
python /path/to/your/upload_image.py screenshot.png
```

Or use any MCP or image-hosting tool already configured in the user's environment. The point is simply to turn the screenshot into a shareable link.

## When Verification Fails

### Blank Page

There will be a console error. Check these first:

1. Is the integrity hash for the React+Babel script tag correct? (see `react-setup.md`)
2. Is there a naming conflict like `const styles = {...}`?
3. Are cross-file components exported to `window`?
4. Is there a JSX syntax error? (`babel.min.js` often hides details; switch to the unminified `babel.js`)

### Choppy Animation

- Record a trace in the Chrome DevTools Performance tab
- Look for layout thrashing (frequent reflow)
- Prefer `transform` and `opacity` for animation (GPU-accelerated)

### Wrong Fonts

- Check whether the `@font-face` URL is accessible
- Check the fallback fonts
- Chinese fonts load slowly: show the fallback first, then switch after loading

### Broken Layout

- Check whether `box-sizing: border-box` is applied globally
- Check the `*  margin: 0; padding: 0` reset
- Turn on grid lines in Chrome DevTools to inspect the real layout

## Verification = The Designer's Second Pair of Eyes

**Always review it yourself once**. AI-written code often has problems like:

- Looks correct, but the interaction is buggy
- Static screenshots look good, but scrolling breaks alignment
- Looks good on wide screens, but collapses on narrow ones
- Dark mode was never tested
- Some components stop responding after Tweaks switches state

**One final minute of verification can save an hour of rework**.

## Common Verification Script Commands

```bash
# Basic: open + screenshot + error capture
python verify.py design.html

# Multiple viewports
python verify.py design.html --viewports 1920x1080,375x667

# Multiple slides
python verify.py deck.html --slides 10

# Output to a specific directory
python verify.py design.html --output ./screenshots/

# headless=false, open a real browser for you to inspect
python verify.py design.html --show
```
