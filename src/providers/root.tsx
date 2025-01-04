'use client'

import { FC } from "react";
import ReactQueryProvider from "./reactQueryProvider";
import { ignoreWarn } from "@/utils/warn";


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
        </>
    );
}

export default RootProvider;