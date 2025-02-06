import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useQuota = (topic: string) => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token');

  const { data: quotaData, isError } = useQuery({
    queryKey: [QUERY_KEYS.QUOTA],
    queryFn: () => {
      return services.getQuotaData(token as string, topic);
    },
    enabled: !!token,
  });

  const { mutate: putQuota } = useMutation({
    mutationFn: (topic: string) => {
      return services.putQuota({
        token: token as string,
        topic,
      });
    },
    onSuccess: () => {
      invalidateQuery();
    },
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.QUOTA] });
  };

  return { quotaData, isError, putQuota };
};
