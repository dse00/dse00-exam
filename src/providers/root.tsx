'use client';

import { FC } from 'react';

import CallForSubscriptionDialog from '@/app/_components/CallForSubscriptionDialog';
import GoogleAnalytic from '@/app/_components/GoogleAnalytic';
import { Toaster } from '@/components/ui/toaster';
import WebLoading from '@/components/WebLoading';
import { ignoreWarn } from '@/lib/warn';

import ReactQueryProvider from './reactQueryProvider';

type props = {
  children: React.ReactNode;
};

ignoreWarn();

const RootProvider: FC<props> = ({ children }) => {
  return (
    <>
      <ReactQueryProvider>
        <>
          {children}
          <CallForSubscriptionDialog />
          <WebLoading />
          <GoogleAnalytic />
        </>
      </ReactQueryProvider>
      <Toaster />
    </>
  );
};

export default RootProvider;
