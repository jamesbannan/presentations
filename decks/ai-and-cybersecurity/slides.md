---
theme: slidev-theme-ai-cybersecurity
title: "AI & Cybersecurity: Navigating Your Transition from Study to Industry"
titleTemplate: "%s"
author: "James Bannan"
keywords: ai literacy, cybersecurity, job ready, careers, university of melbourne
info: |
  Job Ready Program session for Faculty of Arts undergraduates at the
  University of Melbourne. 45–50 minutes including Q&A.
# ─── EVENT DETAILS · EDIT THESE THREE LINES PER EVENT ──────────────────────
# Only these values change when the session is re-run. They render in the
# cover footer and nothing else depends on them.
event: "Job Ready Program"
faculty: "Faculty of Arts"
eventDate: "2 September 2026"
# ───────────────────────────────────────────────────────────────────────────
layout: cover
kicker: UoM  //  FACULTY OF ARTS  //  JOB READY PROGRAM
heading: AI & Cybersecurity
subtitle: Navigating your transition from study to industry
footer: James Bannan  ||  Principal Consultant
---

<!--
Slide 1 is rendered entirely by the theme's `cover` layout.

Opening (30 sec): introduce yourself and frame the room. Most of this audience
is not heading into tech roles — say so explicitly, early. The point of the
session is that AI now shows up in their working life whether or not they
ever choose to use it.
-->

---
layout: default
kicker: OVERVIEW
title: AI is now three things at once
---

<IconRows :rows="[
  { title: 'A tool you are expected to use', body: 'Employers increasingly assume baseline fluency — not expertise, but competence.' },
  { title: 'A system that evaluates you', body: 'Automated screening and AI interview tools sit between you and a human reader.' },
  { title: 'A risk you have to manage', body: 'What you feed into it, what you trust from it, and who is using it against you.' },
]" />

<!--
3 min for this and the agenda together.

The framing that makes the whole session hang together: students tend to think
about AI only in the first sense. The second is the one that surprises them —
they are already being assessed by these systems. The third is the one they
underestimate.

Ask for a show of hands: who has used AI for university work in the last
month? Almost every hand goes up. Then: who has thought about what happens to
what they typed into it? Far fewer. That gap is the session.
-->

---
layout: agenda
kicker: SESSION OVERVIEW
title: Agenda
items:
  - AI skills expected in industry
  - Assessments and AI detection
  - AI resume screening and video interviews
  - Using AI without losing the ability to learn
  - The ethical use of personal AI
  - Using AI and staying safe
---

<!--
Preview only — don't elaborate here, each section gets its own opening.

Flag that there is time for questions at the end, but that they should
interrupt if something is unclear. Sections 3 and 4 are the ones this
audience always has the most questions about.
-->

---
layout: section
kicker: SECTION 01
title: |
  The AI skills
  industry expects
subtitle: What "AI literacy" actually means for graduates outside tech roles
---

<!-- 7–8 minutes for this section. -->

---
layout: default
kicker: 01 · INDUSTRY SKILLS
title: What employers actually mean by "AI literacy"
---

<IconRows :rows="[
  { title: 'Framing the task well', body: 'Giving the tool enough context to be useful — the skill is knowing what to specify.' },
  { title: 'Critically evaluating output', body: 'Checking accuracy, bias and fitness for purpose before anything carries your name.' },
  { title: 'Knowing when not to use it', body: 'Recognising tasks where AI adds risk rather than value, and doing those yourself.' },
]" />

<!--
2 min.

The third row is the one worth dwelling on. Employers are not impressed by
someone who uses AI for everything — they are wary of them. Judgement about
when to reach for the tool is the differentiator, and it is the hardest of
the three to demonstrate in an interview.

Concrete example to offer: drafting a first-pass summary of a long report is
a good use. Writing a condolence message to a client is not.
-->

---
layout: two-col
kicker: 01 · INDUSTRY SKILLS
title: This is not a tech-roles conversation
leftTitle: WHERE ARTS GRADUATES MEET AI
rightTitle: WHAT THE HUMAN STILL OWNS
---

::left::

- Research and literature synthesis
- Writing, editing and translation support
- Communications, media monitoring and content production
- Policy analysis, submissions and briefing notes
- Content moderation and trust & safety
- Grant writing and reporting

::right::

- Deciding what question is worth asking
- Judging which sources are credible
- Reading context, audience and tone
- Weighing competing interests and ethics
- Taking responsibility for the final call

<!--
3 min.

This slide exists to pre-empt the "this doesn't apply to me, I'm doing
history" reaction. Every item on the left is a real graduate destination for
this faculty.

The right column is the reassurance, and it is genuine: the tasks AI handles
worst are exactly the ones an Arts degree trains. Don't oversell it — the
point is not that they are safe, it is that their training is complementary.
-->

---
layout: stat
kicker: 01 · INDUSTRY SKILLS
title: Australian demand is for users, not builders
stat: "19,300"
caption: |
  new Australian job ads for AI <strong>user</strong> roles in 2025 —
  against 1,300 for AI developer roles
source: "PwC Australia, 2026 AI Jobs Barometer, 18 June 2026. PwC's own analysis of job-ad data, not a government statistic."
---

<!--
1 min. This is the evidence slide for the claim you just made.

Australian AI job ads more than doubled over the year — 20,000 in 2024 to
41,000 in 2025 — but almost all of that growth is in roles that *apply* AI
rather than build it. That ratio is roughly fifteen to one.

Say the source out loud: this is PwC's own analysis of job-ad data, not an
ABS or Jobs and Skills Australia statistic. It is the most substantial
regular Australian series available, and PwC sells AI consulting — both
things are true, so name them and let the students weigh it.

If asked about the wage premium: the same report puts it at 62% on average,
up from 57%. Don't lead with that number — it invites "so I should learn
AI instead of my degree", which is the opposite of this section's point.
-->

---
layout: default
kicker: 01 · INDUSTRY SKILLS
title: What this already looks like in Australia
---

<IconRows :rows="[
  { title: 'Your employer may train you — and expect it', body: 'The APS AI Plan 2025 makes foundational AI literacy training mandatory for every APS employee, rolling out through 2026.' },
  { title: 'The tasks change more than the job does', body: 'Jobs and Skills Australia put around 79% of jobs as transformed at task level, and only about 4% at high likelihood of full automation.' },
  { title: 'The premium sits on judgement', body: 'In AI-exposed roles, new tasks are 2.5× more likely to demand human-intensive skills than technical ones.' },
]" />

