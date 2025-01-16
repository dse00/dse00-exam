import { Bomb, FlaskRound, Layers2, Rocket, Shuffle } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import services from '@/services';

import ExamCard from '../_components/ExamCard';
import styles from './index.module.css';

export default async function Home() {
  const { paperBySubjects, mathPaperByTopic, mathPaperByDifficulty } = await services.getContent();

  return (
    <main className='container mx-auto'>
      <div className='grid gap-10'>
        {/* Featured */}
        <div>
          <div className='flex w-full gap-0 sm:gap-6 items-stretch'>
            <div className='basis-2/3'>
              <ExamCard
                exam={paperBySubjects[0]}
                isFeatured
                styles='text-3xl font-black'
                cardStyles={'rounded-r-none sm:rounded-xl border-r-0 sm:border'}
              />
            </div>
            <div className='basis-1/3 self-auto'>
              <ExamCard
                cardStyles={'rounded-l-none sm:rounded-xl border-l-0 sm:border'}
                exam={{
                  path: 'maths/exercise/random',
                  topic: 'random',
                  displayName: '隨機練習',
                  displayNameTc: '隨機練習',
                  numberOfquestions: 10,
                }}
                icon={<Shuffle />}
              />
            </div>
          </div>
        </div>

        {/* Topic */}
        <h1 className={styles.title}>
          <Layers2 />
          <span>分類操練</span>
        </h1>
        <div className='grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {mathPaperByTopic.map(subject => (
            <ExamCard key={subject.displayName} exam={subject} />
          ))}
        </div>

        {/* Difficulty */}

        <h1 className={styles.title}>
          <Rocket />
          <span>分難度操練</span>
        </h1>
        <div className='grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-11'>
          {mathPaperByDifficulty.map((subject, i) =>
            subject.topic !== 'ExtremeHard' ? (
              <div key={subject.displayName} className='md:col-span-3'>
                <ExamCard
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
                  <Link className={buttonVariants({ variant: 'secondary' })} href={`/exam/${subject.path}`}>
                    開始
                  </Link>
                </CardFooter>
              </Card>
            )
          )}
        </div>

        {/* Coming */}

        <h1 className={styles.title}>
          <FlaskRound />
          <span>化學、生物、物理</span>
        </h1>
        <div className='gap-3 sm:gap-6 grid grid-cols-3'>
          {['Physics', 'Chemistry', 'Biology'].map(subject => (
            <Card key={subject} className='hover:scale-105 transition cursor-pointer'>
              <CardHeader>
                <CardTitle className='flex items-center gap-4'>
                  <Bomb />
                  <span>{subject}</span>
                </CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent>
                <p>Is Coming</p>
              </CardContent>
              <CardFooter />
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
