'use client';
import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageNameByLang } from '@/lib/getImageNameByLang';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

import { answersOptions } from '../../questions/_components/AnswerButtons';

interface props {
  question: QuestionType;
  index: number;
  setAnswers: (a: any) => void;
  answers: string[];
}

const ExerciseQuestionCard: FC<props> = ({ question, index, setAnswers, answers }) => {
  const { language } = useAppStore();

  const toAnswer = (answer: string) => {
    setAnswers((prev: string[]) => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;

      return newAnswers;
    });
  };

  if (!language) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Q{index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='relative max-w-[720px]'>
          <Image
            src={getImageNameByLang(question, language)}
            className=''
            alt='question'
            width={1000}
            height={100}
            priority
          />
        </div>
      </CardContent>
      <CardFooter className='flex gap-3'>
        {answersOptions.map(option => (
          <Button
            variant={answers[index] === option ? 'default' : 'secondary'}
            key={option}
            onClick={() => toAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ExerciseQuestionCard;
