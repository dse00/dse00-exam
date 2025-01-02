'use client'
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { FC, ReactNode } from "react";
import { styletron } from "./styletron";
import { baseWebTheme } from "@/theme/baseWebTheme";

type props = {
    children: ReactNode
}


const BaseWebProvider: FC<props> = ({ children }) => {

    return (
        <StyletronProvider value={styletron}>
            <BaseProvider theme={baseWebTheme}>
                {children}
            </BaseProvider>
        </StyletronProvider>
    );
}
export default BaseWebProvider