'use client';

import { type PropsWithChildren } from 'react';
import { type DefaultValues } from 'react-hook-form';

import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields';

import {
	type SetProjectPointsFormSchema,
	setProjectPointsFormSchema
} from './schema';
import { useSetProjectPointsMutation } from './mutation';

export const SetProjectPointsForm = ({
	projectId,
	defaultValues,
	children
}: PropsWithChildren<{
	projectId: string;
	defaultValues?: DefaultValues<SetProjectPointsFormSchema>;
}>) => {
	const mutation = useSetProjectPointsMutation();

	return (
		<Prompt<SetProjectPointsFormSchema>
			title="Set points"
			formSchema={setProjectPointsFormSchema}
			defaultValues={{
				...defaultValues,
				projectId
			}}
			content={
				<div className="flex flex-col pt-2 gap-y-3">
					<FormInput type="number" name="points" label="Points" />
					<FormInput name="comment" label="Comment" />
				</div>
			}
			onDecision={async ({ confirmed, data }) => {
				if (!confirmed) return;

				await mutation.mutateAsync(data);
			}}
		>
			{children}
		</Prompt>
	);
};
