export type QuestionType = {
  _id: string;
  questionImage: string;
  answer: string;
  topic: string;
  year: number;
  questionNo: number;
  createdAt: string;
  updatedAt: string;
  correctPercentage: number;
  subject: string;
};

export type PaperType = {
  path: string;
  topic: string;
  displayName: string;
  displayNameTc: string;
  numberOfquestions: number;
};

export type HomeContentType = {
  paperBySubjects: PaperType[];
  mathPaperByTopic: PaperType[];
  mathPaperByDifficulty: PaperType[];
};

export enum QuestionDifficultyEnum {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  extremeHard = 'extreme hard',
}
