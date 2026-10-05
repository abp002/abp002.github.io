---
tagline: "Automatic dental chart from panoramic X-rays: detect every tooth, number it in FDI notation and record its visible state."
rol: data, model and evaluation
metrica:
  valor: "2.5%"
  que: of the dataset's X-rays, with impossible annotations detected
---

## What it is

Filling in a new patient's dental chart takes five to ten minutes of manual
work, tooth by tooth, at every first visit. Dental Vision generates that draft
from the panoramic X-ray so the clinician only has to review it.

**It records, it doesn't diagnose.** It says which teeth are present and which
have a crown, implant or root canal; it doesn't say whether there's decay or
suggest treatment. The line isn't cosmetic: in the EU, software that informs
diagnostic decisions is a medical device (MDR 2017/745) and requires CE
marking. The project stays outside that on purpose.

## Auditing the data before training

The data is DENTEX 2023 (CC BY 4.0): 634 panoramic X-rays with 18,095 annotated
teeth. Before training anything, they were checked using a domain rule as a
test: **a mouth can't have two teeth with the same number**. Sixteen X-rays,
2.5%, break it; in at least one there are two overlapping series of annotations
shifted by one position.

The other check came out well: wisdom teeth appear 40% less often, and the
lower first molar less often than the upper one, which is what epidemiology
says. Data that reproduces a clinical fact without anyone asking it to is a
sign that the quadrant mapping is correct.

## Measured decisions

| Decision | Why |
|---|---|
| Train on CPU, not on the M4's GPU | Mask R-CNN takes 107 s per step on Metal and 4 s on CPU: `roi_align` and `nms` have no MPS kernel and fall back to CPU with constant copies |
| 128 ROI regions instead of 512 | A mouth has at most 32 teeth in a fixed band; COCO's defaults are overkill. 32% faster |
| torchvision (BSD), not YOLO (AGPL) | The licence is decided at the start, not when there's a client. Same criterion for the dataset |
| Horizontal flip remaps quadrants | When flipped, tooth 16 takes the place of 26. Without remapping, half the examples teach the opposite of the other half and nothing throws an error |

## How it will be measured

Not with mAP, which means nothing to a clinician, but with three domain
measures: coverage (how many teeth are found), numbering (how many get the
correct FDI number) and **perfect charts**. The third is the one that decides
whether the tool gets used: 97% correct numbering means 0.84 errors per X-ray,
and then everything has to be reviewed anyway.

## Status

Done: reproducible download, audit, annotation viewer, splits with a fixed seed
(432 / 93 / 93) and a verified training loop. **The detector still has to be
trained**, along with post-processing using anatomical constraints and the
evaluation, so there are no model figures yet. Not fit for clinical use.
