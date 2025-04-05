import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { getHomeworkPointsAction } from '@/modules/homework/action';

export const useMineHomeworkPointsQuery = () => {
  const session = useSession();

  return useQuery({
    queryKey: ['homework-points', session.data?.user?.id],
    enabled: !!session.data?.user,
    queryFn: async () => {
      const [data, error] = await getHomeworkPointsAction(undefined);

      if (error) {
        toast.error(error.message);
        return;
      }

      return data;
    }
  });
};
