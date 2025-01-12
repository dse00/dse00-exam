import apiClient from '@/services/ExamApiClient';
import { CommentType, CreateCommentType } from '@/types/comment';
import { CreateExerciseDto, ExerciseListItemType, ExerciseType, UpdateExerciseDto } from '@/types/exercise';
import { CreatePaymentRecordDto } from '@/types/payment';
import { HomeContentType, PaperType, QuestionType } from '@/types/question';
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
  getContent: async (): Promise<HomeContentType> => apiClient.get('/questions/get-content'),

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
      throw new Error('error');
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

  createPaymentRecord: async (paymentRecord: CreatePaymentRecordDto) => apiClient.post('/payments', paymentRecord),
};
