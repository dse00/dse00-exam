import { redirect } from 'next/navigation';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import services from '@/services';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async ({ children }: LayoutProps) => {
  const health = await services.getHealth();

  if (!health) {
    redirect('/error');
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};
