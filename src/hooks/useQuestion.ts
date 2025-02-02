import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';

export const useQuestion = (questionId: string) => {
  const { data: questionData } = useQuery({
    queryKey: [QUERY_KEYS.QUESTIONS],
    queryFn: () => {
      return services.getQuestions(questionId);
    },
    refetchOnWindowFocus: false,
  });

  const { data: allQuestionsData } = useQuery({
    queryKey: [QUERY_KEYS.QUESTIONS],
    queryFn: () => {
      return services.getQuestions({});
    },
    refetchOnWindowFocus: false,
  });

  return { questionData, allQuestionsData };
};
