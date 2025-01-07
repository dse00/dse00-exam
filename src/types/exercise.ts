import { BaseDataType } from "."
import { QuestionType } from "./question"

export type ExerciseType = {
    user: string,
    questions: QuestionType[],
    anwsers: string[],
} & BaseDataType

export type ExerciseListItemType = {
    exerciseName: string,
    exerciseLength: number,
    subject: string,
    timeLimited: boolean,
    score: number,
} & BaseDataType


export type CreateExerciseDto = {
    user: string,
    questions: string[],
    subject: string,
    answers?: string[],
}

export type UpdateExerciseDto = Partial<CreateExerciseDto>