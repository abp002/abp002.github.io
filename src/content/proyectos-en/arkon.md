---
tagline: "Modular business management software covering the whole company, accounting included."
fase: In progress · since Mar 2026
metrica:
  valor: "4"
  que: real bugs behind green tests, uncovered by mutation testing
detalle: The modules, how it's built, how it's verified, what I decided and what's missing.
---

## What it is

An ERP for Spanish small and medium-sized businesses that I have been
building on my own, as a personal project, since March 2026. Sales,
purchasing, warehouse, projects, people, banking, accounting and tax all sit
on the same core:

1. **Modules on a core**
   There are thirty today. Each company switches on the ones it uses, and its
   installation loads only those.
2. **Spanish regulation, built in**
   VERI\*FACTU, signed Facturae e-invoices, the tax agency's returns, Norma 43
   bank statements and SEPA direct debits.
3. **AI with the permissions of whoever asks**
   An assistant that works with each module's tools and only sees what the
   user asking is allowed to see.

## The modules

- **Sales.** Contacts, a CRM with pipeline and opportunities, quotes, orders,
  delivery notes and invoices (recurring, pro forma and corrective), with
  payments, reminders, price lists and a customer portal.
- **Tax.** VERI\*FACTU: every invoice leaves a hash-chained record that is
  submitted to the Spanish tax agency (RD 1007/2023). Facturae 3.2.2 signed
  with XAdES-EPES, ready for FACe. Returns 303, 390, 111, 115, 130 and 347,
  with the filing file for the 303 and the 347.
- **Accounting.** Double entry on the Spanish chart of accounts (PGC). Journal
  entries are posted automatically from invoices, payments, payroll, returned
  direct debits and depreciation. Year-end closing, annual accounts and fixed
  assets.
- **Banking.** Norma 43 statements with automatic payment reconciliation, SEPA
  direct debits (pain.008, with mandates and returns) and credit transfers
  (pain.001).
- **Purchasing.** Supplier orders and goods receipt. Invoices that arrive in an
  email inbox land in a tray on their own: the AI reads them and leaves them as
  a purchase proposal to review.
- **Warehouse and delivery.** The warehouse floor plan and its 3D twin, stock
  per slot, shipments with their vehicles and the day's routes on a map.
- **Projects.** Project types with their own columns, fields and milestones,
  logged hours with their cost, margin, subtasks, dependencies and a timeline.
- **People.** Employees, leave with real balances and a work calendar, clock-in
  records, expenses with their reimbursement, and payroll with its journal
  entry and its bank transfer.
- **Cross-cutting.** Users, roles and scoped permissions, audit trail, global
  search, notifications, appointment scheduling, an internal helpdesk with
  SLAs, the AI's document base and a CMS for websites.

The same codebase starts other setups without touching the code: a dental
clinic vertical (patients, chairs, dental chart and treatments) and a personal
edition (tasks, finances, habits, documents and an encrypted vault).

## How it's built

- **A TypeScript monorepo.** The API is NestJS 11 on Fastify; the web app,
  React 19 with Vite and TanStack Router; the data, Prisma 6 on PostgreSQL,
  with 160 models and 127 migrations. Validation schemas (Zod) and types are
  shared between the API and the web app.
- **Every module is a plugin.** It ships a manifest with its dependencies, its
  permissions and its menu entries. The core validates it at startup, resolves
  the load order and builds the navigation. A company is a configuration
  (which modules, which brand) plus, if needed, a module of its own
  extensions.
- **One installation per company.** Arkon started out multi-tenant and stopped
  being so: 82 of its 97 tables carried the company identifier. Now each
  company has its own installation and its own database, and no query depends
  on remembering to filter. I wrote the migration by hand so it renamed instead
  of dropping and recreating, which would have taken the tax details with it.
- **Whatever must not repeat is decided with the row locked.** Reading,
  deciding and writing inside a transaction is not atomic: two requests at the
  same time both believed they were first. Journal numbering, the stock in each
  slot and each project's board are decided with their row locked, and an
  integration test posts twelve journal entries at once to check it.
- **The AI, behind two locks.** The assistant runs on Anthropic or OpenAI
  behind a common interface, in a loop that calls each module's tools. The
  catalogue offered to the model is already filtered by the permissions of
  whoever asks, and every call is checked again before it runs: the model can
  ask for a tool it wasn't offered if a document it has read slips it in.
- **The 3D twin only draws what has data behind it.** A truck at a dock is a
  delivery note or a goods receipt for today, and a moving forklift is a stock
  movement that has just arrived. Drawing the day's flows revealed that no sale
  was reducing stock: a view of the whole system finds gaps that individual
  screens hide.

## How it's verified

More than 3,700 tests: unit tests for every calculation and business rule, and
88 integration suites against a real PostgreSQL for everything that touches
the database. Overall coverage isn't chased; what matters is the coverage of
the change being delivered.

> **Method**
> Mutation testing plants small bugs in the code (a `<=` for a `<`, a flipped
> condition) and checks whether any test notices. It's the only measure of
> whether the tests can fail.

| Mutation pass (Stryker) | Before | After |
|---|---|---|
| Norma 43 statement reader | 50.8 % | 93.4 % |
| VERI\*FACTU hash | 69.9 % | 95.9 % |
| Return 347 | 56.3 % | 90.8 % |
| Payroll maths | 83.6 % | 100 % |

The real value of those passes is the bugs that turned up along the way:

- **The Norma 43 reader couldn't read any bank's statement.** It read one
  record four positions before its place. Its 21 tests were green because
  their test files came from a generator with the same wrong reading.
- **VERI\*FACTU sent the tax agency a tax amount without the equivalence
  surcharge.** The test meant to catch it used hand-written data with the same
  mistake as the code.
- **Two journal entries could get the same number.** A concurrency bug that
  the unit test with mocks had always passed.
- **Facturae didn't check text lengths.** A customer from Santa Cruz de
  Tenerife (22 characters in a 20-character field) produced an invoice FACe
  rejects.

The first two share the same shape: the test data was written by whoever
wrote the code, and it shared the code's mistake.

> **The rule**
> Test data comes from the same calculation production uses, and what gets
> checked comes from the regulation.

## What I decided, and what I ruled out

- **A dependency warns, it doesn't forbid.** A task waiting on an unfinished
  one shows as blocked, but it can still be moved. Real projects often start
  things early, and software that forbids it ends with people tracking work
  somewhere else.
- **An hour's cost belongs to the person and is copied when it's logged.** If
  the rate changes later, work already done doesn't get more expensive. An
  hour without a rate doesn't count as free: it raises a warning, or the
  margin would look better than it is.
- **The warehouse, first with fixed locations.** Each slot said which item
  lives there, which is how the 3D twin could be seen in a day. Stock per slot
  came afterwards, on the same tables.
- **Ruled out: a payslip PDF reader.** Without a specific payroll provider
  there is no format to read. Writing it now would mean guessing it, and its
  test would only repeat the guess. Amounts are entered by hand.

## Status

In development. What's missing:

- **End-to-end tests.** The API is tested against the real database; the
  interface, for now, only with component tests.
- **Unfinished screens**, marked "Coming soon".
- **Other languages.** It's only in Spanish today.
