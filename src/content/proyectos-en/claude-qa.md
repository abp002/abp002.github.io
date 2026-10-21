---
tagline: "A Claude Code plugin that won't let the agent end a turn with failing tests, and that decides what deserves a test and what doesn't."
metrica:
  valor: "823"
  que: end-of-turn checks across 26 projects since August; 35 blocked on red
---

## Summary

Programming with an agent is fast; the expensive part is finding out late that
something broke. claude-qa is the testing policy I work with and the plugin
that enforces it in every Claude Code session: it won't let a turn end with
verification failing, and it decides what deserves a test and what doesn't.

## Stack

- **Bash**: the hooks and each project's contract.
- **Python**: the hooks' decision logic and coverage of the change.
- **Claude Code**: hooks, commands, skills and subagents.
- **jq**: reads the JSON that Claude Code passes to the hooks.

## Architecture

1. **Verb contract.** Each project declares how it's verified in
   `.claude/code/run.sh <verb>` (`tipos`, `humo`, `test`…); the plugin knows
   nothing about stacks.
2. **End-of-turn hook.** It detects which projects were touched, runs
   `tipos → humo → test` and, at the first failure, hands the turn back to the
   agent. Three attempts and it gives up.
3. **Criteria.** Three levels per project and an anti-criterion: a test that
   can't fail on a real bug doesn't get written.
4. **Adversarial panel.** `/focus` launches two agents that try to break the
   change and a third that only lets through what it can reproduce.

## Notes

- The first thing `/focus` reviewed was the plugin itself: twenty real
  defects, all fixed.
- Since August, 823 checks across 26 projects; 35 handed the turn back to the
  agent. Median of 3 s per check.
