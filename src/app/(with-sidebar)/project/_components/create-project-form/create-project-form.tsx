import { and, eq, isNull } from 'drizzle-orm';

import { FormInput } from '@/components/form/form-fields';
import { db } from '@/db';

import { CreateProjectFormProvider } from './create-project-form-provider';
import { StudentCombobox } from './student-combobox';

export const CreateProjectForm = async () => {
	const students = await db.query.users.findMany({
		where: ({ role, projectId }) => and(eq(role, 'student'), isNull(projectId))
	});

	return (
		<CreateProjectFormProvider>
			<FormInput name="name" label="Name" />

			{/* TODO: To be rich text editor */}
			<FormInput name="description" label="Description" />

			<div className="mt-2">
				<StudentCombobox
					options={students.map(student => ({
						value: student.id,
						label: `${student.firstName} ${student.lastName}`
					}))}
				/>
			</div>
		</CreateProjectFormProvider>
	);
};
