# Design Context: Start from Existing Context

**This is the single most important thing in this skill.**

Good hi-fi design should grow out of existing design context. **Designing hi-fi from nothing is a last resort and will almost always produce generic work**. So at the start of every design task, ask: is there anything we can reference?

## What Counts as Design Context

In priority order, from highest to lowest:

### 1. The User's Design System / UI Kit
The user's existing component library, color tokens, typography system, and icon system. **This is the ideal case**.

### 2. The User's Codebase
If the user provides a codebase, it contains living component implementations. Read those component files:
- `theme.ts` / `colors.ts` / `tokens.css` / `_variables.scss`
- Specific components (`Button.tsx`, `Card.tsx`)
- Layout scaffold (`App.tsx`, `MainLayout.tsx`)
- Global stylesheets

**Read the code and copy exact values**: hex codes, spacing scales, font stacks, border radius. Do not redraw them from memory.

### 3. The User's Live Product
If the user has a shipped product but no code access, use Playwright or ask the user for screenshots.

```bash
# Take a screenshot of a public URL with Playwright
npx playwright screenshot https://example.com screenshot.png --viewport-size=1920,1080
```

This lets you see the real visual vocabulary.

### 4. Brand Guide / Logo / Existing Assets
The user may have logo files, brand color specs, marketing material, or slide templates. All of these count as context.

### 5. Competitor References
If the user says "like site XX," ask them for a URL or screenshot. **Do not** design from the vague impression in your training data.

### 6. Known Design Systems (Fallback)
If none of the above exists, use a widely accepted design system as the base:
- Apple HIG
- Material Design 3
- Radix Colors (for color)
- shadcn/ui (for components)
- Tailwind default palette

Tell the user clearly what you are using so they understand it is a starting point, not a final answer.

## Workflow for Gathering Context

### Step 1: Ask the User

Required opening checklist for a task (from `workflow.md`):

```markdown
1. Do you have an existing design system / UI kit / component library? Where is it?
2. Do you have a brand guide or color / typography rules?
3. Can you share screenshots or a URL of the existing product?
4. Is there a codebase I can read?
```

### Step 2: If the User Says "No," Help Them Look

Do not give up immediately. Try:

```markdown
Let me see whether there are any clues:
- Do you have related designs from earlier projects?
- What colors / typography does the company's marketing site use?
- What style is your product logo? Can you send it to me?
- Are there any products you admire as references?
```

### Step 3: Read All Context You Can Find

If the user gives you a codebase path, read:
1. **List the file structure first**: look for style / theme / component files
2. **Read theme / token files**: extract specific hex / px values
3. **Read 2-3 representative components**: inspect the visual vocabulary (hover state, shadow, border, padding patterns)
4. **Read the global stylesheet**: base reset and font loading
5. **If there is a Figma link or screenshots**: inspect them, but **trust the code more**

**Important**: **do not** glance at it once and then design from memory. You have only really lifted the system once you have captured 30+ concrete values.

### Step 4: Vocalize the System You Will Use

After reviewing the context, tell the user what system you extracted:

```markdown
Based on your codebase and product screenshots, this is the design system I extracted:

**Color**
- Primary: #C27558 (from `tokens.css`)
- Background: #FDF9F0
- Text: #1A1A1A
- Muted: #6B6B6B

**Typography**
- Display: Instrument Serif (from `@font-face` in `global.css`)
- Body: Geist Sans
- Mono: JetBrains Mono

**Spacing** (from your scale system)
- 4, 8, 12, 16, 24, 32, 48, 64

**Shadow pattern**
- `0 1px 2px rgba(0,0,0,0.04)` (subtle card)
- `0 10px 40px rgba(0,0,0,0.1)` (elevated modal)

**Border radius**
- Small components 4px, cards 12px, buttons 8px

**Component vocabulary**
- Button: filled primary, outlined secondary, ghost tertiary, all with 8px radius
- Card: white background, subtle shadow, no border

I will start from this system. Does that look right?
```

Only start after the user confirms.

## Designing from Nothing (Fallback When No Context Exists)

**Strong warning**: output quality will drop significantly in this scenario. Tell the user that explicitly.

```markdown
You do not have design context, so I can only proceed based on general design intuition.
The result will likely look "acceptable, but not distinctive."
Do you want to continue anyway, or provide some reference material first?
```

If the user insists, make decisions in this order:

### 1. Choose an Aesthetic Direction
Do not produce a generic result. Pick a clear direction:
- brutally minimal
- editorial / magazine
- brutalist / raw
- organic / natural
- luxury / refined
- playful / toy-like
- retro-futuristic
- soft / pastel

Tell the user which direction you chose.

### 2. Pick a Known Design System as the Skeleton
- Use Radix Colors for color (https://www.radix-ui.com/colors)
- Use shadcn/ui for component vocabulary (https://ui.shadcn.com)
- Use the Tailwind spacing scale (multiples of 4)

### 3. Pick a Typeface Pairing with Character

Do not default to Inter or Roboto. Suggested combinations (easy to get from Google Fonts or elsewhere):
- Instrument Serif + Geist Sans
- Cormorant Garamond + Inter Tight
- Bricolage Grotesque + Söhne (paid)
- Fraunces + Work Sans (note: Fraunces has already been overused by AI)
- JetBrains Mono + Geist Sans (technical feel)

### 4. Give Reasoning for Every Key Decision

Do not choose silently. Write it in HTML comments:

```html
<!--
Design decisions:
- Primary color: warm terracotta (oklch 0.65 0.18 25) — fits the "editorial" direction
- Display: Instrument Serif for a humanist, literary feel
- Body: Geist Sans for clean contrast
- No gradients — committed to minimalism, no AI slop
- Spacing: 8px base, golden-ratio-friendly (8/13/21/34)
-->
```

## Import Strategy (When the User Provides a Codebase)

If the user says "import this codebase as reference":

### Small (<50 files)
Read all of it and internalize the context.

### Medium (50-500 files)
Focus on:
- `src/components/` or `components/`
- All style / token / theme files
- 2-3 representative full-page components (`Home.tsx`, `Dashboard.tsx`)

### Large (>500 files)
Ask the user to narrow the focus:
- "I need a settings page" -> read the existing settings-related implementation
- "I need a new feature" -> read the app shell plus the closest reference
- Do not optimize for completeness. Optimize for accuracy.

## Working with Figma / Design Files

If the user gives a Figma link:

- **Do not** expect to directly "convert Figma to HTML" without extra tooling
- Figma links are often not publicly accessible
- Ask the user to export **screenshots** for you and share the specific color / spacing values

If they only provide a Figma screenshot, tell the user:
- I can see the visual appearance, but I cannot extract exact values
- Please provide the key numbers (hex, px), or export as code (Figma supports this)

## Final Reminder

**The upper bound of design quality in a project is determined by the quality of context you can gather**.

Spending 10 minutes collecting context is more valuable than spending 1 hour drawing hi-fi from scratch.

**When there is no context, ask the user for it first instead of forcing the work through.**
