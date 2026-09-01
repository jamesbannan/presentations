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
| 7 | Using AI and staying safe | 9 min |
| 8 | Wrap-up and Q&A | 5 min |

Timings live in the presenter notes on each slide. The content now runs to
roughly **68 minutes** against a 45–50 minute slot, so **a substantial trim is
required before delivery**. Sections 2, 3, 4, 6 and 7 all grew when the
Australian evidence was added. In order of least damage, the cuts are:

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
| Detection tools are not neutral | 61% of TOEFL essays by non-native English speakers misclassified as AI-generated | Liang, Yuksekgonul, Mao, Wu & Zou, *Patterns* 4(7):100779, 2023, doi 10.1016/j.patter.2023.100779 |
| Be honest about what detection can and cannot do | Detectors have already caused wrong accusations at Australian universities | ABC News, "Over a dozen unis are using AI to catch AI — and getting it wrong", 20 October 2025 |
| What this University actually says | "An AI writing detection report alone is not sufficient evidence for an allegation"; detector visible to staff only; being asked to explain is not an allegation; free checkers and "humaniser" tools are a breach | University of Melbourne, *Advice for students regarding Turnitin and AI writing detection*, academicintegrity.unimelb.edu.au/plagiarism-and-collusion/advice-for-students-regarding-turnitin-and-ai-writing-detection (public, no login) |
| Show your process, not your innocence | Three-part declaration: tools used, how outputs were used, whether prompt records are available on request | University of Melbourne Academic Skills, *Acknowledging use of AI tools and technologies* |
| What AI changed for attackers | Cybercriminals use GenAI "to create high-quality videos, fake voices, websites, know-your-customer records and spearphishing emails... with relatively minimal effort"; AI "almost certainly" enables attacks at larger scale and faster rate | ASD, *Annual Cyber Threat Report 2024–25*, 14 October 2025, cyber.gov.au/about-us/view-all-content/reports-and-statistics/annual-cyber-threat-report-2024-2025 |
| What it costs when it works | $33,000 average self-reported cost of cybercrime per report for individuals, up 8%; over 84,700 reports to ReportCyber, one every 6 minutes; identity fraud the top individual cybercrime at 30% | ASD, *Annual Cyber Threat Report 2024–25*, 14 October 2025, cyber.gov.au/about-us/view-all-content/reports-and-statistics/annual-cyber-threat-report-2024-2025 |
| Basic hygiene that still works | "Use phishing-resistant multi-factor authentication wherever possible, preferably passkeys"; basic mitigations "can prevent the majority of the cyber incidents reported to ASD's ACSC" | ASD, *Annual Cyber Threat Report 2024–25* and its individuals fact sheet, 14 October 2025 |
| What the research on Australian hiring found | AI hiring systems may "enable, reinforce and amplify discrimination"; first study of AI hiring system use by Australian employers; n=23 interviews | Natalie Sheard, "Algorithm-facilitated discrimination", *Journal of Law and Society* 52(2):269–291, 8 May 2025, doi 10.1111/jols.12535, open access (CC BY 4.0); reported ABC News, 8 May 2025 |
| How applicant tracking systems actually work | Parser "scans an imported resume and auto-fills appropriate fields with information it detects"; a columned layout, contact details in the header, footer or a text box, graphics, photos, word art, image-only files and tables all break the parse; recruiters "search for keywords in applications, then filter the results", using "suggested keywords generated from your public job post" | Greenhouse Recruiting product documentation, *Unsuccessful resume parse* and *Talent Filtering*, both updated 3 March 2026 |
| What Australian law will and will not give you | ADM transparency obligation commences 10 December 2026; disclosure in privacy policies only; "no right to contestability or to request information, and no obligation to notify" | OAIC, *Automated Decision-Making Transparency Obligation (APP 1)* issues paper, 18 May 2026, oaic.gov.au/engage-with-us/consultations/consultation-on-guidance-for-transparency-in-automated-decision-making; APP 1.7–1.9 as inserted by the Privacy and Other Legislation Amendment Act 2024 (Cth), Act No. 128 of 2024, legislation.gov.au/C2024A00128 |
| Use AI to prepare, not to perform | ATO expects candidates to be honest, transparent, themselves and fair; must disclose AI use when asked; ATO does not use AI to screen applications | Australian Taxation Office, *Guidelines for candidate use of AI in recruitment processes*, ato.gov.au |
| Two very different kinds of shortcut | Delayed essay-quality gains larger among "augmentation users" who used AI to explain concepts; "automation users" who used it to generate text lost their short-run gains once AI was removed | Contractor & Reyes, *Experimental Evidence on the Learning Impact of Generative AI*, IZA Discussion Paper 18792, July 2026, iza.org/publications/dp/18792 — working paper, not peer reviewed |
| Better essays. No better learning. | 117 university students randomly assigned ChatGPT, a human expert, writing analytics or no tool; the ChatGPT group improved essay scores the most, with no significant difference in knowledge gain or transfer | Fan, Tang, Le, Shen, Tan, Zhao, Shen, Li & Gašević, *British Journal of Educational Technology* 56(2):489–530, 2025, doi.org/10.1111/bjet.13544 — free to read, no open licence |
| Effort is the signal, not the problem | Fluent AI explanations leave students confident about material they have not learned; "metacognitive laziness"; "generating answers before receiving explanations" listed among the desirable difficulties; "effort can, and often does, signal effective learning" | TEQSA, *Assuring quality learning in a gen AI-integrated future: The role of adaptive capabilities*, 24 June 2026, teqsa.gov.au/sites/default/files/2026-06/assuring-quality-learning-in-a-gen-AI-integrated-future.pdf |
| What actually governs this in Australia | No AI Act; reliance on "strong existing, largely technology-neutral legal frameworks"; an AI Safety Institute being established; text and data mining exception ruled out | *National AI Plan*, Department of Industry, Science and Resources, 2 December 2025 |
| What actually governs this in Australia | Australian Standards for AI announced, Office of AI established in PM&C, standards "expected to be legislated early next year"; obligations are directed at large data centres | Prime Minister of Australia, *AI in Australia's interests*, media release, 15 July 2026 |
| What you type in does not stay yours | "Files you upload to Copilot Chat are stored privately within your OneDrive and are not used for training"; all students have M365 Copilot Chat, which is not a licence to Microsoft 365 Copilot | University of Melbourne Student IT, *Microsoft 365*, studentit.unimelb.edu.au |
| What actually governs this in Australia | Guidance for AI Adoption sets out 6 essential practices and "evolves" the 10 VAISS guardrails and the 8 AI Ethics Principles | National AI Centre, *Guidance for AI Adoption*, 21 October 2025, ai.gov.au/staying-safe-and-responsible/essential-ai-practices |
| What this University tells you not to upload | Uploading personal information "carries similar risks to sharing it publicly to the open web"; uploading lecture slides or other subject material may violate creators' copyright; treat outputs "with the same scepticism and caution as you would any content from the internet" | University of Melbourne Academic Skills, *GenAI at Melbourne*, students.unimelb.edu.au/academic-skills/study-skills/learning-with-genai/GenAI-at-Melbourne |
| Attribution, consent and ownership | "Copyright ownership of AI generated works is currently unclear in Australia"; copyright requires works to be "original and if they are made by a human"; the Copyright Act 1968 (Cth) "does not specify how works are made, which leaves the Act open for interpretation"; "in most cases, you are not permitted to upload third-party material into AI applications"; Australia has fair dealing, not fair use | University of Melbourne Copyright Office, *AI and Copyright*, copyright.unimelb.edu.au/shared/using-copyright-material/ai-and-copyright |
| The scam built for people applying for jobs | Over 3,000 job scam reports in 2024 totalling $13.7 million, average losses 5.1% above all other scam types; 29,000 scam social accounts and 1,850 fake job ads removed Sept 2024 – Mar 2025; scams "disproportionately affect... international students, non-resident visa holders"; impersonations of Home Affairs, DFAT and APSJobs disrupted; "stop and check any job ad that requires you paying money to make money" | National Anti-Scam Centre job scam fusion cell final report, via Scamwatch, 30 May 2025 |
| What AI changed for attackers | 11,964 phishing and investment scam websites removed across 2025, a 90% increase on 6,270, averaging 32 per day; 1,100+ scam investment ads removed from social media; Australians lost $2.18 billion to scams in 2025, investment scams $837.7 million; "with these AI videos, the only thing that is real is the amount of money you risk losing" | ASIC media release 26-063MR, 8 April 2026 (scam loss totals attributed there to the NASC *Targeting Scams* report) |

