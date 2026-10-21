---
tagline: "Philosophy questions answered only from the Stanford Encyclopedia of Philosophy: every sentence with a checked citation and, if the SEP doesn’t cover it, “I don’t know.”"
fase: Finished (v1) · Oct 2026
metrica:
  valor: "59% → 96%"
  que: sentences backed by the SEP, with qwen3:14b running locally
video: RxYeBnZ7P-0
pieVideo: One question from start to finish, every sentence tied to the passage it cites.
portada:
  imagen: /proyectos/cite-or-silence/poster-en.webp
  clip: /proyectos/cite-or-silence/clip-en.mp4
---

## Summary

Answers philosophy questions using only the Stanford Encyclopedia of
Philosophy (SEP). Every sentence links to the section it comes from, a second
pass checks every citation and, if the SEP doesn't cover the question, the
answer is "I don't know." Questions can be asked in Spanish even though the SEP
is in English.

## Stack

- **Python**: the whole pipeline and the 101-question benchmark.
- **DuckDB**: the chunked sections, each with its SEP anchor, and their vectors.
- **bge-m3**: multilingual embeddings, to search English text with Spanish questions.
- **qwen3:14b (Ollama)**: writes and checks, locally.
- **Codex**: the same role with an OpenAI model, for comparison.

## Architecture

1. **Retrieve.** The question pulls the ten closest passages.
2. **Write.** The model answers citing one passage per sentence.
3. **Check.** Another pass verifies that the citation is in its passage and
   supports the sentence; whatever fails is struck out.
4. **Answer or stay silent.** If no sentence survives, the answer is "I don't know."

## Notes

- Silence has a price: checking strikes out about one good sentence in eight
  and stops correcting false premises, because "the premise is false" has no
  passage to cite.
- The SEP allows indexing its entries but not republishing them: the
  repository stores none of its text and the demo shows only the section and
  the link.
