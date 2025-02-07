import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { CreateUserAnswerType } from '@/types/userAnswer';

import { useMyToast } from './useMyToast';
import { useUser } from './useUser';

export const useUserAnswer = () => {
  const queryClient = useQueryClient();

  const { successToast } = useMyToast();

  const { token } = useUser();

  const { data: userAnswersData } = useQuery({
    queryKey: [QUERY_KEYS.USER_ANSWERS],
    queryFn: () => {
      return services.getUserAnswers(token as string);
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const { mutate: createUserAnswer } = useMutation({
    mutationFn: (createUserAnswerDto: CreateUserAnswerType) => {
      return services.createUserAnswer(createUserAnswerDto);
    },
    onSuccess: () => {
      invalidateUserAnswersQuery();
    },
  });

  const { mutate: deleteUserAnswer } = useMutation({
    mutationFn: (answerId: string) => {
      return services.deleteUserAnswer(answerId);
    },
    onSuccess: () => {
      successToast('刪除成功');
      invalidateUserAnswersQuery();
    },
  });

  const invalidateUserAnswersQuery = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ANSWERS] });

  const userScore = userAnswersData?.reduce((acc, curr) => {
    if (curr.correct) return acc + (100 - curr.question.correctPercentage);

    return acc;
  }, 0);

  return { userAnswersData, createUserAnswer, deleteUserAnswer, invalidateUserAnswersQuery, userScore };
};
