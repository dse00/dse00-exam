import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PaperType } from '@/types/question';

interface props {
  exam: PaperType;
  isFeatured?: boolean;
  styles?: string;
}

const ExamCard: FC<props> = ({ exam, isFeatured, styles }) => {
  return (
    <Card className='h-full flex flex-col'>
      <CardHeader className='grow flex flex-col justify-between'>
        <CardTitle className={styles}>{exam.displayName}</CardTitle>
        <CardDescription>香港中學文憑試</CardDescription>
      </CardHeader>
      <CardContent className='grow'>
        <p>共 {exam.numberOfquestions} 題</p>
      </CardContent>
      <CardFooter>
        <Link className={buttonVariants({ variant: isFeatured ? 'default' : 'secondary' })} href={`/exam/${exam.path}`}>
          開始
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
