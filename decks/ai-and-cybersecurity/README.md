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
| 3 | Assessments and AI detection | 9 min |
| 4 | AI resume screening and video interviews | 14 min |
| 5 | Using AI without losing the ability to learn | 8 min |
| 6 | The ethical use of personal AI | 6 min |
| 7 | Using AI and staying safe | 7 min |
| 8 | Wrap-up and Q&A | 5 min |

Timings live in the presenter notes on each slide. The content now runs to
roughly **62 minutes** against a 45–50 minute slot, so **a substantial trim is
required before delivery**. Sections 2, 3 and 4 all grew when the Australian
evidence was added. In order of least damage, the cuts are:

1. "Prompt engineering is a skill, not a career" (2 min) — the point survives
   as a sentence over the top of the preceding slide.
2. "How AI use is currently flagged" (2 min) — now largely superseded by
   "What this University actually says", which says the same thing with the
   institution's own words behind it.
3. "Practical preparation" (2 min) — STAR and testing your setup are the least
   surprising content in the deck and the most likely to be already known.
4. "What the research on Australian hiring found" (2 min) — strong material,
   but "What Australian law will and will not give you" carries the section's
   argument on its own if forced.
5. The second half of section 5 (2–3 min).

Taking the first three lands the deck at about 56 minutes; taking all five
brings it close to the slot. Sections 2, 3 and 4 are now the heaviest and are
where the trimming should happen.

## Sourced claims

Several slides carry figures or direct quotations. All are cited on the slide
itself or in the presenter notes, and expanded below.

| Slide | Claim | Source |
| --- | --- | --- |
| Australian demand is for users, not builders | 19,300 new Australian AI *user* job ads in 2025 vs 1,300 AI *developer* ads | PwC Australia, *2026 AI Jobs Barometer*, 18 June 2026 |
| What this already looks like in Australia | Foundational AI literacy training being made mandatory for all APS staff | *APS AI Plan 2025*, Department of Finance with the DTA and APSC |
| What this already looks like in Australia | ~79% of jobs transformed at task level; ~4% at high likelihood of full automation | Jobs and Skills Australia, *Our Gen AI Transition*, September 2025 |
| What this already looks like in Australia | New tasks 2.5× more likely to require human-intensive skills | PwC Australia, *2026 AI Jobs Barometer*, 18 June 2026 |
| Detection tools are not neutral | 61% of TOEFL essays by non-native English speakers misclassified as AI-generated | Liang, Yuksekgonul, Mao, Wu & Zou, *Patterns* 4(7):100779, 2023 |
| Be honest about what detection can and cannot do | Detectors have already caused wrong accusations at Australian universities | ABC News, "Over a dozen unis are using AI to catch AI — and getting it wrong", 20 October 2025 |
| What this University actually says | "An AI writing detection report alone is not sufficient evidence for an allegation"; detector visible to staff only; being asked to explain is not an allegation; free checkers and "humaniser" tools are a breach | University of Melbourne, *Advice for students regarding Turnitin and AI writing detection*, academicintegrity.unimelb.edu.au |
| Show your process, not your innocence | Three-part declaration: tools used, how outputs were used, whether prompt records are available on request | University of Melbourne Academic Skills, *Acknowledging use of AI tools and technologies* |
| Video calls are not identity verification | ~US$25M lost to a deepfake video conference | Incident January 2024; Hong Kong Police disclosed February 2024; Arup confirmed 16 May 2024 |
| What the research on Australian hiring found | AI hiring systems may "enable, reinforce and amplify discrimination"; first study of AI hiring system use by Australian employers; n=23 interviews | Natalie Sheard, "Algorithm-facilitated discrimination", *Journal of Law and Society*, doi 10.1111/jols.12535; reported ABC News, 8 May 2025 |
| What Australian law will and will not give you | ADM transparency obligation commences 10 December 2026; disclosure in privacy policies only; "no right to contestability or to request information, and no obligation to notify" | OAIC, *Automated Decision-Making Transparency Obligation (APP 1)* issues paper, May 2026; APP 1.7–1.9 as inserted by the Privacy and Other Legislation Amendment Act 2024 |
| Use AI to prepare, not to perform | ATO expects candidates to be honest, transparent, themselves and fair; must disclose AI use when asked; ATO does not use AI to screen applications | Australian Taxation Office, *Guidelines for candidate use of AI in recruitment processes*, ato.gov.au |

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

Sourcing notes for the higher education material in section 3:

- The **University of Melbourne** pages behind the "What this University
  actually says" and "Show your process" slides were both fetched and verified
  verbatim during preparation. They are the strongest sources in the deck for
  this audience, because they are the audience's own institution stating its
  own position. Quote them; do not paraphrase policy from the stage.
