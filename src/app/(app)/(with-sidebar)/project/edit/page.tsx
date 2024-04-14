import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

import { getSessionUser } from '@/auth';
import { db } from '@/db';

import { ProjectForm } from '../_components/project-form';

const Page = async () => {
	const user = await getSessionUser();

	const projectId = user.projectId;

	if (!projectId) return redirect('/project');

	const project = await db.query.projects.findFirst({
		where: projects => eq(projects.id, projectId),
		with: {
			users: true
		}
	});

	if (!project) return null;

	return (
		<ProjectForm
			defaultValues={{
				id: project.id,
				name: project.name,
				description: project.description ?? '',
				github: project.github ?? '',
				students: project.users
					.filter(user => user.id !== user.id)
					.map(user => user.id)
			}}
		/>
	);
};

export default Page;
