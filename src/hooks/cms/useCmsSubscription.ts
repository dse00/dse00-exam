import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

import { useMyToast } from '../useMyToast';

export const useCmsSubscription = () => {
  const queryClient = useQueryClient();
  const { successToast } = useMyToast();

  const token = Cookies.get('token') as string;

  const { data: cmsSubscriptiontData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_SUBSCRIPTION],
    queryFn: () => {
      return cmsServices.getAllSubscriptions();
    },
  });

  const { mutate: deleteSubscription } = useMutation({
    mutationFn: (subscriptionId: string) => {
      return cmsServices.deleteSubscription(subscriptionId);
    },
    onSuccess: () => {
      invalidatePaymentsQuery();
      successToast('Subscription deleted successfully');
    },
  });

  const invalidatePaymentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.CMS_SUBSCRIPTION] });
  };

  return { cmsSubscriptiontData, deleteSubscription };
};
