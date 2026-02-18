import { MonitorCheck, MonitorX } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';
import { getHomeworkPointsMessage } from '@/modules/homework/utils';

export const PointsBadge = ({
  points,
  hasGradingStarted
}: {
  points?: number;
  hasGradingStarted: boolean;
}) => {
  const message = getHomeworkPointsMessage({
    points,
    hasGradingStarted
  });

  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-x-2 bg-primary-200 px-3 py-1 text-sm text-black hover:bg-primary-200"
    >
      {points === undefined ? (
        <>
          <Icon icon={<MonitorX />} />
          <span>{message}</span>
        </>
      ) : (
        <>
          <Icon icon={<MonitorCheck />} />
          <span>{message}</span>
        </>
      )}
    </Badge>
  );
};
