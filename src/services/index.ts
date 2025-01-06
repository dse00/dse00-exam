import { QuestionType } from "@/types/question"
import { UserType } from "@/types/user"
import apiClient from '@/services/ExamApiClient';
import { CommentType, CreateCommentType } from "@/types/comment";
import { CreateUserAnswerType, UserAnswerType } from "@/types/userAnswer";


const tutorAPI = process.env.NEXT_PUBLIC_TUTOR_API_URL

export default {
    getUserProfile: async (token: string): Promise<UserType> => {

        try {
            const res = await fetch(tutorAPI + '/auth/' + token + '/getUserByToken')
            if (!res.ok) {
                throw new Error('error')
            }
            return res.json()
        } catch (error: any) {
            throw error
        }
    },

    getQuestions: async (filter: any): Promise<QuestionType[]> => {

        const query = new URLSearchParams(filter).toString()
        return apiClient.get('/questions?' + query)
    },

    getCommentsByQuestionId: async (questionId: string): Promise<CommentType[]> => apiClient.get('/comments/' + questionId),

    createComment: async (createCommentsDto: Partial<CreateCommentType>) => apiClient.post('/comments', createCommentsDto),

    deleteComment: async (commentId: string) => apiClient.delete('/comments/' + commentId),

    getUserAnswers: async (userId: string): Promise<UserAnswerType[]> => apiClient.get('/answers/' + userId),

    createUserAnswer: async (createAnswerDto: CreateUserAnswerType) => apiClient.post('/answers', createAnswerDto),

    deleteUserAnswer: async (answerId: string) => apiClient.delete('/answers/' + answerId),

}