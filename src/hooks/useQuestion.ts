import { QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = () => {

    const { data: questionData } = useQuery({
        queryKey: [QUERY_KEYS.QUESTIONS],
        queryFn: () => {
            return services.getQuestions();
        },
        refetchOnWindowFocus: false,
    });



    return { questionData };
};