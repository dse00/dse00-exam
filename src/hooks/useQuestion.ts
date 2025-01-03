import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

export const useQuestion = () => {
    const queryClient = useQueryClient();


    const query = useSearchParams();


    const { data: questionData } = useQuery({
        queryKey: [QUERY_KEYS.QUESTIONS],
        queryFn: () => {
            return services.getQuestions();
        },
        refetchOnWindowFocus: false,
    });



    return { questionData };
};