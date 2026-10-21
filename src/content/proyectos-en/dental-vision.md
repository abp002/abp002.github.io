---
tagline: "Automatic dental chart from panoramic X-rays: one model numbers every tooth in FDI notation and another places caries, periapical lesions and impacted teeth on their tooth."
detalle: What each model does, how it performs on X-rays it never saw, where it fails and what's left.
metrica:
  valor: "1.6"
  que: teeth to correct on average per X-ray, across 91 the model never saw
---

## What it is

Filling in a new patient's dental chart takes five to ten minutes of manual
work, tooth by tooth, at every first visit. Dental Vision generates that draft
from the panoramic X-ray so the clinician only has to review it. It's two
models:

1. **Numbering.** Detects every tooth and gives it its FDI number.
2. **Findings.** Caries, deep caries, periapical lesion and impacted tooth, each
   one assigned to its tooth on the chart.

The second one is already diagnostic support, and in the EU that makes it a
medical device (MDR 2017/745), with CE marking. It's a research project: **not
fit for clinical use**.

## Auditing the data before training

The data is DENTEX 2023: 634 panoramic X-rays with 18,095 numbered teeth and 705
with findings. Before training anything, they were checked using a domain rule
as a test: **a mouth can't have two teeth with the same number**. Sixteen
X-rays, 2.5%, break it; in at least one there are two overlapping series of
annotations shifted by one position.

Comparing file MD5s also turned up X-rays repeated under another name, one of
them in both the test and the training split. The splits now exclude the copies.
Here the leak barely moved the figures (from 1.69 to 1.64 errors per X-ray),
but it's easy for one to slip through.

## Numbering

Evaluated on 91 X-rays the model never saw in training and that weren't used to
choose anything. In brackets, 95% interval from bootstrapping X-rays.

| Accuracy | Errors per X-ray | Perfect charts |
|---|---|---|
| 95.5% (93.9–97.1) | 1.64 (1.11–2.18) | 53.8% (44.0–64.8) |

The figure that matters is the middle one: the clinician always reviews the
draft, so the time saved depends on how many teeth they have to correct. On
average it's 1.6, but unevenly spread: 61 X-rays have at most one error and 19
have three or more. It's almost always the numbering shifted by one position in
premolars and molars, which look like their neighbours, especially in mouths
with many missing teeth.

## Findings

Evaluated on the two official DENTEX challenge sets, which the model never saw.

| | Official validation (50) | Official test (250) |
|---|---|---|
| Diagnosis AP | 0.33 | 0.35 |
| AP50 | 0.51 | 0.54 |

The organisers got 0.37 with HierarchicalDet, a diffusion-based detector, on
the hidden test set. The comparison is indicative: it's not the same set or the
same classes. By class, 90% of impacted teeth are found; caries are the weak
spot, with half found and almost two false alarms per X-ray. It's useful for
pointing out where to look, not for trusting what it doesn't flag.

## Measured decisions

| Decision | Why |
|---|---|
| Anatomical post-processing after the detector | Each number only once (Hungarian algorithm) and arch order as a sequence alignment. Brings errors from 1.81 to 1.64 per X-ray and guarantees the chart is never impossible |
| The test set is looked at once | Thresholds and configurations are chosen on validation; the script refuses to evaluate the test set until they're fixed |
| Intervals per X-ray, not per tooth | Teeth in the same mouth aren't independent: treating them as such gives falsely narrow intervals |
| 128 ROI regions instead of 512 | A mouth has at most 32 teeth in a fixed band. With 512 each step takes 24% longer and the difference in errors is within the noise |
| torchvision (BSD), not YOLO (AGPL) | The licence is decided at the start, not when there's a client |
| Horizontal flip remaps quadrants | When flipped, tooth 16 takes the place of 26. Without remapping, half the examples teach the opposite of the other half and nothing throws an error |

## Status

Done: audit, splits without duplicates, both models trained (20 minutes on an
RTX 4060 Ti), anatomical post-processing, visual chart, and evaluation on the
test split and the official sets. The weights are published on Hugging Face.
Next: train only the tooth position and derive the quadrant from geometry,
which targets the dominant error; more resolution for caries; and validation on
X-rays from another centre.
