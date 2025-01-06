import { FC, useState } from "react"
import CorrectPercentageIndicator from "./CorrectPercentageIndicator"
import { QuestionType } from "@/types/question"
import { Button } from "@/components/ui/button"
const answers = ['a', 'b', 'c', 'd']


type props = {
    question: QuestionType
}
const AnswerButtons: FC<props> = ({ question }) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

    const [isSkep, setIsSkip] = useState(false)

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
        if (Number.isInteger(selectedAnswer) || isSkep) return
        setSelectedAnswer(buttonAnswer)
    }
    return (
        <div className="grid gap-3">
            <div className="flex gap-3">
                {
                    answers.map((answer, index) =>
                        <Button
                            style={{ backgroundColor: getButtonColor(answer) }}
                            variant='secondary'
                            key={index}
                            onClick={() => handleOnClick(answer)}
                        >
                            {answer}
                        </Button>)
                }
                {
                    (!Number.isInteger(selectedAnswer) && !isSkep) && <Button
                        variant='ghost'
                        size={'sm'}
                        onClick={() => setIsSkip(true)}
                    >
                        跳過
                    </Button>
                }
            </div>
            {
                (Number.isInteger(selectedAnswer) || isSkep) && (
                    <CorrectPercentageIndicator value={50} />
                )
            }

        </div>
    )
}

export default AnswerButtons