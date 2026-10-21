---
tagline: "SaaS for agencies that schedules and publishes content across every client's social networks, with an AI assistant that writes drafts backed by RAG and OCR."
metrica:
  valor: "6"
  que: networks with scheduled publishing in production; the TikTok app passed its Direct Post audit
---

## Summary

SaaS for agencies and social media managers: drag a post onto the calendar and
it goes out on time on Instagram, Facebook, TikTok, LinkedIn, X and chat
channels. It's a commercial product of Win Innovación, in production with paid
plans, and I built it on my own. I started from a tool designed for a single
brand and turned it into one for people who manage many.

## Stack

- **Next.js**: the app and the public website.
- **NestJS and TypeScript**: the API and the integration with each network.
- **Prisma and PostgreSQL**: clients, channels, posts and documents.
- **Temporal**: the workflows that publish on time even when nobody has the app open.
- **Redis**: caching and queues.

## Architecture

1. **The client as the unit.** It groups its channels, logo, documents and the
   instructions the AI follows when writing for it.
2. **From calendar to workflow.** Every scheduled post is a Temporal workflow
   that publishes it on each network on time.
3. **Approval by link.** The client sees the post exactly as it will go out and
   approves it without creating an account; if they don't reply, it goes out
   anyway.
4. **AI with RAG and OCR.** Each client has its own document base: a photo of
   the menu goes through OCR, enters the base, and the assistant consults it
   before writing.

## Notes

- The TikTok app passed its Direct Post audit after a first rejection, and
  LinkedIn is approved.
- Every social network API is a contract that breaks on its own: Meta retires
  metrics and LinkedIn changes parameters. Today I would start with tests
  against recorded responses from each API.
