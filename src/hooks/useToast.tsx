import { Check } from "baseui/icon";
import { DURATION, useSnackbar } from "baseui/snackbar";

export const useToast = () => {
    const { enqueue } = useSnackbar();

    const successToast = (message: string) => {
        enqueue(
            {
                message,
                startEnhancer: ({ size }) => <Check size={size} />,
                overrides: {
                    Root: {
                        style: {
                            backgroundColor: "#809F80",
                            opacity: 0.95,
                        }
                    }
                }
            },
            DURATION.medium,
        )
    }

    return { successToast }

}