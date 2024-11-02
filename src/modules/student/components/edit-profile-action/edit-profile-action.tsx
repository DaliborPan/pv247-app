'use client';

import { type DefaultValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import { use } from 'react';

import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields';
import { Button } from '@/components/base/button';

import { editProfileFormSchema, type EditProfileFormSchema } from './schema';
import { editProfileAction } from './action';

export const EditProfileAction = (props: {
	defaultValuesPromise: Promise<DefaultValues<EditProfileFormSchema>>;
}) => {
	const defaultValues = use(props.defaultValuesPromise);

	return (
		<Prompt<EditProfileFormSchema>
			title="Edit profile"
			formSchema={editProfileFormSchema}
			defaultValues={defaultValues}
			content={
				<div className="flex flex-col pt-2 gap-y-3">
					<FormInput name="firstName" label="First name" />
					<FormInput name="lastName" label="Last name" />
					<FormInput name="github" label="Github nick" />
				</div>
			}
			onDecision={async ({ confirmed, data }) => {
				if (!confirmed) return;

				await editProfileAction(data);

				toast.success('Profile updated');
			}}
		>
			<Button size="sm" variant="outline" iconLeft={{ icon: <Pencil /> }} />
		</Prompt>
	);
};
