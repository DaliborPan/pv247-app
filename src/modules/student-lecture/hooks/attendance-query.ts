import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useSession } from '@/auth/client';

import { getAttendancesAction } from '../action';

export const useAttendanceQuery = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['attendance', session?.user?.id],
    enabled: !!session?.user,
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
