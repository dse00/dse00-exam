import { useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useRanking = () => {
  const queryClient = useQueryClient();

  const token = Cookies.get('token') as string;

  const { data: rankingData } = useQuery({
    queryKey: [QUERY_KEYS.RANKING],
    queryFn: () => {
      return services.getRanking();
    },
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const invalidateRankingQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RANKING] });
  };

  return { rankingData };
};
