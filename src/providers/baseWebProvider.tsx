'use client'
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, styled } from "baseui";
import { FC, ReactNode } from "react";
import { styletron } from "./styletron";
import { baseWebTheme } from "@/theme/baseWebTheme";
import { ignoreWarn } from "@/utils/warn";

type props = {
    children: ReactNode
}

ignoreWarn();

const Centered = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
});

const BaseWebProvider: FC<props> = ({ children }) => {

    return (
        <StyletronProvider value={styletron}>
            <BaseProvider theme={baseWebTheme}>
                <Centered>
                    {children}
                </Centered>
            </BaseProvider>
        </StyletronProvider>
    );
}
export default BaseWebProvider