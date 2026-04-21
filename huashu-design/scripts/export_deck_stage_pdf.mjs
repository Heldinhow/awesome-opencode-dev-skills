#!/usr/bin/env node
/**
 * export_deck_stage_pdf.mjs — PDF export for the single-file <deck-stage> architecture
 *
 * Usage:
 *   node export_deck_stage_pdf.mjs --html <deck.html> --out <file.pdf> [--width 1920] [--height 1080]
 *
 * When should you use this script?
 *   - Your deck is a **single HTML file**, all slides are `<section>` elements, and they are wrapped by `<deck-stage>`
 *   - In that case, `export_deck_pdf.mjs` (which is for multi-file decks) does not apply
 *
 * Why not call `page.pdf()` directly? (Pitfall discovered on 2026-04-20)
 *   1. deck-stage's shadow CSS `::slotted(section) { display: none }` means only the active slide is visible
 *   2. In print media, outer `!important` rules cannot override the shadow DOM rule
 *   3. Result: the PDF always has only 1 page (the active slide)
 *
 * Solution:
 *   After opening the HTML, use page.evaluate to pull all sections out of the deck-stage slot,
 *   attach them under a normal div in the body, force position:relative + fixed dimensions with inline styles,
 *   add page-break-after: always to each section, then set the last one to auto to avoid a trailing blank page.
 *
 * Dependencies: playwright
 *   npm install playwright
 *
 * Output characteristics:
 *   - Text stays vector-based (copyable and searchable)
 *   - Visuals retain 1:1 fidelity
 *   - Fonts must be loadable by Chromium (local fonts or Google Fonts)
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

function parseArgs() {
  const args = { width: 1920, height: 1080 };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i += 2) {
    const k = a[i].replace(/^--/, '');
    args[k] = a[i + 1];
  }
  if (!args.html || !args.out) {
    console.error('Usage: node export_deck_stage_pdf.mjs --html <deck.html> --out <file.pdf> [--width 1920] [--height 1080]');
    process.exit(1);
  }
  args.width = parseInt(args.width);
  args.height = parseInt(args.height);
  return args;
}

async function main() {
  const { html, out, width, height } = parseArgs();
  const htmlAbs = path.resolve(html);
  const outFile = path.resolve(out);

  await fs.access(htmlAbs).catch(() => {
    console.error(`HTML file not found: ${htmlAbs}`);
    process.exit(1);
  });

  console.log(`Rendering ${path.basename(htmlAbs)} → ${path.basename(outFile)}`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();

  await page.goto('file://' + htmlAbs, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);  // Wait for Google Fonts + deck-stage init

  // Core fix: flatten sections out of the shadow DOM slot
  const sectionCount = await page.evaluate(({ W, H }) => {
    const stage = document.querySelector('deck-stage');
    if (!stage) throw new Error('<deck-stage> not found — this script only works for the single-file deck-stage architecture');
    const sections = Array.from(stage.querySelectorAll(':scope > section'));
    if (!sections.length) throw new Error('No <section> found inside <deck-stage>');

    // Inject print styles
    const style = document.createElement('style');
    style.textContent = `
      @page { size: ${W}px ${H}px; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; background: #fff; }
      deck-stage { display: none !important; }
    `;
    document.head.appendChild(style);

    // Flatten into the body
    const container = document.createElement('div');
    container.id = 'print-container';
    sections.forEach(s => {
      // Inline styles get the highest priority; position:relative keeps absolutely positioned children constrained correctly
      s.style.cssText = `
        width: ${W}px !important;
        height: ${H}px !important;
        display: block !important;
        position: relative !important;
        overflow: hidden !important;
        page-break-after: always !important;
        break-after: page !important;
        margin: 0 !important;
        padding: 0 !important;
      `;
      container.appendChild(s);
    });
    // Do not force a page break after the last page to avoid a trailing blank page
    const last = sections[sections.length - 1];
    last.style.pageBreakAfter = 'auto';
    last.style.breakAfter = 'auto';
    document.body.appendChild(container);
    return sections.length;
  }, { W: width, H: height });

  await page.waitForTimeout(800);

  await page.pdf({
    path: outFile,
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  const stat = await fs.stat(outFile);
  const kb = (stat.size / 1024).toFixed(0);
  console.log(`\n✓ Wrote ${outFile}  (${kb} KB, ${sectionCount} pages, vector)`);
  console.log(`  Verify page count: mdimport "${outFile}" && pdfinfo "${outFile}" | grep Pages`);
}

main().catch(e => { console.error(e); process.exit(1); });
