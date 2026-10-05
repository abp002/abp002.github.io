---
tagline: "SaaS for agencies that schedules and publishes content across every client's social networks, with an AI assistant that writes drafts backed by RAG and OCR."
rol: full-stack, integrations and AI — at Win Innovación
---

## What it is

A SaaS social media publishing platform for agencies and account managers. You
drag a post onto a date in the calendar and a workflow engine publishes it on
time to Instagram, Facebook, TikTok, LinkedIn, X and chat channels, even if
nobody has a laptop open. It is in production at
[spartancomunica.es](https://spartancomunica.es) and is a commercial product
of Win Innovación, with paid plans.

## What I built

I took over a post-scheduling tool designed for a single brand and turned it
into a tool for people who manage **many**:

- **Clients**, which didn't exist: each client groups its channels, its logo
  and the instructions the AI follows when writing on its behalf. The editor
  picks a client from a searchable combobox, and the selection accumulates
  across clients without clearing what was already ticked.
- **Approval by link.** The client gets a link, sees the post exactly as it
  will go out (video, reel and full caption, on mobile too) and approves or
  rejects it without creating an account. If they don't answer, it still goes
  out on time: the agency sets the rule, not the silence.
- **An AI agent that acts, not just answers.** It drafts, suggests ideas and
  works with each client's documents. The chat shows what it is doing at every
  moment, and when it can't answer it says why.
- **Unified inbox.** Comments, mentions and reactions from every network in
  one place, synced in the background with the response time (SLA) in view.
- **Rebuilt analytics.** Per client and per date range, with tabs for posts
  and audience, and each network declaring which metrics it actually provides.
- **App design and public website**: new navigation, mobile version, landing
  page, blog, sitemap and IndexNow so search engines find out right away.

## The real problem

Publishing to six networks isn't hard. What's hard is that **the system knows
what failed and the screen doesn't say**. Walking through the app as an account
manager, every serious bug was of the same kind: a 400 from the agent that the
chat library swallowed silently, a validation warning that appeared 640 px away
from the button and faded out after three seconds, a Facebook metric Meta had
retired being shown as "no data".

So half the work doesn't show up in a screenshot: it's making sure every
failure reaches the screen with its reason, in plain language.

## What I decided, and what I ruled out

**Pass the platforms' audits instead of working around them.** Publishing to
TikTok on a user's behalf requires passing its *Direct Post* review. The first
rejection had three reasons; the composer now reads the account's real settings
(privacy, duets, stitch) instead of assuming "public", and a shared component
that offered options the account had blocked was fixed. The TikTok app is
*Live* and LinkedIn is approved.

**A single constant for Meta's API.** Each Meta provider was talking to its own
Graph API version; now they all read from one place, and upgrading is a
one-line change.

**Ruled out:** brute-force revalidation to fix stale Canva thumbnails. It showed
the expired image first and multiplied requests until they brushed against
Canva's rate limit. It was fixed with a cache key per modal opening and a
regression test that reproduces mount-unmount-mount.

## Status

In production and in commercial use at
[spartancomunica.es](https://spartancomunica.es).

## What I would do differently

**I'd treat every social network API as a contract that breaks on its own.**
Meta retires metrics, LinkedIn requires parameters that used to be optional and
TikTok changes what it returns depending on your audit status. Several bugs this
year were exactly that: the integration hadn't changed, the platform had. Today
I'd start with tests against recorded responses from each API, plus an alert
when the real response stops looking like the recorded one.
