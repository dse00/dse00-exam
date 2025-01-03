import { Button } from "baseui/button"
import { FC, useState } from "react"
import CorrectPercentageIndicator from "./CorrectPercentageIndicator"
import { QuestionType } from "@/types/question"

const answers = ['A', 'B', 'C', 'D']


type props = {
    question: QuestionType
}
const AnswerButtons: FC<props> = ({ question }) => {

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

    const [isSkep, setIsSkip] = useState(false)

    const getButtonColor = (index: number) => {
        switch (true) {
            case selectedAnswer === null && !isSkep:
                return '#eee'
            case question.answer === index:  // correct answer
                return '#ecfccb'
            case selectedAnswer === question.answer && selectedAnswer === index:
                return '#ecfccb'
            case selectedAnswer !== question.answer && selectedAnswer === index:
                return '#fecaca'
            default:
                return '#eee'
        }
    }


    const handleOnClick = (index: number) => {
        if (Number.isInteger(selectedAnswer) || isSkep) return
        setSelectedAnswer(index)
    }
    return (
        <div className="grid gap-3">
            <div className="flex gap-3">
                {
                    answers.map((answer, index) =>
                        <Button
                            key={index}
                            size="compact"
                            kind="secondary"
                            colors={{ backgroundColor: getButtonColor(index), color: 'primary' }}
                            onClick={() => handleOnClick(index)}
                        >
                            {answer}
                        </Button>)
                }
                {
                    (!Number.isInteger(selectedAnswer) && !isSkep) && <Button
                        kind='tertiary'
                        size="mini"
                        onClick={() => setIsSkip(true)}
                    >
                        跳過
                    </Button>
                }
            </div>
            {
                (Number.isInteger(selectedAnswer) || isSkep) && (
                    <div className="grid grid-cols-3 items-center">
                        <CorrectPercentageIndicator value={50} />
                        <div className="text-sm text-gray-500">的同學回答正確</div>
                    </div>
                )
            }

        </div>
    )
}

export default AnswerButtons