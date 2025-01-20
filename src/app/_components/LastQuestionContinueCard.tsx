'use client';
import { BicepsFlexed } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePaperNameMapping } from '@/hooks/usePaperNameMapping';
import { cn } from '@/lib/utils';
const LastQuestionContinueCard: FC<{
  lastQuestion: {
    questionNo: number;
    title: string;
    href: string;
  };
}> = ({ lastQuestion }) => {
  const { paperNameMappingData, getPaperNameByLang } = usePaperNameMapping();

  if (!paperNameMappingData) return null;

  return (
    <Card className='shrink-1 w-40'>
      <CardHeader>
        <CardTitle>Q{lastQuestion.questionNo}</CardTitle>
        <CardDescription className='line-clamp-2'>{getPaperNameByLang(lastQuestion.title)}</CardDescription>
      </CardHeader>
      <CardContent className='grow' />
      <CardFooter>
        <Link
          className={cn(buttonVariants())}
          href={`${lastQuestion.href}?page=${Math.ceil(lastQuestion.questionNo / 10)}`}
        >
          <BicepsFlexed />
          繼續
          <span className='-scale-x-100'>
            <BicepsFlexed />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LastQuestionContinueCard;
