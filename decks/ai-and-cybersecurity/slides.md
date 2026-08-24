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

<!--
2 min. Being straight about the limits buys credibility for the advice that
follows — students already know the tools are imperfect, and pretending
otherwise loses the room.

The bias finding on the right is the one to put weight on; the next slide
gives the actual study.
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
title: Show your process, not your innocence
---

<IconRows :rows="[
  { title: 'Work somewhere with history', body: 'Drafting in a tool that keeps version history gives you a record you never have to construct.' },
  { title: 'Keep your prompts and notes', body: 'If you used AI, save what you asked and what you did with the answer.' },
  { title: 'Declare use where required', body: 'Read the policy for each subject — they differ, and the default is not “anything goes”.' },
]" />

<!--
2 min.

The practical core of the section. The advice is not defensive paranoia — it
is that a visible process is simply better scholarship, and it happens to be
the thing that resolves an integrity query in your favour.

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
- Regulation is uneven and mostly outside Australia

<!--
3 min.

Two things students most want to know. First: it is mostly your transcript
being assessed, so what you say matters far more than how you look. Second:
yes, the criticism is real and the industry has retreated from its most
contested claims — HireVue removed facial and emotion analysis in January
2021, after a 2019 EPIC complaint to the FTC and sustained pressure. What
remains is scoring of transcribed answers against a rubric.

Regulatory context, one line each: Illinois' AI Video Interview Act took
effect 1 January 2020 (notice, explanation and consent); New York City's
Local Law 144, passed in 2021 and enforced from 5 July 2023, requires annual
independent bias audits and advance notice. Australia has no equivalent — the
Privacy Act and anti-discrimination law apply, but there is no right to know
how an AI tool scored you. Say that plainly rather than implying they are
covered.
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

Emerging research points the same way, but be careful how you cite it. Lee et
al. (CHI 2025), a peer-reviewed Microsoft Research/CMU survey of 319
knowledge workers, found higher confidence in AI correlated with lower
self-reported critical-thinking effort, and that the work shifts from
generating toward verifying. It is self-report, not measured performance.
The MIT Media Lab EEG study (Kosmyna et al., 2025, "cognitive debt") is
suggestive but n=54 and still a preprint — mention it as a signal, and say
it has not been peer reviewed if you raise it at all.
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
