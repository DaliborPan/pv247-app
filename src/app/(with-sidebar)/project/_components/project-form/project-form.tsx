import { and, eq, inArray, isNull, or } from 'drizzle-orm';

import { FormInput } from '@/components/form/form-fields';
import { db } from '@/db';

import { ProjectFormProvider } from './project-form-provider';
import { StudentCombobox } from './student-combobox';
import { type ProjectFormSchema } from './schema';

export const ProjectForm = async ({
	defaultValues
}: {
	defaultValues?: Partial<ProjectFormSchema> & { id: string };
}) => {
	const students = await db.query.users.findMany({
		where: ({ role, projectId, id }) =>
			or(
				and(eq(role, 'student'), isNull(projectId)),
				inArray(id, [
					...(defaultValues?.students?.length ? defaultValues.students : [''])
				])
			)
	});

	return (
		<ProjectFormProvider defaultValues={defaultValues}>
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
		</ProjectFormProvider>
	);
};
