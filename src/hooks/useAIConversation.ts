import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useAIConversation = () => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token');

  const { data: aiConversationData, isError } = useQuery({
    queryKey: [QUERY_KEYS.AI_CONVERSATION],
    queryFn: () => {
      return services.getUserAIConversations(token as string);
    },
    enabled: !!token,
  });

  const { mutate: putMessage } = useMutation({
    mutationFn: (content: string) => {
      return services.askAi(content, token as string);
    },
    onSuccess: () => {
      invalidateQuery();
    },
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AI_CONVERSATION] });
  };

  return { aiConversationData, putMessage };
};