- Turnitin's AI detector is **enabled at Melbourne but staff-only**. Curtin
  disabled it from 1 January 2026, UQ from semester 2 2025, and ACU abandoned
  it in March 2025. Institution-by-institution status changes often — re-check
  before repeating any of this.
- **Turnitin is a vendor**, so its own accuracy claims are marketing and are
  not repeated anywhere in the deck.
- The **ABC News** reporting of October 2025 is independent journalism and is
  used for the "wrong accusations have already happened here" bullet and its
  notes. Where the ACU story is concerned, use the Deputy Vice-Chancellor's
  on-the-record statement — that cases resting solely on the detector were
  dismissed immediately — and **not** the disputed "~6,000 cases" figure from
  leaked documents, which ACU says is substantially overstated.
- Sector-wide Australian academic misconduct volumes are a **confirmed gap**.
  Neither TEQSA nor Universities Australia holds data on which universities
  use AI detectors. Do not assert a national number.
- Farrago (the Melbourne student paper) carries a well-sourced tutor account
  that formulaic and EAL writers are the ones most often flagged. It is used
  only as spoken colour and attributed as something "students and tutors have
  observed", never as a study.

Sourcing notes for the recruitment material in section 4:

- The **OAIC issues paper** was downloaded and its text extracted directly, so
  the commencement date, the shape of the obligation and the "no right to
  contestability" limitation are all first-hand from the regulator. This
  matters because most secondary coverage of the ADM reforms overstates them
  as a new individual right. They are not: they are a privacy-policy
  disclosure obligation about *categories* of decisions.
- **Two live caveats on that slide.** The OAIC's final guidance was still in
  development at the time of writing, following a consultation that closed
  15 June 2026 — re-check before presenting. And the Privacy Act's small
  business exemption is being wound back in stages; only vendor blogs could be
  found on its current status, which is not good enough to assert, so the
  notes say not to.
- **Sheard's research is peer-reviewed**, which is why it carries the section.
  Disclose the method from the stage: 23 qualitative interviews, not a
  representative survey. The slide says "interviewed 23 recruiters and
  specialists" for that reason.
- The **62% of Australian organisations** figure (Responsible AI Index 2024,
  Fifth Quadrant) is deliberately kept off the slide face — it is commercial
  research and the data is from 2024. It sits in the notes with attribution.
- **Sapia's nine million interviews and its Qantas / Woolworths / Bunnings
  client list are the vendor's own claims**, quoted in The Age (22 January
  2026). Reported, not independently confirmed. The notes say so.
- **No Australian case law yet.** No decided anti-discrimination or Fair Work
  matter turning on AI screening or AI video interviewing could be found as at
  August 2026. That absence is usable as a point, but must not be stated as
  though a case exists.
- **AHRC material was found but not used.** The Commission's thematic report
  on AI and racial discrimination and its AI and Recruitment Compliance
  Checklist are both real and relevant, but neither page carries a visible
  publication date, so neither could be confirmed against the 2025 date bar.
- The ATO page is **not date-stamped**, but references the current APS values
  and Code of Conduct framework. The APSC's parallel *Principles for candidate
  use of AI in recruitment* (April 2026) could not be fetched directly, so the
  slide leads with the ATO, which was verified verbatim.

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

The audience is Australian, so the deck says explicitly what does and does not
apply here, and that generative models are least reliable on Australian law,
policy and institutions.

Section 2 carries the local evidence: PwC's 2026 Australian job-ad split
between AI user and AI developer roles, the APS AI Plan's mandatory AI
literacy training, and the Jobs and Skills Australia augmentation figures.
All three are 2025 or later. The Victorian Public Sector generative AI
guideline was considered and left out — it is a genuinely good example of
personal accountability for AI-assisted work, but it was published in
November 2024 and so falls outside the "nothing before 2025" bar set for
this material.

Section 3 is grounded in the University of Melbourne's own published
guidance rather than generic advice about AI detection, supported by ABC News
investigations from October 2025 into detector use across the Australian
sector. The University of Sydney's two-lane assessment policy was considered
and left out on the same date bar — it is a strong example, but it was
published in November 2024. Both it and the Victorian guideline are available
if the date bar is relaxed.

Section 4's regulatory content used to be entirely American — Illinois and
NYC Local Law 144 — with a spoken aside that Australia had no equivalent.
That is no longer accurate, and the section now leads with the Australian
position: the ADM transparency obligation commencing 10 December 2026, and
what it pointedly does not provide. Illinois and NYC are retained in the
presenter notes as contrast rather than as the substance.

The rest of section 4's local grounding is Sheard's peer-reviewed study of
Australian employers, Sapia and Criteria Corp as platforms actually operating
here, and the ATO's published expectations of candidates. The University's own
careers guidance — its tailoring advice and the SMART Resume tool — is named
in the notes so the practical advice is anchored to something students can
use the same day.
