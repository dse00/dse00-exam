import apiClient from '@/services/ExamApiClient';
import { CommentType, CreateCommentType } from '@/types/comment';
import { CreateExerciseDto, ExerciseListItemType, ExerciseType, UpdateExerciseDto } from '@/types/exercise';
import { MessageType } from '@/types/message';
import { CreatePaymentRecordDto, PaymentType } from '@/types/payment';
import { PlanType } from '@/types/plan';
import { HomeContentType, QuestionType, SubjectContentType, ThresholdType } from '@/types/question';
import { PutQuotaDto, QuotaType } from '@/types/quota';
import { RankingType } from '@/types/ranking';
import { SubscriptionType } from '@/types/subscription';
import { UserType } from '@/types/user';
import { CreateUserAnswerType, UserAnswerType } from '@/types/userAnswer';

const tutorAPI = process.env.NEXT_PUBLIC_TUTOR_API_URL;

const tryCatch = async (fn: any, defaultValue?: any) => {
  try {
    return await fn;
  } catch (e) {
    console.error(e);

    return defaultValue;
  }
};

export default {
  getHealth: async () => apiClient.get('/health'),

  getContent: async (subject: string): Promise<SubjectContentType> =>
    apiClient.get('/questions/get-content?subject=' + subject),

  getPaperNameMapping: async (): Promise<any> => apiClient.get('/questions/name-mapping'),

  getUserProfile: async (token: string): Promise<UserType> => {
    const res = await fetch(tutorAPI + '/auth/' + encodeURIComponent(token) + '/getUserByToken');
    if (!res.ok) {
      throw new Error('error');
    }

    return res.json();
  },

  loginUser: async (email: string, password: string): Promise<UserType> => {
    const res = await fetch(tutorAPI + '/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }

    return res.json();
  },

  getQuestions: async (filter: any): Promise<QuestionType[]> => {
    const query = new URLSearchParams(filter).toString();

    return apiClient.get('/questions?' + query);
  },

  getQuestionsByArray: async (questionIds: string[]): Promise<QuestionType[]> => {
    return apiClient.get('/questions/get-questions-by-array?questionIds=' + questionIds.join(','));
  },

  getCommentsByQuestionId: async (questionId: string): Promise<CommentType[]> =>
    apiClient.get('/comments/' + questionId),

  createComment: async (createCommentsDto: Partial<CreateCommentType>) =>
    apiClient.post('/comments', createCommentsDto),

  deleteComment: async (commentId: string) => apiClient.delete('/comments/' + commentId),

  getUserAnswers: async (userId: string): Promise<UserAnswerType[]> => apiClient.get('/answers/' + userId),

  createUserAnswer: async (createAnswerDto: CreateUserAnswerType) => apiClient.post('/answers', createAnswerDto),

  deleteUserAnswer: async (answerId: string) => apiClient.delete('/answers/' + answerId),

  createExercise: async (createExerciseDto: CreateExerciseDto) => apiClient.post('/exercises', createExerciseDto),

  getExercise: async (exerciseId: string): Promise<ExerciseType> => apiClient.get('/exercises/' + exerciseId),

  getUserExercises: async (userId: string): Promise<ExerciseListItemType[]> =>
    apiClient.get('/exercises/user/' + userId),

  getRandomExercise: async (subject: string): Promise<ExerciseType> => apiClient.get('/exercises/random/' + subject),

  updateExercise: async (exerciseId: string, updateExerciseDto: UpdateExerciseDto) =>
    apiClient.put('/exercises/' + exerciseId, updateExerciseDto),

  deleteExercise: async (exerciseId: string) => apiClient.delete('/exercises/' + exerciseId),

  getUserComments: async (userId: string): Promise<CommentType[]> => {
    const query = new URLSearchParams({ user: userId }).toString();

    return apiClient.get('/comments?' + query);
  },

  createPaymentRecord: async <T = PaymentType>(paymentRecord: CreatePaymentRecordDto): Promise<T> =>
    apiClient.post('/payments', paymentRecord),

  getPaymentRecords: async (token: string): Promise<PaymentType[]> =>
    apiClient.get('/payments/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getPlans: async (): Promise<PlanType[]> => apiClient.get('/plans'),

  getPlan: async (planKey: string): Promise<PlanType> => apiClient.get('/plans/' + planKey),

  createSubscription: async (userId: string, planId: string) => apiClient.post('/subscriptions', { userId, planId }),

  getSubscription: async (id: string): Promise<SubscriptionType> => apiClient.get('/subscriptions/' + id),

  getSubscriptionsByUser: async (token: string): Promise<SubscriptionType[]> =>
    apiClient.get('/subscriptions/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  putQuota: async (putQuotaDto: PutQuotaDto): Promise<QuotaType> =>
    apiClient.post(
      '/quota',
      { topic: putQuotaDto.topic },
      {
        headers: {
          Authorization: `Bearer ${putQuotaDto.token}`,
        },
      }
    ),

  getQuotaData: async (token: string, topic: string): Promise<QuotaType> =>
    apiClient.get('/quota/user?topic=' + topic, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  test: async (): Promise<QuestionType[]> => {
    return tryCatch(apiClient.get('/questions/test'));
  },

  getRanking: async (): Promise<RankingType[]> => apiClient.get('/answers/leaderboard'),

  getMessageByUser: async (token: string): Promise<MessageType[]> =>
    apiClient.get('/messages/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  acknowledgeMessage: async (messageId: string): Promise<MessageType> =>
    apiClient.put('/messages/' + messageId, {
      acknowledged: true,
    }),

  updateUserProfile: async (updateDto: { name: string; user: string }): Promise<String> => {
    const res = await fetch(tutorAPI + '/student-files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateDto),
    });

    return 'ok';
  },

  getHomeContent: async (): Promise<HomeContentType> => apiClient.get('/questions/home-content'),

  getDifficultyThreshold: async (): Promise<ThresholdType> => apiClient.get('/questions/difficulty-threshold'),

  getRankingByUser: async (token: string): Promise<RankingType> =>
    apiClient.get('/answers/ranking/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
