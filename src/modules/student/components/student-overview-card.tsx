import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { cn } from '@/lib/cn';
import { studentLoaders } from '@/modules/student/loader';
import { type UserType } from '@/modules/user/schema';

type StudentOverviewCardProps = {
  user: UserType;
  otherFields?: (
    overview: Awaited<ReturnType<typeof studentLoaders.getOverview>>
  ) => React.ReactNode;
};

export const StudentOverviewCard = async ({
  otherFields,
  user
}: StudentOverviewCardProps) => {
  const overview = await studentLoaders.getOverview(user);

  const { homeworkTotalPoints, project, totalPoints } = overview;

  return (
    <DetailCard title="Overview">
      <div
        className={cn(
          'grid grid-cols-1 gap-6 lg:gap-4',
          otherFields ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        )}
      >
        <LabeledValue label="Homework points">
          {homeworkTotalPoints} points
        </LabeledValue>

        <LabeledValue label="Project points">
          {project?.points ? `${project.points} points` : 'No points yet'}
        </LabeledValue>

        <LabeledValue label="Total points">{totalPoints} points</LabeledValue>

        {otherFields?.(overview)}
      </div>
    </DetailCard>
  );
};
