# Tweaks: Real-Time Design Variant Tuning

Tweaks are a core capability of this skill: they let users switch variations and adjust parameters in real time without editing code.

**Cross-agent environment compatibility**: some native design-agent environments (such as Claude.ai Artifacts) rely on the host's `postMessage` channel to write tweak values back into source files for persistence. This skill uses a **pure frontend localStorage approach** instead. The result is the same (state persists across refreshes), but persistence lives in browser localStorage rather than source files. This works in any agent environment (Claude Code / Codex / Cursor / Trae / etc.).

## When to add Tweaks

- The user explicitly asks for "adjustable controls" or "multiple versions"
- The design has multiple variations that need comparison
- The user did not say so explicitly, but you judge that **adding a few insightful tweaks would help them see the design space**

Default recommendation: **add 2-3 tweaks to every design** (color theme / font size / layout variant) even if the user did not ask. Showing the user the space of possibilities is part of the design service.

## Implementation (frontend-only version)

### Basic structure

```jsx
const TWEAK_DEFAULTS = {
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
};

function useTweaks() {
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const stored = localStorage.getItem('design-tweaks');
      return stored ? { ...TWEAK_DEFAULTS, ...JSON.parse(stored) } : TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try {
      localStorage.setItem('design-tweaks', JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    setTweaks(TWEAK_DEFAULTS);
    try {
      localStorage.removeItem('design-tweaks');
    } catch {}
  };

  return { tweaks, update, reset };
}
```

### Tweaks panel UI

Use a floating panel in the bottom-right corner. It should be collapsible:

```jsx
function TweaksPanel() {
  const { tweaks, update, reset } = useTweaks();
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
    }}>
      {open ? (
        <div style={{
          background: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          width: 280,
          fontFamily: 'system-ui',
          fontSize: 13,
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <strong>Tweaks</strong>
            <button onClick={() => setOpen(false)} style={{
              border: 'none', background: 'none', cursor: 'pointer', fontSize: 16,
            }}>×</button>
          </div>

          {/* Color */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Primary color</div>
            <input 
              type="color" 
              value={tweaks.primaryColor} 
              onChange={e => update({ primaryColor: e.target.value })}
              style={{ width: '100%', height: 32 }}
            />
          </label>

          {/* Font size slider */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Font size ({tweaks.fontSize}px)</div>
            <input 
              type="range" 
              min={12} max={24} step={1}
              value={tweaks.fontSize}
              onChange={e => update({ fontSize: +e.target.value })}
              style={{ width: '100%' }}
            />
          </label>

          {/* Density options */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Density</div>
            <select 
              value={tweaks.density}
              onChange={e => update({ density: e.target.value })}
              style={{ width: '100%', padding: 6 }}
            >
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </label>

          {/* Dark mode toggle */}
          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
            <input 
              type="checkbox" 
              checked={tweaks.dark}
              onChange={e => update({ dark: e.target.checked })}
            />
            <span>Dark mode</span>
          </label>

          <button onClick={reset} style={{
            width: '100%',
            padding: '8px 12px',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
          }}>Reset</button>
        </div>
      ) : (
        <button 
          onClick={() => setOpen(true)}
          style={{
            background: '#1A1A1A',
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '10px 16px',
            fontSize: 12,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >⚙ Tweaks</button>
      )}
    </div>
  );
}
```

### Applying Tweaks

Use Tweaks in the main component:

```jsx
function App() {
  const { tweaks } = useTweaks();

  return (
    <div style={{
      '--primary': tweaks.primaryColor,
      '--font-size': `${tweaks.fontSize}px`,
      background: tweaks.dark ? '#0A0A0A' : '#FAFAFA',
      color: tweaks.dark ? '#FAFAFA' : '#1A1A1A',
    }}>
      {/* Your content */}
      <TweaksPanel />
    </div>
  );
}
```

Use CSS variables in your styles:

```css
button.cta {
  background: var(--primary);
  color: white;
  font-size: var(--font-size);
}
```

## Typical tweak options

What tweaks to add for different design types:

### General
- Primary color (color picker)
- Font size (slider 12-24px)
- Typeface (select: display font vs body font)
- Dark mode (toggle)

### Slide decks
- Theme (light/dark/brand)
- Background style (solid/gradient/image)
- Font contrast (more decorative vs more restrained)
- Information density (minimal/standard/dense)

### Product prototypes
- Layout variant (layout A / B / C)
- Interaction speed (animation speed 0.5x-2x)
- Data volume (5/20/100 mock items)
- State (empty/loading/success/error)

### Animation
- Speed (0.5x-2x)
- Looping (once/loop/ping-pong)
- Easing (linear/easeOut/spring)

### Landing pages
- Hero style (image/gradient/pattern/solid)
- CTA copy (several variants)
- Structure (single column / two column / sidebar)

## Tweaks design principles

### 1. Meaningful options, not busywork

Every tweak must expose a **real design option**. Do not add tweaks nobody would genuinely switch to, like a `border-radius` slider from 0-50px where every middle value looks bad.

Good tweaks expose **discrete, intentional variations**:
- "Corner style": no rounding / slight rounding / large rounding (three options)
- Not: "Corner radius": a 0-50px slider

### 2. Less is more

A Tweaks panel should have **at most 5-6 options**. More than that and it turns into a config page, losing the purpose of quick variation exploration.

### 3. The default values must already be a finished design

Tweaks are **an enhancement, not the baseline**. The default state must already be complete and publishable. What the user sees with the Tweaks panel closed is the actual deliverable.

### 4. Group options sensibly

If there are many options, group them visually:

```
---- Visual ----
Primary color | Font size | Dark mode

---- Layout ----
Density | Sidebar position

---- Content ----
Data volume | State
```

## Forward compatibility with source-level persistence hosts

If you later want the design to run in environments that support source-level tweaks persistence (such as Claude.ai Artifacts), keep the **EDITMODE marker block**:

```jsx
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
}/*EDITMODE-END*/;
```

In the localStorage approach this marker block **does nothing**. It is just a normal comment. But in hosts that support source writeback, it can be read to enable source-level persistence. Adding it is harmless in the current environment and preserves forward compatibility.

## Common questions

**The Tweaks panel blocks design content**
→ Make it closable. Keep it closed by default and show a small button that expands only when the user clicks it.

**The user has to reconfigure tweaks every time**
→ It already uses localStorage. If values are not persisting after refresh, check whether localStorage is available. It can fail in private browsing, so keep the `catch`.

**I want multiple HTML pages to share tweaks**
→ Add the project name to the localStorage key: `design-tweaks-[projectName]`.

**I want linked behavior between tweak values**
→ Add logic inside `update`:

```jsx
const update = (patch) => {
  let next = { ...tweaks, ...patch };
  // Coupling: auto-switch text colors when dark mode is selected
  if (patch.dark === true && !patch.textColor) {
    next.textColor = '#F0EEE6';
  }
  setTweaks(next);
  localStorage.setItem(...);
};
```
