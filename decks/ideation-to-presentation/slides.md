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

## Slides are slow, and disconnected from how you actually think

<!--
0:20–0:55
- Idea happens in your head / in notes, but has to go straight into a
  drag-and-drop tool.
- Every new idea = fighting a layout instead of writing.
-->

---
layout: dialog
scene: '01 — PAIN'
---

# Where the friction actually is

<ul class="verb-list">
  <li>Ideas live in your head. Slides live in a proprietary binary file.</li>
  <li>Reordering a talk means dragging boxes, not editing an outline.</li>
  <li>You can't <code>git diff</code> a .pptx to see what changed.</li>
  <li>An agent can <em>write</em> prose all day — it really struggles to lay out a slide.</li>
</ul>

<!--
0:55–1:30
- Land on the agent point — that's the pivot into the workflow.
-->

---
layout: section
scene: 2
---

# The Workflow

## Three tools, three jobs, no overlap

<!--
1:30–1:45
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

<p style="margin-top:1.2em; color:#b7aed4;">The agent never touches layout. That's the whole trick.</p>

<!--
1:45–2:30
- This is the core idea of the talk. Say it plainly, don't rush it.
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
2:30–2:50
- Point at the screen: "no drag and drop happened, ever."
-->

---
layout: section
scene: 3
---

# See It Live

## The demo is the deck

<!--
2:50–3:00
-->

---
layout: terminal
scene: '04 — DEMO'
---

# Notes in. Markdown out.

<SceneVideo
  src="/demo-clip.mp4"
  poster="/demo-clip-poster.png"
  label="AGENT RUN — 00:14"
  caption="Rough notes → agent → this file's outline. Unedited, real time."
/>

<!--
3:00–3:20
- Click play manually — don't autoplay, you want eyes on you when it starts.
- Clip should be ~10-15s, silent or with minimal audio (venue sound is unreliable).
- Drop the real file in public/demo-clip.mp4 (and a poster frame at
  public/demo-clip-poster.png) before the talk — see README.
-->

---
layout: terminal
scene: '05 — LIVE'
---

# Now, live

<ul class="verb-list">
  <li>Switch to the editor: this same <code>slides.md</code>, running via <code>npm run dev</code>.</li>
  <li>Make a one-line edit, save, and watch it hot-reload in the browser next to it.</li>
  <li>No slide in this deck was placed by hand. Every one came from this pipeline.</li>
</ul>

<!--
3:20–4:30 — THE LIVE PART
- Alt-tab to the editor: slides.md open next to the running dev preview.
- Scroll to a slide, make a one-line edit live, save, show the hot-reload.
- Keep this tight — under 70 seconds.
-->

---
layout: dialog
scene: '05 — WHY'
accent: magenta
---

# Why this holds up

<ul class="verb-list">
  <li>Content and design are decoupled — restyle the whole deck without touching a word.</li>
  <li><code>git diff</code> on a talk actually means something now.</li>
  <li>Regenerating a section doesn't risk the rest of the deck.</li>
  <li>Works with any agent that can write a file — Claude Code, or whatever you're already using.</li>
</ul>

<!--
4:30–5:15
-->

---
layout: cover
---

# Steal This Workflow

<p style="margin-top: 0.4em;">github.com/jamesbannan/presentations</p>

<p>Come find me after for the CFP link, or if you want the template.</p>

<!--
5:15–6:00 — Close. Point at the repo link, thank the room, hand back to MC.
-->
