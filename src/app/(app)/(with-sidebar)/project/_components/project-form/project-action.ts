'use server';

import { eq, inArray } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

import { db, projects, users } from '@/db';
import { PROJECTS_TAG } from '@/modules/project/server';

import { type ProjectFormSchema } from './schema';

export const createProjectAction = async ({
	students,
	name,
	description
}: ProjectFormSchema) => {
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
			projectId: project.id
		})
		.where(inArray(users.id, students))
		.execute();

	revalidateTag(PROJECTS_TAG);
};

export const updateProjectAction = async ({
	id,
	students,
	name,
	github,
	description
}: ProjectFormSchema) => {
	if (!id) return;

	// Update project
	await db
		.update(projects)
		.set({
			name,
			description,
			github
		})
		.where(eq(projects.id, id))
		.execute();

	const previousStudents = await db.query.users.findMany({
		where: users => eq(users.projectId, id)
	});

	// Remove students from previous project
	await db
		.update(users)
		.set({
			projectId: null
		})
		.where(
			inArray(
				users.id,
				previousStudents.map(user => user.id)
			)
		)
		.execute();

	// Add students to new project
	await db
		.update(users)
		.set({
			projectId: id
		})
		.where(inArray(users.id, students))
		.execute();

	revalidateTag(PROJECTS_TAG);
};
