# slidev-theme-nightshift

"Night Shift" — a dark, pixel-adventure-inspired Slidev theme. An original
visual language in the spirit of late-80s/early-90s SCUMM-era graphic
adventures: no copyrighted game assets, logos, or character art are used.

Consumed by name from a deck in this monorepo — never published to npm:

```yaml
---
theme: slidev-theme-nightshift
---
```

## Design

| Token | Role |
| --- | --- |
| `--void` `#0d0221` | base "screen" — deep night-sky navy-purple |
| `--panel` `#1c1433` | dialogue-box fill |
| `--line` `#3a2e57` | pixel border / divider |
| `--cyan` `#57e8d6` | CRT phosphor — primary accent, links, terminals |
| `--magenta` `#ff4f93` | neon sign — emphasis only, sparingly |
| `--yellow` `#ffce54` | diner sign — badges, `<strong>` |
| `--ghost` `#eae6f5` | body text, warm-white with a lavender cast |

Display type is **Press Start 2P** (scene badges and cover/section headlines
only — it is unreadable in quantity). Body and code are **JetBrains Mono**.
Both are self-hosted via `@fontsource` and the theme sets `fonts.provider:
none`, so the deck renders identically with no network — venue wifi is not a
dependency.

Every slide is a "room": the void background with a faint star field, a
vignette, and a scanline overlay. The pixel-bordered dialogue box plus those
scanlines are the signature move; everything else stays quiet. One accent per
slide, not per element.

## Layouts

| Layout | Use | Frontmatter |
| --- | --- | --- |
| `cover` | title / closing card | — |
| `section` | chapter card, "SCENE n" | `scene` |
| `dialog` | default content, in the dialogue box | `scene`, `accent: cyan\|magenta` |
| `terminal` | code and demos, CRT panel | `scene` |
| `default` | fallback — `dialog` without a badge | — |

## Components

`<SceneVideo>` frames a recorded clip as an in-game CRT screen.

```md
<SceneVideo
  src="/demo-clip.mp4"
  poster="/demo-clip-poster.png"
  label="AGENT RUN — 00:14"
  caption="Rough notes → agent → this file's outline. Unedited, real time."
/>
```

`src` and `poster` resolve against the deck's `public/` directory and are
prefixed with the Vite base, so they survive the `/<slug>/` build path. If the
file is missing the bezel shows a "NO SIGNAL" holding frame instead of a broken
video element — clips are recorded shortly before a talk and are not committed,
and a clean clone still has to build and export.

## Utility classes

- `.verb-list` — verb-coin style bullets. Plain Markdown lists inside a
  `dialog` or `terminal` box get the same treatment automatically.
- `.dialog-box`, `.terminal-box`, `.scene-number` — the furniture, if a slide
  needs to place it by hand.
