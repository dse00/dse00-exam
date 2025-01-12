'use client';
import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { QUESTION_DIFFICULTY_THRESHOLD } from '@/constants';
import { getDifficulty, getDifficultyStyle } from '@/lib/getDifficulty';
import { processImageNameByLang } from '@/lib/processImageNameByLang';
import { cn } from '@/lib/utils';
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

  if (question.correctPercentage <= QUESTION_DIFFICULTY_THRESHOLD.EXTREME_HARD) {
    return (
      <Card id={questionNo.toString()}>
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
          <div className='relative max-w-[720px] grid gap-4'>
            <Skeleton className='h-8 w-full' />
            <div className='grid gap-4 ml-12'>
              <Skeleton className='h-8 w-80' />
              <Skeleton className='h-8 w-80' />
              <Skeleton className='h-8 w-80' />
              <Skeleton className='h-8 w-80' />
            </div>
            <div className='absolute bg-[#ffffff33] backdrop-blur-sm w-full h-full items-center justify-center rounded-lg flex flex-col gap-4'>
              <LockKeyhole size={'40'} />
              <p className='opacity-70'>
                <span className='typo-round'>DSE00</span>
                需要你們的支持
              </p>
              <div>
                <Link href={'/membership'} className={cn(buttonVariants())}>
                  加入
                  <span className='typo-round'>DSE00+</span>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex gap-4'>
          <Skeleton className='h-8 w-12' />
          <Skeleton className='h-8 w-16' />
        </CardFooter>
      </Card>
    );
  }

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
