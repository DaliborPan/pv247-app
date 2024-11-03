import { MonitorCheck, MonitorX } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

export const PointsBadge = ({ points }: { points?: number }) => (
  <Badge
    variant="secondary"
    className="flex items-center px-3 py-1 text-sm text-black bg-primary-200 gap-x-2 hover:bg-primary-200"
  >
    {points === undefined ? (
      <>
        <Icon icon={<MonitorX />} />
        <span>Not scored yet.</span>
      </>
    ) : (
      <>
        <Icon icon={<MonitorCheck />} />
        <span>{points} points</span>
      </>
    )}
  </Badge>
);
