import { unstable_cache } from 'next/cache';

import { db } from '@/db';

export const PROJECTS_TAG = 'projects';

/**
 * Get all projects
 *
 * @cache Next.js cache
 */
export const getProjects = unstable_cache(
	async () => {
		const projects = await db.query.projects.findMany({
			with: {
				users: true
			}
		});

		return projects;
	},
	[PROJECTS_TAG],
	{
		tags: [PROJECTS_TAG]
	}
);
export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;

/**
 * Get project by id
 *
 * @cache using Next.js cache
 */
export const getProject = async (id: string) => {
	const projects = await getProjects();

	return projects.find(project => project.id === id);
};

export type GetProjectResult = Awaited<ReturnType<typeof getProject>>;
