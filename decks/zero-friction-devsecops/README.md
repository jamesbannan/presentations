# Zero-Friction DevSecOps: Automated Code Signing Done Right

Conference talk on automated code signing — BSides Melbourne 2026, AppSec
Australia, KCD Melbourne 2026.

```bash
npm run dev -- zero-friction-devsecops
npm run export -- zero-friction-devsecops
```

## Per-event changes

The deck is event-agnostic. Change only these three lines in the `slides.md`
headmatter; they render in the cover footer and nothing else depends on them:

```yaml
event: "KCD Melbourne 2026"
venue: "Collins Square Events Centre · 727 Collins St"
eventDate: "5 August 2026"
```

## Content

Demo walkthroughs and the architecture map come from
[`jamesbannan/devsecops-code-signing`](https://github.com/jamesbannan/devsecops-code-signing)
via `.presentation/facts.yaml` — the slides do not restate them. Change a demo
there and the deck follows; see `content.yaml` and the root README.

To present against a specific state of that repo, pin `ref` in `content.yaml`
to a tag or SHA.

Iterating on both at once:

```bash
CONTENT_LOCAL=~/git/devsecops-code-signing npm run dev -- zero-friction-devsecops
```

`data/facts.fallback.json` is a vendored copy so the deck still builds offline
or before the upstream facts are published. Refresh it when the contract
changes:

```bash
npm run sync -- zero-friction-devsecops
cp decks/zero-friction-devsecops/.content/facts/devsecops.json \
   decks/zero-friction-devsecops/data/facts.fallback.json
```
