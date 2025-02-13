'use client';
import { Clipboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUserAnswer } from '@/hooks';

import { ScoreDailyChart } from '../(private)/user/score-sheet/_components/ScoreDailyChart';
import { AddOilSlogan } from './AddOilSlogan';

export default () => {
  const { userAnswersData } = useUserAnswer();
  const router = useRouter();

  if (!userAnswersData) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Clipboard color='#fff' />
      </PopoverTrigger>
      <PopoverContent className='p-0' onClick={() => router.push('/user/score-sheet')}>
        <div className='p-2 text-sm flex justify-between'>
          <Badge variant={'secondary'}>
            <AddOilSlogan />
          </Badge>
          <Badge>已完成 {userAnswersData?.length} 題</Badge>
        </div>
        {<ScoreDailyChart answersData={userAnswersData} simpleMode />}
      </PopoverContent>
    </Popover>
  );
};
