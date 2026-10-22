# Domain docs

## Before exploring

Read `GLOSSARY.md` at the repository root and relevant decisions in `docs/adr/`.

If either is absent, proceed silently. Create domain documentation lazily
with `domain-modeling` when terms or decisions are actually resolved.

## Layout

Single-context: one root `GLOSSARY.md` and shared `docs/adr/`.

## Vocabulary and decisions

Use glossary terms consistently in code, tests, issues, and proposals.
If a needed concept is missing, reconsider the term or raise it during domain modeling.

Explicitly flag proposals that contradict an existing ADR,
identifying the ADR and explaining why the decision should be reopened.
