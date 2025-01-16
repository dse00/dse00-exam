import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PaperType } from '@/types/question';

interface props {
  exam: PaperType;
  isFeatured?: boolean;
  styles?: string;
  icon?: ReactNode;
  cardStyles?: string;
}

const ExamCard: FC<props> = ({ exam, isFeatured, styles, icon, cardStyles }) => {
  return (
    <Card className={cn('h-full flex flex-col', cardStyles)}>
      <CardHeader className='grow flex flex-col justify-between'>
        <CardTitle className={cn(styles, 'flex items-center gap-2')}>
          {icon}
          <span>{exam.displayName}</span>
        </CardTitle>

        <CardDescription>{exam.displayNameTc}</CardDescription>
      </CardHeader>
      <CardContent className='grow'>
        <p>共 {exam.numberOfquestions} 題</p>
      </CardContent>
      <CardFooter>
        <Link
          className={cn(buttonVariants({ variant: isFeatured ? 'default' : 'secondary' }), {
            'px-0': !isFeatured,
          })}
          href={`/exam/${exam.path}`}
        >
          {isFeatured ? (
            <>
              <NotebookPen />
              <span>開始</span>
            </>
          ) : (
            <div className='flex justify-center items-center gap-2 group transition-all px-3'>
              <NotebookPen />
              <span className='w-0 overflow-hidden group-hover:w-8 transition-all'>開始</span>
            </div>
          )}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
