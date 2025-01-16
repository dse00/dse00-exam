import { LanguageEnum } from '@/constants';
import { QuestionType } from '@/types/question';

export const getImageNameByLang = (question: QuestionType, lang: LanguageEnum) => {
  const { subject, year, questionNo } = question;

  return process.env.NEXT_PUBLIC_S3_BUCKET_URL + `/${subject}/${year}/q${questionNo}_${lang}.png`;
};
