'use client';
import { Check, Percent, X } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { useSubscription, useUserAnswer } from '@/hooks';

export default () => {
  const { userAnswersData } = useUserAnswer();
  const { isActiveSubscription } = useSubscription();

  const subject = useParams().subject;

  if (!userAnswersData || !isActiveSubscription) return null;

  const subjectsData = userAnswersData?.filter(data => data.question.subject === subject);

  const subjectsDataByYear = Object.entries(Object.groupBy(subjectsData, ({ question }) => question.year));

  const subjectsDataByYearSorted = subjectsDataByYear.map(([year, data]) => {
    const correctLength = data?.filter(d => d.correct).length || 0;
    const incorrectLength = data?.filter(d => !d.correct).length || 0;
    const total = data?.length || 0;

    return {
      year,
      data: data?.toSorted((a, b) => a.question.questionNo - b.question.questionNo),
      correctLength,
      incorrectLength,
      total,
      correctPercentage: ((correctLength / total) * 100).toFixed(1),
    };
  });

  return (
    <div className='grid gap-10 py-4 '>
      {subjectsDataByYearSorted.map(group => (
        <div key={group.year} className='grid gap-2'>
          <h2 className='flex gap-2'>
            <span className='font-bold'>{group.year}</span>
            <Badge variant={'secondary'}>
              <Check color='green' size={16} /> {group.correctLength}
            </Badge>
            <Badge variant={'secondary'}>
              <X color='red' size={16} /> {group.incorrectLength}
            </Badge>
            <Badge variant={'secondary'}>
              {group.correctPercentage}
              <Percent size={16} />
            </Badge>
          </h2>
          <div className='grid sm:grid-cols-4 grid-cols-3 gap-2'>
            {group.data?.map(({ question, correct }) => (
              <div key={question._id} className='flex gap-2'>
                <span className='w-10'>Q{question.questionNo}</span>
                <span>{correct ? <Check color='green' /> : <X color='red' />}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
