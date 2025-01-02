'use client'

import { FC } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
type props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient()


const ReactQueryProvider: FC<props> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider;