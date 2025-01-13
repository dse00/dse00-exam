'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
type props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const ReactQueryProvider: FC<props> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
