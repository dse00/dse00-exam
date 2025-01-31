import { useQuery } from '@tanstack/react-query';

import { LanguageEnum, QUERY_KEYS } from '@/constants';
import services from '@/services';
import { useAppStore } from '@/store';

export const usePaperNameMapping = () => {
  const { language } = useAppStore();

  const { data: paperNameMappingData } = useQuery({
    queryKey: [QUERY_KEYS.PAPER_NAME_MAPPING],
    queryFn: () => {
      return services.getPaperNameMapping();
    },
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  const displayNameKey = language === LanguageEnum.TC ? 'displayNameTc' : 'displayName';

  const getPaperNameByLang = (key: string) => paperNameMappingData?.[key][displayNameKey];

  const isLoaded = !!paperNameMappingData;

  return { paperNameMappingData, displayNameKey, getPaperNameByLang, isLoaded };
};
