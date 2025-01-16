import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useAppStore } from '@/store';
import { CreateExerciseDto, UpdateExerciseDto } from '@/types/exercise';

import { useMyToast } from './useMyToast';
import { useUser } from './useUser';

export const useExercise = () => {
  const queryClient = useQueryClient();

  const { successToast } = useMyToast();
  const { setLoading } = useAppStore();

  const { userData } = useUser();
  const { data: userExerciseData } = useQuery({
    queryKey: [QUERY_KEYS.EXERCISE],
    queryFn: () => {
      return services.getUserExercises(userData?.user as string);
    },
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });

  const { mutate: createExercise } = useMutation({
    mutationFn: (createProductsDto: CreateExerciseDto) => {
      return services.createExercise(createProductsDto);
    },
    onSuccess: () => {
      successToast('已創建練習本');
      invalidateCommentsQuery();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { mutate: updateExercise } = useMutation({
    mutationFn: ({ exerciseId, updateExerciseDto }: { exerciseId: string; updateExerciseDto: UpdateExerciseDto }) => {
      return services.updateExercise(exerciseId, updateExerciseDto);
    },
    onSuccess: () => {
      successToast('你的練習本已更新');
      invalidateCommentsQuery();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { mutate: deleteExercise } = useMutation({
    mutationFn: (exerciseId: string) => {
      return services.deleteExercise(exerciseId);
    },
    onSuccess: () => {
      successToast('你的練習本已删除');
      invalidateCommentsQuery();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const invalidateCommentsQuery = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXERCISE] });

  return { userExerciseData, createExercise, updateExercise, deleteExercise };
};