Sourcing notes for the Australian figures:

- **PwC** is a professional services firm that sells AI consulting, and the
  barometer is its own analysis of job-ad data rather than a government
  statistic. That qualification is now made verbally rather than on the slide:
  the slide carries the citation and the source URL, and the presenter notes
  flag that the caveat has to be spoken because it no longer appears anywhere
  on screen. It is used because it is the most substantial regular Australian
  AI jobs series available, not because it is independent. The PwC media
  release was verified directly, and the landing page at
  `pwc.com.au/services/artificial-intelligence/ai-jobs-barometer.html` was
  confirmed live and confirmed to be the 2026 edition — it carries the 62%
  wage premium up from 57%, and defines the AI user and AI developer
  categories the slide's claim depends on.
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
- **Two live caveats on that slide.** The OAIC's final guidance had not issued
  as at 24 August 2026, when it was last checked: the consultation page is
  unchanged since 18 May 2026 and APP Guidelines Chapter 1 still says the
  detailed guidance is coming "in 2026". Chapter 1 is the page to re-check
  closer to the day, and its URL is in the slide notes. And the Privacy Act's
  small business exemption is being wound back in stages; only vendor blogs
  could be found on its current status, which is not good enough to assert, so
  the notes say not to.
- **"Hiring counts" is a reading, not a quote.** The OAIC's headline examples
  of significant effect are benefits decisions, contracts such as life
  insurance, and access to services such as healthcare — recruitment is not
  among them. The issues paper supports the line elsewhere, citing GDPR
  Recital 71 on "e-recruiting practices without any human intervention",
  decisions denying "an opportunity, such as an employment opportunity", and
  targeting that "limits access to employment opportunities". The notes tell
  the presenter to argue it rather than claim the regulator has settled it.
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
  than in section 3. The PDF URL is now cited on the slide face, and every
  quoted phrase was checked against the extracted text rather than taken from
  a summary.
