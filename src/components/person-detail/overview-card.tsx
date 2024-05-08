import { cn } from '@/lib/cn';
import { getSessionUserOverview } from '@/db/service/overview';

import { LabeledValue } from '../labeled-value';

import { ProfileCard } from './profile-card';

type GetOverviewResult = Awaited<ReturnType<typeof getSessionUserOverview>>;

export const OverviewCard = async ({
	otherFields
}: {
	otherFields?: (overview: GetOverviewResult) => React.ReactNode;
}) => {
	const overview = await getSessionUserOverview();
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
				<LabeledValue label="Total points">
					<div className="flex items-center gap-x-4">
						<span>{totalPoints} points</span>

						{/* <Badge className="flex items-center gap-x-2">
							<Icon name="Check" />
							<span>Course completed</span>
						</Badge> */}
					</div>
				</LabeledValue>

				{otherFields?.(overview)}
			</div>
		</ProfileCard>
	);
};
