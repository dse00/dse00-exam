import { useQuery } from '@tanstack/react-query';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

export const useCmsAnswer = () => {
  const { data: cmsAnswerData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_ANSWER],
    queryFn: () => {
      return cmsServices.getAllAnswers();
    },
  });

  return { cmsAnswerData };
};
