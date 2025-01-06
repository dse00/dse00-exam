'use client'

import { FC } from "react";
import ReactQueryProvider from "./reactQueryProvider";
import { ignoreWarn } from "@/lib/warn";
import { Toaster } from "@/components/ui/toaster";


type props = {
    children: React.ReactNode;
};

ignoreWarn();

const RootProvider: FC<props> = ({ children }) => {

    return (
        <>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
            <Toaster />
        </>
    );
}

export default RootProvider;