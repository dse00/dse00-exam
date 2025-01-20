import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useThreshold = () => {
  const { data: thresholdData } = useQuery({
    queryKey: [QUERY_KEYS.THRESHOLD],
    queryFn: () => {
      return services.getDifficultyThreshold();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  return { thresholdData };
};
