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
| 6 | The ethical use of personal AI | 10 min |
| 7 | Using AI and staying safe | 7 min |
| 8 | Wrap-up and Q&A | 5 min |

Timings live in the presenter notes on each slide. The content now runs to
roughly **66 minutes** against a 45–50 minute slot, so **a substantial trim is
required before delivery**. Sections 2, 3, 4 and 6 all grew when the Australian
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
| What AI changed for attackers | Cybercriminals use GenAI "to create high-quality videos, fake voices, websites, know-your-customer records and spearphishing emails... with relatively minimal effort"; AI "almost certainly" enables attacks at larger scale and faster rate | ASD, *Annual Cyber Threat Report 2024–25*, 14 October 2025 |
| What it costs when it works | $33,000 average self-reported cost of cybercrime per report for individuals, up 8%; over 84,700 reports to ReportCyber, one every 6 minutes; identity fraud the top individual cybercrime at 30% | ASD, *Annual Cyber Threat Report 2024–25*, 14 October 2025 |
| Basic hygiene that still works | "Use phishing-resistant multi-factor authentication wherever possible, preferably passkeys"; basic mitigations "can prevent the majority of the cyber incidents reported to ASD's ACSC" | ASD, *Annual Cyber Threat Report 2024–25* and its individuals fact sheet, 14 October 2025 |
| What the research on Australian hiring found | AI hiring systems may "enable, reinforce and amplify discrimination"; first study of AI hiring system use by Australian employers; n=23 interviews | Natalie Sheard, "Algorithm-facilitated discrimination", *Journal of Law and Society*, doi 10.1111/jols.12535; reported ABC News, 8 May 2025 |
| What Australian law will and will not give you | ADM transparency obligation commences 10 December 2026; disclosure in privacy policies only; "no right to contestability or to request information, and no obligation to notify" | OAIC, *Automated Decision-Making Transparency Obligation (APP 1)* issues paper, May 2026; APP 1.7–1.9 as inserted by the Privacy and Other Legislation Amendment Act 2024 |
| Use AI to prepare, not to perform | ATO expects candidates to be honest, transparent, themselves and fair; must disclose AI use when asked; ATO does not use AI to screen applications | Australian Taxation Office, *Guidelines for candidate use of AI in recruitment processes*, ato.gov.au |
| Better essays. No better learning. | 117 university students randomly assigned ChatGPT, a human expert, writing analytics or no tool; the ChatGPT group improved essay scores the most, with no significant difference in knowledge gain or transfer | Fan, Tang, Le, Shen, Tan, Zhao, Shen, Li & Gašević, *British Journal of Educational Technology* 56(2):489–530, 2025, doi 10.1111/bjet.13544 |
| Effort is the signal, not the problem | Fluent AI explanations leave students confident about material they have not learned; "metacognitive laziness"; "generating answers before receiving explanations" listed among the desirable difficulties | TEQSA, *Assuring quality learning in a gen AI-integrated future: The role of adaptive capabilities*, 24 June 2026 |
| What actually governs this in Australia | No AI Act; reliance on "strong existing, largely technology-neutral legal frameworks"; an AI Safety Institute being established; text and data mining exception ruled out | *National AI Plan*, Department of Industry, Science and Resources, 2 December 2025 |
| What actually governs this in Australia | Australian Standards for AI announced, Office of AI established in PM&C, standards "expected to be legislated early next year"; obligations are directed at large data centres | Prime Minister of Australia, *AI in Australia's interests*, media release, 15 July 2026 |
| What you type in does not stay yours | "Files you upload to Copilot Chat are stored privately within your OneDrive and are not used for training"; all students have M365 Copilot Chat, which is not a licence to Microsoft 365 Copilot | University of Melbourne Student IT, *Microsoft 365*, studentit.unimelb.edu.au |
| What actually governs this in Australia | Guidance for AI Adoption sets out 6 essential practices and "evolves" the 10 VAISS guardrails and the 8 AI Ethics Principles | National AI Centre, *Guidance for AI Adoption*, 21 October 2025 |
| What this University tells you not to upload | Uploading personal information "carries similar risks to sharing it publicly to the open web"; uploading lecture slides or other subject material may violate creators' copyright; treat outputs "with the same scepticism and caution as you would any content from the internet" | University of Melbourne Academic Skills, *GenAI at Melbourne*, students.unimelb.edu.au |

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

Claims about HireVue, the Illinois AI Video Interview Act and NYC Local Law
144 are stated only in the presenter notes, with dates and peer-review status
recorded so they are not overstated from the stage.

Sourcing notes for the learning material in section 5:

- **TEQSA's June 2026 resource was downloaded and its text extracted
  directly**, so the "metacognitive laziness", regulatory-erosion and
  desirable-difficulties material is first-hand from the regulator. It is the
  third in TEQSA's assessment reform series and is explicitly about assuring
  *learning* rather than policing integrity, which is why it sits here rather
  than in section 3.
