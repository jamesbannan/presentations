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
| I — We've been here before | 4–9 | Trithemius on printing, Baudelaire on photography, Sousa on recorded music; some fears misplaced, some partly right |
| II — (Sort of.) | 10–13 | The hinge. AI reflects our culture back at us; a change of scale and speed; the mirror reflecting itself |
| III — What are we missing? | 14–17 | Why AI-generated work leaves us cold (no human journey to recognise), the argument (all creativity remixes; ours passes through a life first, with Barthes as the counter-view), the takeaway |
| Close | 18 | Thank you, contact links |

## Sources

All quotations were checked against the primary texts.

- Plato, *Phaedrus* 275a, trans. Benjamin Jowett (public domain; Project Gutenberg #1636).
  Socrates relays the Egyptian king Thamus's response to Theuth's invention of letters.
- Johannes Trithemius, *De laude scriptorum* (*In Praise of Scribes*), written
  1492, printed Mainz 1494; trans. Roland Behrendt, ed. Klaus Arnold (Coronado
  Press, 1974), ch. 7. Short quotation from the Behrendt translation, wording
  checked against Noel L. Brann, "A Monastic Dilemma Posed by the Invention of
  Printing", *Visible Language* 13.2 (1979). Brann also notes Trithemius went on
  to build a library of printed books and to praise the press.
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
- Roland Barthes, "The Death of the Author" (1967). Cited on slide 16 as the
  counter-view; paraphrased, not quoted.
- L. Bellaiche et al., "Humans versus AI: whether and why we prefer
  human-created compared to AI-created artwork", *Cognitive Research:
  Principles and Implications* 8, 42 (2023), doi:10.1186/s41235-023-00499-6.
  All the paintings were AI-generated; only the label changed. Human-labelled
  works were rated higher, with perceived story and effort moderating the effect.

## Images

The `figure` layout reads `src` from this deck's `public/` directory. Until an
image is set it shows a hatched placeholder plate, so the deck still builds and
exports.

```bash
mkdir -p decks/weve-been-here-before/public
cp /path/to/artefact.jpg decks/weve-been-here-before/public/
# then, in the slide's frontmatter: src: /artefact.jpg
```
