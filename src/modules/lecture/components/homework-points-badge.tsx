import { MonitorCheck, Layers } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';
import { HomeworkType } from '@/modules/homework/schema';
import { Suspense } from 'react';

export const HomeworkPointsBadge = ({
  maxPoints,
  ...props
}: {
  homework?: Promise<HomeworkType | undefined>;
  maxPoints: number;
}) => {
  if (props.homework instanceof Promise) {
    return (
      <Suspense fallback={<HomeworkPointsBadge maxPoints={maxPoints} />}>
        {props.homework.then(homework => {
          if (homework) {
            return (
              <Badge
                variant="outline"
                className="border-text-primary-color text-text-primary-color"
              >
                <Icon icon={<MonitorCheck />} className="mr-2" />
                {homework.points} / {maxPoints}
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
