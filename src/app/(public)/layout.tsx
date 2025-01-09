import Header from "@/app/_components/Header"
import LanguageButton from "@/components/LanguageButton";

export type LayoutProps = {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col items-center sm:gap-6 gap-4 pb-12">
            <Header />
            <LanguageButton />
            <div className="container justify-center px-2">{children}</div>
        </div>
    )
}