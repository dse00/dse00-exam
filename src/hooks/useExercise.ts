import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { CreateCommentType } from '@/types/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMyToast } from './useMyToast';
import { useUser } from './useUser';


export const useExercise = () => {
    const queryClient = useQueryClient();

    const { successToast } = useMyToast();

    const { userData } = useUser();
    const { data: userExerciseData } = useQuery({
        queryKey: [QUERY_KEYS.EXERCISE],
        queryFn: () => {
            return services.getUserExercises(userData?.user as string);
        },
        enabled: !!userData,
        refetchOnWindowFocus: false,
    });

    const { mutate: createComment } = useMutation({
        mutationFn: (createProductsDto: CreateCommentType) => {
            return services.createComment(createProductsDto);
        },
        onSuccess: () => {
            successToast("Your answer has been posted")
            invalidateCommentsQuery();
        },
    });

    const { mutate: deleteComment } = useMutation({
        mutationFn: (commentId: string) => {
            return services.deleteComment(commentId);
        },
        onSuccess: () => {
            successToast("Your answer has been deleted")
            invalidateCommentsQuery();
        },
    });


    const invalidateCommentsQuery = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXERCISE] });


    return { userExerciseData, createComment, deleteComment };
};