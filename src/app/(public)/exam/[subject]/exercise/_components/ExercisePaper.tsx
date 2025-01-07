'use client'
import { QuestionDifficultyThreshold, QuestionType } from "@/types/question"
import { FC, useState } from "react"
import ExerciseQuestionCard from "./ExerciseQuestionCard"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useExercise } from "@/hooks/useExercise"
import { useUser } from "@/hooks"
import { useRouter } from "next/navigation"



type props = {
    questions: QuestionType[]
    isRandom: boolean,
    exerciseId?: string

}

const ExercisePaper: FC<props> = ({ questions, isRandom, exerciseId }) => {

    const [answers, setAnswers] = useState<string[]>([])

    const [isSubmitted, setIsSubmitted] = useState(false)

    const router = useRouter()

    const { createExercise, updateExercise } = useExercise()

    const { userData } = useUser()

    const toSubmitted = () => {
        setIsSubmitted(true)
    }

    const toSaveRecord = () => {
        if (isRandom) {
            createExercise({
                questions: questions.map((q, i) => q._id),
                user: userData?.user as string,
                subject: questions[0].subject
            })
            router.push('/user/notebook')
        } else if (exerciseId) {
            updateExercise({
                exerciseId,
                updateExerciseDto: {
                    answers
                }
            })
            router.push('/user/notebook')
        }
    }
    const getDifficultyLabel = (correctPercentage: number) => {
        switch (true) {
            case correctPercentage >= QuestionDifficultyThreshold.easy:
                return <span className="text-green-600">Easy</span>
            case correctPercentage <= QuestionDifficultyThreshold.hard:
                return <span className="text-red-700">Hard</span>
            default:
                return <span className="text-yellow-500">Medium</span>
        }
    }

    return (
        <div className="grid gap-6">
            {
                questions.map((question, index) => <ExerciseQuestionCard key={question._id} question={question} index={index} setAnswers={setAnswers} answers={answers} />)
            }

            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={toSubmitted}>提交</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>成績</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>難度</TableHead>
                                <TableHead className="text-right">評分</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {questions.map((question, index) =>
                                <TableRow key={question._id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{question.year + 'Q' + question.questionNo}</TableCell>
                                    <TableCell>{
                                        getDifficultyLabel(question.correctPercentage)
                                    }</TableCell>
                                    <TableCell className="text-right">{question.answer === answers[index] ? Math.round(100 / questions.length) : 0}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{questions.filter((q, i) => q.answer === answers[i]).reduce(
                                    (acc, q) => acc + Math.round(100 / questions.length), 0
                                )}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <DialogFooter>
                        <Button onClick={toSaveRecord}>保存記錄</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ExercisePaper