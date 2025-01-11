'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PaperType } from '@/types/question';

interface props {
  exam: PaperType;
  isFeatured?: boolean;
  styles?: string;
}

const ExamCard: FC<props> = ({ exam, isFeatured, styles }) => {
  const router = useRouter();

  return (
    <Card className='flex flex-col basis-1/3'>
      <CardHeader className='grow flex flex-col justify-between'>
        <CardTitle className={styles}>{exam.displayName}</CardTitle>
        <CardDescription>香港中學文憑試</CardDescription>
      </CardHeader>
      <CardContent>
        <p>共 {exam.numberOfquestions} 題</p>
      </CardContent>
      <CardFooter>
        <Button variant={isFeatured ? 'default' : 'secondary'} onClick={() => router.push(`/exam/${exam.path}`)}>
          開始
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