<!--
2 min. The point of this slide is that none of this is hypothetical or
American — it is already policy at employers in this room's pipeline.

Row 1 — APS AI Plan 2025 (Department of Finance with the DTA and APSC).
Foundational AI literacy is being made mandatory APS-wide, phased in across
2026. The Commonwealth and Victorian public services are among the largest
graduate employers for this faculty, so this lands. Secondary reporting puts
the first mandatory requirement at 15 June 2026 — I could not reach
digital.gov.au to confirm that date, so say "during 2026" rather than
quoting the day.

Row 2 — Jobs and Skills Australia, "Our Gen AI Transition", September 2025.
A Commonwealth statutory body, so the strongest source in this section.
Worth adding aloud: JSA flags routine clerical and communications roles as
the most exposed, which is honest about where this cohort is heading.

Row 3 — PwC Australia's 2026 barometer again: empathy, creativity,
leadership, face-to-face work. Same sourcing caveat as the previous slide.

Do NOT use PwC's "junior workers are 7× more likely to need senior skills"
figure — that one is US data, and this slide is explicitly about Australia.
-->

---
layout: default
kicker: 01 · INDUSTRY SKILLS
title: "\"Prompt engineering\" is a skill, not a career"
---

<IconRows :rows="[
  { title: 'The standalone job title is fading', body: 'The specialist roles that appeared in 2023 have largely dissolved back into ordinary jobs.' },
  { title: 'The skill is becoming baseline', body: 'Closer to competent search or spreadsheet literacy than to a profession in itself.' },
  { title: 'So do not build a career on it', body: 'Build domain expertise and use AI fluency to make that expertise go further.' },
]" />

<!--
2 min.

Students see headlines about six-figure prompt engineering salaries and draw
the wrong conclusion. The honest version: the tools got better at inferring
intent, and the specialism thinned out.

Careful not to overstate this — say "the standalone title is fading", not
"the skill is worthless". The skill matters, it is just not a destination.

If challenged for evidence: LinkedIn postings for the title peaked around
2023–24 and fell away, and an analysis of 20,662 AI job postings
(arXiv:2506.00058, 2025) found standalone prompt-engineer roles are well
under 1% of AI postings. It is convergent evidence, not one headline study —
don't attribute it to a single named report.
-->

---
layout: section
kicker: SECTION 02
title: |
  Assessments and
  AI detection
subtitle: Why the goal is demonstrating your thinking, not evading a detector
---

<!-- 7 minutes for this section. -->

---
layout: default
kicker: 02 · ASSESSMENT INTEGRITY
title: How AI use is currently flagged
---

<IconRows :rows="[
  { title: 'Statistical detection tools', body: 'They score how predictable your text is — a probability, never a proof.' },
  { title: 'Process and version history', body: 'Document history, drafts and submission metadata are increasingly the real evidence.' },
  { title: 'Human judgement', body: 'A sudden change in voice, or work that does not match your in-class contribution.' },
]" />

<!--
2 min.

Be precise about what detectors measure: low "perplexity" — text that is
statistically unsurprising. That is a proxy, and proxies fail.

Worth naming plainly: a detector output is not a finding of misconduct. It is
a trigger for a conversation.
-->

---
layout: two-col
kicker: 02 · ASSESSMENT INTEGRITY
title: Be honest about what detection can and cannot do
leftTitle: WHAT DETECTION TOOLS DO
rightTitle: WHERE THEY FALL DOWN
---

::left::

- Flag statistical patterns typical of generated text
- Return a likelihood score, not a verdict
- Work best on long, unedited, single-source passages
- Form one input into an academic integrity process

::right::

- Produce false positives on real student writing
- Penalise non-native English writers disproportionately
- Are degraded by light paraphrasing or editing
- Cannot distinguish "AI-assisted" from "AI-generated"
- Have already caused wrong accusations at Australian universities

<!--
2 min. Being straight about the limits buys credibility for the advice that
follows — students already know the tools are imperfect, and pretending
otherwise loses the room.

The bias finding on the right is the one to put weight on; the next slide
gives the actual study.

The last bullet is Australian and recent: an ABC News investigation
(20 October 2025) found at least a dozen Australian universities using AI
detection software and getting it wrong. Charles Sturt's Mark Bassett, who
runs academic integrity there, called heavy reliance on detectors a "lazy"
alternative to redesigning assessment. TEQSA and Universities Australia both
told the ABC they hold no data on which universities use these tools.

A second ABC story (9 October 2025) covers the Australian Catholic
University, which abandoned Turnitin's AI detector in March 2025. ACU's
Deputy Vice-Chancellor confirmed on the record that any case resting on the
detector as sole evidence was dismissed immediately. Use the DVC's own
words, not the disputed "6,000 cases" figure from leaked documents.

Do not turn this into an anti-university rant. The point is that the sector
itself has worked out that detectors are not evidence.
-->

---
layout: stat
kicker: 02 · ASSESSMENT INTEGRITY
title: Detection tools are not neutral
stat: "61%"
caption: |
  of TOEFL essays written by non-native English
  speakers were misclassified as AI-generated
source: "Liang et al., “GPT detectors are biased against non-native English writers”, Patterns (Cell Press), 2023."
---

<!--
1 min, and let it sit.

Liang, Yuksekgonul, Mao, Wu & Zou (2023), Patterns 4(7):100779. Seven GPT
detectors were run over 91 TOEFL essays written by non-native English
speakers. 61.22% were misclassified as AI-generated, and 97% (89 of 91) were
flagged by at least one detector; all seven agreed on 18 of them. The same
detectors were near-perfect on essays by US-born native English speakers.

The mechanism is worth one line: detectors score "perplexity" — how
linguistically predictable the text is. Simpler vocabulary and syntax read as
machine-like, which is exactly what penalises EAL writers.

This is a big deal for a cohort with many international and EAL students, and
it is the strongest argument for the reframe on the next slides: process
evidence protects you in a way that "I didn't use AI" does not.
-->

---
layout: default
kicker: 02 · ASSESSMENT INTEGRITY
title: What this University actually says
---