- **TEQSA itself attributes "metacognitive laziness" to Fan et al. (2025)** —
  the same study on the preceding slide. That is why slides 28 and 30 sit
  together, and it means the regulator and the evidence slide are not two
  independent sources but one chain. Worth knowing if challenged: it is a
  strength for the argument's coherence, not a second data point.
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
- **Contractor and Reyes is now cited on the slide face, and its notes were
  corrected.** The abstract was read in full on 24 August 2026 and does not say
  what the deck previously claimed. AI access raised immediate test scores by
  0.27 standard deviations and **those gains persisted a week later** — so the
  paper's headline is friendlier to AI than this section is. What it does
  support, and all the slide now claims, is the split beneath: delayed essay
  quality gains were larger among "augmentation users" who used AI to explain
  concepts, while "automation users" who used it to generate text saw their
  short-run gains vanish once AI was removed. Working paper, not peer reviewed,
  American — the notes say so, and now also say not to overstate it.
  IZA Discussion Paper 18792, July 2026, iza.org/publications/dp/18792.
- **The two studies in this section point different ways on the headline.**
  Contractor and Reyes found learning gains that persisted; Fan et al. found no
  significant knowledge or transfer gain. The designs differ — Fan et al.
  measured transfer to a new task — and the notes on the Fan slide now carry an
  answer for a student who spots it, rather than leaving the presenter to
  improvise.

Sourcing notes for the frameworks material in section 6:

- **Both University of Melbourne pages were verified first-hand and every
  quoted phrase confirmed verbatim.** They are the strongest sources in this
  section for this audience, because they are the room's own institution
  rather than a general principle. Note the URL shapes, which cost real effort
  to find and are easy to guess wrong: the GenAI page sits under
  `/academic-skills/study-skills/learning-with-genai/` and is case-sensitive
  (`GenAI-at-Melbourne`), and the copyright page sits under
  `/shared/using-copyright-material/`, not `/guides` — it is not linked from
  the guides index at all, only inline from the GenAI page. Neither page shows
  a last-updated date, so both are cited without one.

