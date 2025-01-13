import { QuestionDifficultyEnum } from '@/types/question';

import { getDifficulty } from '../getDifficulty';

describe('getDifficulty', () => {
  it('should return easy', () => {
    const result = getDifficulty(20);
    expect(result).toBe(QuestionDifficultyEnum.hard);
  });
  it('should return hard', () => {
    const result = getDifficulty(70);
    expect(result).toBe(QuestionDifficultyEnum.easy);
  });
  it('should return hard', () => {
    const result = getDifficulty(50);
    expect(result).toBe(QuestionDifficultyEnum.medium);
  });
});