<IconRows :rows="[
  { title: 'The detector is a prompt, not a verdict', body: 'In the University’s own words: an AI writing detection report alone is not sufficient evidence for an allegation.' },
  { title: 'Being asked to explain is not an accusation', body: 'You may be asked how you built the argument, or for drafts and notes. The University states plainly that this is not an allegation of misconduct.' },
  { title: 'Never run your work through a free AI checker', body: 'They are often inaccurate, they take your work, and “humaniser” tools are themselves flagged — and that is misconduct.' },
]" />

<!--
2 min. This is the slide that makes the section concrete for this room —
it is their own institution's published position, not general commentary.

Source for all three rows: "Advice for students regarding Turnitin and AI
writing detection", academicintegrity.unimelb.edu.au. Verified verbatim.

Row 1 — Turnitin's AI detector IS enabled here, unlike Curtin (disabled from
1 January 2026) and UQ (disabled from semester 2, 2025). Staff can see the
score; students cannot, unless an instructor shares the report. The quoted
line is exact, so you can read it out.

Row 2 — the page says being asked to discuss your work is "informal and
exploratory" and explicitly not an allegation. It also says you are not
required to attend such a discussion, and points students to UMSU Advocacy.
Mention UMSU by name — most of the room will not know it exists.

Row 3 — the strongest practical warning on the page, and the one students
most often get wrong. Free checkers monetise student anxiety, claim to find
AI in wholly human work in order to sell "humaniser" tools, and those
humanisers usually use AI and are picked up by the University's own
detector. You also hand over your intellectual property.

Closing beat, worth saying slowly because it lands with a Job Ready
audience: the same page states work can be checked "at any stage",
including in the years following graduation, and that the University may
amend marks or rescind degrees if misconduct is found later. The habits
being described here are not just about passing this semester.

If asked about the two named policies: Student Academic Integrity Policy
MPF1310, and Assessment and Results Policy MPF1326. Point, don't paraphrase.
-->

---
layout: default
kicker: 02 · ASSESSMENT INTEGRITY
title: Show your process, not your innocence
---

<IconRows :rows="[
  { title: 'Work somewhere with history', body: 'Drafting in a tool that keeps version history gives you a record you never have to construct.' },
  { title: 'Keep your prompts and notes', body: 'If you used AI, save what you asked and what you did with the answer.' },
  { title: 'Declare it properly', body: 'Name the tool, say how you used the output, and state that your prompt records are available on request.' },
]" />

<!--
2 min.

The practical core of the section. The advice is not defensive paranoia — it
is that a visible process is simply better scholarship, and it happens to be
the thing that resolves an integrity query in your favour.

Row 3 is the University's own three-part declaration format, from Academic
Skills, "Acknowledging use of AI tools and technologies": the specific tools
used, how those outputs were used, and whether detailed records of prompts
and outputs are available on request. It goes at the end of the assessment,
after the reference list, under a "Declaration" heading. There is a Word
template on the Academic Skills site — tell them to search for it rather
than trying to write the URL down.

Two things worth saying out loud. First, a declaration is required for far
more than "I got AI to write it" — brainstorming, planning, generating
tables or images, proofreading and editing all need declaring. Second, if
you quote or paraphrase AI output you must also cite it as a source, which
is a separate obligation from the declaration.

Also worth flagging: coordinators here choose from five published levels of
permitted AI use, from unrestricted collaboration down to none at all. So
"what's the rule" has five possible answers and the only reliable move is to
read the assessment guidelines for each subject.

Point them at the University's academic integrity guidance rather than
paraphrasing policy from the stage; policies change and vary by subject.
-->

---
layout: quote
kicker: 02 · ASSESSMENT INTEGRITY
quote: The goal is not to avoid detection. It is to be able to show that the thinking was yours.
---

<!-- 30 sec. Land it, pause, move on. Do not explain the line. -->

---
layout: section
kicker: SECTION 03
title: |
  Resume screening
  and AI interviews
subtitle: What the systems between you and a recruiter are actually doing
---

<!-- 8 minutes for this section — usually the highest-engagement part. -->

---
layout: default
kicker: 03 · APPLICATION SCREENING
title: How applicant tracking systems actually work
---

<IconRows :rows="[
  { title: 'Parsing, not comprehension', body: 'The system extracts fields and matches terms. It is not reading you charitably.' },
  { title: 'Ranking against the ad', body: 'Recruiters filter and sort on criteria drawn from the job description itself.' },
  { title: 'Layout breaks it', body: 'Multi-column templates, text in images, and headers can parse into nonsense.' },
]" />

<!--
2 min.

Deflate the mythology here. Most ATS platforms are databases with search over
them — the "AI robot rejecting you" picture is largely wrong, and the more
accurate picture is more actionable: a human searches, and you need to be
findable.

Avoid the "X% of resumes are never seen by a human" figure — that one is
vendor marketing with no research behind it. If you want a number, the
defensible version is that Jobscan's annual audit of Fortune 500 career
portals finds ~97–98% run an ATS, attributed as a vendor census rather than
independent research. Safer still: skip the statistic, the mechanics are the
useful part.
-->

---
layout: two-col
kicker: 03 · APPLICATION SCREENING
title: Tailoring is a parsing problem, not a keyword game
leftTitle: WHAT HELPS
rightTitle: WHAT HURTS
---

::left::

- Mirror the language of the ad — if it says “stakeholder engagement”, use that phrase
- Single column, standard headings, a common font
- A plain-text skills section naming tools and methods
- Spelling out an acronym once alongside its expansion
- Submitting as PDF unless told otherwise

::right::

- Two-column and heavily designed templates
- Contact details inside a header or footer
- Text baked into a graphic or logo
- Invisible white-text keyword stuffing
- One generic resume sent to forty roles

<!--
3 min. The most immediately useful slide in the deck for most of the room.

Call out keyword stuffing directly: it is detectable, recruiters do find it,
and it reads as dishonest. It also increasingly fails outright against
newer semantic matching.

If time allows, the strongest single tip: read the ad, list its nouns, and
make sure the true ones appear in your resume in your own words.

This is also the University's own advice. Careers and Employability tells
students to keep a "master" resume and tailor it per application rather than
sending one document everywhere. They also provide SMART Resume, a tool that
scores a resume for ATS-readiness and gives students ten uploads a year.
Worth naming from the stage — it is free, most of the room does not know it
exists, and it makes this slide immediately actionable. Note it is built on
a commercial product (VMock), so treat its score as feedback, not truth.
-->

---
layout: default
kicker: 03 · APPLICATION SCREENING
title: What the research on Australian hiring found
---

