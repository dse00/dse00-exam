import { ThresholdType } from '@/types/question';
import { UserAnswerType } from '@/types/userAnswer';

import { getDifficulty } from './getDifficulty';

export class Topic {
  data: UserAnswerType[];
  title: string;
  total: number;
  correct: number;
  average: number;

  constructor(title: string, data: UserAnswerType[]) {
    this.data = data;
    this.title = title;
    this.total = data.length;
    this.correct =
      this.data?.reduce((acc, { correct }) => {
        return acc + (correct ? 1 : 0);
      }, 0) || 1;

    this.average = Math.round((this.correct / this.total) * 100);
  }
}

export class Difficulty extends Topic {}

export class SubejectData {
  data: UserAnswerType[];
  subject: string;
  numbnerOfStatement: number;

  static cutoff = {
    phy: [90, 85, 76, 64, 55],
    bio: [80, 72, 63, 54, 45],
    chem: [92, 85, 80, 70, 50],
    maths: [92, 86, 76, 63, 50],
  };

  constructor(subject: string, data: UserAnswerType[]) {
    this.data = data;
    this.subject = subject;
    this.numbnerOfStatement = Math.ceil(this.data.length / 30);
  }

  getStatementList() {
    const groupByIndex = Object.values(
      Object.groupBy(this.data, ({ question }, index) => {
        return Math.floor(index / 30);
      }) || []
    );

    return groupByIndex;
  }
}

export class Statement {
  total: number;
  correct: number;
  isCompleted: boolean;
  subject: string;
  totalScore: number;
  fullScore: number;
  percentage: number;

  constructor(
    public id: number,
    public data: UserAnswerType[]
  ) {
    this.total = data.length;
    this.correct = data.reduce((acc, { correct }) => {
      return acc + (correct ? 1 : 0);
    }, 0);
    this.isCompleted = data.length === 30;
    this.subject = data[0].question.subject;
    this.totalScore = this.data
      .filter(ans => ans.correct)
      .reduce((acc, { question }) => {
        return acc + (100 - question.correctPercentage);
      }, 0);

    this.fullScore = this.data.reduce((acc, { question }) => {
      return acc + (100 - question.correctPercentage);
    }, 0);

    this.percentage = Math.round((this.totalScore / this.fullScore) * 100);
  }

  sortedByTopic(data: UserAnswerType[]) {
    const groupedBySubject = Object.groupBy(data, ({ question }) => question.topic);

    return Object.entries(groupedBySubject);
  }

  sortedByDifficulty(data: UserAnswerType[], thresholdData: ThresholdType, subject: string) {
    const groupedByDifficulty = Object.groupBy(data, ({ question }) =>
      getDifficulty(thresholdData, subject, question.correctPercentage)
    );

    return Object.entries(groupedByDifficulty);
  }

  getGrade() {
    const grade = SubejectData.cutoff[this.subject as keyof typeof SubejectData.cutoff].findIndex(
      cutoff => this.percentage >= cutoff
    );

    const gradeMap = ['5**', '5*', '5', '4', '3', '2', '1'];

    return 'Lv. ' + gradeMap[grade];
  }
}
