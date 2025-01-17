import { UserType } from './user';

export type RankingType = {
  user: UserType;
  totalScore: number;
  rank: number;
};