<IconRows :rows="[
  { title: 'The first study of AI hiring in Australia', body: 'Dr Natalie Sheard, a lawyer and postdoctoral fellow at this University, interviewed 23 recruiters and specialists about the systems they actually use.' },
  { title: 'The risk is concentrated, not evenly spread', body: 'She found these systems can enable, reinforce and amplify discrimination — against women, candidates with disability, people from non-English-speaking backgrounds, and older applicants.' },
  { title: 'And no specific law regulates them here', body: 'Facial analysis has been scientifically discredited, but nothing prohibits it, so some systems may still use it.' },
]" />

<!--
2 min. The credibility anchor for the section, and it is close to home —
Sheard is at the University of Melbourne, so this is their own institution's
research on their own job market.

Source: Natalie Sheard, "Algorithm-facilitated discrimination", Journal of
Law and Society, doi 10.1111/jols.12535; reported by ABC News, 8 May 2025.
Both verified directly. Peer-reviewed, which matters given how much of the
material in this area is vendor content.

Be precise about the method: 23 qualitative interviews, mainly recruiters,
plus two careers coaches, an AI expert, and two staff from a large AI
developer. It is the first study of AI hiring system use by Australian
employers, not a survey with a representative sample. Say "interviewed 23
people" out loud — it is on the slide for exactly that reason.

Row 2 connects straight back to the assessment section: the same groups
flagged by AI detectors are flagged here. That is the throughline of the
talk — these systems fail unevenly, and the people they fail are already
disadvantaged.

If a number is wanted: about 62% of Australian organisations used AI
"extensively or moderately" in recruitment, per the Responsible AI Index
2024. Attribute it carefully — Fifth Quadrant is a commercial research firm
and the data is from 2024, so it is the weakest thing on this slide. It is
deliberately not on the slide face.

Corroboration if challenged: The Age ran a named investigation on 22 January
2026, "Computer says no", including a Victorian HR professional rejected two
hours after applying, and the Australian Services Union arguing for human
judgement in recruitment decisions.
-->

---
layout: two-col
kicker: 03 · AI INTERVIEWS
title: Asynchronous video interviews
leftTitle: WHAT IS ASSESSED
rightTitle: WHY IT IS CONTESTED
---

::left::

- Transcribed speech — content, structure and relevance
- Whether answers evidence the competency being probed
- Consistency of examples across questions
- In some tools, pace and delivery

::right::

- Facial analysis was withdrawn after sustained criticism
- Accents, disability and neurodivergence risk mis-scoring
- Candidates rarely learn how they were assessed
- Australian law does not give you a right to an explanation

<!--
3 min.

Two things students most want to know. First: it is mostly your transcript
being assessed, so what you say matters far more than how you look. Second:
yes, the criticism is real and the industry has retreated from its most
contested claims — HireVue removed facial and emotion analysis in January
2021, after a 2019 EPIC complaint to the FTC and sustained pressure. What
remains is scoring of transcribed answers against a rubric.

Australian grounding, useful because these are employers this room will
actually apply to: Sapia, an Australian platform, runs text-based chat
interviews — five typed questions, no time limit — and told The Age in
January 2026 it had conducted nine million interviews for clients including
Qantas, Woolworths and Bunnings. Treat the figure and the client list as the
vendor's own claim reported in a newspaper, not as independently confirmed.
Federally, the National Indigenous Australians Agency has used Criteria Corp
for video assessment. So this is not a US-only phenomenon, and it reaches
well beyond graduate programs into retail and hospitality hiring.

Regulatory context. **Australia now has something, but read the fine print.**
From **10 December 2026** — about three months after this talk — the Privacy
Act's new automated decision-making transparency obligation commences. Where
an organisation has arranged for a computer program to make, or to do
something substantially and directly related to making, a decision that could
reasonably be expected to significantly affect your rights or interests, and
personal information is used to do it, that must be disclosed in the
organisation's privacy policy. The OAIC's own issues paper names
"limits access to employment opportunities" as an example of a significant
effect, so hiring is squarely in scope. The next slide covers what this does
and does not give you.

For comparison, one line each: Illinois' AI Video Interview Act took
effect 1 January 2020 (notice, explanation and consent); New York City's
Local Law 144, passed in 2021 and enforced from 5 July 2023, requires annual
independent bias audits and advance notice. Australia still has nothing
equivalent to those — no bias audit requirement, and no right to an
explanation. Say that plainly rather than implying they are covered.
-->

---
layout: default
kicker: 03 · YOUR RIGHTS
title: What Australian law will and will not give you
---

<IconRows :rows="[
  { title: 'From 10 December 2026, disclosure — in a privacy policy', body: 'Organisations must state what kinds of decisions are made by computer programs, and what personal information those programs use. Hiring counts.' },
  { title: 'But no explanation, no notification, no human review', body: 'The regulator says so plainly: the obligation gives no right to contestability, no right to request information, and no obligation to notify you.' },
  { title: 'So read the privacy policy before you apply', body: 'From December it should tell you whether a machine is in the loop. That disclosure is the lever you actually have.' },
]" />

<!--
2 min. New for 2026 and genuinely useful, because almost nobody in the room
will know it is coming.

Source: OAIC, "Automated Decision-Making Transparency Obligation (APP 1)",
issues paper, May 2026. Verified verbatim. The obligation sits in APP 1.7-1.9,
inserted by the Privacy and Other Legislation Amendment Act 2024, and
commences 10 December 2026.

Row 2 is a direct paraphrase of the OAIC's own words: the obligation "gives
no right to contestability or to request information, and no obligation to
notify". Resist the temptation to oversell this as a new protection — it is a
transparency obligation about categories of decisions, not about your
decision. That honesty is the point of the slide.

Useful contrast if asked: Western Australia went further. From 1 July 2026,
WA regulated entities using ADM for significant decisions must notify people,
provide information about the ADM on request, and allow requests for human
intervention. That is closer to what students assume they already have — but
it binds WA entities, not employers generally.

Two caveats to hold in reserve rather than lead with. The OAIC's final
guidance was still in development at the time of writing, following a
consultation that closed 15 June 2026, so the detail may have moved — check
before presenting. And the Privacy Act's small business exemption is being
wound back in stages; some smaller employers may still sit outside the Act
entirely. Do not assert a specific status for that from the stage.

The practical takeaway is row 3, and it is a real behaviour change: privacy
policies are about to become the one place a candidate can find out whether
they are being screened by a machine.
-->

