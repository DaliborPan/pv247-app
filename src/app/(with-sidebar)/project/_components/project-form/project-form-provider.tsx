'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/form';
import { Button } from '@/components/base/button';

import { projectFormSchema, type ProjectFormSchema } from './schema';
import { createProjectAction, updateProjectAction } from './project-action';

export const ProjectFormProvider = ({
	children,
	defaultValues
}: PropsWithChildren<{
	defaultValues?: Partial<ProjectFormSchema> & { id: string };
}>) => {
	const session = useSession();
	const router = useRouter();

	const form = useForm<ProjectFormSchema>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: defaultValues ?? {
			name: '',
			description: '',
			students: []
		}
	});

	const onSubmit = async (data: ProjectFormSchema) => {
		if (!session?.data?.user) {
			return;
		}

		// TODO: < 2
		if (data.students.length < 0) {
			toast.error('Please add at least two students.');

			return;
		}

		const actionData = {
			...data,
			students: [...data.students, session.data.user.id]
		};

		if (defaultValues) {
			await updateProjectAction({
				...actionData,
				id: defaultValues.id
			});

			toast.success('Project updated successfully.');

			router.replace('/project');
		} else {
			await createProjectAction(actionData);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex items-center mb-6">
					<h1 className="text-3xl grow">Create a project</h1>
					<Button
						type="submit"
						iconLeft={{
							name: 'Send'
						}}
					>
						Submit
					</Button>
				</div>

				<div className="flex flex-col gap-y-2">{children}</div>
			</form>
		</Form>
	);
};
