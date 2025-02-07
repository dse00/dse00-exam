'use client';
import Link from 'next/link';

import { useCmsDashboard } from '@/hooks/cms/useCmsDashboard';

export default () => {
  const { dashboardData } = useCmsDashboard();

  if (!dashboardData) {
    return null;
  }

  return (
    <div>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <Link
          href={'/admin/user'}
          className='aspect-video rounded-xl bg-muted/50 flex items-center flex-col justify-center gap-4'
        >
          <span> Today User</span>
          <span>{dashboardData.todayNewUserCount}</span>
        </Link>
        <Link
          href={'/admin/questions/answers'}
          className='aspect-video rounded-xl bg-muted/50 flex items-center flex-col justify-center gap-4'
        >
          <span> Today Answer</span>
          <span>{dashboardData.todayAnswersCount}</span>
        </Link>
        <Link
          href={'/admin/questions/discussion'}
          className='aspect-video rounded-xl bg-muted/50 flex items-center flex-col justify-center gap-4'
        >
          <span> Today Comment</span>
          <span>{dashboardData.todayCommentCount}</span>
        </Link>
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
    </div>
  );
};
