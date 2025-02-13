'use server';

import { cookies } from 'next/headers';

import { AddOilSlogan } from '@/app/_components/AddOilSlogan';
import services from '@/services';

import { ScoreDailyChart } from './_components/ScoreDailyChart';
import ScoreStatementSection from './_components/ScoreStatementSection';

export default async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) return null;
  const userAnswersData = await services.getUserAnswers(token);
  if (!userAnswersData) return null;

  return (
    <div className='grid gap-6'>
      <div className='bg-white shadow-lg sm:px-8 px-2 grid gap-10'>
        <ScoreDailyChart answersData={userAnswersData} />
        <ScoreStatementSection answersData={userAnswersData} />
      </div>
      <AddOilSlogan />
    </div>
  );
};
