import { CommentType } from './comment';

export type QuestionType = {
  _id: string;
  answer: string;
  topic: string;
  year: number;
  questionNo: number;
  comments: CommentType[];
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

export type SubjectContentType = {
  paperBySubjects: PaperType[];
  paperByTopic: PaperType[];
  paperByDifficulty: PaperType[];
};

export enum QuestionDifficultyEnum {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  extremeHard = 'extreme hard',
}

export type HomeContentType = {
  [key: string]: PaperType;
};

export type LastQuestionType = {
  href: string;
  questionNo: number;
  title: string;
  createdAt: string;
};

export type ThresholdType = {
  [key: string]: {
    Easy: number;
    Hard: number;
    ExtremeHard: number;
  };
};
