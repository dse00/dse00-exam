import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

import { useMyToast } from '../useMyToast';

export const useCmsComment = () => {
  const queryClient = useQueryClient();
  const { successToast } = useMyToast();

  const { data: cmsCommentData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_DISCUSSION],
    queryFn: () => {
      return cmsServices.getAllComments();
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (discussionId: string) => {
      return cmsServices.deleteComment(discussionId);
    },
    onSuccess: () => {
      invalidatePaymentsQuery();
      successToast('Comment status updated successfully');
    },
  });
  const invalidatePaymentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.CMS_DISCUSSION] });
  };

  return { cmsCommentData, invalidatePaymentsQuery, deleteComment };
};
