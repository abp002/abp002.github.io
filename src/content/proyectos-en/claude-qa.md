---
tagline: "A Claude Code plugin that won't let the agent end a turn with failing tests, and that decides what deserves a test and what doesn't."
rol: Design, hooks and evaluation
metrica:
  valor: "823"
  que: end-of-turn checks across 26 projects since August; 35 blocked on red
detalle: How the contract works, what it found in itself and what the numbers say.
---

## What it is

Programming with an agent is fast; what's expensive is finding out late that
something broke. claude-qa is the testing policy I work with and the plugin
that enforces it in every Claude Code session:

1. **A hook that demands green**
   When the turn ends it detects which projects were touched, runs their checks
   and, if anything is red, hands control back to the agent to fix it. Three
   attempts and it gives up, so the agent never gets stuck in a loop.
2. **A rule for what gets tested**
   Three levels per project (production, active, hobby) and, above all, an
   anti-rule: no tests for getters or third-party libraries, and a test that
   can't go red because of a real bug doesn't get written.
3. **An adversarial panel**
   `/focus` launches two agents that try to break the change through different
   lenses (correctness and security) and a third one, biased towards dismissal,
   that only lets through what it can reproduce.

## 1. The verb contract

The plugin knows nothing about stacks. Each project declares how it's verified
in a single file, `.claude/code/run.sh <verb>`, with fixed verbs (`tipos`,
`humo`, `test`, `cov`, `mutacion`…). At the end of the turn it runs `tipos →
humo → test` in order and stops at the first red.

| Code | Means | What the hook does |
|---|---|---|
| 0 | green, or the verb doesn't apply here | continues |
| 64 | that verb doesn't exist | warns and continues |
| 78 | the contract isn't configured | warns and continues |
| other | genuinely red | blocks the agent |

Telling "doesn't apply" apart from "doesn't exist" stops a typo in a verb name
from passing as green forever. Exit code 2 can't be the marker because pytest,
uv and other tools return it on their own.

> **Decision**
> Supporting a new stack doesn't touch the plugin: the project's `run.sh` is
> enough. Without one, the hook autodetects the runner, but only as a safety net.

## 2. The panel, on its own code

The first thing `/focus` reviewed was the plugin itself. It found **twenty real
defects**; the two refuters independently agreed on four. Some of them:

- Internal fields were passed as text with a separator. A path containing it
  shifted the fields: it blocked healthy projects, reported a neighbour's
  contract as green and, in the worst case, executed code.
- A single slow project emptied the verification queue for every other project
  in the turn, which then shipped unverified.
- The attempt counter was per session, not per project: three reds in three
  repos made the third one give up on its first failure.
- A change I'd made an hour earlier meant the `test` verb never ran at all.

All of them are fixed, and the hooks' decision logic has tests that are checked
by mutating the hook to see them go red.

## 3. What the numbers say

Every check writes a line to a log. Since 2 August 2026:

| | |
|---|---|
| End-of-turn checks | **823**, across 26 projects |
| Green | 739 |
| Red, handed back to the agent | 35 |
| Timed out (warn, don't block) | 43 |
| Gave up after three attempts | 5 |
| Time per check | median **3 s**, p90 26 s |

## Status

In daily use in all my sessions since August. It installs hooks, three commands
(`/code`, `/focus`, `/spec`), four skills and a tool that measures coverage only
on the lines the change touched.
