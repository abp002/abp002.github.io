---
tagline: "A programming language designed to be written by an AI: every function carries a contract that a prover (Z3) checks before accepting it."
fase: v0.1 finished · Sep 2026
metrica:
  valor: "79% → 0%"
  que: silent errors when haiku writes the body against sonnet's contract
pieVideo: An agent writes a function by reusing another one from the store and certifies it, using only Sello's MCP.
---

## Summary

A programming language designed to be written by an AI. AI generates code
fast; the hard part is knowing whether it's right, so in Sello the language
acts as the reviewer: every function carries a contract and a prover checks it
before accepting it. An agent doesn't read files: it works over MCP with a
store of certified functions.

## Stack

- **Python**: compiler, interpreter and experiments.
- **Z3**: the prover, which tries to prove the contract for every valid input.
- **SQLite**: the function store, each one saved under the hash of its syntax tree.
- **MCP**: the agent's interface to the store.
- **Claude Haiku and Sonnet**: the models that write code in the experiments.

## Architecture

1. **Mandatory contract.** Every function declares what it assumes
   (`requires`), what it promises (`ensures`), its effects and examples.
2. **Prover.** Z3 tries to prove the promise and only reports a
   counterexample if the interpreter reproduces it.
3. **Content-addressed store.** The function is saved under its hash
   alongside its certificate: verified once, verified forever.
4. **MCP.** The agent asks for signatures, contracts and usages, and requests
   verification.

## Notes

- With a contract written by sonnet in front of it, haiku's silent errors drop
  from 79% to 0%. The reviewer that works is the contract, as long as it says
  something: a trivial contract is now a compile error.
- The second vericoding batch (sonnet, 29 of 50) missed the criterion set
  before running it: twelve of the failures are non-linear arithmetic, which
  Z3 doesn't decide.
