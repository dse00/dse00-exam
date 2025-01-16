import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { LanguageEnum, QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useAppStore } from '@/store';

export const usePaperNameMapping = () => {
  const token = Cookies.get('token');
  const { language } = useAppStore();

  const { data: paperNameMappingData } = useQuery({
    queryKey: [QUERY_KEYS.PAPER_NAME_MAPPING],
    queryFn: () => {
      return services.getPaperNameMapping();
    },
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  const displayNameKey = language === LanguageEnum.TC ? 'displayNameTc' : 'displayName';

  return { paperNameMappingData, displayNameKey };
};
