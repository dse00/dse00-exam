'use client';
import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import AdSense from '@/components/AdSense';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { QUESTION_DIFFICULTY_THRESHOLD } from '@/constants';
import { useSubscription } from '@/hooks';
import { getDifficulty, getDifficultyStyle } from '@/lib/getDifficulty';
import { getImageNameByLang } from '@/lib/getImageNameByLang';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

import AnswerDiscussion from './AnswerDiscussion';

interface props {
  question: QuestionType;
  questionNo: number;
}

const QuestionCard: FC<props> = ({ question, questionNo }) => {
  const { language } = useAppStore();
  const { isActiveSubscription } = useSubscription();

  if (!language) return null;

  if (question.correctPercentage <= QUESTION_DIFFICULTY_THRESHOLD.EXTREME_HARD && !isActiveSubscription) {
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
          <div className='relative sm:max-w-[720px] max-w-full grid gap-4'>
            <Skeleton className='h-8 w-full' />
            <div className='grid gap-4 pl-12'>
              <Skeleton className='h-8 sm:w-80 max-w-full' />
              <Skeleton className='h-8 sm:w-80 max-w-full' />
              <Skeleton className='h-8 sm:w-80 max-w-full' />
              <Skeleton className='h-8 sm:w-80 max-w-full' />
            </div>
            <div className='absolute bg-[#ffffff33] backdrop-blur-sm w-full h-full items-center justify-center rounded-lg flex flex-col gap-4'>
              <LockKeyhole size={'40'} />
              <p className='opacity-70 flex gap-1'>
                <span className='typo-round'>DSE00</span>
                <span>需要你們的支持</span>
              </p>
              <div>
                <Link href={'/membership'} className={cn(buttonVariants())}>
                  <span>加入</span>
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
    <>
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
            <Image src={getImageNameByLang(question, language)} alt='question' width={1000} height={100} priority />
          </div>
        </CardContent>
        <CardFooter>
          <AnswerDiscussion question={question} index={questionNo} />
        </CardFooter>
      </Card>
      {questionNo % 4 === 0 && <AdSense />}
    </>
  );
};

export default QuestionCard;
