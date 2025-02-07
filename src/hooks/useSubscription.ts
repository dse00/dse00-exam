import { useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { SubscriptionType } from '@/types/subscription';

export const useSubscription = () => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token');

  const { data: subscriptionData, isError } = useQuery({
    queryKey: [QUERY_KEYS.SUBSCRIPTION],
    queryFn: () => {
      return services.getSubscriptionsByUser(token as string);
    },
    enabled: !!token,
  });

  const isActiveSubscription = checkISActiveSubscription(subscriptionData as SubscriptionType[]);

  const invalidateSubscriptionQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBSCRIPTION] });
  };

  return { subscriptionData, isError, isActiveSubscription, invalidateSubscriptionQuery };
};

export const checkISActiveSubscription = (subscriptionData: SubscriptionType[]) => {
  if (!subscriptionData) return false;

  return new Date(subscriptionData?.at(-1)?.endDate as any) >= new Date();
};
