'use client'
import { FC } from "react";
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
import { answersOptions } from "../../_components/AnswerButtons";
import { Button } from "@/components/ui/button";


interface props {
    question: QuestionType;
    index: number;
    setAnswers: (a: any) => void;
    answers: string[];
}

const ExerciseQuestionCard: FC<props> = ({ question, index, setAnswers, answers }) => {

    const toAnswer = (answer: string) => {
        setAnswers((prev: string[]) => {
            const newAnswers = [...prev];
            newAnswers[index] = answer
            return newAnswers;
        })
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle>Q{index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative max-w-[720px]">
                    <Image src={question.questionImage} className="" alt="question" width={1000} height={100} priority />
                </div>
            </CardContent>
            <CardFooter className='flex gap-3'>
                {answersOptions.map((option) => <Button variant={answers[index] === option ? 'default' : 'secondary'} key={option} onClick={() => toAnswer(option)}>{option}</Button>)}
            </CardFooter>
        </Card>



    );
}

export default ExerciseQuestionCard;