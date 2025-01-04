import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';


export const useUser = () => {
    const queryClient = useQueryClient();

    const token = Cookies.get('token');

    const { data: userData } = useQuery({
        queryKey: [QUERY_KEYS.USER_PROFILE],
        queryFn: () => {
            return services.getUserProfile(token as string);
        },
        refetchOnWindowFocus: false,
        enabled: !!token,
    });



    return { userData };
};