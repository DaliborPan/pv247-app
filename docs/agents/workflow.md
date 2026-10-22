# Issue-to-delivery workflow

Use Matt Pocock's applicable skills as an end-to-end workflow, not only as implementation guidance. Read each skill's full instructions before using it. The repository's prohibition on TDD and automated test changes still applies.

## 1. Understand and agree

- Read the issue, comments, tracker instructions, and relevant domain docs. Inspect the current implementation and check whether the request is already implemented.
- For incoming, unrefined issues, follow `triage`. For a new idea, use `grill-with-docs`. Tickets already produced by `to-tickets` do not need triage again.
- Investigate facts yourself; ask the user for unresolved decisions. Retain previously confirmed decisions when restarting a flow unless the user changes them.
- Present the proposed behavior, acceptance criteria, verification approach, and scope boundaries. Get confirmation of the shared understanding before implementation.

## 2. Persist the agreement before coding

- For an existing issue, publish the agreed agent brief as an issue comment using the triage skill's format and disclaimer. Include current and desired behavior, acceptance criteria, and out-of-scope behavior. The agreement must be understandable without this chat.
- For multi-session work, use `to-spec` and `to-tickets` to publish the specification and approved ticket breakdown with blocking dependencies.
- A small issue can use a short agent brief; its size does not remove the requirement to persist the agreement.
- Follow configured label mappings. If required tracker configuration is missing, report the gap and ask how to proceed rather than inventing labels or silently omitting the step.
- This phase is complete only when the agreement is visible on GitHub. If publication is blocked, report it and wait before changing application code.

## 3. Implement and verify

- Capture a fixed review baseline and identify pre-existing local changes. Preserve unrelated user work.
- Follow `implement`, adapted to the repository's verification rules: manual verification and static checks, without TDD or automated test changes.
- Check every acceptance criterion. State explicitly which checks passed, failed, or could not be performed; static checks alone are not evidence of browser behavior.
- For browser-verifiable acceptance criteria, use Playwright MCP to open the running application and exercise the relevant UI. Reuse its dedicated persistent browser profile. If authentication expires, ask the user to sign in manually in that same browser, then resume verification; keep passwords, session cookies, and tokens out of chat and version control. Verify the active role and database target before data-changing checks, and obtain authorization for those changes.
- Run `code-review` against the baseline and the published brief, covering both Standards and Spec. Resolve findings or report remaining blockers.

## 4. Deliver and track

- Proactively carry the work through verification, review, and delivery; the user should not need to prompt for each phase. Pause for unresolved decisions, blockers, or actions that need permission.
- Commit only the intended changes. Obtain permission before publishing a branch or PR unless already authorized; obtain explicit authorization to merge.
- Merge PRs using squash merge (`gh pr merge --squash`) unless the user explicitly requests another method. If squash merge is unavailable, ask before using a different method.
- Use `pr` for the PR body, include verification evidence and risk, and link the originating issue. For a PR that fully resolves the issue, use GitHub's closing reference (for example, `Closes #47`).
- Keep the issue open while the implementation is local or awaiting merge. Let the merged closing PR close it; do not equate a local change with issue completion.
- Report the actual phase reached, issue/PR links, verification results, and remaining work. Use “implementation complete” for local code, not “issue complete.”
- At the end, offer `retro` when the session revealed a recurring workflow or environment problem.
