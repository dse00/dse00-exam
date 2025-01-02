'use client'

import { PageControl } from "baseui/page-control";
import { Button, SIZE } from "baseui/button";
import { ChevronLeft, ChevronRight } from "baseui/icon";
import { FC, useState } from "react";

type props = {
    numPages: number;
}
const Pagination: FC<props> = ({ numPages }) => {
    const [page, setPage] = useState(1);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <Button
                    size={SIZE.mini}
                    disabled={page === 1}
                    onClick={() => setPage((prevPage) => prevPage - 1)}
                >
                    <ChevronLeft size={16} />
                </Button>
                <span>{page}</span>

                <Button
                    size={SIZE.mini}
                    disabled={page === numPages}
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
            <PageControl
                numPages={numPages}
                currentPage={page}
                onPageChange={({ nextPage }) => setPage(nextPage)}
                aria-label="seven-pages"
            />
        </div>
    );
}

export default Pagination;