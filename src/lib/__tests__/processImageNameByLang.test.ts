import { LanguageEnum } from '@/constants';

import { processImageNameByLang } from '../processImageNameByLang';

const testImageName = 'testImageName.png';

describe('processImageNameByLang', () => {
  it('should return correct pagination when in the middle of pages', () => {
    const result = processImageNameByLang(testImageName, LanguageEnum.EN);
    expect(result).toEqual('testImageName_en.png');
  });

  it('should return correct pagination when in the middle of pages', () => {
    const result = processImageNameByLang(testImageName, LanguageEnum.TC);
    expect(result).toEqual('testImageName_tc.png');
  });
});
