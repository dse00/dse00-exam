import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

import { useMyToast } from '../useMyToast';

export const useCmsPayment = () => {
  const queryClient = useQueryClient();
  const { successToast } = useMyToast();

  const token = Cookies.get('token') as string;

  const { data: cmsPaymentData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_PAYMENT],
    queryFn: () => {
      return cmsServices.getAllPayments();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  const { mutate: deletePayment } = useMutation({
    mutationFn: (paymentId: string) => {
      return cmsServices.deletePayment(paymentId);
    },
    onSuccess: () => {
      invalidatePaymentsQuery();
    },
  });

  const { mutate: updatePayment } = useMutation({
    mutationFn: (updatePaymentDto: { paymentId: string; status: string }) => {
      const { paymentId, status } = updatePaymentDto;

      return cmsServices.updatePayment({
        paymentId,
        status,
        token,
      });
    },
    onSuccess: () => {
      invalidatePaymentsQuery();
      successToast('Payment status updated successfully');
    },
  });

  const invalidatePaymentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.CMS_PAYMENT] });
  };

  return { cmsPaymentData, deletePayment, updatePayment };
};
