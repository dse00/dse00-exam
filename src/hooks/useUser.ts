import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';


export const useUser = () => {
    const queryClient = useQueryClient();

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
        staleTime: 1000 * 60 * 60, // 60 mins
    });



    return { userData, isError };
};