import { LanguageEnum } from '@/constants';
import { QuestionType } from '@/types/question';

import { getImageNameByLang } from '../getImageNameByLang';

const testQuestion: Partial<QuestionType> = {
  _id: 'testId',
  subject: 'testSubject',
  year: 2022,
  questionNo: 1,
  answer: 'A',
  correctPercentage: 0.5,
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2022-01-01T00:00:00.000Z',
  topic: 'testTopic',
};

describe('getImageNameByLang', () => {
  it('should return correct pagination when in the middle of pages', () => {
    const result = getImageNameByLang(testQuestion as QuestionType, LanguageEnum.EN);
    expect(result).toEqual('testSubject_en.png');
  });

  it('should return correct pagination when in the middle of pages', () => {
    const result = getImageNameByLang(testQuestion as QuestionType, LanguageEnum.TC);
    expect(result).toEqual('testSubject_tc.png');
  });
});
