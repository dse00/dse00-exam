import { LanguageEnum } from '@/constants';
import { QuestionType } from '@/types/question';

export const getImageNameByLang = (question: QuestionType, lang: LanguageEnum, belongTo?: number) => {
  const { subject, year, questionNo } = question;

  if (belongTo) {
    return process.env.NEXT_PUBLIC_S3_BUCKET_URL + `/${subject}/${year}/q${belongTo}a_${lang}.png`;
  }

  return process.env.NEXT_PUBLIC_S3_BUCKET_URL + `/${subject}/${year}/q${questionNo}_${lang}.png`;
};
