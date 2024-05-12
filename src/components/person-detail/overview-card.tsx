import { cn } from '@/lib/cn';
import { type getSessionUserOverview } from '@/db/session-user-service/overview';
import { getUserOverview } from '@/db/query/overview';

import { LabeledValue } from '../labeled-value';
import { DetailCard } from '../detail-card';

type GetOverviewResult = Awaited<ReturnType<typeof getSessionUserOverview>>;

export const OverviewCard = async ({
	otherFields,
	userId,
	projectId
}: {
	userId: string;
	projectId: string | null;
	otherFields?: (overview: GetOverviewResult) => React.ReactNode;
}) => {
	const overview = await getUserOverview({
		userId,
		projectId
	});
	const { homeworks, project, totalPoints } = overview;

	return (
		<DetailCard title="Overview">
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
					</div>
				</LabeledValue>

				{otherFields?.(overview)}
			</div>
		</DetailCard>
	);
};
