import { Metadata } from 'next';

import { webData } from '@/constants';

export const metadata: Metadata = {
  title: 'App Settings' + ' - ' + webData.title,
};

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