---
layout: default
kicker: 03 · AI INTERVIEWS
title: Practical preparation
---

<IconRows :rows="[
  { title: 'Structure every answer', body: 'STAR — situation, task, action, result. It is what the transcript is scored against.' },
  { title: 'Test the tech first', body: 'Camera, microphone, lighting, connection. Do a full practice run in the real tool.' },
  { title: 'Ask about adjustments', body: 'If a format disadvantages you, request an accommodation. That request is legitimate.' },
]" />

<!--
2 min.

STAR is not a gimmick here — a structured answer transcribes into something
that scores well and reads well to a human, so it is robust either way.

The third row matters and is routinely missed: students do not realise they
can ask, and many are entitled to adjustments.
-->

---
layout: default
kicker: 03 · USING AI TO APPLY
title: Use AI to prepare, not to perform
---

<IconRows :rows="[
  { title: 'One large Australian employer, in writing', body: 'The ATO publishes what it expects from candidates using AI: be honest, be transparent, be yourself, be fair.' },
  { title: 'Declare it when you are asked', body: 'In their words: when asked, you need to tell us how you have used AI tools. The same rule you met in your assessments.' },
  { title: 'Prepare with it, perform without it', body: 'Rehearsing with AI is fine. Using it during the interview or assessment itself is not.' },
]" />

<!--
2 min. Closes the section on something concrete and hopeful, and bridges into
section 4.

Source: Australian Taxation Office, "Guidelines for candidate use of AI in
recruitment processes", ato.gov.au. Verified verbatim. The slide title is the
ATO's own phrase — "use AI to prepare, not perform".

Why the ATO: it is a plausible graduate destination for this room, it is
Australian, and it has actually published its position, which most employers
have not. The APSC published parallel "Principles for candidate use of AI in
recruitment" in April 2026, so this is APS-wide rather than one agency being
idiosyncratic. I could not fetch the APSC PDF directly — mention the ATO,
which was verified, rather than leading with the APSC.

The best line to deliver here, and a genuine surprise to most audiences: the
ATO explicitly states it does NOT use AI to review or screen applications or
resumes, and that all shortlisting decisions are made by a human selection
panel. It uses AI for drafting job ads. That is a useful corrective to the
"a robot rejected me" assumption, and it shows the honest answer is
"it depends on the employer, so check".

The ATO also names the risks of over-using AI in an application, and they are
the ones students actually hit: skills gaps that surface later in practical
assessment, over-reliance that leaves you unable to think on your feet, and a
generic voice that reads as nobody in particular. Frame that as self-interest
rather than compliance.

Bridge to section 4: the reason "prepare, not perform" works as a rule is the
same reason the next section gives — if you cannot reconstruct it without the
tool, you do not actually have it.
-->

---
layout: section
kicker: SECTION 04
title: |
  Using AI without
  losing the ability to learn
subtitle: Outsourcing the typing is fine — outsourcing the thinking is the risk
---

<!-- 8 minutes for this section. -->

---
layout: quote
kicker: 04 · COGNITIVE OFFLOADING
quote: Use AI to extend your thinking, not to replace it — the goal is capability you still own after you close the tab.
---

<!--
30 sec. Open the section on this rather than closing on it; everything
following is an argument for the line.
-->

---
layout: two-col
kicker: 04 · COGNITIVE OFFLOADING
title: Two very different kinds of shortcut
leftTitle: OUTSOURCING THE TYPING
rightTitle: OUTSOURCING THE THINKING
---

::left::

- Reformatting notes you already wrote
- Tightening a draft you already argued
- Generating boilerplate you understand
- Translating your own text
- Explaining a concept you then verify

::right::

- Generating the first draft of your argument
- Accepting a summary of a text you never read
- Submitting reasoning you cannot reconstruct
- Letting the tool choose the framing
- Using output you could not defend if asked

<!--
3 min. The distinction the whole section rests on.

The test to give them: could you defend this in a conversation with no tool
open? If not, you have offloaded the wrong half.

Note that the left column is genuinely fine — this is not an abstinence
message, and framing it that way loses credibility with students who already
use these tools daily.

There is now randomised evidence for exactly this split. Contractor and Reyes
(IZA Discussion Paper 18792, July 2026) gave undergraduates AI access and
found "augmentation users" — who used it to understand concepts — kept their
gains a week later, while "automation users" — who used it to generate text —
lost them as soon as the AI was taken away. Same tool, opposite outcome,
decided by which column they were in. Caveat it honestly: it is a working
paper, not yet peer reviewed, and American.
-->

---
layout: stat
kicker: 04 · COGNITIVE OFFLOADING
title: Better essays. No better learning.
stat: "117"
caption: |
  university students, randomly assigned ChatGPT,
  a human expert, writing analytics, or no tool.
  The ChatGPT group improved their
  <strong>essay scores the most</strong> — with
  <strong>no significant gain in knowledge or transfer</strong>
source: "Fan et al., British Journal of Educational Technology 56(2), 2025. A randomised experiment with measured outcomes, not self-report. Co-authored at Monash; cited by TEQSA, June 2026."
---

<!--
1–2 min. This is the evidence slide for the distinction you just drew, and
it is the strongest study in the whole section — say the method out loud.

Randomised, four groups, and the outcomes were measured rather than
self-reported. That matters because almost everything else in this space is
a survey of how people feel about their own thinking.

The finding is the section in one sentence: the artefact got better, the
person did not. The essay improved most in the ChatGPT group, and knowledge
gain and transfer showed no significant difference. Transfer is the one to
stress — that is the test of whether anything was actually learned, because
it measures applying it to a new task.

The authors named the mechanism "metacognitive laziness". It is the next
slide, so land the number here and move on.

Honest framing if pushed: the lead institution is Peking University, with
co-authors at Monash's Centre for Learning Analytics — so describe it as
Monash co-authored, not as an Australian study. It is in the deck because
TEQSA leans on it, which is the Australian connection that matters.

This effect has an Australian-authored name: the "performance paradox".
Lixiang Yan and Dragan Gašević (Monash), with Jason Lodge (UQ) and Samuel
Greiff, set it out in Nature Reviews Psychology 4:435–436, 18 June 2025 —
peer-reviewed, and a good citation to have in your pocket. Their line is that
AI use of this kind does not promote the deep cognitive and metacognitive
processing that high-quality learning requires.

