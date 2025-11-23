import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useSession } from '@/auth/client';
import { getHomeworkPointsAction } from '@/modules/homework/action';

export const useMineHomeworkPointsQuery = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['homework-points', session?.user?.id],
    enabled: !!session?.user,
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
