'use client';
import Image from 'next/image';

import { LanguageEnum } from '@/constants';
import { getImageNameByLang } from '@/lib/getImageNameByLang';
import { QuestionType } from '@/types/question';

const QuestionImage = ({ question, language }: { question: QuestionType; language: LanguageEnum }) => {
  if (!language) return;

  return (
    <div className='relative max-w-[720px] grid gap-4'>
      {question.belongTo && (
        <Image
          src={getImageNameByLang(question, language, question.belongTo)}
          alt='question'
          width={1000}
          height={100}
          priority
        />
      )}
      <Image src={getImageNameByLang(question, language)} alt='question' width={1000} height={100} priority />
    </div>
  );
};

export default QuestionImage;
