'use client';
import { FC } from 'react';

import QuestionImage from '@/components/QuestionImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';

import { answersOptions } from '../../questions/_components/AnswerButton';

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
        <QuestionImage question={question} language={language} />
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
