import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { cn } from '@/lib/cn';
import { getUserOverview, type GetUserOverviewResult } from '@/modules/shared';

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