- **The Copyright Office page carries more than the slide uses.** Held in the
  presenter notes for slide 37 in case of questions: "in most cases, you are
  not permitted to upload third-party material into AI applications"; most
  library databases prohibit uploading their content, so journal articles and
  book chapters are out; Indigenous Cultural Materials must not be uploaded
  without free, prior and informed consent; and Spark and Microsoft Copilot
  (signed in to the University's M365) are named as the approved secure tools.
  It also states plainly that Australia has fair dealing, not fair use — which
  is the correction to make if a student runs the US fair use argument.

- **"Ownership is genuinely unsettled" is the University's own position, not
  just a hedge.** The Copyright Office says copyright ownership of AI
  generated works "is currently unclear in Australia" and that the Copyright
  Act 1968 (Cth) "does not specify how works are made, which leaves the Act
  open for interpretation". Say "may not attract copyright" rather than "does
  not" — there is still no Australian decision squarely on generative AI
  output.

- **"Evolves", not "replaced".** The slide originally said the Guidance for AI
  Adoption "replaced" the 8 AI Ethics Principles and the 10 guardrails. The
  department's own notice says it "evolves the 10 guardrails in the Voluntary
  AI Safety Standard and these 8 AI Ethics Principles", the adoption guidance
  says the practices "align with" the Ethics Principles, and both older pages
  are still published. The slide now uses "evolves" and carries the exact
  publication date, 21 October 2025.

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
  it is the outstanding gap in this section. A joint ASD/CISA/NSA publication
  on agentic AI services was identified as a candidate source but could not be
  retrieved from cyber.gov.au, so it has not been cited. It is also joint
  guidance with US agencies, which sits awkwardly with the brief for this
  section.
- **A job scam slide was added because it is the most audience-proximate
  threat in the deck.** Every person in the room is about to start applying
  for work, which is the exact moment this scam is built for. All figures come
  from the National Anti-Scam Centre job scam fusion cell final report,
  reported by Scamwatch on 30 May 2025. The demographic sentence is quoted
  close to verbatim and names international students and non-resident visa
  holders explicitly. The detail worth keeping is that the impersonated brands
  included APSJobs — a graduate recruitment site this cohort is about to use.
  The NASC also ran awareness forums across the tertiary education sector,
  which is the clearest possible signal that this audience is the target.
- **A claimed 2025 escalation in job scam losses was not used.** A figure of
  more than $19 million, up 102.5%, with 25–34 as the most-reported age group,
  surfaced in research but could not be confirmed against a primary NASC or
  Scamwatch publication. The slide therefore uses the 2024 figures that are
  directly attributable.
- **ASIC 26-063MR supplies the Australian scale numbers** for the opening
  slide, replacing what would otherwise have been vendor data. Kirkland's
  "the only thing that is real is the amount of money you risk losing" is the
  strongest single line available on this topic from an Australian regulator.
  The script ASIC published from one of the ads — "19-year-olds are becoming
  millionaires while you wait for Friday's paycheck" — is in the notes because
  it demonstrates the targeting better than any statistic.
- **Two widely repeated claims about that ASIC release are wrong and were
  excluded.** Secondary coverage attributes to it a $7.4 million deepfake
  figure involving impersonations of the Prime Minister and other public
  figures, a quote from Chair Sarah Court, and a publication date of 17 August
  2026. The release was retrieved and checked directly: it is dated 8 April
  2026 and contains no reference to Albanese, no $7.4 million figure, no quote
  from Sarah Court, and does not use the word "deepfake" at all. Only the
  verified content is used.

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

The applicant tracking slide is sourced differently from everything else in
the deck, and deliberately so. No *authoritative* Australian source covers it.
The University's own careers pages, including the resumes guidance and the
SMART Resume tool, contain no reference to applicant tracking, parsing or
keywords at all, and the APSC's *Cracking the code* does not describe
screening mechanics either. Both were checked directly.

SEEK does publish an Australian article on the topic, *Tips for creating an
ATS-friendly resumé* (updated 5 August 2025), and it supports all three rows —
it describes keyword matching, says the software "ranks the resumés based on
how well they match the job description's criteria", and warns that complex
designs may not be read correctly. It is cited in the notes as the Australian
voice. It is not the slide-face source for two reasons. It is careers-blog
content rather than documentation or research, and it leans on the "digital
gatekeeper" framing that this slide is specifically arguing against. It also
claims resumés "saved as PDF files" may not be filtered correctly, which the
vendor documentation contradicts.

Rather than reach for the widely repeated "X% of resumes are never seen by a
human" figure, which is vendor marketing with no research behind it, the slide
cites an ATS vendor's own product documentation. The distinction being applied
is that a vendor publishing a statistic about the industry is marketing, but a
vendor documenting how its own parser behaves and what breaks it is a primary
source for mechanism. Greenhouse's *Unsuccessful resume parse* article supplies
rows 1 and 3 nearly verbatim, and *Talent Filtering* supplies row 2, including
the detail that the suggested search keywords are generated from the job post
itself. Both were rendered and read in full, and both were updated in 2026.

That choice also happens to reinforce the slide's argument. The documentation
describes a recruiter running a search, not a system issuing rejections, which
is the deflationary picture the slide is trying to leave students with.

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

The section then gained the slide it was missing. Everything in it was true of
anyone, and none of it was about being a final-year student walking into a job
market. The job scam slide fixes that. It is sourced to the National Anti-Scam
Centre, it names the demographic in the room, and the brands being impersonated
include a graduate recruitment site. It is the one threat in the deck that is
aimed at the audience rather than merely relevant to them, which makes it the
right note to end the section's evidence on before moving to what to do about
it.
