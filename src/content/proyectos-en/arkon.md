---
tagline: "Modular business management software covering the whole company, accounting included."
fase: In progress · since Mar 2026
metrica:
  valor: "4"
  que: real bugs behind green tests, uncovered by mutation testing
---

## Summary

An ERP for Spanish small and medium-sized businesses that I have been building
on my own, as a personal project, since March 2026. Sales, purchasing,
warehouse, projects, people, banking, accounting and tax are thirty modules on
a single core, with Spanish regulations built in (VERI\*FACTU, Facturae, AEAT
tax forms, Norma 43 and SEPA) and an AI assistant that only sees what the
person asking can see.

## Stack

- **NestJS on Fastify**: the API.
- **React, Vite and TanStack Router**: the web app.
- **TypeScript and Zod**: types and validation shared between the API and the web app.
- **Prisma and PostgreSQL**: 160 models; integration tests run against a real PostgreSQL.
- **three.js**: the warehouse's 3D twin.

## Architecture

1. **Every module is a plugin.** It ships a manifest with its dependencies,
   permissions and menu; the core validates it at startup and builds the
   navigation.
2. **One installation per company**, with its own database: no query depends
   on remembering to filter by company.
3. **What must not repeat is decided with the row locked**: journal entry
   numbering and the stock in each bin.
4. **AI behind two locks.** The tool catalogue arrives already filtered by the
   asker's permissions, and every call is checked again before it runs.
