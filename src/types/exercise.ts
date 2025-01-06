import { BaseDataType } from "."
import { QuestionType } from "./question"

export type ExerciseType = {
    user: string,
    questions: QuestionType[],
} & BaseDataType

export type ExerciseListItemType = {
    exerciseName: string,
    exerciseLength: number,
    subject: string,
    timeLimited: boolean,

} & BaseDataType