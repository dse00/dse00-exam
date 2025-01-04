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
}

const QuestionCard: FC<props> = ({ question, index }) => {
    return (

        <Card>
            <CardHeader>
                <CardTitle>Q{index + 1}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Image src={question.questionImage} className="" alt="question" width={1000} height={100} priority />
            </CardContent>
            <CardFooter>
                <AnswerDiscussion question={question} />
            </CardFooter>
        </Card>



    );
}

export default QuestionCard;