---
tagline: "Spanish villages whose electoral roll rises just before local elections and drops afterwards, and the weight of the overseas vote in parliamentary seats, from public data."
metrica:
  valor: "9×"
  que: more likely for a village flagged in 2023 to be on the Electoral Census Office's official list than any village (25% vs 2.8%)
fase: Running · Nov 2026
---

## Summary

In a village of a hundred people, a few dozen extra registrations are enough to decide who
becomes mayor. Spain's Electoral Census Office warns about suspicious registrations before
each local election, but it does not publish a consolidated list or look at what happens
afterwards. censoHinchado uses public data from the INE and the Interior Ministry to flag the
villages whose roll rises for local elections and falls afterwards, and whether that excess
was larger than the winning margin. It also works out which seats in Congress depend on the
overseas vote, which is counted days after election night.

These are statistical anomalies, not proof of fraud.

## Stack

- **Python and pandas**: downloading and joining the electoral roll, the population
  register and the results for each municipality.
- **JavaScript and SVG**: the website, a map of Spain for each local election with a card per
  village, without any mapping library.
- **GitHub Pages**: the site is built and published on every push to `main`.

## Architecture

1. **Download.** Electoral roll and population register from the INE, results from
   Infoelectoral and the Electoral Census Office's lists.
2. **Flag.** A village is flagged when its population register jumps in the election year and
   drops back within one or two years, and its electoral roll also rises and falls.
3. **Join.** The excess still on the roll on election day is compared with the margin between
   the first and second lists.
4. **Overseas vote.** From the provisional results on election night, which last seat in each
   province could change once the overseas vote is counted.

## Observations

- Without being shown them, the method finds the villages flagged by the Census Office or the
  courts: Gatón de Campos and Manchones (convictions over 2015), Huérmeces, Carcedo and Los
  Ausines.
- The 2023 villages were already visible from data published before the vote: the early
  warning works without waiting for the results.
- The pandemic inflated the 2023 roll in hundreds of villages; the jump in the population
  register tells it apart.
