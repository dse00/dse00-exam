import { NotebookPen, Shuffle } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PaperType } from '@/types/question';
interface props {
  exam: PaperType;
  styles?: string;
  icon?: ReactNode;
  cardStyles?: string;
  subject: string;
}

const FeatureCard: FC<props> = async ({ exam, styles, icon, cardStyles, subject }) => {
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
      <CardFooter className='flex gap-4'>
        <Link className={buttonVariants()} href={`/${exam.path}`}>
          <NotebookPen />
          <span>開始</span>
        </Link>
        <Link className={buttonVariants({ variant: 'secondary' })} href={`/${subject}/exercise/random`}>
          <Shuffle />
          <span>隨機練習</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
