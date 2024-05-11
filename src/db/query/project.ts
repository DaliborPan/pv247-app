import { unstable_cache } from 'next/cache';

import { db } from '..';

export const PROJECTS_TAG = 'projects';

const getProjectsCached = unstable_cache(
	async () => {
		console.log('Calling DB for project');

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

export const getProject = async (id: string) => {
	const projects = await getProjectsCached();

	return projects.find(project => project.id === id);
};

export type GetProjectResult = Awaited<ReturnType<typeof getProject>>;

export const getProjects = getProjectsCached;
export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;
