import Cookies from 'js-cookie';

import apiClient from '@/services/ExamApiClient';
import { CmsCommentType } from '@/types/comment';
import { DashboardType } from '@/types/dashboard';
import { PaymentType } from '@/types/payment';
import { QuestionType } from '@/types/question';
import { SubscriptionType } from '@/types/subscription';
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

  updatePayment: async (updatePaymentDto: { paymentId: string; status: string; token: string }): Promise<PaymentType> =>
    apiClient.put(
      `/payments/${updatePaymentDto.paymentId}`,
      { status: updatePaymentDto.status },
      getCmsHeader(updatePaymentDto.token)
    ),

  getAllSubscriptions: async (): Promise<SubscriptionType[]> => apiClient.get('/subscriptions', getCmsHeader()),

  deleteSubscription: async (subscriptionId: string): Promise<SubscriptionType> =>
    apiClient.delete(`/subscriptions/${subscriptionId}`, getCmsHeader()),

  getAllAnswers: async (): Promise<any> => apiClient.get('/answers', getCmsHeader()),

  getAllComments: async (): Promise<CmsCommentType[]> => apiClient.get('/comments', getCmsHeader()),

  deleteComment: async (commentId: string): Promise<CmsCommentType> =>
    apiClient.delete(`/comments/${commentId}`, getCmsHeader()),

  getAllQuestions: async (): Promise<QuestionType[]> => apiClient.get('/questions/cms', getCmsHeader()),

  getDashboard: async (): Promise<DashboardType> => apiClient.get('/dashboard', getCmsHeader()),
};
