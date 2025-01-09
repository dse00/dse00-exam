'use client'

import { FC } from "react";
import ReactQueryProvider from "./reactQueryProvider";
import { ignoreWarn } from "@/lib/warn";
import { Toaster } from "@/components/ui/toaster";
import { LoginDialog } from "@/components/LoginDialog";


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
}

export default RootProvider;