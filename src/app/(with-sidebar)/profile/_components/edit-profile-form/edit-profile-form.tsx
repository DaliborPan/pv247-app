import { Prompt } from '@/components/base/prompt';
import { Button } from '@/components/base/button';
import { FormInput } from '@/components/form/form-fields';

import { editProfileFormSchema } from './schema';
import { editProfileAction } from './edit-profile-action';

export const EditProfileForm = ({ userId }: { userId: string }) => (
	<Prompt
		title="Edit profile"
		formSchema={editProfileFormSchema}
		defaultValues={{
			id: userId
		}}
		content={
			<div className="flex flex-col gap-y-3 pt-2">
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
