import { useQuery } from '@tanstack/react-query';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';
export const useCmsQuestion = () => {
  const { data: allQuestionsData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_QUESTIONS],
    queryFn: () => {
      return cmsServices.getAllQuestions();
    },
    refetchOnWindowFocus: false,
  });

  return { allQuestionsData };
};
