'use client'


import { FC, useState } from "react";

type props = {
    numPages: number;
}
const Pagination: FC<props> = ({ numPages }) => {
    const [page, setPage] = useState(1);
    return (
        <>

        </>
    );
}

export default Pagination;