import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { type User } from '@/db';
import { cn } from '@/lib/cn';
import {
  getUserOverviewLoader,
  type GetUserOverviewLoaderResult
} from '@/modules/shared/server';

type StudentOverviewCardProps = {
  user: User;
  otherFields?: (overview: GetUserOverviewLoaderResult) => React.ReactNode;
};

export const StudentOverviewCard = async ({
  otherFields,
  user
}: StudentOverviewCardProps) => {
  const overview = await getUserOverviewLoader(user);

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
