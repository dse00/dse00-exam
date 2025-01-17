import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useMessage = () => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token') as string;

  const { data: messageData } = useQuery({
    queryKey: [QUERY_KEYS.MESSAGES],
    queryFn: () => {
      return services.getMessageByUser(token);
    },
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const { mutate: acknowledgeMessage } = useMutation({
    mutationFn: (messageId: string) => {
      return services.acknowledgeMessage(messageId);
    },
  });

  const invalidateMessageQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MESSAGES] });
  };

  return { messageData, acknowledgeMessage };
};
