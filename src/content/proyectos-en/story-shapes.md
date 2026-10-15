---
tagline: "The shape of a novel, Vonnegut-style, read passage by passage by a model that answers with probabilities instead of writing."
rol: Method, evaluation and visualisation
detalle: What each passage is asked, the criteria fixed before looking and the result on 29 classics, including the one that fails.
---

## What it is

Kurt Vonnegut said stories have shapes: plot how things go for the protagonist
from the first page to the last, and a few curves keep coming back. Until now
those curves were drawn by scoring the tone of the words, but tone is not
fortune: a gloomy paragraph in which the hero wins still reads as a fall.

story-shapes asks the question directly. Every passage of about 200 words goes
to Kev-4B, an open model that returns calibrated probabilities instead of text,
with three questions: how things are going for the protagonist (five levels),
how tense it is (four) and whether the protagonist appears. The model sees the
protagonist’s name and the passage, never the title, so it judges the passage
instead of recalling how the book ends.

## Measure before building

Before the website, four criteria were fixed and measured:

| Test | Kev-4B | Word list (VADER) | Criterion |
|---|---|---|---|
| Passages where tone and fortune disagree | 90 % | 18 % | ≥ 75 %, met |
| Controls, where they agree | 100 % | 80 % | both ≥ 85 %, missed by VADER |
| Synthetic stories with a planned arc | ρ 0.94, 12 of 12 | ρ 0.70, 7 of 12 | ρ ≥ 0.8, met |
| *Romeo and Juliet* with every name changed | r 0.89 per passage, 0.99 smoothed | – | r ≥ 0.9, narrowly missed |

The first wording of the question failed: it described the levels with
feelings and the model followed the mood of the words (68 %). Describing them as
outcomes (“they lose what matters most”) fixed it. The wording was chosen on a
separate development set and the 90 test traps were read once.

## 29 classics, and the result that fails

Before reading them, the expected shape of each book was written down, along
with how a hit is scored: the curve’s uncertainty band must rule out every
other shape. Under that rule, **2 hits out of 27 (p = 0.065)**: the test fails
and is published as such. With a few hundred passages per book, the band almost
never rules out the other shapes.

Without that rule, and labelled as what it is, an analysis done afterwards: the
nearest shape is the expected one in 14 of 27 books, against p < 0.001 for
shuffled labels. Kev mostly points to the right shape, but one book does not
give enough passages to say so with confidence.

## Measured decisions

| Decision | Why |
|---|---|
| The band includes the model’s doubt | Without it the band is half as wide, but the renamed *Romeo and Juliet* escapes it on 15 % of the story |
| The curve ends where the protagonist dies | *The Metamorphosis* rose after Gregor’s death with his family’s relief. Known limitation: a faked death fools it |
| The repository stores no book text | The website is built by fetching Gutenberg and publishes only the first words of each passage |
| The reading repeats on two machines | 15 books were read on a Mac and 14 on a Kaggle T4; *Daisy Miller* comes out the same on both (r 0.9999) |

## Status

29 classics read, 9,912 passages. The website shows each book passage by
passage, with chapters, tension and what Kev answered at every point. An
83-second video generated from the same readings is waiting to be published.
