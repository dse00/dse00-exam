'use client';
import { FC } from "react";
import { SubjectType } from "../page";
import { useRouter } from "next/navigation";

interface props {
    exam: SubjectType;
}

const ExamCard: FC<props> = ({ exam }) => {
    const router = useRouter();
    return (
        <>
            香港中學文憑試，數學科，共 120 題
        </>

    );
}

export default ExamCard;