'use client';
import Link from "next/link";
import { FC } from "react";
import { MessageCard } from "baseui/message-card";
import { SubjectType } from "../page";
import { useRouter } from "next/navigation";

interface props {
    exam: SubjectType;
}

const ExamCard: FC<props> = ({ exam }) => {
    const router = useRouter();
    return (
        <MessageCard
            heading={exam.name_tc}
            buttonLabel="開始測試"
            onClick={() => router.push(`/exam/${exam.path}`)}
            paragraph="香港中學文憑試，數學科，共 120 題"
        />

    );
}

export default ExamCard;