import { Suspense } from 'react';

import { FormInput } from '@/components/form/form-fields';
import { db } from '@/db';
import { getSessionUser } from '@/modules/session-user/server';

import { ProjectFormProvider } from './project-form-provider';
import { StudentCombobox } from './student-combobox';
import { type ProjectFormSchema } from './schema';

const _StudentCombobox = async ({
	defaultValues
}: {
	defaultValues?: Partial<ProjectFormSchema>;
}) => {
	const sessionUser = await getSessionUser();

	const students = await db.query.users.findMany({
		where: (table, { eq, or, and, inArray, isNull, not }) =>
			or(
				and(
					eq(table.role, 'student'),
					isNull(table.projectId),
					not(eq(table.id, sessionUser.id))
				),
				inArray(table.id, defaultValues?.students ?? [''])
			)
	});

	return (
		<StudentCombobox
			options={students.map(user => ({
				value: user.id,
				label: `${user.firstName} ${user.lastName}`
			}))}
		/>
	);
};

export const ProjectForm = async ({
	defaultValues
}: {
	defaultValues?: Partial<ProjectFormSchema>;
}) => (
	<ProjectFormProvider defaultValues={defaultValues}>
		<FormInput name="name" label="Name" />
		<FormInput name="github" label="GitHub repository" />

		{/* TODO: To be rich text editor */}
		<FormInput name="description" label="Description" />

		<div className="mt-2">
			<Suspense>
				<_StudentCombobox defaultValues={defaultValues} />
			</Suspense>
		</div>
	</ProjectFormProvider>
);
