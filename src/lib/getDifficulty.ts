import { QuestionDifficultyEnum } from "@/types/question"

export const getDifficulty = (correctPercentage: number) => {
    if (correctPercentage >= 70) {
        return QuestionDifficultyEnum.easy
    } else if (correctPercentage <= 45) {
        return QuestionDifficultyEnum.hard
    } else {
        return QuestionDifficultyEnum.medium
    }
}

