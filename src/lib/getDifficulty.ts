import { QuestionDifficultyEnum, ThresholdType } from '@/types/question';

export const getDifficulty = (thresholdData: ThresholdType, subject: string, correctPercentage: number) => {
  if (correctPercentage >= thresholdData[subject].Easy) {
    return QuestionDifficultyEnum.easy;
  } else if (correctPercentage <= thresholdData[subject].Hard) {
    return correctPercentage <= thresholdData[subject].ExtremeHard
      ? QuestionDifficultyEnum.extremeHard
      : QuestionDifficultyEnum.hard;
  } else {
    return QuestionDifficultyEnum.medium;
  }
};

export const getDifficultyStyle = (level: QuestionDifficultyEnum) => {
  switch (level) {
    case QuestionDifficultyEnum.easy:
      return 'text-green-600';
    case QuestionDifficultyEnum.medium:
      return 'text-yellow-500';
    case QuestionDifficultyEnum.hard:
      return 'text-red-700';
    case QuestionDifficultyEnum.extremeHard:
      return 'text-red-900 uppercase';
  }
};
