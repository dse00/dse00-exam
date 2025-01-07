import { FC, useEffect, useState } from "react"
import CorrectPercentageIndicator from "./CorrectPercentageIndicator"
import { QuestionType } from "@/types/question"
import { Button } from "@/components/ui/button"
import { useUser, useUserAnswer } from "@/hooks"
export const answersOptions = ['A', 'B', 'C', 'D']


type props = {
    question: QuestionType
    userAnswer?: string
}
const AnswerButtons: FC<props> = ({ question, userAnswer }) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

    const { userData } = useUser()

    const [isSkep, setIsSkip] = useState(false)

    const { createUserAnswer } = useUserAnswer()


    useEffect(() => {
        if (userAnswer) {
            setSelectedAnswer(userAnswer)
        }
    }, [userAnswer])


    const getButtonColor = (buttonAnswer: string) => {
        switch (true) {
            case selectedAnswer === null && !isSkep:
                return '#eee'
            case question.answer === buttonAnswer:  // correct answer
                return '#ecfccb'
            case selectedAnswer === question.answer && selectedAnswer === buttonAnswer:
                return '#ecfccb'
            case selectedAnswer !== question.answer && selectedAnswer === buttonAnswer:
                return '#fecaca'
            default:
                return '#eee'
        }
    }


    const handleOnClick = (buttonAnswer: string) => {
        if (selectedAnswer || isSkep) return
        setSelectedAnswer(buttonAnswer)

        createUserAnswer({
            question: question._id,
            answer: buttonAnswer,
            user: userData?.user as string,
            correct: question.answer === buttonAnswer
        })
    }
    return (
        <div className="grid gap-3">
            <div className="flex gap-3">
                {
                    answersOptions.map((answer, index) =>
                        <Button
                            style={{ backgroundColor: getButtonColor(answer) }}
                            variant='secondary'
                            key={index}
                            onClick={() => handleOnClick(answer)}
                        >
                            {answer.toUpperCase()}
                        </Button>)
                }
                {
                    (!selectedAnswer && !isSkep) && <Button
                        variant='ghost'
                        size={'sm'}
                        onClick={() => setIsSkip(true)}
                    >
                        跳過
                    </Button>
                }
            </div>
            {
                (selectedAnswer || isSkep) && (
                    <CorrectPercentageIndicator value={question.correctPercentage} />
                )
            }

        </div>
    )
}

export default AnswerButtons