import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getAttendancesAction } from '../server/action';

export const useAttendanceQuery = ({ studentId }: { studentId?: string }) =>
  useQuery({
    queryKey: ['attendance', studentId],
    enabled: !!studentId,
    queryFn: async () => {
      if (!studentId) return;

      const result = await getAttendancesAction({ studentId });

      if (result.status === 'error') {
        toast.error(result.message);

        return;
      }

      return result;
    }
  });
