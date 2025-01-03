'use client'
import { Button } from "baseui/button";
import { FC, useRef, useState } from "react"
import Discussion from "./Discussion";
import CustomAccordion from "@/components/CustomAccordion";
import AnswerButtons from "./AnswerButtons";
import { QuestionType } from "@/types/question";

type props = {
    question: QuestionType
}


const AnswerDiscussion: FC<props> = ({ question }) => {


    const [showAns, setShowAns] = useState(false)

    const [showDiscussion, setShowDiscussion] = useState(false)

    return (
        <div className="grid gap-2">
            <div className="flex gap-3">
                <Button size="compact" onClick={() => setShowAns(!showAns)}>答案</Button>
                <Button size="compact" onClick={() => setShowDiscussion(!showDiscussion)}>討論(0)</Button>
            </div>
            <div className="grid py-4">
                <CustomAccordion show={showAns} >
                    <AnswerButtons question={question} />
                </CustomAccordion>
                <CustomAccordion show={showDiscussion} >
                    <Discussion questionId={question._id} />
                </CustomAccordion>
            </div>

        </div >
    )
}



export default AnswerDiscussion