import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useRanking = () => {
  const queryClient = useQueryClient();

  const { data: rankingData } = useQuery({
    queryKey: [QUERY_KEYS.RANKING],
    queryFn: () => {
      return services.getRanking();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const invalidateRankingQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RANKING] });
  };

  return { rankingData };
};
