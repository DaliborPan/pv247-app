# Homework repositories

## Deployment

1. Back up the database. Apply `docs/migrations/20260915-homework-repositories.sql` once to the existing database before deploying. This migration is not applied automatically and is not part of a Drizzle migration journal. Do not combine it with a schema push that applies the same changes.
2. Configure `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY` (the entire PEM, multiline or escaped newlines), and `GITHUB_APP_INSTALLATION_ID` in the Vercel Production environment and the untracked local environment as needed. Never expose these through `NEXT_PUBLIC_` or commit the key. Do not automatically share production credentials with Preview deployments.
3. Install the App in `FI-PV247` with access to the source templates and newly generated repositories. The simplest configuration is all repositories; this grants the App the configured permissions throughout the organization. Repository Administration and Contents need read/write, Metadata read. No PR or webhook integration is required.
4. Teachers must be organization owners, or set `GITHUB_TEACHER_TEAM_SLUG` to an existing teacher-only team. In the latter case, the App must also have the permissions required by the team repository-permissions endpoint (including organization Members read). The service grants the team Write access before inviting the student.
5. Verify organization base permissions are None and no student team grants access to other students' private repositories. Verify outside collaborators/invitations are allowed and the organization plan has sufficient seats. The application does not change global organization permissions.
6. Set `lecture.homeworkTemplateRepositoryUrl` manually to `https://github.com/owner/repository` for each new homework. The source must be an active template repository. Leave it null for legacy Classroom homework. Use `main` as the template's default branch if desired; the app does not rename branches.
7. Deploy. The action has a 60-second route budget and a 45-second GitHub request budget. Confirm the Vercel plan supports the configured duration.

## Usage

In `lector/homeworks/[slug]`, choose **Create repository** in the student's GitHub column. New names use the `2026-fall-` prefix followed by the existing task convention, using the verified GitHub login, not the editable profile nickname (for example, `2026-fall-task-01-typescript-student`). Existing assignments keep their stored names, and legacy Classroom links remain unchanged. Generation includes only the default branch and always creates a private repository in `FI-PV247`.

Keep the template unchanged while creating repositories: each uses the current template contents, not a pinned revision. There is no fork relationship, update synchronization or feedback PR. The initial commit is stored before inviting the student for a future feedback feature.

Provisioning uses two authorized server actions. **Create** only generates the repository and persists its ID and URL, then returns `preparing`. **Complete** checks the existing repository once; a 409 while reading its initial commit returns `preparing` normally, without saving an error. Once the commit is available, completion saves the baseline and configures teacher/student access before returning `ready`. Completion never generates a repository. Other errors, including 404, stop automatic checking and are shown to the teacher.

Both steps are manual. After creation, the UI shows a preparing message and **Finish setup**. Each click performs exactly one completion attempt. If GitHub returns 409, the message remains and the teacher can click again later. There are no timers, automatic polling or automatic retries in the browser or on the server. After reloading or returning to the page, use **Finish setup** to resume the stored assignment.

The existing database status `repository_created` represents the `preparing` API result until access setup is finished. No additional schema migration is needed for the two-action flow. A completion attempt returning `preparing` is not a failed operation. Errors are shown in the UI and stored in `lastError`; there is no custom step-by-step logging.

Lecture data uses the existing Next.js `lectures` cache tag. After editing the template URL directly in the database, use the existing lecture revalidation action and reload after revalidation; the database edit itself does not invalidate cached lecture data. The creation service always validates the current database value.

The table reads stored database state, not live GitHub state. `ready` means setup finished and student access was granted or an invitation was sent; it does not certify invitation acceptance. Students see repository links after setup is ready. Invitation acceptance, subsequent deletion, visibility changes and revocation are not synchronized in this MVP.

## Recovery

- A partially created repository retains its GitHub ID. **Finish setup** resumes against that ID and verifies it is still private, active and in `FI-PV247`. It never recreates or deletes that repository.
- **Try again** retries a failed operation. There are no jobs, locks, webhooks or background retries. If the browser reports a transport timeout, refresh to see persisted progress before retrying.
- A pre-existing target name without a stored GitHub ID is a collision, including an ambiguous timeout after GitHub created the repository but before the database saved its ID. The app does not adopt it or invite the student. An administrator must verify ownership and assignment and reconcile metadata manually. Never delete a student's work merely to resolve a collision.
- For manual reconciliation, verify repository ID, owner, private visibility, intended student and baseline commit before setting database metadata. A changed linked GitHub account requires explicit administrator review; the original account ID is recorded.
- GitHub App authentication is separate from Better Auth login. Students do not need additional OAuth scopes. Existing Classroom repository URLs remain in use when no template/new repository is configured.
- No automated tests or production mutations are performed as part of installation. Type checking and builds do not establish that GitHub permissions and organization isolation are correct; those require an explicitly approved manual pilot.
