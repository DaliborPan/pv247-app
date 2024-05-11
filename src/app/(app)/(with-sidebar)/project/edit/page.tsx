import { redirect } from 'next/navigation';

import { getProjectWithUsers } from '@/db/session-user-service/project';
import { getSessionUser } from '@/auth/session-user';

import { ProjectForm } from '../_components/project-form';

const Page = async () => {
	const sessionUser = await getSessionUser();
	const project = await getProjectWithUsers();

	if (!project) return redirect('/project');

	const defaultValues = {
		id: project.id,
		name: project.name,
		description: project.description ?? '',
		github: project.github ?? '',
		students: project.users
			.filter(user => user.id !== sessionUser.id)
			.map(user => user.id)
	};

	return <ProjectForm defaultValues={defaultValues} />;
};

export default Page;
