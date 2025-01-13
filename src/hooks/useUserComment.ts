import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { CreateUserAnswerType } from '@/types/userAnswer';

import { useMyToast } from './useMyToast';
import { useUser } from './useUser';

export const useUserComment = () => {
  const queryClient = useQueryClient();

  const { successToast } = useMyToast();

  const { userData } = useUser();

  const { data: userCommentsData } = useQuery({
    queryKey: [QUERY_KEYS.USER_COMMENTS],
    queryFn: () => {
      return services.getUserComments(userData?.user as string);
    },
    enabled: !!userData?.user,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const { mutate: deleteUserComment } = useMutation({
    mutationFn: (commentId: string) => {
      return services.deleteComment(commentId);
    },
    onSuccess: () => {
      successToast('Your comment has been deleted');
      invalidateUserAnswersQuery();
    },
  });

  const invalidateUserAnswersQuery = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_COMMENTS] });

  return { userCommentsData, deleteUserComment };
};
