import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import { CMS_QUERY_KEYS, QUERY_KEYS } from '@/constants';
import services from '@/services';
import cmsServices from '@/services/cms';
export type LayoutProps = {
  children: React.ReactNode;
};

export default async ({ children }: LayoutProps) => {
  const health = await services.getHealth();

  if (!health) {
    redirect('/error');
  }

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [CMS_QUERY_KEYS.CMS_SETTINGS],
      queryFn: cmsServices.getSettings,
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.THRESHOLD],
      queryFn: services.getDifficultyThreshold,
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.PAPER_NAME_MAPPING],
      queryFn: services.getPaperNameMapping,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DefaultLayout>{children}</DefaultLayout>
    </HydrationBoundary>
  );
};
