import { type DefaultValues } from 'react-hook-form';

import { Prompt } from '@/components/base/prompt';
import { Button } from '@/components/base/button';
import { FormInput } from '@/components/form/form-fields';

import { type EditProfileFormSchema, editProfileFormSchema } from './schema';
import { editProfileAction } from './edit-profile-action';

export const EditProfileForm = ({
	defaultValues
}: {
	defaultValues: DefaultValues<EditProfileFormSchema>;
}) => (
	<Prompt<EditProfileFormSchema>
		title="Edit profile"
		formSchema={editProfileFormSchema}
		defaultValues={defaultValues}
		content={
			<div className="flex flex-col pt-2 gap-y-3">
				<FormInput name="firstName" label="First name" />
				<FormInput name="lastName" label="Last name" />
			</div>
		}
		onDecision={async ({ confirmed, data }) => {
			if (!confirmed) return;

			await editProfileAction(data);
		}}
	>
		<Button
			size="sm"
			variant="outline"
			iconLeft={{
				name: 'Pencil'
			}}
		/>
	</Prompt>
);
