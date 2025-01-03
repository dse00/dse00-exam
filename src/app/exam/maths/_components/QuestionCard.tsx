'use client'
import { FC } from "react";
import AnswerDiscussion from "./AnswerDiscussion";
import { QuestionType } from "@/types/question";
import Image from "next/image";

interface props {
    question: QuestionType;
    index: number;
}

const QuestionCard: FC<props> = ({ question, index }) => {
    return (

        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="px-4 py-2 bg-primary text-white">
                <h2 className="font-black">Q{index + 1}</h2>
            </div>
            <div className="p-4 grid gap-4">
                <div >
                    <Image src={question.questionImage} className="" alt="question" width={1000} height={100} priority/>
                </div>
                <AnswerDiscussion question={question} />
            </div>
        </div>
    );
}

export default QuestionCard;