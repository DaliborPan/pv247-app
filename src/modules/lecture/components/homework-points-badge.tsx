import { MonitorCheck, Layers } from 'lucide-react';
import { Suspense } from 'react';

import { Badge } from '@/components/base/badge/badge';
import { Icon } from '@/components/base/icon/icon';
import type { StudentHomeworkType } from '@/modules/student-homework/types';

export const HomeworkPointsBadge = ({
  maxPoints,
  ...props
}: {
  studentHomework?: Promise<StudentHomeworkType | undefined>;
  maxPoints: number;
}) => {
  if (props.studentHomework instanceof Promise) {
    return (
      <Suspense fallback={<HomeworkPointsBadge maxPoints={maxPoints} />}>
        {props.studentHomework.then(studentHomework => {
          if (studentHomework) {
            return (
              <Badge
                variant="outline"
                className="border-text-primary-color text-text-primary-color"
              >
                <Icon icon={<MonitorCheck />} className="mr-2" />
                {studentHomework.points} / {maxPoints}
              </Badge>
            );
          }

          return <HomeworkPointsBadge maxPoints={maxPoints} />;
        })}
      </Suspense>
    );
  }

  return (
    <Badge variant="outline" className="text-text-terciary">
      <Icon icon={<Layers />} className="mr-2" />
      Max. {maxPoints} points
    </Badge>
  );
};
