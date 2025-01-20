import { useQuery } from '@tanstack/react-query';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

export const useCmsAnswer = () => {
  const { data: cmsAnswerData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_PAYMENT],
    queryFn: () => {
      return cmsServices.getAllAnswers();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  return { cmsAnswerData };
};
