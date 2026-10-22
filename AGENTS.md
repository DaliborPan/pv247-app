<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Database

For Turso operations in this project, always use `pv247-fall-2026` unless the user explicitly requests another database.

## Agent skills

### Implementation workflow

- Before implementing, load and follow the skills relevant to the task. Use Matt Pocock's skills for the applicable planning, design, implementation, and review work.
- For issue selection, clarification, implementation, or delivery, read and follow `docs/agents/workflow.md`. Track the work through these phases proactively; publish the agreed acceptance criteria to GitHub before changing application code.
- Do not use TDD or the `tdd` skill, and do not write or update automated tests in this repository. Verify changes manually and with static checks (such as type checking and linting).
- Prefer repository-local skills over global copies. For shadcn/ui work, always read and follow `.agents/skills/shadcn/SKILL.md`; for Better Auth work, always read and follow `.agents/skills/better-auth-best-practices/SKILL.md`.
- For Next.js work, always follow the documentation requirement at the top of this file before implementing.
- If a required skill or documentation source is unavailable, report it rather than silently skipping it.

### Issue tracker

Issues and specs live in GitHub Issues. Before reading or publishing tickets, read `docs/agents/issue-tracker.md`.

### Triage labels

Before classifying issues or changing triage states, read `docs/agents/triage-labels.md` for the category and state mappings.

### Domain docs

Single-context layout. Before exploring domain concepts or proposing design changes, read `docs/agents/domain.md`.
