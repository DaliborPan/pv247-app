'use client';

import { Button } from '@/components/base/button';
import { Prompt } from '@/components/base/prompt';
import { FormInput } from '@/components/form/form-fields';
import { type Lecture } from '@/db';

import { setHomeworkPointsFormSchema } from './schema';
import { setHomeworkPointsAction } from './set-homework-points-action';

export const SetHomeworkPointsForm = ({
	lectorId,
	studentId,
	lecture,
	points
}: {
	lectorId: string;
	studentId: string;
	lecture: Lecture;
	points?: number;
}) => (
	<Prompt
		title="Set points"
		formSchema={setHomeworkPointsFormSchema}
		defaultValues={{
			lectorId,
			studentId,
			lecture,
			points
		}}
		content={
			<div className="flex flex-col pt-2 gap-y-3">
				<FormInput type="number" name="points" label="Points" />
			</div>
		}
		onDecision={async ({ confirmed, data }) => {
			if (!confirmed) return;

			await setHomeworkPointsAction({ ...data, isCreating: !points });
		}}
	>
		<Button
			size="sm"
			className="text-black bg-primary-200 hover:bg-primary-300"
			iconLeft={{
				name: 'SquareArrowOutUpRight'
			}}
		>
			Set points
		</Button>
	</Prompt>
);
