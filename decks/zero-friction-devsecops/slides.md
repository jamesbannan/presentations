---
theme: slidev-theme-arcade
title: "Zero-Friction DevSecOps: Automated Code Signing Done Right"
titleTemplate: "%s"
author: "James Bannan"
keywords: devsecops, code signing, sigstore, smallstep, github actions
# ─── EVENT DETAILS · EDIT THESE THREE LINES PER EVENT ──────────────────────
# This deck is event-agnostic. To re-use it, change only the values below;
# they render on the cover slide via the theme's `cover` layout.
# Case doesn't matter — the footer is upper-cased by CSS.
event: "KCD Melbourne 2026"
venue: "Collins Square Events Centre · 727 Collins St"
eventDate: "5 August 2026"
# ───────────────────────────────────────────────────────────────────────────
# Colour scheme, highlighter, transition and fonts are inherited from
# slidev-theme-arcade. Override here only when this talk needs to differ.
layout: cover
headline: "ZERO-FRICTION\nDEVSECOPS"
subtitle: "Automated Code Signing Done Right"
speaker: "James Bannan"
contact: "jamesbannan@aus.social"
---

<!-- Slide 1 is rendered entirely by the theme's `cover` layout. -->

---
layout: default
tag: "// SELECT STAGE"
title: AGENDA
---

<StageList :stages="[
  { accent: 'cyan',    title: 'THE STATUS QUO',   body: 'Why code signing is broken, and why it matters now' },
  { accent: 'magenta', title: 'SMALLSTEP PKI',    body: 'Private CA, short-lived certs, zero long-lived keys' },
  { accent: 'green',   title: 'SIGSTORE KEYLESS', body: 'Fulcio, Rekor, and OIDC-based signing at CI speed' },
  { accent: 'yellow',  title: 'POLICY GATE',      body: 'Kyverno enforcement; ship nothing you cannot verify' },
  { accent: 'orange',  title: 'AUDIT TRAIL',      body: 'CISO-friendly attestations your auditors will love' },
]" />

---
layout: default
tag: "/// THE PROBLEM"
title: WHEN THE SIGNATURE LIES
bare: true
---

<AttackCards
  headline="A stolen or abused code-signing cert turns your supply chain into theirs. The cert was valid; the code was not."
  punchline="THE CERT WAS VALID · THE CODE WAS NOT"
  :attacks="[
    {
      year: 2022,
      name: 'NVIDIA CERT LEAK',
      line: 'LAPSUS$ exfiltrated NVIDIA code-signing certificates. Attackers immediately reused them to sign Mimikatz, Quasar RAT and other malware.',
      impact: '▶ Certs trusted by Windows until manually revoked',
    },
    {
      year: 2023,
      name: '3CX VOIP CLIENT',
      line: 'The 3CX signing chain was used to ship a trojanised DesktopApp installer to customers. Valid Microsoft Authenticode signature throughout.',
      impact: '▶ 600,000+ orgs · cascading from a prior X_TRADER breach',
    },
    {
      year: 2026,
      name: 'OPENAI · AXIOS NPM',
      line: 'A backdoored axios release ran inside the GitHub Actions job that signs the OpenAI macOS apps — the one job holding the signing cert.',
      impact: '▶ Cert revoked & rotated · every macOS user forced to update',
    },
    {
      year: 2026,
      name: 'OPENAI · TANSTACK',
      line: 'Six weeks later, malicious TanStack packages hit CI again. Two employee devices infected; repo credential material exfiltrated.',
      impact: '▶ Signing certs rotated again · 4 AI supply-chain hits in 50 days',
    },
  ]" />

---
layout: two-col
tag: "// THREAT LANDSCAPE"
title: BEFORE vs AFTER
leftTitle: "❌ WITHOUT SIGNING"
leftAccent: cyan
rightTitle: "✅ WITH SIGNING"
rightAccent: yellow
---

::left::

<ul class="retro-list">
  <li>Anyone can push a tampered image to your registry</li>
  <li>No tamper evidence; breaches discovered weeks later</li>
  <li>Long-lived keys stored in CI secrets; a single breach is catastrophic</li>
  <li>Manual GPG processes developers actively route around</li>
  <li>Compliance audits = screenshot archaeology</li>
  <li>Supply chain attacks are someone else's problem <em>(until they aren't)</em></li>
