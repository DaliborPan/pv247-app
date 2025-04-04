import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { getAttendancesAction } from '../action';

export const useAttendanceQuery = () => {
  const session = useSession();

  return useQuery({
    queryKey: ['attendance', session.data?.user?.id],
    enabled: !!session.data?.user,
    queryFn: async () => {
      const [data, error] = await getAttendancesAction();

      if (error) {
        toast.error(error.message);
        return;
      }

      return data;
    }
  });
};
