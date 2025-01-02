import * as React from "react";
import { ProgressBar } from "baseui/progress-bar";

type props = {
    value: number
}


export const CorrectPercentageIndicator: React.FC<props> = ({ value }) => {


    return (
        <ProgressBar
            value={value}
            overrides={{
                BarProgress: {
                    style: ({ $theme, $value }) => {
                        return {
                            ...$theme.typography.font250,
                            backgroundColor: $theme.colors.positive,
                            color: $theme.colors.mono200,
                            position: "relative",
                            ":after": {
                                position: "absolute",
                                content: $value > 5 ? `"${$value}%"` : "",
                                right: "10px",
                            },
                        };
                    },
                },
                Bar: {
                    style: ({ $theme }) => ({
                        height: $theme.sizing.scale600,
                    }),
                },
            }}
        />
    );
}

export default CorrectPercentageIndicator