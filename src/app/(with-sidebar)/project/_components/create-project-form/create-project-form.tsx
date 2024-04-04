'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { Plus } from 'lucide-react';

import { Form } from '@/components/form';
import { FormInput } from '@/components/form/form-fields';
import { Combobox, type ComboboxOption } from '@/components/base/combobox';
import { Button } from '@/components/base/button';

import {
	type CreateProjectFormSchema,
	createProjectFormSchema
} from './schema';
import { createProjectAction } from './create-project-action';

const StudentSelectedComboboxItem = ({
	studentOption
}: {
	studentOption: ComboboxOption;
}) => {
	const formContext = useFormContext<CreateProjectFormSchema>();

	const students = formContext.watch('students');

	return (
		<div className="p-4 bg-white rounded-lg flex items-center">
			<span className="grow">{studentOption.label}</span>

			<Button
				size="sm"
				variant="outline/destructive"
				iconLeft={{
					name: 'Trash'
				}}
				onClick={() => {
					formContext.setValue(
						'students',
						students.filter(s => s !== studentOption.value)
					);
				}}
			/>
		</div>
	);
};

const StudentCombobox = ({ options }: { options: ComboboxOption[] }) => {
	const formContext = useFormContext<CreateProjectFormSchema>();

	const students = formContext.watch('students');

	return (
		<>
			<Combobox
				emptyMessage="No options available."
				value=""
				TriggerIcon={Plus}
				triggerPlaceholder="Add student..."
				options={options.filter(option => !students.includes(option.value))}
				onSelect={currentValue => {
					formContext.setValue('students', [...students, currentValue]);
				}}
			/>

			{students.length > 0 && (
				<div className="flex flex-col mt-4">
					{students.map(s => (
						<StudentSelectedComboboxItem
							key={s}
							studentOption={options.find(opt => opt.value === s)!}
						/>
					))}
				</div>
			)}
		</>
	);
};

export const CreateProjectForm = ({
	studentOptions
}: {
	studentOptions: ComboboxOption[];
}) => {
	const form = useForm<CreateProjectFormSchema>({
		resolver: zodResolver(createProjectFormSchema),
		defaultValues: {
			name: '',
			students: []
		}
	});

	const onSubmit = async (data: CreateProjectFormSchema) => {
		await createProjectAction(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput name="name" label="Name" />
				<StudentCombobox options={studentOptions} />
			</form>
		</Form>
	);
};
