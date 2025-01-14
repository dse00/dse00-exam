import Cookies from 'js-cookie';

import apiClient from '@/services/ExamApiClient';
import { PaymentType } from '@/types/payment';
import { UserType } from '@/types/user';

const getCmsHeader = (token?: string) => ({
  headers: {
    Authorization: `Bearer ${token || Cookies.get('token')} `,
  },
});

const tryCatch = async (fn: any, defaultValue?: any) => {
  try {
    return await fn;
  } catch (e) {
    console.error(e);

    return defaultValue;
  }
};

export default {
  getAllPayments: async (): Promise<PaymentType[]> => apiClient.get('/payments', getCmsHeader()),

  deletePayment: async (paymentId: string): Promise<PaymentType> =>
    apiClient.delete(`/payments/${paymentId}`, getCmsHeader()),

  getAllUsers: async (token: string): Promise<UserType[]> => apiClient.get('/users', getCmsHeader(token)),
};
