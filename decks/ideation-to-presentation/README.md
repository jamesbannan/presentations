# From Ideation to Presentation with Markdown, Slidev & Agents

Lightning talk (~6.5 min) for **Agentic AI Melbourne — September 2026**.
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

## Running order (~6.5 min)

| Time | Slide | Beat |
| --- | --- | --- |
| 0:00–0:20 | Cover | Hook — this deck is the demo |
| 0:20–1:05 | Scene 1 | Slide tools sit outside the developer toolchain — generation isn't the gap |
| 1:05–2:35 | Scene 2 | The workflow: Notes → Agent → Markdown → Slidev, then its source |
| 2:35–3:00 | Demo clip | Recorded clip: agent turns notes into Markdown |
| 3:00–3:45 | Scene 3 | The theme came out of a prompt too — and it hands back source |
| 3:45–4:05 | Tokens | The whole visual identity, eight lines, in git |
| 4:05–4:55 | Scene 4 | The agent writes code it cannot see — four real bugs |
| 4:55–5:45 | Probe + loop | Playwright screenshots every slide; the agent reads them back |
| 5:45–6:15 | Ship | The Actions workflow: build every deck, bake the base path, deploy to Pages |
| 6:15–6:40 | Close | Repo link, CTA |

Timing and speaker notes are in HTML comments under each slide — visible in
presenter mode (`d`, or `/presenter`).

The talk has two halves. The first is the one people expect: an agent writes
Markdown. The second is the one that earns the slot — the agent also generated
the theme, and then verified its own visual output in a browser. Scenes 3 and 4
are the argument; don't let the pipeline material eat their time.

There is no live-coding segment. It was cut deliberately: the recorded clip
makes the same point in a quarter of the time and cannot fail on stage.
