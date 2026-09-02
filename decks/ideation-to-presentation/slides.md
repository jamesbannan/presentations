---
theme: slidev-theme-nightshift
title: "From Ideation to Presentation with Markdown, Slidev & Agents"
titleTemplate: "%s"
author: "James Bannan"
keywords: slidev, markdown, agents, presentations, developer workflow
info: |
  Lightning talk for Agentic AI Melbourne — September 2026.
  James Bannan, Principal Consultant @ Microsoft.
mdc: true
layout: cover
---

# From Ideation<br>to Presentation

## with Markdown, Slidev & Agents

James Bannan · Principal Consultant @ Microsoft

<p>This deck was built exactly the way I'm about to describe. You're inside the demo right now.</p>

<!--
0:00–0:20 — Hook. Say the last line out loud, let it land, then move.
-->

---
layout: section
scene: 1
---

# The Old Way

## Every other artefact you ship lives in git. Not this one.

<!--
0:20–0:35
- Frame it as a tooling mismatch, not a complaint about PowerPoint.
- Everything else in your workflow is text in a repo. Slides are the exception.
-->

---
layout: dialog
scene: '01 — PAIN'
---

# Where the friction actually is

<ul class="verb-list">
  <li>Slide tools predate your toolchain — no repo, no diff, no pipeline.</li>
  <li>Agents already build decks. Copilot, Gemini — generation isn't the gap.</li>
  <li>But the history lives inside the app. <em>"v3-final-FINAL"</em> is not source control.</li>
  <li>And the format fights automation: code is text an agent drives headlessly, a <code>.pptx</code> is a binary it clicks through.</li>
</ul>

<p style="margin-top:1.2em; color:#b7aed4;">The gap isn't generation. It's everything a developer expects around it.</p>

<!--
0:35–1:05
- Bullet 2 matters: don't set this up as "agents can't make slides". They can.
- The argument is that the artefact lands somewhere you can't review, diff or
  automate — which is the setup for both halves of the rest of the talk.
-->

---
layout: section
scene: 2
---

# The Workflow

## Separate the writing from the layout

<!--
1:05–1:15
-->

---
layout: dialog
scene: '02 — PIPELINE'
accent: cyan
---

# Notes → Markdown → Slidev

<ul class="verb-list">
  <li><strong>You</strong> — write rough notes: bullet points, a voice memo transcript, a half-formed argument.</li>
  <li><strong>Agent</strong> — turns the notes into structured Markdown: headings, bullets, speaker notes, one <code>---</code> per slide.</li>
  <li><strong>Slidev</strong> — renders the Markdown against a theme it never has to think about.</li>
</ul>

<p style="margin-top:1.2em; color:#b7aed4;">The agent isn't laying out slides. It's writing a file.</p>

<!--
1:15–1:55
- Core idea of the talk. Say it plainly, don't rush it.
- "Writing a file" is the setup for section 3 — hold that thought.
-->

---
layout: terminal
scene: '03 — SOURCE'
---

# This is the actual source for the slide before this one

```markdown
---
layout: dialog
scene: '02 — PIPELINE'
accent: cyan
---

# Notes → Markdown → Slidev

<ul class="verb-list">
  <li><strong>You</strong> — write rough notes...</li>
  <li><strong>Agent</strong> — turns notes into structured Markdown...</li>
  <li><strong>Slidev</strong> — renders it against a theme...</li>
</ul>
```

<!--
2:15–2:35
- Point at the screen: "no drag and drop happened, ever."
-->

---
layout: media
scene: '04 — DEMO'
---

# Notes in. Markdown out.

<SceneVideo
  src="/demo-clip.mp4"
  poster="/demo-clip-poster.png"
  label="AGENT RUN — 00:11"
  caption="Rough notes → agent → this file's outline. Unedited, real time."
/>

<!--
2:35–3:00
- Click play manually — don't autoplay, you want eyes on you when it starts.
- Clip should be ~10-15s, silent or with minimal audio (venue sound is unreliable).
- Drop the real file in public/demo-clip.mp4 (and a poster frame at
  public/demo-clip-poster.png) before the talk — see README.
-->

---
layout: section
scene: 3
---

# The Look

## Prompting for a theme is the easy part. Reading it back isn't.

<!--
3:00–3:10
- Careful here: Copilot will absolutely generate you a PowerPoint theme. Don't
  claim otherwise — the room will know. The distinction is what you get handed.
-->

---
layout: dialog
scene: '05 — THEME'
accent: magenta
---

# The theme is also just a prompt

<ul class="verb-list">
  <li>I didn't describe a design. I described a <em>mood</em> — a late-night pixel adventure game, dialogue box across the bottom, verb-coin bullets.</li>
  <li>Out came a theme: colour tokens, five layouts, components. All of it code.</li>
  <li>The agent doesn't lay out slides. It builds the machine that lays out slides — <em>once</em>.</li>
</ul>

<p style="margin-top:1.2em; color:#b7aed4;">Other tools will generate you a theme. This one hands you the source.</p>

<!--
3:10–3:45
- This is where the talk stops being "agent writes Markdown" — which everyone
  has seen — and becomes something they haven't.
- Everything on this screen, the backdrop included, came out of that prompt.
- The point is not that an agent made a theme. It's that the theme is a file:
  reviewable, diffable, reusable across every deck in the repo. Next slide
  proves it.
