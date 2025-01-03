import { QuestionType } from "@/types/question"
import { UserType } from "@/types/user"
import apiClient from '@/services/ExamApiClient';
import { CommentType, CreateCommentType } from "@/types/comment";


const tutorAPI = process.env.NEXT_PUBLIC_TUTOR_API_URL

export default {
    getUserProfile: async (token: string): Promise<UserType> => {
        const data = await fetch(tutorAPI + '/auth/' + token + '/getUserByToken')
        return data.json()
    },

    getQuestions: async (): Promise<QuestionType[]> => apiClient.get('/questions'),

    getCommentsByQuestionId: async (questionId: string): Promise<CommentType[]> => apiClient.get('/comments/' + questionId),

    createComment: async (createCommentsDto: Partial<CreateCommentType>) => apiClient.post('/comments', createCommentsDto),

    deleteComment: async (commentId: string) => apiClient.delete('/comments/' + commentId)

}