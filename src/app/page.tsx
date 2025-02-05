import {
  Atom,
  Banknote,
  BicepsFlexed,
  ClipboardList,
  History,
  NotebookPen,
  Pyramid,
  Scale,
  TreePine,
} from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import ChatBot from '@/components/ChatBot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { COOKIES_KEY } from '@/constants';
import { cn } from '@/lib/utils';
import services from '@/services';
import { LastQuestionType } from '@/types/question';

import Header from './_components/Header';
import LastQuestionContinueCard from './_components/LastQuestionContinueCard';
import LeaderBoards from './_components/LeaderBoards';

const subjects = [
  {
    name: '數學',
    key: 'maths',
    total: 560,
    icon: <Pyramid />,
    theme: 'default',
    iconStroke: 'stroke-gray-600',
    buttonFill: 'bg-gray-500',
    textColor: 'text-gray-800',
  },
  {
    name: '化學',
    key: 'chem',
    total: 160,
    icon: <Atom />,
    theme: 'default',
    iconStroke: 'stroke-rose-600',
    buttonFill: 'bg-rose-500',
    textColor: 'text-rose-800',
  },
  {
    name: '生物',
    key: 'bio',
    total: 180,
    icon: <TreePine />,
    theme: 'default',
    iconStroke: 'stroke-emerald-600',
    buttonFill: 'bg-emerald-500',
    textColor: 'text-emerald-800',
  },
  {
    name: '物理',
    key: 'phys',
    total: 200,
    icon: <Scale />,
    theme: 'default',
    iconStroke: 'stroke-sky-600',
    buttonFill: 'bg-sky-500',
    textColor: 'text-sky-800',
  },
  {
    name: '經濟',
    key: 'econ',
    total: 200,
    icon: <Banknote />,
    theme: 'default',
    iconStroke: 'stroke-yellow-600',
    buttonFill: 'bg-yellow-500',
    textColor: 'text-yellow-800',
    isComing: true,
  },
  {
    name: 'BAFS',
    key: 'bafs',
    total: 200,
    icon: <ClipboardList />,
    theme: 'default',
    iconStroke: 'stroke-stone-600',
    buttonFill: 'bg-stone-500',
    textColor: 'text-stone-800',
    isComing: true,
  },
];

const HomePage = async () => {
  const subjectsData = await services.getHomeContent();
  const cookiesStore = await cookies();

  const lastQuestions: LastQuestionType[] = Object.keys(subjectsData)
    .map(subjectKey => JSON.parse(cookiesStore.get(COOKIES_KEY.LAST_QUESTIONS + subjectKey)?.value || '{}'))
    .filter(question => question.href)
    .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // sort the last questions by date

  return (
    <div className='relative'>
      <div className='z-10 relative'>
        <Header />
      </div>

      {/* background */}
      <div className='bg-main skew-y-6 h-[700px] z-0 -translate-y-60 absolute top-0 right-0 w-full' />
      <div className='bg-light_brown -skew-y-6 h-[450px] z-0  absolute top-[840px] right-0 w-full' />

      <div className='relative text-white mx-auto container sm:py-20 py-10 grid sm:grid-cols-2 sm:gap-20 gap-10 px-2'>
        <div>
          {lastQuestions.length ? (
            <div className='grid gap-10'>
              <h1 className='sm:text-4xl text-2xl font-bold leading-[4.2rem] flex gap-3 items-center'>
                <History size={30} />
                <span>繼續上次...</span>
              </h1>

              <div className='flex opacity-95 gap-4'>
                {lastQuestions.map((lastQuestion, i) => (
                  <LastQuestionContinueCard key={lastQuestion.href} lastQuestion={lastQuestion} />
                ))}
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-6 items-start'>
              <h1 className='sm:text-5xl text-4xl font-bold leading-[4.2rem]'>操卷新方法</h1>
              <p className='opacity-95 leading-9'>
                透過不同科目的練習，提升自己的學習能力，並且在操練過程中，即時提供回饋，讓你更了解自己的學習狀況。
              </p>
              <Button variant={'secondary'} asChild size={'xl'}>
                <Link href='/maths'>
                  <BicepsFlexed />
                  <span>開始操練</span>
                  <span className='-scale-x-100'>
                    <BicepsFlexed />
                  </span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className=' text-black py-4 px-6 rounded-3xl bg-[#ffffffdd] shadow-xl h-[230px]'>
          <LeaderBoards readOnly />
        </div>
      </div>
      <div className='grid grid-cols-2 container mx-auto mt-10 sm:mt-0'>
        {subjects.map((subject, i) => (
          <div className='relative z-10 sm:py-10' key={subject.name}>
            <div
              className={cn('container mx-auto flex items-center h-80 justify-between flex-col sm:flex-row', {
                'sm:flex-row-reverse': i % 2 === 0,
              })}
            >
              <div className='sm:p-20 grid gap-10'>
                <h1 className={cn('text-5xl font-black', subject.textColor)}>{subject.name}</h1>
                <div className='flex'>
                  <Badge variant={'outline'}>共 {subjectsData[subject.key]?.numberOfquestions || 0} 題</Badge>
                </div>
                <Button size='xl' asChild className={subject.buttonFill} disabled={subject.isComing}>
                  <Link href={subject.key}>
                    <span>{subject.isComing ? '即將推出' : '開始操練'}</span>
                    <NotebookPen />
                  </Link>
                </Button>
              </div>

              <>
                {{
                  ...subject.icon,
                  props: {
                    className: cn(subject.iconStroke, 'hidden sm:block hover:scale-105 transition'),
                    size: 210,
                  },
                }}
              </>
            </div>
          </div>
        ))}
      </div>
      <ChatBot />
    </div>
  );
};
export default HomePage;
