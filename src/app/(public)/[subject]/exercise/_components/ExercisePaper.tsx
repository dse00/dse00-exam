'use client';
import { Angry, RotateCcw, Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

import AnimateButton from '@/components/AnimateButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useUser } from '@/hooks';
import { useExercise } from '@/hooks/useExercise';
import { useThreshold } from '@/hooks/useThreshold';
import { useAppStore } from '@/store';
import { ExerciseType } from '@/types/exercise';
import { ThresholdType } from '@/types/question';

import ExportExamPdfButton from '../../questions/_components/ExportExamPdfButton';
import ExerciseQuestionCard from './ExerciseQuestionCard';

type props = {
  exercise: ExerciseType;
};

const ExercisePaper: FC<props> = ({ exercise }) => {
  const isRandom = !exercise._id;

  const { questions, _id: exerciseId, answers: recordedAnswers } = exercise;

  const [answers, setAnswers] = useState<string[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const { createExercise, updateExercise } = useExercise();

  const { setLoginDialogOpen, setLoading } = useAppStore();

  const { thresholdData } = useThreshold();

  const { userData } = useUser();

  useEffect(() => {
    if (recordedAnswers) {
      setAnswers(recordedAnswers);
    }
  }, [recordedAnswers]);

  const toSubmitted = () => {
    setIsSubmitted(true);
  };

  const toSaveRecord = () => {
    if (!userData) {
      setLoginDialogOpen(true);

      return;
    }
    setLoading(true);
    if (isRandom) {
      createExercise({
        questions: questions.map((q, i) => q._id),
        user: userData?.user as string,
        subject: questions[0].subject,
        answers,
      });
      router.push('/user/notebook');
    } else if (exerciseId) {
      updateExercise({
        exerciseId,
        updateExerciseDto: {
          answers,
        },
      });
      router.push('/user/notebook');
    }
  };

  const toResetAnswer = () => {
    const confirm = window.confirm('確定要重置答案嗎？');
    if (confirm) {
      setAnswers([]);
    }
  };
  const getDifficultyLabel = (thresholdData: ThresholdType, subject: string, correctPercentage: number) => {
    switch (true) {
      case correctPercentage >= thresholdData[subject].Easy:
        return <span className='text-green-600'>Easy</span>;
      case correctPercentage <= thresholdData[subject].Hard:
        return <span className='text-red-700'>Hard</span>;
      default:
        return <span className='text-yellow-500'>Medium</span>;
    }
  };

  if (!thresholdData) return null;

  return (
    <div className='grid gap-6 items-start'>
      <div className='flex gap-4'>
        <ExportExamPdfButton questions={questions} />

        <AnimateButton variant={'ghost'} onClick={toResetAnswer}>
          <RotateCcw />
          <span>重置答案</span>
        </AnimateButton>
      </div>
      {questions.map((question, index) => (
        <ExerciseQuestionCard
          key={question._id}
          question={question}
          index={index}
          setAnswers={setAnswers}
          answers={answers}
        />
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={toSubmitted}>檢查答案</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>成績</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>#</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>難度</TableHead>
                <TableHead className='text-right'>評分</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question, index) => (
                <TableRow key={question._id}>
                  <TableCell className='font-medium'>{index + 1}</TableCell>
                  <TableCell>{question.year + 'Q' + question.questionNo}</TableCell>
                  <TableCell>
                    {getDifficultyLabel(thresholdData, question.subject, question.correctPercentage)}
                  </TableCell>
                  <TableCell className='flex justify-end'>
                    {question.answer === answers[index] ? (
                      <Smile size={20} color='green' />
                    ) : (
                      <Angry size={20} color='red' />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className='text-right'>
                  {questions
                    .filter((q, i) => q.answer === answers[i])
                    .reduce((acc, q) => acc + Math.round(100 / questions.length), 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <DialogFooter className='gap-3'>
            <ExportExamPdfButton questions={questions} />
            <Button onClick={toSaveRecord}>保存記錄</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisePaper;
