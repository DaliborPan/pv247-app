import { Suspense } from 'react';

import { DetailCard } from '@/components/detail-card';
import { LabeledValue } from '@/components/labeled-value';
import { cn } from '@/lib/cn';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';
import { getStudentOverviewQuery } from '@/modules/student/queries';
import {
  type StudentOverviewType,
  type StudentType
} from '@/modules/student/types';

type StudentOverviewCardProps = {
  user: Promise<Pick<StudentType, 'id' | 'role'>>;
  otherFields?: (overview: StudentOverviewType) => React.ReactNode;
};

export const StudentOverviewCard = async ({
  otherFields,
  ...props
}: StudentOverviewCardProps) => (
  <Suspense fallback={<DetailCard title="Overview" />}>
    {props.user.then(user => {
      if (user.role !== 'student') {
        return null;
      }

      const overviewPromise = getStudentOverviewQuery(user.id);

      return (
        <DetailCard title="Overview">
          <div
            className={cn(
              'grid grid-cols-1 gap-6 lg:gap-4',
              otherFields ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            )}
          >
            <LabeledValue label="Homework points">
              <Suspense>
                {overviewPromise.then(
                  overview => `${overview.homeworkTotalPoints} points`
                )}
              </Suspense>
            </LabeledValue>

            <LabeledValue label="Project">
              <Suspense>
                {overviewPromise.then(overview =>
                  getProjectStatusLabel(overview.project)
                )}
              </Suspense>
            </LabeledValue>

            <LabeledValue label="Total points">
              <Suspense>
                {overviewPromise.then(
                  overview => `${overview.totalPoints} points`
                )}
              </Suspense>
            </LabeledValue>

            <Suspense>
              {overviewPromise.then(overview => otherFields?.(overview))}
            </Suspense>
          </div>
        </DetailCard>
      );
    })}
  </Suspense>
);
