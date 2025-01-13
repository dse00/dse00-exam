'use client';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import UserLayout from '@/components/layouts/UserLayout';

type props = {
  children: React.ReactNode;
};

const LayoutProvider: FC<props> = ({ children }) => {
  const path = usePathname();

  if (path.includes('/user')) {
    return <UserLayout>{children}</UserLayout>;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};

export default LayoutProvider;
