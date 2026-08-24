# AI & Cybersecurity: Navigating Your Transition from Study to Industry

Job Ready Program session for Faculty of Arts undergraduates at the University
of Melbourne. 45–50 minutes including Q&A.

```bash
npm run dev -- ai-and-cybersecurity
npm run export -- ai-and-cybersecurity
```

## Per-event changes

Change only these lines in the `slides.md` headmatter, plus the cover
`footer`. Nothing else depends on them:

```yaml
event: "Job Ready Program"
faculty: "Faculty of Arts"
eventDate: "2 September 2026"
```

## Running order

| # | Section | Time |
| --- | --- | --- |
| 1 | Overview and agenda | 3 min |
| 2 | AI skills expected in industry | 10–11 min |
| 3 | Assessments and AI detection | 7 min |
| 4 | AI resume screening and video interviews | 8 min |
| 5 | Using AI without losing the ability to learn | 8 min |
| 6 | The ethical use of personal AI | 6 min |
| 7 | Using AI and staying safe | 7 min |
| 8 | Wrap-up and Q&A | 5 min |

Timings live in the presenter notes on each slide. The content now runs to
roughly 54 minutes against a 45–50 minute slot. Section 2 grew when the
Australian evidence was added; if time has to come out, the two fastest cuts
are the "Prompt engineering is a skill, not a career" slide (2 min, the point
survives as a sentence over the top of the preceding slide) and the second
half of section 5.

## Sourced claims

Four slides carry figures. All are cited on the slide itself and expanded in
the presenter notes.

| Slide | Claim | Source |
| --- | --- | --- |
| Australian demand is for users, not builders | 19,300 new Australian AI *user* job ads in 2025 vs 1,300 AI *developer* ads | PwC Australia, *2026 AI Jobs Barometer*, 18 June 2026 |
| What this already looks like in Australia | Foundational AI literacy training being made mandatory for all APS staff | *APS AI Plan 2025*, Department of Finance with the DTA and APSC |
| What this already looks like in Australia | ~79% of jobs transformed at task level; ~4% at high likelihood of full automation | Jobs and Skills Australia, *Our Gen AI Transition*, September 2025 |
| What this already looks like in Australia | New tasks 2.5× more likely to require human-intensive skills | PwC Australia, *2026 AI Jobs Barometer*, 18 June 2026 |
| Detection tools are not neutral | 61% of TOEFL essays by non-native English speakers misclassified as AI-generated | Liang, Yuksekgonul, Mao, Wu & Zou, *Patterns* 4(7):100779, 2023 |
| Video calls are not identity verification | ~US$25M lost to a deepfake video conference | Incident January 2024; Hong Kong Police disclosed February 2024; Arup confirmed 16 May 2024 |

Sourcing notes for the Australian figures:

- **PwC** is a professional services firm that sells AI consulting, and the
  barometer is its own analysis of job-ad data rather than a government
  statistic. The slide says so on its face. It is used because it is the most
  substantial regular Australian AI jobs series available, not because it is
  independent. The PwC media release was verified directly.
- **Jobs and Skills Australia** is a Commonwealth statutory body, so it is the
  strongest source in section 2. The 79% and 4% figures were corroborated
  across several independent secondary reports; `jobsandskills.gov.au` was
  unreachable during preparation, so confirm against the primary PDF before
  presenting.
- **APS AI Plan 2025** likewise could not be fetched from `digital.gov.au`.
  Secondary reporting puts the first mandatory requirement at 15 June 2026,
  but the slide and notes deliberately say "through 2026" rather than quoting
  a date that has not been confirmed against the primary source.
- PwC's "junior workers are 7× more likely to need senior skills" figure is US
  data and is deliberately excluded from a slide about Australia.

Deliberately **not** included: the widely repeated "X% of resumes are never
seen by a human" statistic, which traces back to vendor marketing rather than
research. The ATS section teaches the mechanics instead. If a number is
wanted, the presenter notes give the defensible alternative and how to
attribute it.

Claims about HireVue, the Illinois AI Video Interview Act, NYC Local Law 144
and the cognitive-offloading research are stated only in the presenter notes,
with dates and peer-review status recorded so they are not overstated from the
stage. The MIT "cognitive debt" EEG study is flagged as an unreviewed preprint.

## Australian framing

The audience is Australian, so the deck says explicitly that the US
protections around AI hiring tools do not apply here, and that generative
models are least reliable on Australian law, policy and institutions.

Section 2 carries the local evidence: PwC's 2026 Australian job-ad split
between AI user and AI developer roles, the APS AI Plan's mandatory AI
literacy training, and the Jobs and Skills Australia augmentation figures.
All three are 2025 or later. The Victorian Public Sector generative AI
guideline was considered and left out — it is a genuinely good example of
personal accountability for AI-assisted work, but it was published in
November 2024 and so falls outside the "nothing before 2025" bar set for
this material.
