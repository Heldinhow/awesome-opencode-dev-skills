---
name: algorithmic-art
description: "Create algorithmic and generative art using tools like p5.js, focusing on seeded randomness, flow fields, and interactive parameters."
---

# Algorithmic Art Creation

## Overview
Algorithmic art (or generative art) uses autonomous systems, algorithms, and mathematics to create visual art. This skill should be invoked when the user requests generative visual components, flow fields, particle systems, or complex mathematically driven sketches. It often utilizes web technologies like HTML5 Canvas or visual libraries like p5.js.

## Core Principles
- **Controlled Randomness**: Pure randomness is chaos; seeded randomness and noise (like Perlin or Simplex noise) create organic, aesthetically pleasing patterns.
- **Parametric Design**: Expose key variables (colors, densities, speeds) as parameters that can be tweaked or randomized.
- **Performance**: Generative art can be computationally heavy. Optimize loops, limit particle counts, and use off-screen canvases if necessary.
- **Emergence**: Simple rules applied to many agents (like particles) lead to complex, beautiful emergent behaviors.

## Preparation Checklist
- [ ] Identify the core concept (e.g., recursive trees, flow fields, cellular automata).
- [ ] Select the technology stack (e.g., Vanilla Canvas API, p5.js, Three.js).
- [ ] Define the color palette and aesthetic goal.

## Step-by-Step Process
1. **Design Philosophy**: Write a brief concept document defining the thematic goal and visual rules.
2. **Setup the Canvas**: Initialize the rendering environment, handling high DPI screens and window resizing.
3. **Define Parameters**: Create a configuration object holding all tweakable variables (seed, particle count, noise scale, colors).
4. **Implement Core Logic**:
   - Write state initialization (setup).
   - Write the update/render loop (draw).
   - Integrate noise functions instead of pure `Math.random()` for organic movement.
5. **Add Interactivity**: Expose UI controls (sliders, buttons) to allow the user to manipulate the parameters in real-time.
6. **Refine and Polish**: Add blend modes, trails, gradients, or post-processing effects to enhance visuals.

## Do's and Don'ts
- ✅ **Do** use seeded random numbers to make the art reproducible.
- ✅ **Do** use Perlin noise or Simplex noise for natural-looking variations.
- ❌ **Don't** hardcode absolute pixel positions; use relative coordinates or percentages to support responsiveness.
- ❌ **Don't** render thousands of complex shapes per frame without testing performance.

## Anti-Patterns
- **The Random Mess**: Relying entirely on random colors and lines without structural rules, resulting in visual noise rather than art.
- **Unresponsive Canvas**: Failing to handle window resize events, leaving the canvas stretched or clipped.
- **Memory Leaks**: Continuously creating new objects (like particles) in the animation loop without removing old ones.
