import { History, Layers2, Rocket } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import * as R from 'ramda';

import TopicCard from '@/app/_components/TopicCard';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import services from '@/services';

import FeatureCard from '../../_components/FeatureCard';
import LastQuestionContinueCard from '../../_components/LastQuestionContinueCard';
import LeaderBoards from '../../_components/LeaderBoards';
import styles from './index.module.css';

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const p = await params;

  const { paperBySubjects, paperByTopic, paperByDifficulty } = await services.getContent(p.subject);

  const cookiesStore = await cookies();
  const lastQuestion = JSON.parse(cookiesStore.get('lastQuestion')?.value || '{}');

  return (
    <main className='container mx-auto'>
      <div className='grid gap-10'>
        <div className='flex sm:flex-row flex-col w-full gap-8 sm:gap-10 items-stretch'>
          {/* Featured */}
          <div className='basis-2/3'>
            <FeatureCard exam={paperBySubjects[0]} styles='text-3xl font-black' subject={p.subject} />
          </div>

          {/* Ranking */}
          <div className='basis-1/3 self-auto'>
            <LeaderBoards />
          </div>
        </div>

        {/* Continue */}
        {R.isNotEmpty(lastQuestion) && (
          <>
            <h1 className={styles.title}>
              <History />
              <span>繼續上次...</span>
            </h1>
            <div className='flex'>
              <LastQuestionContinueCard lastQuestion={lastQuestion} />
            </div>
          </>
        )}

        {/* Topic */}
        <h1 className={styles.title}>
          <Layers2 />
          <span>分類操練</span>
        </h1>
        <div className='grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {paperByTopic.map(subject => (
            <TopicCard key={subject.displayName} exam={subject} />
          ))}
        </div>

        {/* Difficulty */}

        <h1 className={styles.title}>
          <Rocket />
          <span>分難度操練</span>
        </h1>
        <div className='grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-11'>
          {paperByDifficulty.map((subject, i) =>
            subject.topic !== 'ExtremeHard' ? (
              <div key={subject.displayName} className='md:col-span-3'>
                <TopicCard
                  exam={subject}
                  styles={['text-green-600', 'text-yellow-500', 'text-red-700'][i]}
                  isFeatured={subject.topic === 'Medium'}
                />
              </div>
            ) : (
              <Card className='h-full flex flex-col bg-fuchsia-700 text-white md:col-span-2' key={subject.displayName}>
                <CardHeader className='grow flex flex-col justify-between'>
                  <CardTitle>{subject.displayName}</CardTitle>
                  <CardDescription className='text-purple-200'>香港中學文憑試</CardDescription>
                </CardHeader>
                <CardContent className='grow'>
                  <p>共 {subject.numberOfquestions} 題</p>
                </CardContent>
                <CardFooter>
                  <Link className={buttonVariants({ variant: 'secondary' })} href={`/${subject.path}`}>
                    開始
                  </Link>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </main>
  );
}
