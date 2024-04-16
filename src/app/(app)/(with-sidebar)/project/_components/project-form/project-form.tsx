import { and, eq, inArray, isNull, not, or } from 'drizzle-orm';

import { FormInput } from '@/components/form/form-fields';
import { db } from '@/db';
import { getSessionUser } from '@/auth';

import { ProjectFormProvider } from './project-form-provider';
import { StudentCombobox } from './student-combobox';
import { type ProjectFormSchema } from './schema';

export const ProjectForm = async ({
	defaultValues
}: {
	defaultValues?: Partial<ProjectFormSchema> & { id: string };
}) => {
	const user = await getSessionUser();

	const students = await db.query.users.findMany({
		where: ({ role, projectId, id }) =>
			or(
				and(eq(role, 'student'), isNull(projectId), not(eq(id, user.id))),
				inArray(id, [
					...(defaultValues?.students?.length ? defaultValues.students : [''])
				])
			)
	});

	return (
		<ProjectFormProvider defaultValues={defaultValues}>
			<FormInput name="name" label="Name" />
			<FormInput name="github" label="GitHub repository" />

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
		</ProjectFormProvider>
	);
};