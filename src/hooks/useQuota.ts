import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { PutQuotaDto } from '@/types/quota';

export const useQuota = (topic: string) => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token');

  const { data: quotaData, isError } = useQuery({
    queryKey: [QUERY_KEYS.QUOTA],
    queryFn: () => {
      return services.getQuotaData(token as string, topic);
    },
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  const { mutate: updateQuota } = useMutation({
    mutationFn: (createProductsDto: PutQuotaDto) => {
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

  return { quotaData, isError };
};
