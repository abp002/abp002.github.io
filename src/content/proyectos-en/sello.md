---
tagline: "A programming language designed to be written by an AI: every function carries a contract that a prover (Z3) checks before accepting it."
rol: language design, compiler and experiments
---

## What it is

AI generates code fast and cheap; the bottleneck is knowing whether it's right.
Sello starts from there: **the language has to be the reviewer**. It isn't text
in files but a store of functions with certificates:

- **Mandatory contract.** Every function declares what it assumes (`requires`),
  what it promises (`ensures`), its effects and examples.
- **Prover.** Z3 tries to prove the promise for every valid input, and only
  reports a counterexample when the interpreter reproduces it.
- **Content-addressed store.** Each function is stored by the hash of its
  syntax tree, alongside the certificate of what happened. Verified once,
  verified forever. Hence the name: *sello* is Spanish for seal.

An agent doesn't read files: it queries the store over MCP (*give me the
signature and contract of X*, *who uses Y*, *verify Z*).

## How it's measured

The first metric was "attempts until it compiles", and it was the wrong one: a
language that rejects more can cost more attempts and still be better. The
right metric is what **reaches production**: accept whatever passes a weak
judge, like a reviewer in a hurry, and count how many of those programs later
fail against an oracle. Every change to the language is preregistered before
running the experiment and not touched afterwards.

| Experiment | Result |
|---|---|
| Silent errors (haiku / sonnet) | Python 16 / 12; Sello, from 7 / 5 to **1 / 0** after three changes measured separately |
| Haiku writes the body against sonnet's contract | Silent errors, from 79 % to **0 %** |
| 50 Dafny specs translated (vericoding) | Proved: sonnet **46 / 50**, haiku **43 / 50** |
| The prover on already-accepted code | **Three real bugs** that had passed the judge, the examples and hundreds of oracle calls |

## What I learned

**The reviewer that works is the contract, as long as it says something.** An
`ensures` that only bounds a number certifies nothing, and a trivial contract is
now a compile error.

**A contract written by someone else is the strongest lever.** Haiku doesn't
learn to write strong contracts from instructions, but with a strong contract
in front of it, it writes correct bodies.

## What doesn't work

The second vericoding batch (sonnet 29 / 50) **did not meet** the criterion I
set before running it. Twelve of the failures are non-linear arithmetic that Z3
can't decide. And the certificate of a function proved against another
function's weaker contract doesn't yet say that it inherits that weakness. It's
written down, with its own issue.

## Status

v0.1 is closed: compiler, prover, store and a demo in which a Claude Code
agent, with no files or shell and only Sello's MCP, writes a function by reusing
another one from the store and certifies it. The code, the results and the
failures are in [the repository](https://github.com/abp002/sello).
