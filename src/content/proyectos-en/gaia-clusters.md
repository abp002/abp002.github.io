---
tagline: "Star clusters recovered from 2.5 million Gaia stars with HDBSCAN, and scored against the catalogue that already lists them."
metrica:
  valor: "74%"
  que: of the 202 known clusters in Carina, recovered with the rule fixed before looking
fase: Finished · Oct 2026
---

## Summary

Stars are born in groups, from the same cloud, and keep travelling together:
they share position, distance and motion. From Earth they are lost among
millions of background stars, but in those five dimensions they form clumps.
gaia-clusters looks for them with HDBSCAN in the Gaia DR3 catalogue and shows
them in a 3D viewer in the browser.

It is not a discovery: Hunt & Reffert (2023) already catalogued about 7,000
clusters with the same method. Their catalogue is used as the answer key, and
what is measured is how many come back.

## Stack

- **Python**: download, quality cuts, clustering and scoring.
- **HDBSCAN**: the `hdbscan` library, which clusters 2.5 million stars in about
  5 minutes on a laptop.
- **ADQL over TAP**: regions are queried from GAVO's public service
  (Heidelberg), without downloading the whole catalogue.
- **three.js**: the viewer, a static page that loads the field in levels.
- **Blender**: the images, rendered from the same data as the viewer.

## Architecture

1. **Download.** A region of the sky with its quality cuts and Bailer-Jones
   distances, not one over the parallax, which is biased when the error is
   large.
2. **Cluster.** Position, parallax and proper motion, scaled, go into HDBSCAN
   with *leaf* selection: the default one swallows the clusters into the field.
3. **Score.** A cluster counts as recovered if more than half of its stars are
   found and more than half of the group is its own.
4. **Show.** The viewer puts each cluster in place, recovered or not, with its
   colour-magnitude diagram and its motion.

## Notes

- Every test was written down before looking at the data. In Auriga the right
  rule came after the fact (81%); in Carina it was fixed in advance and gave
  74%, against a bar of 73%.
- Size matters more than distance: clusters with a hundred stars or more all
  come back; those under thirty, half of them.
- Two tests failed and are published as such: isochrone ages agree with the
  catalogue's for only 56% of the clusters, and the Hyades' tidal tails do not
  come out with a velocity cut.
