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

First content pass. Slides are deliberately sparse: the talk carries the
argument, the slides carry the quotations and the turns. There are no speaker
notes.

## Running order

| Part | Slides | Beat |
| --- | --- | --- |
| Cold open | 2–3 | An unattributed quote that sounds like it's about AI, then the reveal: Plato's *Phaedrus*, about writing |
| I — We've been here before | 4–8 | Baudelaire on photography, Sousa on recorded music; some fears misplaced, some partly right |
| II — (Sort of.) | 9–12 | The hinge. AI reflects our culture back at us; a change of scale and speed; the mirror reflecting itself |
| III — What are we missing? | 13–16 | The case against (Barthes, remix), the argument (someone lived through it), the takeaway |
| Close | 17 | Thank you, contact links |

## Sources

All quotations were checked against the primary texts.

- Plato, *Phaedrus* 275a, trans. Benjamin Jowett (public domain; Project Gutenberg #1636).
  Socrates relays the Egyptian king Thamus's response to Theuth's invention of letters.
- Charles Baudelaire, *Salon de 1859*, "Le public moderne et la photographie":
  « l'industrie photographique était le refuge de tous les peintres manqués,
  trop mal doués ou trop paresseux pour achever leurs études ». The English on
  the slide is the author's own translation.
- John Philip Sousa, "The Menace of Mechanical Music", *Appleton's Magazine*
  8 (1906), pp. 278–284. "lullabys" is Sousa's spelling.
- I. Shumailov et al., "AI models collapse when trained on recursively
  generated data", *Nature* 631 (2024).
- M. Gerstgrasser et al., "Is Model Collapse Inevitable? Breaking the Curse of
  Recursion by Accumulating Real and Synthetic Data" (2024).
- Roland Barthes, "The Death of the Author" (1967).

## Images

The `figure` layout reads `src` from this deck's `public/` directory. Until an
image is set it shows a hatched placeholder plate, so the deck still builds and
exports.

```bash
mkdir -p decks/weve-been-here-before/public
cp /path/to/artefact.jpg decks/weve-been-here-before/public/
# then, in the slide's frontmatter: src: /artefact.jpg
```
