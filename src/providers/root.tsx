'use client'

import { FC } from "react";
import BaseWebProvider from "./baseWebProvider";
import ReactQueryProvider from "./reactQueryProvider";
import { ignoreWarn } from "@/utils/warn";
import { SnackbarProvider } from "baseui/snackbar";

type props = {
    children: React.ReactNode;
};

ignoreWarn();

const RootProvider: FC<props> = ({ children }) => {


    return (
        <>
                <ReactQueryProvider>
                    <BaseWebProvider>
                        <SnackbarProvider>
                            {children}
                        </SnackbarProvider>
                    </BaseWebProvider>
                </ReactQueryProvider>
        </>
    );
}

export default RootProvider;