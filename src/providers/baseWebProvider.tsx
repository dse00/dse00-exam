'use client'
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { FC, ReactNode } from "react";
import { styletron } from "./styletron";

type props = {
    children: ReactNode
}


const Centered = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
});

const BaseWebProvider: FC<props> = ({ children }) => {
    return (
        <StyletronProvider value={styletron}>
            <BaseProvider theme={LightTheme}>
                <Centered>
                    {children}
                </Centered>
            </BaseProvider>
        </StyletronProvider>
    );
}
export default BaseWebProvider