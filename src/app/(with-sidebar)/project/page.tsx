import { and, eq, isNull } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';

import { CreateProjectForm } from './_components/create-project-form';

const CreateProject = async () => {
	const students = await db.query.users.findMany({
		where: ({ role, projectId }) => and(eq(role, 'student'), isNull(projectId))
	});

	return (
		<CreateProjectForm
			studentOptions={students.map(student => ({
				value: student.id,
				label: `${student.firstName} ${student.lastName}`
			}))}
		/>
	);
};

const Page = async () => {
	const session = await auth();

	if (!session) return null;

	const hasProject = !!session.user.projectId;

	return (
		<>
			<h1 className="text-3xl mb-6">
				{hasProject ? session.user.projectName : 'Create a project'}
			</h1>

			{hasProject ? <div>project</div> : <CreateProject />}
		</>
	);
};

export default Page;
