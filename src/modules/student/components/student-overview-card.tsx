import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { cn } from '@/lib/cn';
import {
  getUserOverview,
  type GetUserOverviewResult
} from '@/modules/shared/server';

type StudentOverviewCardProps = {
  userId: string;
  projectId: string | null;
  otherFields?: (overview: GetUserOverviewResult) => React.ReactNode;
};

export const StudentOverviewCard = async ({
  otherFields,
  userId,
  projectId
}: StudentOverviewCardProps) => {
  const overview = await getUserOverview(userId, projectId);

  const { homeworks, project, totalPoints } = overview;

  return (
    <DetailCard title="Overview">
      <div
        className={cn(
          'grid grid-cols-1 gap-6 lg:gap-4',
          otherFields ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
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
    </DetailCard>
  );
};
