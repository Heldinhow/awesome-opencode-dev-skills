# React + Babel Project Rules

Technical rules you must follow when building prototypes with HTML+React+Babel. Ignore them and things will break.

## Pinned Script Tags (must use these versions)

Put these three script tags in the HTML `<head>`, using **fixed versions + integrity hashes**:

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
```

**Do not** use unpinned versions like `react@18` or `react@latest` on unpkg. That causes version drift and caching issues.

**Do not** omit `integrity`. If the CDN is ever hijacked or tampered with, this is your safety line.

## File structure

```
project-name/
├── index.html               # Main HTML
├── components.jsx           # Component file (loaded with type="text/babel")
├── data.js                  # Data file
└── styles.css               # Extra CSS (optional)
```

Load them in HTML like this:

```html
<!-- React + Babel first -->
<script src="https://unpkg.com/react@18.3.1/..."></script>
<script src="https://unpkg.com/react-dom@18.3.1/..."></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/..."></script>

<!-- Then your component files -->
<script type="text/babel" src="components.jsx"></script>
<script type="text/babel" src="pages.jsx"></script>

<!-- Main entry last -->
<script type="text/babel">
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
</script>
```

**Do not** use `type="module"`. It conflicts with Babel.

## Three non-negotiable rules

### Rule 1: `styles` objects must use unique names

**Wrong** (guaranteed to blow up with multiple components):
```jsx
// components.jsx
const styles = { button: {...}, card: {...} };

// pages.jsx  <- same-name overwrite!
const styles = { container: {...}, header: {...} };
```

**Correct**: give each component file its own uniquely prefixed styles object.

```jsx
// terminal.jsx
const terminalStyles = { 
  screen: {...}, 
  line: {...} 
};

// sidebar.jsx
const sidebarStyles = { 
  container: {...}, 
  item: {...} 
};
```

**Or use inline styles** instead (recommended for small components):
```jsx
<div style={{ padding: 16, background: '#111' }}>...</div>
```

This rule is **non-negotiable**. Every time you write `const styles = {...}`, you must replace it with a specific name, or multi-component loading will crash the whole stack.

### Rule 2: Scope is not shared, so you must export manually

**Critical point**: each `<script type="text/babel">` is compiled independently by Babel, so their **scopes do not connect**. A `Terminal` component defined in `components.jsx` is **undefined by default** inside `pages.jsx`.

**Fix**: at the end of each component file, export anything shared onto `window`:

```jsx
// End of components.jsx
function Terminal(props) { ... }
function Line(props) { ... }
const colors = { green: '#...', red: '#...' };

Object.assign(window, {
  Terminal, Line, colors,
  // List everything you need to use elsewhere here
});
```

Then `pages.jsx` can use `<Terminal />` directly, because JSX will look for `window.Terminal`.

### Rule 3: do not use `scrollIntoView`

`scrollIntoView` pushes the entire HTML container upward and breaks the web harness layout. **Never use it**.

Use one of these instead:
```js
// Scroll to a position inside the container
container.scrollTop = targetElement.offsetTop;

// Or use element.scrollTo
container.scrollTo({
  top: targetElement.offsetTop - 100,
  behavior: 'smooth'
});
```

## Calling the Claude API (inside HTML)

Some native design-agent environments (such as Claude.ai Artifacts) provide a zero-config `window.claude.complete`, but most local agent environments (Claude Code / Codex / Cursor / Trae / etc.) **do not**.

If your HTML prototype needs to call an LLM for demo purposes (for example, a chat interface), you have two options:

### Option A: do not call the real API, use a mock

Recommended for demo scenarios. Write a fake helper that returns a preset response:
```jsx
window.claude = {
  async complete(prompt) {
    await new Promise(r => setTimeout(r, 800)); // Simulate delay
    return "This is a mock response. Replace it with the real API in production.";
  }
};
```

### Option B: call the Anthropic API for real

This requires an API key. The user must enter their own key in the HTML for it to work. **Never hardcode a key into the HTML**.

```html
<input id="api-key" placeholder="Paste your Anthropic API key" />
<script>
window.claude = {
  async complete(prompt) {
    const key = document.getElementById('api-key').value;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content[0].text;
  }
};
</script>
```

**Note**: calling the Anthropic API directly from the browser may hit CORS issues. If the preview environment the user gives you does not support CORS bypass, this path will not work. In that case, use Option A with a mock, or tell the user they need a proxy backend.

### Option C: use the agent-side LLM capability to generate mock data

If this is only for a local demo, you can temporarily use the current agent session's LLM capability (or a user-installed multi-model style skill) to generate mock response data first, then hardcode it into the HTML. That way the HTML runtime depends on no API at all.

## Typical HTML starter template

Copy this template as the skeleton for a React prototype:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Prototype Name</title>

  <!-- React + Babel pinned -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; width: 100%; }
    body { 
      font-family: -apple-system, 'SF Pro Text', sans-serif;
      background: #FAFAFA;
      color: #1A1A1A;
    }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>

<!-- Your component file -->
  <script type="text/babel" src="components.jsx"></script>

<!-- Main entry -->
  <script type="text/babel">
    const { useState, useEffect } = React;

    function App() {
      return (
        <div style={{padding: 40}}>
          <h1>Hello</h1>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

## Common errors and fixes

**`styles is not defined` or `Cannot read property 'button' of undefined`**
→ You defined `const styles` in one file and another file overwrote it. Rename each one specifically.

**`Terminal is not defined`**
→ Cross-file scope is not shared. Add `Object.assign(window, {Terminal})` at the end of the file where `Terminal` is defined.

**The entire page is blank but the console shows no errors**
→ Most likely a JSX syntax error that Babel did not surface clearly. Temporarily swap `babel.min.js` for the unminified `babel.js`; the error output is clearer.

**ReactDOM.createRoot is not a function**
→ Wrong version. Confirm you are using `react-dom@18.3.1` rather than 17 or something else.

**`Objects are not valid as a React child`**
→ You rendered an object instead of JSX or a string. Usually `{someObj}` should have been `{someObj.name}`.

## How to split files in larger projects

**Single files over 1000 lines** are hard to maintain. Split them like this:

```
project/
├── index.html
├── src/
│   ├── primitives.jsx      # Base elements: Button, Card, Badge...
│   ├── components.jsx      # Business components: UserCard, PostList...
│   ├── pages/
│   │   ├── home.jsx        # Home page
│   │   ├── detail.jsx      # Detail page
│   │   └── settings.jsx    # Settings page
│   ├── router.jsx          # Simple router (switches with React state)
│   └── app.jsx             # Entry component
└── data.js                 # Mock data
```

Load them in HTML in order:
```html
<script type="text/babel" src="src/primitives.jsx"></script>
<script type="text/babel" src="src/components.jsx"></script>
<script type="text/babel" src="src/pages/home.jsx"></script>
<script type="text/babel" src="src/pages/detail.jsx"></script>
<script type="text/babel" src="src/pages/settings.jsx"></script>
<script type="text/babel" src="src/router.jsx"></script>
<script type="text/babel" src="src/app.jsx"></script>
```

At the **end of every file**, use `Object.assign(window, {...})` to export anything that needs to be shared.
