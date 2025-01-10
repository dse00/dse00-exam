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
import { getPagination } from "@/lib/getPagination";


type props = {
    numPages: number;
    page: number;
}
const PaginationSession: FC<props> = ({ numPages, page }) => {
    const pathname = usePathname();
    return (
        <Pagination>
            <PaginationContent>
                {
                    page > 1 && <PaginationItem>
                        <PaginationPrevious href={`${pathname}?page=${page - 1}`} />
                    </PaginationItem>
                }
                {
                    getPagination(page, numPages).map((item, index) => {
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
                {

                    page < numPages - 2 && <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                }
                {
                    page < numPages && <PaginationItem>
                        <PaginationNext href={`${pathname}?page=${page + 1}`} />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>

    );
}

export default PaginationSession;