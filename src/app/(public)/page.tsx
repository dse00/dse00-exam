import services from '@/services';

import ExamCard from '../_components/ExamCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default async function Home() {
  const { paperBySubjects, mathPaperByTopic, mathPaperByDifficulty } = await services.getContent();

  return (
    <main className='container mx-auto'>
      <div className='grid gap-10'>
        <div>
          <div className='flex w-full gap-5 items-stretch'>
            <div className='basis-2/3'>
              <ExamCard exam={paperBySubjects[0]} isFeatured styles='text-3xl font-black' />
            </div>
            <div className='basis-1/3 self-auto'>
              <ExamCard
                exam={{
                  path: 'maths/exercise/random',
                  topic: 'random',
                  displayName: '隨機練習',
                  displayNameTc: '隨機練習',
                  numberOfquestions: 10,
                }}
              />
            </div>
          </div>
        </div>
        <h1 className='text-xl font-bold'>分類操練</h1>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
          {mathPaperByTopic.map(subject => (
            <ExamCard key={subject.displayName} exam={subject} />
          ))}
        </div>

        <h1 className='text-xl font-bold'>分難度操練</h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-11'>
          {mathPaperByDifficulty.map((subject, i) =>
            subject.topic !== 'ExtremeHard' ? (
              <div key={subject.displayName} className='col-span-3'>
                <ExamCard
                  exam={subject}
                  styles={['text-green-600', 'text-yellow-500', 'text-red-700'][i]}
                  isFeatured={subject.topic === 'Medium'}
                />
              </div>
            ) : (
              <Card className='h-full flex flex-col bg-fuchsia-700 text-white col-span-2' key={subject.displayName}>
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
      </div>
    </main>
  );
}
