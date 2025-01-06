'use client'
import { FC } from "react";
import AnswerDiscussion from "./AnswerDiscussion";
import { QuestionType } from "@/types/question";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface props {
    question: QuestionType;
    index: number;
    questionNo: number;
}

const QuestionCard: FC<props> = ({ question, questionNo }) => {
    return (

        <Card>
            <CardHeader>
                <CardTitle>Q{questionNo}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative max-w-[720px]">
                    <Image src={question.questionImage} className="" alt="question" width={1000} height={100} priority />
                </div>
            </CardContent>
            <CardFooter>
                <AnswerDiscussion question={question} />
            </CardFooter>
        </Card>



    );
}

export default QuestionCard;