-->

---
layout: terminal
scene: '06 — TOKENS'
---

# A design decision, in a file you can review

```css
:root {
  --void:    #0d0221;  /* deep night-sky navy, the base "screen" */
  --panel:   #1c1433;  /* dialogue-box fill, one step up from void */
  --cyan:    #57e8d6;  /* CRT phosphor — primary accent */
  --magenta: #ff4f93;  /* neon sign — sparingly, emphasis only */

  --font-display: 'Press Start 2P', monospace;  /* badges + titles ONLY */
  --font-body:    'JetBrains Mono', monospace;  /* legible from row 20 */
}
```

<!--
3:45–4:05
- "This is the whole visual identity. Eight lines. It's in git."
- The comments are the agent's reasoning, preserved — that's the review surface.
-->

---
layout: section
scene: 4
---

# Trust, but Verify

## The agent writes code it cannot see

<!--
4:05–4:15
- Deliberate pivot to the honest problem. Don't sell past it.
-->

---
layout: dialog
scene: '07 — BLIND'
accent: magenta
---

# Four bugs that shipped looking fine

<ul class="verb-list">
  <li>Styles hung off a class Slidev's slide root never renders. Nothing painted at all.</li>
  <li>A whole scene drawn behind the dialogue box. Completely invisible.</li>
  <li><code>src="/demo-clip.mp4"</code> — a 404 under the real build path.</li>
  <li>Fonts silently falling back to a system face.</li>
</ul>

<p style="margin-top:1.2em; color:#b7aed4;">Every one of these compiles. Every one is green in CI.</p>

<!--
4:15–4:55
- Say plainly: an agent producing visual output has no feedback loop. It is
  writing CSS with its eyes shut.
- These are real bugs from this repo, not hypotheticals.
-->

---
layout: terminal
scene: '08 — PROBE'
accent: cyan
---

# So give it eyes

```js
// build → serve dist/ at its real base → drive it in a real browser
for (let n = 1; n <= slides.length; n++) {
  await page.goto(`${base}${n}`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `.checks/${n}.png` })

  // then assert the things a human would only notice on stage
  expect(consoleErrors).toEqual([])   // nothing threw
  expect(failedRequests).toEqual([])  // no 404s under the build base
  expect(overflowing).toEqual([])     // nothing outside its own slide
  expect(clipped).toEqual([])         // nothing cut off inside a panel
  expect(missingFonts).toEqual([])    // the webfont actually loaded
}
```

<!--
4:55–5:20
- Playwright, ~200 lines, in scripts/check-decks.mjs. Runs against the built
  artefact, not the dev server — same base path CI and Pages use.
- The clipped check earned its keep: it caught a caption cut off inside the
  terminal panel on the pipeline slide, which I had looked straight at.
- The screenshots are the point: the agent reads its own output back.
-->

---
layout: dialog
scene: '09 — LOOP'
accent: cyan
---

# The loop closes

<ul class="verb-list">
  <li>The agent builds the deck, screenshots every slide, and <em>looks at the result</em>.</li>
  <li>It found the invisible scene and the 404 on its own — and fixed both.</li>
  <li>Now it runs on every push, so the loop closes without me in it.</li>
</ul>

<p style="margin-top:1.2em; color:#b7aed4;">Otherwise you find out in front of the room.</p>

<!--
5:20–5:45
- Land the reframe: the interesting part of agentic work isn't generation,
  it's giving the agent a way to check itself.
-->

---
layout: terminal
scene: '10 — SHIP'
---

# Every push builds every deck

```yaml
on: { push: { branches: [main] }, pull_request: }

jobs:
  build:
    steps:
      - id: pages
        uses: actions/configure-pages@v6   # resolves the /<repo>/ prefix
      - run: npm run build:all             # every deck, not just the one I touched
        env: { SITE_BASE: '${{ steps.pages.outputs.base_path }}' }
      - run: npm run check:all             # ← Playwright, every slide, every deck
      - uses: actions/upload-artifact@v7   # screenshots, even on failure
      - uses: actions/upload-pages-artifact@v5

  deploy:
    if: github.ref == 'refs/heads/main'   # PRs build and get checked; main deploys
    needs: [build]
    steps:
      - uses: actions/deploy-pages@v5      # → GitHub Pages
```

<!--
5:45–6:15
- The check is a required step, not a nice-to-have: a PR that renders badly
  doesn't merge. The screenshots upload either way, so review is visual.
- The base path is the interesting bit: Pages serves under /<repo>/, so that
  prefix has to be baked into asset URLs at build time. Get it wrong and you
  ship a deck of 404s — which is exactly what the check catches.
- build:all matters: a theme change can break a deck I wasn't editing.
- On a tag, a second workflow exports the PDF and PPTX onto a Release. Point
  out there's no PowerPoint in this pipeline as a source of truth — the .pptx
  is an export artefact.
-->

---
layout: cover
---

# Steal This Workflow

<p style="margin-top: 0.4em;">github.com/jamesbannan/presentations</p>

<p>Theme, deck and the Playwright check are all in there. Come find me after.</p>

<!--
6:15–6:40 — Close. Point at the repo link, thank the room, hand back to MC.
-->
