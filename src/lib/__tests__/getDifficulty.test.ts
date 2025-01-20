import { QuestionDifficultyEnum } from '@/types/question';

import { getDifficulty } from '../getDifficulty';

const DIFFICULTY_THRESHOLD = {
  maths: {
    Easy: 70,
    Hard: 48,
    ExtremeHard: 35,
  },
  chem: {
    Easy: 73,
    Hard: 57,
    ExtremeHard: 40,
  },
};
describe('getDifficulty', () => {
  it('should return easy', () => {
    const result = getDifficulty(DIFFICULTY_THRESHOLD, 'math', 20);
    expect(result).toBe(QuestionDifficultyEnum.hard);
  });
  it('should return hard', () => {
    const result = getDifficulty(DIFFICULTY_THRESHOLD, 'math', 70);
    expect(result).toBe(QuestionDifficultyEnum.easy);
  });
  it('should return hard', () => {
    const result = getDifficulty(DIFFICULTY_THRESHOLD, 'maths', 50);
    expect(result).toBe(QuestionDifficultyEnum.medium);
  });
});
