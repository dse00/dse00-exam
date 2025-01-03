import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { CreateCommentType } from '@/types/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';


export const useComment = (questionId: string) => {
    const queryClient = useQueryClient();

    const { successToast } = useToast();

    const { data: commentsData } = useQuery({
        queryKey: [QUERY_KEYS.COMMENTS, questionId],
        queryFn: () => {
            return services.getCommentsByQuestionId(questionId);
        },
        refetchOnWindowFocus: false,
    });

    const { mutate: createComment } = useMutation({
        mutationFn: (createProductsDto: CreateCommentType) => {
            return services.createComment(createProductsDto);
        },
        onSuccess: () => {
            successToast("Your answer has been posted")
            invalidateProductsQuery();
        },
    });

    const { mutate: deleteComment } = useMutation({
        mutationFn: (commentId: string) => {
            return services.deleteComment(commentId);
        },
        onSuccess: () => {
            successToast("Your answer has been deleted")
            invalidateProductsQuery();
        },
    });


    const invalidateProductsQuery = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS] });


    return { commentsData, createComment, deleteComment };
};