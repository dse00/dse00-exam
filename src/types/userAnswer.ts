import { BaseDataType } from ".";
import { QuestionType } from "./question";

export type CreateUserAnswerType = {
    user: string;
    question: string;
    answer: string;
    correct: boolean
}

export type UserAnswerType = CreateUserAnswerType & BaseDataType & {
    question: QuestionType
}