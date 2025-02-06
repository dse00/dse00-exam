import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { CreateCommentType } from '@/types/comment';

import { useMyToast } from './useMyToast';

export const useComment = (questionId: string) => {
  const queryClient = useQueryClient();

  const { successToast } = useMyToast();

  const { data: commentsData, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, questionId],
    queryFn: () => {
      return services.getCommentsByQuestionId(questionId);
    },
  });

  const { mutate: createComment } = useMutation({
    mutationFn: (createProductsDto: CreateCommentType) => {
      return services.createComment(createProductsDto);
    },
    onSuccess: () => {
      successToast('你的討論已提交');
      invalidateCommentsQuery();
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: string) => {
      return services.deleteComment(commentId);
    },
    onSuccess: () => {
      successToast('你的討論已被删除');
      invalidateCommentsQuery();
    },
  });

  const invalidateCommentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS, questionId] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_COMMENTS] });
  };

  return { commentsData, createComment, deleteComment, isFetching };
};
