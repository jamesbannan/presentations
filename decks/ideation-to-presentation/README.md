# From Ideation to Presentation with Markdown, Slidev & Agents

Lightning talk (~6 min) for **Agentic AI Melbourne — September 2026**.
Theme: [`slidev-theme-nightshift`](../../themes/slidev-theme-nightshift).

```bash
npm run dev -- ideation-to-presentation
npm run build -- ideation-to-presentation
npm run export -- ideation-to-presentation
```

## The demo clip

The "SCENE 04 — DEMO" slide uses `<SceneVideo src="/demo-clip.mp4">`, which
reads from `public/`. The recording is made shortly before the talk and is not
committed — until it exists the bezel shows a "NO SIGNAL" holding frame, so the
deck still builds and exports.

```bash
cp /path/to/clip.mp4 decks/ideation-to-presentation/public/demo-clip.mp4
cp /path/to/poster.png decks/ideation-to-presentation/public/demo-clip-poster.png  # optional
```

Keep it to 10–15s and silent or near-silent: venue sound is unreliable and the
talk narrates over it live. Playback is click-to-play, so the timing stays with
the presenter.

## Running order (~6 min)

| Time | Slide | Beat |
| --- | --- | --- |
| 0:00–0:20 | Cover | Hook — this deck is the demo |
| 0:20–1:30 | Scene 1 | The old way: slides are disconnected from how you think |
| 1:30–2:30 | Scene 2 | The workflow: Notes → Agent → Markdown → Slidev |
| 2:30–2:50 | Source | Show the actual `.md` behind the previous slide |
| 2:50–3:20 | Scene 3 + clip | Recorded clip: agent turns notes into Markdown |
| 3:20–4:30 | Live | Live edit in the running `npm run dev` preview |
| 4:30–5:15 | Why it works | Decoupled content/design, real git diffs, agent-agnostic |
| 5:15–6:00 | Close | Repo link, CTA |

Timing and speaker notes are in HTML comments under each slide — visible in
presenter mode (`d`, or `/presenter`).

The 3:20–4:30 segment is live: keep `slides.md` open next to the running dev
server and make a one-line edit on stage. Everything before it must be
pre-checked, because that minute is the whole argument.
