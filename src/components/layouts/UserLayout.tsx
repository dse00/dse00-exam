import Header from "@/app/_components/Header"
import { LayoutProps } from "./DefaultLayout"

export default ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="flex w-full gap-10">
                <div className="bg-primary w-40">

                    side
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}