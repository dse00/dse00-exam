'use client'
import { Button } from "@/components/ui/button";
import { FC, useEffect, useRef, useState } from "react"
import Discussion from "./Discussion";
import CustomAccordion from "@/components/CustomAccordion";
import AnswerButtons from "./AnswerButtons";
import { QuestionType } from "@/types/question";
import { useUserAnswer } from "@/hooks";

type props = {
    question: QuestionType
}


const AnswerDiscussion: FC<props> = ({ question }) => {


    const [showAns, setShowAns] = useState(false)

    const [showDiscussion, setShowDiscussion] = useState(false)

    const { userAnswersData, createUserAnswer } = useUserAnswer()

    const userAnswer = userAnswersData?.find((userAnswer) => userAnswer.question._id === question._id)


    useEffect(() => {
        if (userAnswer) {
            setShowAns(true)
        }
    }, [userAnswersData])


    return (
        <div className="grid gap-2 w-full">
            <div className="flex gap-3">
                <Button size='sm' variant={showAns ? 'outline' : 'default'} onClick={() => setShowAns(!showAns)}>答案</Button>
                <Button size='sm' variant={showDiscussion ? 'outline' : 'default'} onClick={() => setShowDiscussion(!showDiscussion)}>討論(0)</Button>
            </div>
            <div className="grid">
                <CustomAccordion show={showAns} >
                    <AnswerButtons question={question} userAnswer={userAnswer?.answer} />
                </CustomAccordion>
                <CustomAccordion show={showDiscussion} >
                    <Discussion questionId={question._id} />
                </CustomAccordion>
            </div>

        </div >
    )
}



export default AnswerDiscussion