- **Fan et al. is the strongest study in the deck** — randomised, four
  conditions, and outcomes measured rather than self-reported. Describe it
  accurately from the stage: the lead institution is Peking University with
  co-authors at Monash's Centre for Learning Analytics, so it is Monash
  co-authored, not an Australian study. It is in the deck because TEQSA leans
  on it. It also carries a 2025 issue date but appeared online in December
  2024, so it sits just on the edge of the date bar.
- The **"performance paradox"** is Australian-authored and peer-reviewed: Yan
  and Gašević (Monash) with Lodge (UQ) and Greiff, *Nature Reviews Psychology*
  4:435–436, 18 June 2025. Metadata verified via Crossref.
- **"Illusion of competence"** is Jason Lodge's phrase, from The Conversation,
  16 March 2026, written alongside a report with Leslie Loble at UTS. The
  article was verified verbatim; the underlying report itself could not be
  rendered.
- The **"almost 80% of Australian uni students use AI"** headline figure is
  deliberately **not** on any slide. It is attributable to Lodge, but the
  underlying survey, its sample and its method could not be traced. The notes
  say to say "most students" instead.
- The **MIT Media Lab "cognitive debt" EEG preprint has been dropped.** It was
  still unreviewed as at August 2026 (arXiv 2506.08872, n=54), and Fan et al.
  now does the same job with much better evidence.
- **Counter-evidence is carried in the notes** so the argument is two-sided.
  Contractor and Reyes (IZA Discussion Paper 18792, July 2026) found
  "augmentation users" kept their gains a week later while "automation users"
  lost them. It is a working paper, not peer reviewed, and American — the
  notes say so.

Sourcing notes for the frameworks material in section 6:

- **The framework slide is deliberately about hierarchy, not detail.** The
  common misconception is that an Australian AI law exists. It does not, and
  the National AI Plan of 2 December 2025 says so in terms — Australia relies
  on "strong existing, largely technology-neutral legal frameworks" and a
  "practical and risk-based" approach that "uses regulators' existing
  expertise". The plan was read from the primary PDF, not from secondary
  coverage. Mandatory guardrails for high-risk AI were consulted on in 2024
  and did not proceed in that form.
- **The July 2026 announcement is on the slide because it is widely
  misreported, and the correction is the point.** The Prime Minister's media
  release of 15 July 2026 was read in full from pm.gov.au. It announces
  Australian Standards for AI, establishes an Office of AI within Prime
  Minister and Cabinet, and says standards are "expected to be legislated
  early next year". Secondary coverage has framed this as an Australian AI
  Act. It is not: the obligations described are for large data centres —
  underwriting their own power supply, paying connection costs, reducing load
  on demand, water efficiency. The one part directly relevant to this section
  is the commitment that "no company should use Australian creative works to
  train AI without the artist's control", which aligns with the text and data
  mining decision. The deck states this accurately rather than inflating it.
- **The 8 AI Ethics Principles and the 10 VAISS guardrails have been
  superseded** by the 6 essential practices in the October 2025 Guidance for
  AI Adoption. Both older pages now carry a notice saying so, and the ethics
  principles page has been rewritten in the past tense. Much secondary
  material still quotes the 8 principles as current; it is out of date. The
  principles date from 2019 and the standard from September 2024, so neither
  meets the 2025 date bar on its own — they appear only as the thing that was
  replaced.
- **The individual-versus-organisation distinction is the thing most likely
  to be got wrong from the stage, and the notes flag it explicitly.** The
  Australian Privacy Principles and the OAIC's AI guidance bind APP entities,
  not a student using a chatbot at home. The deck therefore does not tell
  students they are personally bound by privacy law. The useful framing is
  that privacy law regulates the organisations they will work for, which is
  why universities and employers have input rules and provide sanctioned
  tools.
- **There is exactly one exception, and it is now in the notes.** The
  statutory tort of serious invasion of privacy, in Schedule 2 of the Privacy
  Act, commenced 10 June 2025. The OAIC's own page describes it as "broader
  in application than the Privacy Act, extending to individuals and other
  entities that may not necessarily be an Australian Privacy Principle
  entity" — so it can reach a person, not just an organisation. It is framed
  as the outer boundary rather than a daily risk, because the threshold is
  intentional or reckless conduct, a reasonable expectation of privacy, and a
  serious invasion, with consent available as a defence. Verified verbatim
  from oaic.gov.au, published 19 June 2025.
- **The University's provisioned tool is named on the slide because it is the
  actionable answer**, and the wording was verified verbatim from Student IT:
  "Files you upload to Copilot Chat are stored privately within your OneDrive
  and are not used for training." Be precise about scope — every student has
  M365 Copilot Chat, which the same page says is *not* a licence to the full
  Microsoft 365 Copilot. The transferable principle is that an institutional
  account carries contractual data protections a free personal account does
  not.
- **GAP, stated in the notes:** the University does not publish an approved
  versus prohibited list of AI tools for personal study use. It provides one
  protected option and expects judgement about the rest. The notes also say to
  re-verify the provisioned tooling before presenting, because institutional
  AI offerings change faster than a deck does.
