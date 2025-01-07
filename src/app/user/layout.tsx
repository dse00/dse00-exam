'use client'
import Header from "@/app/_components/Header"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export type LayoutProps = {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date())



    return (
        <div className="flex flex-col items-center gap-6">
            <Header />
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">DSE00</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>我的記錄</BreadcrumbLink>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="container flex justify-center gap-20">

                <div className="grid gap-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                    <Link href={'/user/my-lists'} className={buttonVariants({ variant: 'ghost' })}>我的記錄</Link>
                    <Link href={'/user/notebook'} className={buttonVariants({ variant: 'ghost' })}>筆記</Link>


                </div>
                <div className="grow">
                    {children}
                </div>
            </div>
        </div>
    )
}