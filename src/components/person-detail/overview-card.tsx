import { getOverview } from '@/db/service/overview';
import { cn } from '@/lib/cn';

import { LabeledValue } from '../labeled-value';

import { ProfileCard } from './profile-card';

type GetOverviewResult = Awaited<ReturnType<typeof getOverview>>;

export const OverviewCard = async ({
	userId,
	otherFields
}: {
	userId: string;
	otherFields?: (overview: GetOverviewResult) => React.ReactNode;
}) => {
	const overview = await getOverview(userId);
	const { homeworks, project, totalPoints } = overview;

	return (
		<ProfileCard title="Overview">
			<div
				className={cn(
					'grid grid-cols-3 gap-4',
					otherFields ? 'grid-cols-4' : 'grid-cols-3'
				)}
			>
				<LabeledValue label="Homework points">
					{homeworks.totalPoints} points
				</LabeledValue>
				<LabeledValue label="Project points">
					{project.project?.points
						? `${project.project.points} points`
						: 'No points yet'}
				</LabeledValue>
				<LabeledValue label="Total points">{totalPoints} points</LabeledValue>

				{otherFields?.(overview)}
			</div>
		</ProfileCard>
	);
};