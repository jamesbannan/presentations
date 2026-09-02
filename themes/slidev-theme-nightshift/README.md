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
| `cover` | title / closing card | `backdrop` |
| `section` | chapter card, "SCENE n" | `scene`, `backdrop` |
| `dialog` | default content, in the dialogue box | `scene`, `accent: cyan\|magenta`, `backdrop` |
| `terminal` | code, in a CRT panel | `scene`, `backdrop` |
| `media` | a clip or image that brings its own frame | `scene`, `backdrop` |
| `default` | fallback — `dialog` without a badge | `backdrop` |

Use `media`, not `terminal`, for `SceneVideo`: `terminal` wraps the slot in its
own panel, and nesting a bezel inside a bezel both reads badly and costs the
clip the vertical space it needs. `media` height-constrains its slot instead, so
a 16:9 frame scales down to fit rather than running off the bottom of the slide.

Every layout paints a `SceneBackdrop` behind its content. Set `backdrop: none`
in a slide's frontmatter to drop back to the plain graded wash — useful when a
slide carries a full-bleed image of its own.

## Components

`<SceneBackdrop>` draws the room or the landscape the slide is standing in. It
is pure SVG on a `320x180` grid with `crispEdges` and `image-rendering:
pixelated`, so it scales to any projector as chunky pixels rather than soft
vectors. Layouts mount it for you; mount it directly only if you are writing a
new layout.

| Prop | Values | Notes |
| --- | --- | --- |
| `variant` | `exterior`, `interior` | trestle-bridge night landscape, or a lit room |
| `palette` | `warm`, `cool` | amber lamps, or the cyan of the `terminal` layout |
| `seed` | number | reshuffles stars, trees, grass and fireflies |

Two things are load-bearing:

- Geometry comes from a seeded PRNG, never `Math.random`. The live deck and the
  exported PDF have to draw the identical scene.
- Interior detail is **banded**. The dialogue box covers roughly `y 59–134` and
  the scene badge sits top-left above it, so props only read above `y≈58` (on
  the right-hand side, clear of the badge) or below `y≈135`. An earlier counter
  drawn straight through the middle was completely invisible.

`<SceneVideo>` frames a recorded clip as an in-game CRT screen.

```md
<SceneVideo
  src="/demo-clip.mp4"
  poster="/demo-clip-poster.png"
  label="AGENT RUN — 00:11"
  caption="Rough notes → agent → this file's outline. Unedited, real time."
/>
```

`src` and `poster` resolve against the deck's `public/` directory and are
prefixed with the Vite base, so they survive the `/<slug>/` build path. If the
file is missing the bezel shows a "NO SIGNAL" holding frame instead of a broken
video element — clips are recorded shortly before a talk and are not committed,
and a clean clone still has to build and export.

The frame is sized from the available height and the bezel shrink-wraps it, so
the picture fills its own frame instead of sitting in a black surround. Use it
on the `media` layout, not `terminal`.

`<ContactLink>` is one line of the closing slide, and `<BrandIcon>` is the glyph
in front of it. Wrap them in a `.contact-list` on a `cover` slide:

```md
<div class="contact-list">
  <ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />
  <ContactLink icon="mastodon" text="jamesbannan@aus.social" />
  <ContactLink icon="unimelb" text="unimelb.edu.au/alumni/engage/ask-alumni" />
</div>
```

`github`, `linkedin` and `mastodon` are built-in vectors. Any SVG dropped into
the theme's `assets/` is addressable by filename (`unimelb.svg` → `unimelb`),
and anything else is treated as a URL. Each line carries its own dark plate,
because the cover layout runs a lit scene edge to edge behind it.

## Utility classes

- `.verb-list` — verb-coin style bullets. Plain Markdown lists inside a
  `dialog` or `terminal` box get the same treatment automatically.
- `.contact-list` — stacked, centred `<ContactLink>` rows for a closing slide.
- `.dialog-box`, `.terminal-box`, `.scene-number` — the furniture, if a slide
  needs to place it by hand.

Strikethrough in a `cover` heading (`# ~~Steal~~ Use This Workflow`) is styled
as a deliberate correction: the word steps back and a magenta rule is drawn
across the middle of the glyphs, rather than relying on the font's own
line-through metric, which sits too low on this pixel face to read.
