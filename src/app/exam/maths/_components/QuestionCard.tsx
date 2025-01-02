'use client'
import { FC } from "react";
import { QuestionType } from "../data";
import AnswerDiscussion from "./AnswerDiscussion";

interface props {
    question: QuestionType;
    index: number;
}

const QuestionCard: FC<props> = ({ question, index }) => {
    return (

        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="px-4 py-2 bg-primary text-white">
                <h2>{index + 1}</h2>
            </div>
            <div className="p-4 grid gap-4">
                <div >
                    <img src='/math/2023Q1.png' className="" />
                </div>
                <AnswerDiscussion question={question} />
            </div>
        </div>
    );
}

export default QuestionCard;