- The **OAIC position that a hallucination about an identifiable person is
  that person's personal information** is genuinely counter-intuitive and
  verified verbatim, but it sits in the notes rather than on a slide for the
  same reason — it is an obligation on organisations. Source: OAIC, *Guidance
  on privacy and the use of commercially available AI products*, 21 October
  2024, updated 17 January 2025. It is in-date on its update, not its
  publication.
- **The University of Melbourne page was verified verbatim** and carries the
  section. It is the layer that actually binds this audience, and the
  open-web analogy is the University's own. The line "no one will hire you to
  do what GenAI does for free" is from the same page and is held in the notes
  for a Job Ready audience.
- **Whether AI-generated output attracts copyright in Australia remains
  unsettled** and the deck says "may not" rather than "does not". There is no
  Australian decision squarely on the point. What *is* settled, and is stated,
  is that the government has ruled out a text and data mining exception in
  Australian copyright law. The Attorney-General's Department continues to
  consult through the Copyright and AI Reference Group.

Sourcing notes for the threat material in section 7:

- **The section is now anchored on ASD rather than on vendor research**, which
  matters more here than anywhere else in the deck: commercial threat reports
  are the default source for this topic and the weakest one available. The
  *Annual Cyber Threat Report 2024–25* was published 14 October 2025 and is
  the current edition; no 2025–26 edition existed as at August 2026. Both the
  main report and the individuals fact sheet were downloaded and their text
  extracted directly.
- **One ASD sentence sources the whole opening slide**, and it is quoted in
  the notes so it can be read aloud: cybercriminals use GenAI "to create
  high-quality videos, fake voices, websites, know-your-customer records and
  spearphishing emails to more convincingly present themselves to victims as
  legitimate actors with relatively minimal effort".
- **ASD's "almost certainly" is a calibrated confidence term, not a hedge**,
  and the notes say so. Reading it as vague weakens the claim.
- **The $33,000 figure must be described precisely.** It is an average
  *self-reported* cost *per report* for individuals in FY2024–25, not a
  population average. ASD also assesses that "the vast majority of cybercrime
  continues to go unreported", so the 84,700 report count is a floor. Both
  caveats are in the notes.
- **The Arup deepfake case was removed from the slide face** and demoted to
  the notes as illustration. It is genuine and well documented, but it is a
  Hong Kong incident denominated in US dollars, and there is no reason to
  reach overseas when the Australian national cyber authority publishes
  better-attributed numbers. The dates are retained in the notes because the
  case is routinely misdated — the fraud was January 2024, disclosure February
  2024, Arup's confirmation May 2024.
- **The hygiene advice is now quoted from ASD rather than offered as
  opinion**, which matters in a section about not trusting fluent sources.
  Passkeys are ASD's own recommendation, not the presenter's preference.
- **Prompt injection is the one claim in the section still carrying no
  Australian citation.** It is described from first principles rather than
  attributed, which is defensible because the mechanism is not contested, but
  it is the outstanding gap in this section.

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

Section 6 previously named no Australian instrument at all. It now opens by
answering the question directly — what actually governs AI use here — and the
answer is a hierarchy rather than a statute: existing technology-neutral law,
then voluntary national guidance aimed at organisations, then the
institutional policy that is the only layer with real consequences for a
student. The section then moves from national frameworks to the University's
own published words on personal information, copyright and reliability, which
is the closest and most actionable layer for this audience. It also names the
tool the University actually provides — M365 Copilot Chat, where uploads are
not used for training — so the section ends with something to do rather than
only something to avoid.

The rest of section 4's local grounding is Sheard's peer-reviewed study of
Australian employers, Sapia and Criteria Corp as platforms actually operating
here, and the ATO's published expectations of candidates. The University's own
careers guidance — its tailoring advice and the SMART Resume tool — is named
in the notes so the practical advice is anchored to something students can
use the same day.

Section 5 previously rested entirely on two non-Australian sources, one of
them an unreviewed preprint. It now leads with TEQSA's June 2026 resource on
adaptive capabilities, which is useful for two reasons: it is the Australian
regulator speaking about protecting *learning* rather than catching cheating,
and it independently endorses the sequence the section already recommended —
"generating answers before receiving explanations" is one of the four
desirable difficulties it lists. The evidence slide behind it is a randomised
experiment with measured outcomes, and the framing concepts — the performance
paradox, the illusion of competence — are Monash and UQ work. The section is
also deliberately two-sided: the notes carry RCT counter-evidence that AI
helps when used to understand rather than to generate, which is the same
distinction the section draws.

Section 7 was the most obviously imported section in the deck: its centrepiece
was a Hong Kong deepfake fraud quoted in US dollars, and its security advice
was generic. It now runs on the Australian Signals Directorate. The opening
slide is sourced to ASD's own description of how cybercriminals use generative
AI, the evidence slide uses ASD's Australian cost and volume figures for
individuals, and the closing hygiene advice — including passkeys — is quoted
from ASD rather than asserted. This matters more in this section than
elsewhere, because cybersecurity is the topic where vendor marketing most
often substitutes for evidence, and because the section is otherwise asking
the audience to distrust confident, fluent sources.
