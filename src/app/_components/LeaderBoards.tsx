import { Anvil, Medal } from 'lucide-react';
import { FC } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import services from '@/services';
import { RankingType } from '@/types/ranking';

import LeaderBoardMobile from './LeaderBoardMobile';

const getRankingStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'font-black text-yellow-500';
    case 2:
      return 'font-black text-gray-500';
    case 3:
      return 'font-black text-yellow-800';
    default:
      return 'text-base';
  }
};

const LeaderBoards: FC<{ readOnly?: boolean }> = async ({ readOnly = false }) => {
  const ranking = await services.getRanking();

  if (readOnly) return <LeaderBoard rankings={ranking} />;

  return (
    <>
      <div className='hidden sm:block'>
        <LeaderBoard rankings={ranking} />
      </div>
      <div className='block sm:hidden'>
        <LeaderBoardMobile>
          <LeaderBoard rankings={ranking} />
        </LeaderBoardMobile>
      </div>
    </>
  );
};

export default LeaderBoards;

const LeaderBoard: FC<{ rankings: RankingType[] }> = ({ rankings }) => {
  return (
    <div className='relative'>
      <div className='grid gap-2 h-[220px] overflow-hidden'>
        <div className='items-center gap-2 grid grid-cols-4 rounded-md font-black'>
          <div className='flex gap-2 font-bold text-yellow-600'>
            <Anvil />
            <span>排名</span>
          </div>
          <span className='col-span-2'>DSEJJ</span>
          <span className='text-end'>分數</span>
        </div>
        <ScrollArea className={cn('rounded-md h-[180px]')}>
          <div className='grid gap-3 pt-2 pb-10'>
            {rankings.map((rank, i) => (
              <div
                key={rank.user.user}
                className={cn('items-center gap-2 grid grid-cols-4', getRankingStyle(rank.rank))}
              >
                <span className={cn('flex items-center gap-2')}>
                  {rank.rank < 4 ? (
                    <div className='flex gap-2'>
                      <Medal />
                      <span> {i + 1}</span>
                    </div>
                  ) : (
                    <span className='ml-8 font-black'> {i + 1}</span>
                  )}
                </span>
                <span className='col-span-2'>{rank.user.name || 'DSEJJ ' + rank.user.user.substring(20)}</span>
                <span className='text-end'>{rank.totalScore}</span>
              </div>
            ))}
          </div>
          <FadeOutBorder position='bottom' />
        </ScrollArea>
      </div>
    </div>
  );
};

const FadeOutBorder: FC<{ position?: 'top' | 'bottom' }> = ({ position = 'top' }) => {
  return (
    <div
      className='h-20 w-full absolute'
      style={{
        background: 'linear-gradient(#fffcf8, #fffcf800)',
        transform: position === 'top' ? 'none' : 'rotate(180deg)',
        top: position === 'top' ? 0 : 'auto',
        bottom: position === 'bottom' ? 0 : 'auto',
      }}
    />
  );
};
