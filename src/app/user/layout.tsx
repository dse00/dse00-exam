import Header from "@/app/_components/Header"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export type LayoutProps = {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="container flex justify-center py-12">
                <div className="grid gap-2">
                    <Link href={'/user/my-list'} className={buttonVariants({ variant: 'ghost' })}>我的記錄</Link>
                    <Link href={'/user/notebook'} className={buttonVariants({ variant: 'ghost' })}>筆記</Link>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}