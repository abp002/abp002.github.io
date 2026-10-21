---
tagline: "Philosophy questions answered only from the Stanford Encyclopedia of Philosophy: every sentence with a checked citation and, if the SEP doesn’t cover it, “I don’t know.”"
fase: Finished (v1) · Oct 2026
metrica:
  valor: "59% → 96%"
  que: sentences backed by the SEP, with qwen3:14b running locally
video: RxYeBnZ7P-0
pieVideo: One question from start to finish, every sentence tied to the passage it cites.
portada:
  imagen: /proyectos/cite-or-silence/poster-en.webp
  clip: /proyectos/cite-or-silence/clip-en.mp4
detalle: What is measured, how much checking changes, how the judge was checked and where it fails.
---

## What it is

Philosophy questions answered only from the Stanford Encyclopedia of
Philosophy. Every sentence links to the exact section it comes from, every
citation is checked by machine, and if the SEP doesn’t cover the question, the
answer is “I don’t know.” Questions can be asked in Spanish, though the SEP is
in English.

Retrieval brings back ten passages, the model drafts citing one per sentence,
and a second pass checks that the quote is in that passage and backs the
sentence. Whatever fails is struck out; if nothing is left, it stays silent.

## What checking changes

101 questions written before retrieval existed: 81 the SEP can answer, 15 it
doesn’t cover and 5 built on a false premise. Each model answers from memory,
with retrieval, and after checking.

| | From memory | With retrieval | Checked |
|---|---:|---:|---:|
| Sentences backed by the SEP (codex) | 66 % | 99 % | 100 % |
| Sentences backed by the SEP (qwen3:14b, local) | 59 % | 93 % | 96 % |
| Questions outside the SEP left unanswered (codex) | 80 % | 100 % | 100 % |

The judge is lenient, so those rates are upper bounds. What counts is the gap
between the first column and the last, not the exact percentages.

## Checking the checker

Before trusting the numbers, 100 of the judge’s grades were reviewed blind. A
second model agreed on 65 of 70 “backed” and 17 of 29 “unbacked”; where they
disagree, the judge is the lenient one. It accepts sentences that lose who holds
a view or widen its scope.

A person with no philosophy training accepted 19 of 20, including five both
models rejected: when the citation is right, the sentence above it looks backed
even when it isn’t. Showing the citation is not enough; that is why it is
checked.

## Where it fails

- **False premises.** “The premise is false” has no passage to cite, so checking
  strikes it. From memory all five are corrected; checked, none.
- **Spanish against English.** The right section is in the top five for 51 % of
  questions. Most answers are still backed, but by a neighbouring section.
- **Silence has a cost.** Checking strikes about one in eight good sentences.

## Measured decisions

| Decision | Why |
|---|---|
| Multilingual embeddings only, no BM25 | With Spanish questions, BM25 put the right section in the top five 1 % of the time, and mixed in it lowered the hit rate from 51 % to 37 % |
| A stricter checking prompt, dropped | It caught no more bad sentences and struck 12 good ones |
| Questions before retrieval | Written afterwards, they would have bent to what the system finds |
| The public demo shows no SEP text | The SEP allows indexing its entries but not republishing them: the demo shows the section and the link |

## Status

v1 is closed: retrieval, checking, the bench, the judge review, a local page with
the citations in view and a public demo with twelve questions per language.
What is still open is under “Where it fails”.
