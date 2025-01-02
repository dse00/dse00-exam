import { Button } from "baseui/button"
import { FC, useState } from "react"
import { QuestionType } from "../data"

const answers = ['A', 'B', 'C', 'D']


type props = {
    question: QuestionType
}
const AnswerButtons: FC<props> = ({ question }) => {

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

    const getButtonColor = (index: number) => {
        switch (true) {
            case selectedAnswer === null:
                return '#eee'
            case question.answer === index:
                return '#ecfccb'
            case selectedAnswer === question.answer && selectedAnswer === index:
                return '#ecfccb'
            case selectedAnswer !== question.answer && selectedAnswer === index:
                return '#fecaca'
            default:
                return '#eee'
        }
    }
    return (
        <div>
            <div className="flex gap-2">
                {
                    answers.map((answer, index) => <Button key={index} size="compact" kind="secondary" colors={{ backgroundColor: getButtonColor(index), color: 'primary' }} onClick={() => setSelectedAnswer(index)}>{answer}</Button>)
                }

            </div>
            {
                Number.isInteger(selectedAnswer) && (
                    <div>
                        100
                    </div>
                )
            }

        </div>
    )
}

export default AnswerButtons