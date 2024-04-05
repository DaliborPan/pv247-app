'use server';

import { inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, projects, users } from '@/db';

import { type CreateProjectFormSchema } from './schema';

export const createProjectAction = async ({
	students,
	name,
	description
}: CreateProjectFormSchema) => {
	const [project] = await db
		.insert(projects)
		.values({
			name,
			description
		})
		.returning();

	await db
		.update(users)
		.set({
			projectId: project.id,
			projectName: project.name
		})
		.where(inArray(users.id, students))
		.execute();

	revalidatePath('/project');

	return project;
};
