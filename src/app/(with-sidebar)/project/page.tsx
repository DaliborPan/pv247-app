import { auth } from '@/auth';

import { CreateProjectForm } from './_components/create-project-form';

const Page = async () => {
	const session = await auth();

	if (!session) return null;

	const hasProject = !!session.user.projectId;

	return hasProject ? <div>project</div> : <CreateProjectForm />;
};

export default Page;