Lodge's own phrase for what it feels like from the inside is the one to say
out loud: AI gives students the **illusion of competence**. He
wrote that in The Conversation on 16 March 2026, alongside a report with
Leslie Loble at UTS.

Vivid example from that piece if you want one: a 2025 randomised experiment
with high school students in Turkey using an AI maths tutor. They solved
problems better with it — and their learning "fell off a cliff" the moment
the AI was removed for the assessment.

One figure to handle carefully: that article is headlined "almost 80% of
Australian uni students now use AI". It is attributable to Lodge, but the
underlying survey, its sample and its method could not be traced, so it is
deliberately not on any slide. Say "most students" instead unless you have
verified it yourself.
-->

---
layout: default
kicker: 04 · COGNITIVE OFFLOADING
title: A working sequence
---

<IconRows :rows="[
  { title: 'Think first, in your own words', body: 'Draft the argument badly by yourself. The struggle is where the learning happens.' },
  { title: 'Then bring the tool in', body: 'Ask it to critique, counter-argue, or find what you missed — not to start over.' },
  { title: 'Verify before you keep it', body: 'Check every claim, quote and citation against the actual source.' },
]" />

<!--
2 min.

Order matters. AI second, not first. If the first thing you see is the
machine's framing, that becomes your framing — and you will not notice it
happening.

The third row is where fabricated citations get caught. Worth stating that
confident-sounding references are frequently invented.

A fourth move worth offering, from Jason Lodge (UQ): use AI as a **cognitive
mirror** rather than an answer oracle. Instead of asking it for the answer,
ask it to interrogate yours — to ask you clarifying questions, or to make you
define the assumptions behind a vague argument. Explaining yourself to it is
what builds the learning, and it inverts the usual dynamic where the tool
does the thinking and you do the accepting.
-->

---
layout: default
kicker: 04 · COGNITIVE OFFLOADING
title: Effort is the signal, not the problem
---

<IconRows :rows="[
  { title: 'Ease is not evidence of learning', body: 'TEQSA, the higher education regulator, warns that fluent AI explanations leave students confident about material they have not actually learned.' },
  { title: 'It has a name: metacognitive laziness', body: 'When the work feels easy you skip the retrieval and the struggle that make learning stick — and capacities you stop exercising, you lose.' },
  { title: 'Generate before you are given the answer', body: 'TEQSA lists this among the “desirable difficulties”, with testing yourself instead of re-reading, and spacing study out over time.' },
]" />

<!--
2 min. This is the Australian authority for everything you have just argued,
and it is very recent — worth naming the date.

Source: TEQSA, "Assuring quality learning in a gen AI-integrated future: The
role of adaptive capabilities", 24 June 2026. Verified on teqsa.gov.au. It is
the third in TEQSA's assessment reform series, and it is aimed at protecting
learning rather than at policing integrity — which is why it belongs here and
not back in the assessment section.

The useful point for this audience: the regulator is not telling them to
avoid AI. It is telling universities to build evaluative judgement, critical
thinking and ethical reasoning — and it explicitly says those capabilities
benefit them in the workplace. That is the Job Ready argument, made by the
regulator rather than by me.

Row 3 is the payoff. The previous slide told them to draft first and bring
the tool in second; TEQSA independently lists "generating answers before
receiving explanations" as one of four desirable difficulties. The other
three are spacing, mixing problem types, and self-testing.

Best line to say aloud, quoting the document directly: effort can, and often
does, signal effective learning. Students assume ease means it is working —
TEQSA says that assumption is exactly backwards.

If you want the underlying research: "metacognitive laziness" is Fan et al.
2025, the study on the previous slide; the atrophy argument is Panadero and
Broadbent 2025; "desirable difficulties" is Bjork and Bjork 2020.
-->

---
layout: default
kicker: 04 · COGNITIVE OFFLOADING
title: The calculator is the wrong analogy — almost
---

<IconRows :rows="[
  { title: 'Calculators are reliable', body: 'They are right every time. AI is confidently wrong in ways you must be able to catch.' },
  { title: 'We still teach mental arithmetic', body: 'Because you need the intuition to notice when an answer is badly off.' },
  { title: 'So build the foundation anyway', body: 'You cannot supervise a tool in a domain where you have no judgement of your own.' },
]" />

<!--
2–3 min. Students raise the calculator comparison themselves, so meet it
directly rather than dismissing it.

The concession is real — calculators genuinely did replace a skill. The
disanalogy is reliability: an unreliable tool requires a supervisor, and
supervision requires expertise you only get by doing the work early on.

Emerging research points the same way, and you now have better citations than
this area usually offers. Lead with Fan et al. (2025) from two slides back —
randomised, measured outcomes, and endorsed by TEQSA. Lee et al. (CHI 2025),
a peer-reviewed Microsoft Research/CMU survey of 319 knowledge workers, adds
that higher confidence in AI correlated with lower self-reported
critical-thinking effort, and that the work shifts from generating toward
verifying — but flag that it is self-report, not measured performance.

You no longer need the MIT Media Lab EEG study (Kosmyna et al., 2025,
"cognitive debt") — it is n=54 and still a preprint. Drop it. If someone in
the room raises it, say plainly that it has not been peer reviewed.

The best support for row 3 is Lodge again, and it lands especially well with
an Arts cohort: critical thinking is not a generic skill, it is deeply
intertwined with knowledge. His example — it is very hard to judge whether a
claim about the Second World War is biased or has the dates wrong if you do
not already know much about the participants and their perspectives. That is
the whole argument for building the foundation, in one sentence, and it is
about history rather than maths.
-->

---
layout: section
kicker: SECTION 05
title: |
  The ethical use
  of personal AI
subtitle: What you feed in, what you trust, and whose work it is
---

<!-- 6 minutes for this section. -->

---
layout: default
kicker: 05 · ETHICS & PRIVACY
title: What actually governs this in Australia
---

<IconRows :rows="[
  { title: 'There is no Australian AI Act', body: 'In December 2025 the government chose to rely on existing, largely technology-neutral law rather than write a new one. Privacy, copyright, consumer and discrimination law all still apply.' },
  { title: 'The national guidance is voluntary — and it has moved', body: 'Guidance for AI Adoption, October 2025, sets out 6 essential practices for organisations. It replaced the 8 AI Ethics Principles and the 10 guardrails.' },
  { title: 'The rules that actually bind you are closer to home', body: 'Your University policy now, your employer policy next year. Those are the ones with consequences attached.' },
]" />

