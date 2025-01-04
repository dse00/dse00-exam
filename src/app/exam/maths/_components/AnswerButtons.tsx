import { FC, useState } from "react"
import CorrectPercentageIndicator from "./CorrectPercentageIndicator"
import { QuestionType } from "@/types/question"
import { Button } from "@/components/ui/button"
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
                            style={{ backgroundColor: getButtonColor(index) }}
                            variant='secondary'
                            key={index}
                            onClick={() => handleOnClick(index)}
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