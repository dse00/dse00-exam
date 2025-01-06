'use client'
import Header from "@/app/_components/Header"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";

export type LayoutProps = {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date())



    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="container flex justify-center py-12 gap-20">
                <div className="grid gap-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                    <Link href={'/user/my-list'} className={buttonVariants({ variant: 'ghost' })}>我的記錄</Link>
                    <Link href={'/user/notebook'} className={buttonVariants({ variant: 'ghost' })}>筆記</Link>


                </div>
                <div className="grow">
                    {children}
                </div>
            </div>
        </div>
    )
}