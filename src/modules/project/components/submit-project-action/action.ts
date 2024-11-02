'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

import { db, type Project, projects } from '@/db';
import { PROJECTS_TAG } from '@/modules/project/server';

export const submitProjectAction = async ({
	project
}: {
	project: Project;
}) => {
	await db
		.update(projects)
		.set({
			status: 'submitted'
		})
		.where(eq(projects.id, project.id));

	revalidateTag(PROJECTS_TAG);
};
