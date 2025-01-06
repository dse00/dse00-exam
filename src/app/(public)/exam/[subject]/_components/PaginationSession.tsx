'use client'


import { FC, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname } from "next/navigation";


type props = {
    numPages: number;
    page: number;
}
const PaginationSession: FC<props> = ({ numPages, page }) => {
    const pathname = usePathname();
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {
                    Array.from({ length: numPages }, (_, i) => i + 1).map((item, index) => {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={`${pathname}?page=${item}`}
                                    isActive={page == item}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })
                }
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    );
}

export default PaginationSession;