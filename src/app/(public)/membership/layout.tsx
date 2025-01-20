import { Metadata } from 'next';

import { webData } from '@/constants';

export const metadata: Metadata = {
  title: 'DSE00+ 會員' + ' - ' + webData.title,
};

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  return children;
};
