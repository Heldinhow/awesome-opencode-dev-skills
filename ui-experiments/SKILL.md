# ui-experiments Skill

Collection of beautifully designed open-source layouts and UI experiments built with Origin UI and shadcn/ui. From [origin-space/ui-experiments](https://github.com/origin-space/ui-experiments).

## Available Experiments

| # | Name | Demo | Description |
|:--|:-----|:-----|:------------|
| 01 | Dark Table | [exp1](https://crafted.is/exp1) | Dark-themed data table |
| 02 | AI Chat | [exp2](https://crafted.is/exp2) | Chat interface for AI interactions |
| 03 | SaaS Dashboard | [exp3](https://crafted.is/exp3) | SaaS admin dashboard layout |
| 04 | Crypto Wallet | [exp4](https://crafted.is/exp4) | Cryptocurrency wallet UI |
| 05 | Candlestick Chart | [exp5](https://crafted.is/exp5) | Financial charting component |
| 06 | Event Calendar | [exp6](https://crafted.is/exp6) | Calendar/event management UI |
| 07 | Schema Visualizer | [exp7](https://crafted.is/exp7) | Database schema visualization |

## Monorepo Structure

```
ui-experiments/
├── apps/
│   ├── experiment-01/   # Dark Table
│   ├── experiment-02/    # AI Chat
│   ├── experiment-03/    # SaaS Dashboard
│   ├── experiment-04/    # Crypto Wallet
│   ├── experiment-05/    # Candlestick Chart
│   ├── experiment-06/    # Event Calendar
│   └── experiment-07/    # Schema Visualizer
├── packages/
│   ├── ui/              # Shared shadcn/ui components
│   ├── eslint-config/
│   └── typescript-config/
```

## Setup

```bash
# Clone the repo
git clone https://github.com/origin-space/ui-experiments.git
cd ui-experiments

# Install dependencies
pnpm install

# Run a specific experiment
pnpm --filter experiment-01 dev
```

## Adding Components

```bash
# Add shadcn/ui component to specific experiment
pnpm dlx shadcn@latest add button -c apps/experiment-01
```

Components are placed in `packages/ui/src/components/` and imported as:

```tsx
import { Button } from "@workspace/ui/components/ui/button";
```

## Using in Your Own Project

1. **Initialize shadcn/ui**:
   ```bash
   pnpm dlx shadcn@latest init
   ```

2. **Copy desired experiment** or reference the component structure

3. **Import from shared ui package**:
   ```tsx
   import { Button, Table, Card } from "@workspace/ui/components/ui/button";
   ```

## Component Patterns

### Shared Components (`packages/ui`)
- Located in `packages/ui/src/components/`
- Uses shadcn/ui registry system
- Themeable via CSS variables

### Experiment-Specific
- Each `experiment-XX/` has its own `components/` folder
- Custom components specific to that experiment
- Can reference shared UI components

## Design Reference

All experiments use:
- **Origin UI** components (https://originui.com)
- **shadcn/ui** base components (https://ui.shadcn.com)
- **Tailwind CSS** for styling

Live demos: https://crafted.is

## Terms

Personal and commercial use permitted. Redistribution or resale (even partial) is not permitted. Copyright owned by Origin UI and Crafted.

## Creating Similar UI

When building UI similar to these experiments:

1. Identify the pattern (table, chat, dashboard, chart)
2. Check shadcn/ui for base components
3. Reference Origin UI for advanced components
4. Use Tailwind for custom styling
5. Implement dark/light theme support

## Categories

- **Data Display**: Dark Table (exp1), Schema Visualizer (exp7)
- **Communication**: AI Chat (exp2)
- **Finance**: Candlestick Chart (exp5), Crypto Wallet (exp4)
- **Productivity**: Event Calendar (exp6), SaaS Dashboard (exp3)