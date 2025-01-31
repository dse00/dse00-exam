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
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
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
