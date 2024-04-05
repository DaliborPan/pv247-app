'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { Form } from '@/components/form';
import { Button } from '@/components/base/button';

import {
	createProjectFormSchema,
	type CreateProjectFormSchema
} from './schema';
import { createProjectAction } from './create-project-action';

export const CreateProjectFormProvider = ({ children }: PropsWithChildren) => {
	const session = useSession();

	const form = useForm<CreateProjectFormSchema>({
		resolver: zodResolver(createProjectFormSchema),
		defaultValues: {
			name: '',
			description: '',
			students: []
		}
	});

	const onSubmit = async (data: CreateProjectFormSchema) => {
		if (!session?.data?.user) {
			return;
		}

		// TODO: < 2
		if (data.students.length < 0) {
			toast.error('Please add at least two students.');

			return;
		}

		await createProjectAction({
			...data,
			students: [...data.students, session?.data?.user.id]
		});
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
