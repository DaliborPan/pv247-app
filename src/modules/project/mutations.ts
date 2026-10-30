import 'server-only';
import { inArray } from 'drizzle-orm';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { user as users } from '@/db/schema/users/users';

import { validateProjectTeamMemberIds } from './utils/validator';

/**
 * Creates a project and created project is
 * assigned to the session user and the team members.
 */
export const createProject = async (
  sessionUserId: string,
  teamMemberIds: string[],
  input: Pick<
    typeof projects.$inferInsert,
    'name' | 'assignment' | 'description' | 'shortDescription' | 'github'
  >
) => {
  const validationResult = validateProjectTeamMemberIds(teamMemberIds);
  if (!validationResult.success) {
    throw new Error(validationResult.message);
  }

  const allTeamUserIds = [sessionUserId, ...teamMemberIds];

  await db.transaction(async tx => {
    const allTeamUsers = await tx.query.users.findMany({
      columns: { id: true, role: true, projectId: true },
      where: inArray(users.id, allTeamUserIds)
    });

    if (
      allTeamUsers.length !== allTeamUserIds.length ||
      allTeamUsers.some(
        user => user.role !== 'student' || user.projectId !== null
      )
    ) {
      throw new Error('Every team member must be a student without a project.');
    }

    const [{ id: createdProjectId }] = await tx
      .insert(projects)
      .values(input)
      .returning({ id: projects.id });

    await tx
      .update(users)
      .set({ projectId: createdProjectId })
      .where(inArray(users.id, allTeamUserIds));
  });
};
