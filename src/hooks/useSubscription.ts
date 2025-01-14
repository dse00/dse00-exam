import { useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useSubscription = () => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token');

  const { data: subscriptionData, isError } = useQuery({
    queryKey: [QUERY_KEYS.SUBSCRIPTION],
    queryFn: () => {
      return services.getSubscriptionsByUser(token as string);
    },
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  const isActiveSubscription = new Date(subscriptionData?.at(-1)?.endDate as any) >= new Date();

  const invalidateUserQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBSCRIPTION] });
  };

  return { subscriptionData, isError, isActiveSubscription };
};
