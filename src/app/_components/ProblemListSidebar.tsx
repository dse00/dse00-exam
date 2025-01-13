import { ListTree } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
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
import { getDifficulty, getDifficultyStyle } from '@/lib/getDifficulty';
import { QuestionType } from '@/types/question';

type props = {
  questions: QuestionType[];
  header: string;
  currentPage: number;
};

export const ProblemListSidebar: FC<props> = ({ questions, header, currentPage }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='flex items-center gap-4 hover:bg-[#00000009] rounded-lg p-2'>
          <ListTree size={30} />
          <span className='text-2xl font-bold'>{header}</span>
        </button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>問題列表</SheetTitle>
          {/* <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription> */}
        </SheetHeader>
        <div className='grid gap-4 py-10'>
          {questions.map((question: QuestionType, index: number) => (
            <Link key={question._id} href={`/exam/user/${question._id}`}>
              <Button
                variant={index % 2 === 0 ? 'ghost' : 'secondary'}
                className='w-full flex items-center justify-between'
              >
                <div>
                  {(currentPage - 1) * 10 + index + 1}. {question.topic}
                </div>
                <Badge variant={'secondary'} className={getDifficultyStyle(question.correctPercentage)}>
                  {getDifficulty(question.correctPercentage)}
                </Badge>
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
