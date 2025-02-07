import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useAppStore } from '@/store';

import { useMyToast } from './useMyToast';

export const useUser = () => {
  const queryClient = useQueryClient();

  const { successToast, errorToast } = useMyToast();
  const { setLoginDialogOpen } = useAppStore();

  const token = Cookies.get('token');

  const { data: userData, isError } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: () => {
      return services.getUserProfile(token as string);
    },
    enabled: !!token,
  });

  const { data: userRank } = useQuery({
    queryKey: [QUERY_KEYS.USER_RANK],
    queryFn: () => {
      return services.getRankingByUser(token as string);
    },
    enabled: !!token,
  });

  const { mutate: loginUser } = useMutation({
    mutationFn: (data: { email: string; password: string }) => services.loginUser(data.email, data.password),
    onSuccess: ({ token, name }: any) => {
      Cookies.set('token', token, { expires: 365 });
      successToast('成功登入');
      setLoginDialogOpen(false);
      const newWindow = window.open(
        `https://www.dse00.com/p/sync.html?token=${encodeURIComponent(Cookies.get('token') as string)}&username=${name}`,
        '_blank'
      );
      setTimeout(() => {
        newWindow?.close();
      }, 1000);
    },
    onError: error => {
      errorToast(error.message);
    },
  });

  const invalidateUserQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
  };

  return { userData, userRank, isError, loginUser, invalidateUserQuery, token };
};
