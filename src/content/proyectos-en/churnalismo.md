---
tagline: "Which Spanish news outlets publish the same text and where it comes from: a news agency, a press release or an unidentified source."
metrica:
  valor: "0 of 60"
  que: reviewed cases in which one outlet copied another; both had received the same text
fase: Running · Nov 2026
---

## Summary

Much of what you read in a newspaper was not written by that newspaper: it is a news agency
wire or a press release published as it came. Every day, churnalismo reads the news from 41
Spanish outlets and the press releases of 37 organisations, and measures how much of the text
appears unchanged in another outlet and where it comes from.

In the sample week, one story in nine had at least half of its text identical to another.
The website shows which outlets publish the same thing, the pairs that share the most, and
the press releases that end up as news, with the share that appears word for word.

## Stack

- **Python**: the collector, the comparison and the export.
- **trafilatura**: extracts the text from any outlet without writing an extractor for each one.
- **PostgreSQL**: the stories and press releases, with the raw HTML compressed separately.
- **Docker**: the collector runs on a NAS in half-hour cycles.
- **Astro**: the website, static, built from a JSON file that contains the text of no story.

## Architecture

1. **Collect.** Front pages, sitemaps and RSS feeds of each outlet, respecting `robots.txt`
   and with its own user agent. Press releases come from press rooms or by email.
2. **Compare.** Five-word sequences. Two texts match if they share half or more of the shorter
   one, and at least 80 words, between outlets owned by different companies.
3. **Attribute.** Each shared story is assigned to a single source: press release, agency or
   unidentified.
4. **Show.** A network of outlets linked by the text they share, laid out when the site is
   built so it always comes out the same.

## Observations

- The starting question was who copies whom. Using publication times, the rule "whoever
  publishes later copied" flagged about 1,500 copies. Sixty were reviewed and none was a copy,
  so between outlets the sharing is counted without direction.
- Press releases do have a direction, but they are 1% of the stories. The Canary Islands
  government, for instance, appears mostly in eldiario.es.
- To measure rewrites, methods were compared against 205 reviewed pairs. Literal matching
  catches a third, TF-IDF reaches 80%, and neither embeddings nor a local model as judge
  improved on that.
