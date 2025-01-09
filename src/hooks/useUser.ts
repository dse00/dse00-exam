import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useMyToast } from './useMyToast';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';


export const useUser = () => {
    const queryClient = useQueryClient();

    const { successToast } = useMyToast();
    const { setLoginDialogOpen } = useAppStore();


    const token = Cookies.get('token');


    const { data: userData, isError } = useQuery({
        queryKey: [QUERY_KEYS.USER_PROFILE],
        queryFn: () => {
            return services.getUserProfile(token as string);
        },
        retry: false,
        throwOnError: false,
        refetchOnWindowFocus: false,
        enabled: !!token,
        staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
    });




    const { mutate: loginUser } = useMutation({
        mutationFn: (data: { email: string, password: string }) => services.loginUser(data.email, data.password),
        onSuccess: ({ token }: any) => {
            Cookies.set('token', token, { expires: 365 });
            successToast("成功登入")
            setLoginDialogOpen(false);
        },
    });


    const invalidateUserQuery = () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] })
    };




    return { userData, isError, loginUser };
};