<!--
2 min. This is the answer to "what are the rules in Australia", and the
framing matters more than the detail: most people assume there is an AI law.
There is not.

Source, verified first-hand from the PDF: National AI Plan, Department of
Industry, Science and Resources, 2 December 2025. Its words are that Australia
has "strong existing, largely technology-neutral legal frameworks... that can
apply to AI", and that the approach "uses regulators' existing expertise" and
is "practical and risk-based". Mandatory guardrails for high-risk AI were
proposed in 2024 and did not proceed in that form. An AI Safety Institute is
being established to advise regulators rather than to regulate directly.

Row 2 is worth being precise about, because a lot of teaching material is now
out of date. The 8 AI Ethics Principles date from 2019 and the Voluntary AI
Safety Standard from September 2024; both pages now carry a notice that the
October 2025 Guidance for AI Adoption evolves them into 6 essential practices.
If someone quotes the 8 principles at you, they are quoting the old framework.

The six, if asked: decide who is accountable; understand impacts and plan
accordingly; measure and manage risks; share essential information; test and
monitor; maintain human control.

Important caveat, and do not get this wrong from the stage: all of that is
voluntary guidance aimed at organisations, not obligations on individuals.
Privacy law works the same way — the Australian Privacy Principles bind
entities, not a student using a chatbot at home. That is exactly why row 3
matters. The binding constraints on this audience are institutional policy
and, once they are employed, their employer's policy.
-->

---
layout: default
kicker: 05 · ETHICS & PRIVACY
title: What you type in does not stay yours
---

<IconRows :rows="[
  { title: 'Consumer tools may train on your input', body: 'Free tiers often use conversations for training by default. Check, and turn it off.' },
  { title: 'Other people did not consent', body: 'Interview transcripts, group work and client details are not yours to paste in.' },
  { title: 'Unpublished work is a real risk', body: 'Your thesis, a manuscript, an unlodged submission — think before it leaves your machine.' },
]" />

<!--
2 min.

Make it concrete: an Arts student pasting in interview transcripts from
fieldwork is a genuine ethics breach, and possibly a breach of the ethics
approval the research was granted under. That example lands harder than any
abstraction about data policy.

Distinguish consumer accounts from institutional ones with contractual
protections — the University's provisioned tooling is not the same as a free
personal account.
-->

---
layout: default
kicker: 05 · ETHICS & PRIVACY
title: What this University tells you not to upload
---

<IconRows :rows="[
  { title: 'Personal information — yours or anyone else’s', body: 'Melbourne’s own advice is blunt: uploading it carries similar risks to sharing it publicly on the open web. Not your full name, date of birth or address.' },
  { title: 'Lecture slides and subject material', body: 'Uploading someone else’s intellectual labour may breach their copyright. The University says do not make copyright material available to an AI tool without permission.' },
  { title: 'Anything you could not defend uploading', body: 'Interview transcripts, a classmate’s draft, unpublished work. If consent was never given for this, you do not have it.' },
]" />

<!--
2 min. Same move as the detection slide back in section 3 — this is their own
institution telling them, so quote it rather than paraphrasing.

Source, verified verbatim: University of Melbourne Academic Skills, "GenAI at
Melbourne", students.unimelb.edu.au. The open-web comparison in row 1 is the
University's own analogy, and it is the most useful sentence on the page —
students understand "public website" in a way they do not understand
"third-party data processing".

Row 2 is the one that changes behaviour, because almost everyone in the room
has uploaded lecture slides to summarise them. Point them at the University
Copyright Office resource on AI and copyright if they want the detail.

Note the University provides Microsoft Copilot to students under its
enterprise agreement. That is not the same thing as a personal ChatGPT
account — different contractual protections over what happens to the input.
Verify the current tooling before presenting; institutional offerings change.

The line from that page most worth saying out loud to a Job Ready audience:
"No one will hire you to do what GenAI does for free." The University also
asks three questions worth repeating — what skills am I losing by outsourcing
my thinking, what value am I adding, and what do I do that is different from
GenAI. That is section 4's argument, in the University's own voice.
-->

---
layout: two-col
kicker: 05 · ETHICS & PRIVACY
title: Output reflects training data, not truth
leftTitle: WHAT THIS PRODUCES
rightTitle: WHAT TO DO ABOUT IT
---

::left::

- Fluent text that is confidently wrong
- Fabricated quotes, sources and citations
- Over-representation of dominant perspectives
- Thin or distorted coverage of local and minority contexts
- Stale information presented without hedging

::right::

- Verify every factual claim at the source
- Treat any citation as unverified until you open it
- Ask whose perspective is missing from the answer
- Prefer it for structure and phrasing over facts
- Be especially sceptical on Australian specifics

<!--
2 min.

The last item on each side is worth emphasising for this cohort: these models
are trained overwhelmingly on US and UK material. Australian law, policy,
institutions and history are exactly where confident errors appear.

Good challenge if the room is engaged: ask them to name something in their
discipline the tool would probably get wrong about Australia.

The University puts this more plainly than I can: these tools "may represent
biased opinions as facts or entirely fabricate information", and you should
approach them "with the same scepticism and caution as you would any content
from the internet". That is the standard to hold them to — not a special new
kind of trust.

One genuinely surprising Australian point if you want it. The OAIC has said
that inferred, incorrect or artificially generated information about an
identified or reasonably identifiable person — hallucinations and deepfakes
included — is that person's personal information, and has to be handled under
the Privacy Principles. So a fabricated claim about a real person is not just
wrong, it is regulated. Source: OAIC, Guidance on privacy and the use of
commercially available AI products, 21 October 2024, updated 17 January 2025.
Attribute it accurately — that guidance binds organisations, not individuals.
-->

---
layout: default
kicker: 05 · ETHICS & PRIVACY
title: Attribution, consent and ownership
---

<IconRows :rows="[
  { title: 'Disclose where it is required', body: 'Assessment, job applications and published work all have their own expectations.' },
  { title: 'Do not run AI over others’ work', body: 'Summarising a peer’s unpublished draft or a colleague’s data needs their agreement.' },
  { title: 'Ownership is genuinely unsettled', body: 'Copyright in AI-generated material is contested — do not assume you own the output.' },
]" />

<!--
2 min.

