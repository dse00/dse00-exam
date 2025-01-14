import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

export const useCmsPayment = () => {
  const queryClient = useQueryClient();

  const { data: cmsPaymentData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_PAYMENT],
    queryFn: () => {
      return cmsServices.getAllPayments();
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: deletePayment } = useMutation({
    mutationFn: (paymentId: string) => {
      return cmsServices.deletePayment(paymentId);
    },
    onSuccess: () => {
      invalidatePaymentsQuery();
    },
  });

  const invalidatePaymentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.CMS_PAYMENT] });
  };

  return { cmsPaymentData, deletePayment };
};