</ul>

::right::

<ul class="retro-list">
  <li>Every image cryptographically bound to its pipeline run</li>
  <li>Tamper-evident, immutable audit log in Rekor</li>
  <li>Ephemeral OIDC credentials, no long-lived secrets to steal</li>
  <li>Frictionless for devs: signing happens automatically in Actions</li>
  <li>Policy gate blocks unsigned images from reaching prod</li>
  <li>Attestations your CISO can actually show to auditors</li>
</ul>

---
layout: default
tag: "/// ARCHITECTURE"
title: WHAT GETS BUILT
bare: true
---

<!-- Cards come from .presentation/facts.yaml in the code repo, so this slide
     tracks docs/architecture.md instead of drifting from it. -->
<ArchGrid label="▶ KUBERNETES CLUSTER  ·  minikube | AKS" />

---
layout: default
tag: "/// PATH A vs PATH B"
title: TWO ROADS, ONE GOAL
bare: true
---

<VsTable
  :a="{ tag: '// PATH A', title: 'SMALLSTEP CA', sub: 'private PKI · short-lived certs' }"
  :b="{ tag: '// PATH B', title: 'SIGSTORE KEYLESS', sub: 'public Fulcio · OIDC identity' }"
  footer="▶ COMPLEMENTARY, NOT COMPETING  ·  DEMO 4 USES BOTH ◀"
  :rows="[
    { dim: 'TRUST',      a: 'Internal CA, **your org owns the root**',        b: '**Public Fulcio**, trust via TUF + foundation' },
    { dim: 'AUDIT',      a: 'Private audit log, **only your infra sees it**', b: '**Public Rekor**, anyone can verify, forever' },
    { dim: 'IDENTITY',   a: 'Whatever your **step-ca provisioner** accepts',  b: '**OIDC issuer**, GitHub, K8s SA, Google…' },
    { dim: 'KEYS',       a: 'step-ca rotates certs · **JWK + K8s SA**',       b: '**None.** Ephemeral, lives in RAM, then gone' },
    { dim: 'AIR-GAP',    a: '**✓ Works fully offline**',                      b: 'Needs Fulcio + Rekor, can be **self-hosted**' },
    { dim: 'COMPLIANCE', a: 'Slots into **existing enterprise PKI**',         b: 'Stronger **non-repudiation** via public log' },
  ]" />

---
layout: default
tag: "/// DEMO 1 — THE PAINFUL BASELINE"
title: MANUAL GPG SIGNING
bare: true
---

<DemoSteps demo="gpg" />

---
layout: default
tag: "/// DEMO 2 — PRIVATE PKI PATH"
title: SMALLSTEP CA · SHORT-LIVED CERTS
bare: true
---

<DemoSteps demo="smallstep" />

---
layout: default
tag: "/// DEMO 3 — KEYLESS PATH"
title: SIGSTORE · NO KEYS ON DISK
bare: true
---

<DemoSteps demo="sigstore" />

---
layout: default
tag: "/// DEMO 4 — CI/CD PIPELINE"
title: BUILD → SIGN ×2 → DEPLOY
bare: true
---

<DemoSteps demo="cicd" />

---
layout: default
tag: "/// DEMO 5 — POLICY GATE"
title: KYVERNO BLOCKS UNSIGNED IMAGES
bare: true
---

<DemoSteps demo="policy" />

---
layout: default
tag: "/// DEMO 6 — CISO VIEW"
title: ATTESTATIONS + AUDIT TRAIL
bare: true
---

<DemoSteps demo="attestation" />

---
layout: end
note: Demo scripts and IaC all at the link above
---

<ContactLink icon="github"   accent="cyan"   text="github.com/jamesbannan/devsecops-code-signing" />
<ContactLink icon="linkedin" accent="green"  text="linkedin.com/in/jamesbannan" />
<ContactLink icon="mastodon" accent="yellow" text="jamesbannan@aus.social" />
<ContactLink icon="unimelb" accent="magenta" text="unimelb.edu.au/alumni/engage/ask-alumni" />
