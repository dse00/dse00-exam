import { QUESTION_DIFFICULTY_THRESHOLD } from '@/constants';
import { QuestionDifficultyEnum } from '@/types/question';

export const getDifficulty = (correctPercentage: number) => {
  if (correctPercentage >= QUESTION_DIFFICULTY_THRESHOLD.EASY) {
    return QuestionDifficultyEnum.easy;
  } else if (correctPercentage <= QUESTION_DIFFICULTY_THRESHOLD.HARD) {
    return correctPercentage <= QUESTION_DIFFICULTY_THRESHOLD.EXTREME_HARD
      ? QuestionDifficultyEnum.extremeHard
      : QuestionDifficultyEnum.hard;
  } else {
    return QuestionDifficultyEnum.medium;
  }
};

export const getDifficultyStyle = (correctPercentage: number) => {
  if (correctPercentage >= QUESTION_DIFFICULTY_THRESHOLD.EASY) {
    return 'text-green-600';
  } else if (correctPercentage <= QUESTION_DIFFICULTY_THRESHOLD.HARD) {
    return correctPercentage <= QUESTION_DIFFICULTY_THRESHOLD.EXTREME_HARD ? 'text-red-900 uppercase' : 'text-red-700';
  } else {
    return 'text-yellow-500';
  }
};
