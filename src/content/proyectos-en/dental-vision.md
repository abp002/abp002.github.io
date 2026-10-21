---
tagline: "Automatic dental chart from panoramic X-rays: one model numbers every tooth in FDI notation and another places caries, periapical lesions and impacted teeth on their tooth."
metrica:
  valor: "1.6"
  que: teeth to correct on average per X-ray, across 91 the model never saw
---

## Summary

Filling in a new patient's dental chart takes five to ten minutes, tooth by
tooth. Dental Vision drafts it from the panoramic X-ray so the clinician only
has to review it: one model numbers every tooth in FDI notation and another
places caries, periapical lesions and impacted teeth. It's research: **not fit
for clinical use**.

## Stack

- **Python**: data, training and evaluation.
- **PyTorch and torchvision**: the models; torchvision for its BSD licence, rather than YOLO's AGPL.
- **Mask R-CNN**: the base detector.

## Architecture

1. **Audited data.** DENTEX 2023 (634 panoramic X-rays), checked with a domain
   rule (a mouth can't have two teeth with the same number) and with no
   duplicate X-rays across training and test.
2. **Detection.** One model finds and numbers every tooth; the other, the findings.
3. **Anatomical post-processing.** Each number appears only once (Hungarian
   algorithm) and the order of the arch is treated as a sequence alignment, so
   the chart is never impossible.
4. **Dental chart.** The visual draft the clinician reviews.

## Notes

- On 91 X-rays it never saw, it numbers 95.5% of teeth correctly: 1.6 to fix
  per X-ray. The typical error is numbering shifted by one place in premolars
  and molars.
- Caries are the weak spot: it finds half of them. It's useful for pointing
  where to look, not for trusting what it doesn't flag.
