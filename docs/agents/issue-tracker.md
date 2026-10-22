# Issue tracker: GitHub

Issues and specs live in GitHub Issues for `DaliborPan/pv247-app`.
Use the `gh` CLI from this repository.

## Operations

- Create: `gh issue create --title "..." --body-file <file>`
- Read: `gh issue view <number> --json number,title,body,labels,comments`
- List: `gh issue list --state open --json number,title,labels`
- Comment: `gh issue comment <number> --body-file <file>`
- Labels: `gh issue edit <number> --add-label "..." --remove-label "..."`
- Close: `gh issue close <number> --comment "..."`

When a skill says "publish to the issue tracker", create a GitHub issue.
When it says "fetch the relevant ticket", read the GitHub issue.

## Pull requests as a triage surface

PRs as a request surface: no.
