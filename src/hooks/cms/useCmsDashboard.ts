import { useQuery } from '@tanstack/react-query';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';

export const useCmsDashboard = () => {
  const { data: dashboardData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_DASHBOARD],
    queryFn: () => {
      return cmsServices.getDashboard();
    },
    refetchOnWindowFocus: false,
  });

  return { dashboardData };
};
