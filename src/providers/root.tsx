'use client'

import { FC } from "react";
import ReactQueryProvider from "./reactQueryProvider";
import { ignoreWarn } from "@/utils/warn";
import LayoutProvider from "./LayoutProvider";


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