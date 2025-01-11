'use client';

import { FC } from 'react';

import LoginDialog from '@/components/LoginDialog';
import { Toaster } from '@/components/ui/toaster';
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
          <LoginDialog />
        </>
      </ReactQueryProvider>
      <Toaster />
    </>
  );
};

export default RootProvider;
