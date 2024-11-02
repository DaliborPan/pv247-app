'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Pencil, Send } from 'lucide-react';

import { Button } from '@/components/base/button';
import { FormInput } from '@/components/form/form-fields';
import { Form } from '@/components/form';

import {
	type SetHomeworkPointsFormSchema,
	setHomeworkPointsFormSchema
} from './schema';
import { setHomeworkPointsAction } from './set-homework-points-action';

export const SetHomeworkPointsForm = ({
	defaultValues
}: {
	defaultValues?: Partial<SetHomeworkPointsFormSchema>;
}) => {
	const hasPoints = defaultValues?.points !== undefined;

	const [isEditing, setIsEditing] = useState(!hasPoints);

	const form = useForm<SetHomeworkPointsFormSchema>({
		resolver: zodResolver(setHomeworkPointsFormSchema),
		defaultValues
	});

	const onSubmit = async (data: SetHomeworkPointsFormSchema) => {
		await setHomeworkPointsAction({ ...data, isCreating: !hasPoints });

		setIsEditing(false);
	};

	return isEditing ? (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex items-center gap-x-2"
			>
				<FormInput type="number" name="points" className="h-9" />
				<Button
					size="sm"
					isLoading={form.formState.isSubmitting}
					type="submit"
					variant={isEditing ? 'primary' : 'outline/primary'}
					iconLeft={{ icon: isEditing ? <Send /> : <Pencil /> }}
				/>
			</form>
		</Form>
	) : (
		<div className="flex items-center gap-x-2">
			<div className="grow">{defaultValues?.points} points</div>
			<Button
				size="sm"
				type="button"
				onClick={() => setIsEditing(true)}
				variant="outline/primary"
				iconLeft={{ icon: <Pencil /> }}
			/>
		</div>
	);
};
