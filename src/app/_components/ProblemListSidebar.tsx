'use client';
import { AlignLeft, ListTree } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { useThreshold } from '@/hooks/useThreshold';
import { getDifficulty, getDifficultyStyle } from '@/lib/getDifficulty';
import { cn } from '@/lib/utils';
import { QuestionType } from '@/types/question';

import ClientPaperName from './ClientPaperName';

type props = {
  questions: QuestionType[];
  header: string;
  currentPage: number;
};

export const ProblemListSidebar: FC<props> = ({ questions, header, currentPage }) => {
  const { paperNameMappingData, displayNameKey } = usePaperNameMapping();
  const { thresholdData } = useThreshold();

  if (!thresholdData) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='flex items-center gap-4 hover:bg-[#00000009] rounded-lg p-2'>
          <ListTree size={30} />
          <ClientPaperName nameKey={header} />
        </button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle className='flex items-center gap-4'>
            <AlignLeft />
            <span> 問題列表</span>
          </SheetTitle>
          {/* <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription> */}
        </SheetHeader>
        <div className='grid gap-4 py-10'>
          {questions?.map((question: QuestionType, index: number) => (
            <Link key={question._id} href={`/questions/${question._id}`}>
              <Button
                variant={index % 2 === 0 ? 'ghost' : 'secondary'}
                className='w-full flex sm:items-center justify-between flex-col sm:flex-row items-start'
              >
                <div>
                  {(currentPage - 1) * 10 + index + 1}. {paperNameMappingData?.[question.topic]?.[displayNameKey]}
                </div>

                <span
                  className={cn(
                    getDifficultyStyle(getDifficulty(thresholdData, question.subject, question.correctPercentage)),
                    'text-xs'
                  )}
                >
                  {getDifficulty(thresholdData, question.subject, question.correctPercentage)}
                </span>
              </Button>
            </Link>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
