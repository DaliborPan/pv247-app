'use client';

import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields';
import { Button } from '@/components/base/button';

import { setProjectPointsFormSchema } from './schema';
import { setProjectPointsAction } from './actions';

export const SetProjectPointsForm = ({
	projectId,
	points
}: {
	projectId: string;
	points: number | null;
}) => (
	<Prompt
		title="Set points"
		formSchema={setProjectPointsFormSchema}
		defaultValues={{
			projectId,
			points: points ?? undefined
		}}
		content={
			<div className="flex flex-col pt-2 gap-y-3">
				<FormInput type="number" name="points" label="Points" />
			</div>
		}
		onDecision={async ({ confirmed, data }) => {
			if (!confirmed) return;

			await setProjectPointsAction(data);
		}}
	>
		<Button
			size="sm"
			iconLeft={{
				name: 'SquareArrowOutUpRight'
			}}
		>
			Set points
		</Button>
	</Prompt>
);
