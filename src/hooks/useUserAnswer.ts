import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { CreateUserAnswerType } from '@/types/userAnswer';

import { useMyToast } from './useMyToast';
import { useUser } from './useUser';

export const useUserAnswer = () => {
  const queryClient = useQueryClient();

  const { successToast } = useMyToast();

  const { userData } = useUser();

  const { data: userAnswersData } = useQuery({
    queryKey: [QUERY_KEYS.USER_ANSWERS],
    queryFn: () => {
      return services.getUserAnswers(userData?.user as string);
    },
    enabled: !!userData?.user,
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
      successToast('Your answer has been deleted');
      invalidateUserAnswersQuery();
    },
  });

  const invalidateUserAnswersQuery = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ANSWERS] });

  return { userAnswersData, createUserAnswer, deleteUserAnswer };
};
