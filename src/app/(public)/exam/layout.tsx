'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams } from "next/navigation";

export type LayoutProps = {
    children: React.ReactNode;
}

export default ({ children }: LayoutProps) => {

    const params = useParams();

    return (
        <div className="flex flex-col">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">DSE00</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{params.subject}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                        params.exerciseId && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>Exercise</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    }
                    {
                        params.topic && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>{params.topic}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    }
                    {
                        params.difficulty && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>{params.difficulty}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    }
                </BreadcrumbList>
            </Breadcrumb>

            <div className="container justify-center py-4">{children}</div>
        </div>
    )
}