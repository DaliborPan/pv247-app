import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { type User } from '@/db';
import { cn } from '@/lib/cn';
import {
  getStudentOverviewLoader,
  type GetStudentOverviewLoaderResult
} from '@/modules/student/loader';

type StudentOverviewCardProps = {
  user: User;
  otherFields?: (overview: GetStudentOverviewLoaderResult) => React.ReactNode;
};

export const StudentOverviewCard = async ({
  otherFields,
  user
}: StudentOverviewCardProps) => {
  const overview = await getStudentOverviewLoader(user);

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
