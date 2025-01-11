'use client';
import Image from 'next/image';
import { FC } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getDifficulty, getDifficultyStyle } from '@/lib/getDifficulty';
import { processImageNameByLang } from '@/lib/processImageNameByLang';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

import AnswerDiscussion from './AnswerDiscussion';

interface props {
  question: QuestionType;
  index: number;
  questionNo: number;
}

const QuestionCard: FC<props> = ({ question, questionNo }) => {
  const { language } = useAppStore();

  if (!language) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between items-start'>
          <span>Q{questionNo} </span>
          {/* <Badge>{question.year}Q{question.questionNo}</Badge> */}
        </CardTitle>
        <CardDescription className={getDifficultyStyle(question.correctPercentage)}>
          {getDifficulty(question.correctPercentage)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative max-w-[720px]'>
          <Image
            src={processImageNameByLang(question.questionImage, language)}
            className=''
            alt='question'
            width={1000}
            height={100}
            priority
          />
        </div>
      </CardContent>
      <CardFooter>
        <AnswerDiscussion question={question} />
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