Be careful not to state copyright law as settled — it is actively disputed
and differs by jurisdiction. The defensible version: purely machine-generated
material may not attract copyright in the way original authorship does, so
treat commercial reliance on it as a risk to check, not a given.

Employment angle worth thirty seconds: work produced during employment
usually belongs to the employer, and feeding it into a personal AI account
may breach their policy.

Australian specifics for row 3, all from the National AI Plan of 2 December
2025. Copyright and AI is live but unsettled: the Attorney-General's
Department is consulting through the Copyright and AI Reference Group on
whether Australia's copyright laws need updating for AI. One thing is
settled, though, and it is worth stating because it cuts against what people
assume — the government has explicitly **ruled out a text and data mining
exception** in Australian copyright law, which it framed as giving certainty
to Australian creators and media workers.

On owning the output: the defensible line remains that copyright generally
requires human authorship, so purely machine-generated material may not
attract it. Say "may not" rather than "does not" — there is no Australian
decision squarely on generative AI output, and this is exactly the kind of
question a model will answer confidently and wrongly.
-->

---
layout: section
kicker: SECTION 06
title: |
  Using AI
  and staying safe
subtitle: The same capability is available to the people targeting you
---

<!-- 7 minutes for this section. -->

---
layout: default
kicker: 06 · THREATS
title: What AI changed for attackers
---

<IconRows :rows="[
  { title: 'Phishing got fluent', body: 'Bad grammar was never a reliable signal, and now it is gone entirely.' },
  { title: 'Voice cloning is trivial', body: 'A few seconds of audio from a public video is enough to imitate someone you know.' },
  { title: 'Video is no longer proof', body: 'Real-time deepfakes have already defeated live video verification in fraud cases.' },
]" />

<!--
2 min.

The mental model to dismantle: "I can spot a scam". The cues people were
taught to rely on — spelling, awkward phrasing, generic greetings — were weak
signals that AI has now removed.

Graduate-specific hook: fake job offers and recruitment scams target exactly
this cohort, and now arrive well-written and personalised from a scraped
LinkedIn profile.
-->

---
layout: stat
kicker: 06 · THREATS
title: Video calls are not identity verification
stat: "US$25M"
caption: |
  transferred after a video call in which
  every other participant was a deepfake
source: "Incident January 2024, disclosed by Hong Kong Police in February; Arup publicly confirmed it was the company targeted in May 2024."
---

<!--
1 min.

A finance employee at Arup's Hong Kong office joined what appeared to be a
video conference with the UK-based CFO and several colleagues. Every other
participant was synthetic. Roughly HK$200 million went out across fifteen
transfers to five accounts, and it surfaced about a week later.

Dates, if pressed: the fraud was January 2024, Hong Kong Police described the
case publicly in February without naming the firm, and Arup confirmed it was
the victim to CNN on 16 May 2024. Don't call it a "February 2024 incident" —
that is when it was disclosed, not when it happened.

The lesson is not "distrust video" — it is that verification has to move to a
channel the attacker does not control. Call the person back on a number you
already had.
-->

---
layout: two-col
kicker: 06 · THREATS
title: Risks specific to using AI itself
leftTitle: OVERSHARING
rightTitle: PROMPT INJECTION
---

::left::

- Pasting credentials, keys or personal data into a chatbot
- Uploading documents you have not read for sensitive content
- Using personal AI accounts for employer material
- Assuming a conversation is private because it feels private

::right::

- Hidden instructions in a web page or document the AI reads
- Attacker text treated as if it came from you
- Most dangerous when the tool can act — browse, email, execute
- You will not see the injected instruction

<!--
3 min.

Prompt injection is the concept most of the room will not have met, and it
matters more each year as assistants gain the ability to take actions.

Simplest explanation that works: the model cannot reliably tell your
instructions apart from instructions hidden in the content it is reading. If
you ask it to summarise a web page, and that page contains text saying
"ignore your previous instructions", it may comply.

Practical takeaway: be cautious about pointing an agent that can act on your
behalf at content you do not control.
-->

---
layout: default
kicker: 06 · THREATS
title: Basic hygiene that still works
---

<IconRows :rows="[
  { title: 'Verify out of band', body: 'Unexpected request for money or credentials? Confirm on a channel you initiated.' },
  { title: 'Never outsource a security judgement', body: 'Do not ask a chatbot whether an email is safe. It does not know, and it will answer anyway.' },
  { title: 'Passkeys and a password manager', body: 'Phishing-resistant sign-in beats being clever about spotting fakes.' },
]" />

<!--
2 min.

The middle row is the one to hammer — students genuinely do paste suspicious
emails into chatbots and ask "is this a scam?". The answer is confident,
unreliable, and easily manipulated by the email itself, which is prompt
injection in its most everyday form.

Close on the third: the durable defence is structural, not perceptual.
-->

---
layout: section
kicker: WRAP-UP
title: |
  What to take
  out of the room
subtitle: Five things worth remembering after everything else fades
---

<!-- 5 minutes for wrap-up and Q&A. -->

---
layout: default
kicker: WRAP-UP
title: Five things worth remembering
---

<IconRows :rows="[
  { title: 'Be able to defend it', body: 'If you cannot reconstruct the reasoning without the tool open, it is not yet yours.' },
  { title: 'Show your process', body: 'Version history and saved prompts protect you better than any claim of innocence.' },
  { title: 'Write to be parsed', body: 'Plain structure and the language of the ad get you in front of a human.' },
  { title: 'Assume the input is not private', body: 'Other people’s data is not yours to paste into a consumer tool.' },
  { title: 'Verify on another channel', body: 'Fluent text, a familiar voice and a live video are no longer proof of anything.' },
]" />

<!--
2 min.

Deliver these as five sentences, not five paragraphs. If you are running
short, the first and the last are the two that matter most.

Then hand over to questions with a genuine invitation — this cohort asks good
questions about assessment policy and about whether disclosing AI use will
count against them in applications. Both deserve honest answers: policy
varies by subject, and disclosure norms in hiring are still forming.
-->

---
layout: end
title: THANK YOU
subtitle: Questions · Discussion · Job Ready Program
---

<ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />
<ContactLink icon="mastodon" text="jamesbannan@aus.social" />
<ContactLink icon="unimelb"  text="unimelb.edu.au/alumni/engage/ask-alumni" />

<!--
Leave this up for Q&A.

If the room is quiet, seed it: "the question I get most often is whether
declaring AI use on an application hurts you." That reliably starts it.
-->
