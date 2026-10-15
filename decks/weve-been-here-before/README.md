# We've Been Here Before (Sort Of): Stories in an age of synthetic culture

TEDx talk (10–15 min) for **TEDxUniMelb 2026 — "The Unseen Horizon: What Are
We Missing?"**, Friday 16 October 2026, Arts West Forum Theatre, The
University of Melbourne.
Theme: [`slidev-theme-stoa`](../../themes/slidev-theme-stoa).

```bash
npm run dev -- weve-been-here-before
npm run build -- weve-been-here-before
npm run check -- weve-been-here-before
npm run export -- weve-been-here-before
```

## Status

Structure only. Every slide is a placeholder — square-bracketed text and
`.placeholder` boxes mark what still has to be written. Timings in the speaker
notes are a first guess at a ~12 minute running order.

## Running order (draft)

| Time | Slide | Beat |
| --- | --- | --- |
| 0:00–0:30 | Cover | Title |
| 0:30–1:30 | Statement | Hook |
| 1:30–5:00 | Part I — Then | Ancient communication technologies, an artefact, a quotation |
| 5:00–9:00 | Part II — Now | Then/now diptych, synthetic culture today |
| 9:00–11:30 | Part III — What are we missing? | The takeaway |
| 11:30–12:00 | End | Thank you, contact links |

## Images

The `figure` layout reads `src` from this deck's `public/` directory. Until an
image is set it shows a hatched placeholder plate, so the deck still builds and
exports.

```bash
mkdir -p decks/weve-been-here-before/public
cp /path/to/artefact.jpg decks/weve-been-here-before/public/
# then, in the slide's frontmatter: src: /artefact.jpg
```
