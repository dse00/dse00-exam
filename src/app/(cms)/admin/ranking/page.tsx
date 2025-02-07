'use server';
import { cookies } from 'next/headers';

import { Badge } from '@/components/ui/badge';
import cmsServices from '@/services/cms';

import { BaseTable } from '../../_components/BaseTable';
import { columns } from './_components/column';
export default async () => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get('token')?.value;

  if (!token) return null;
  const allRanking = await cmsServices.getAllRanking(token);

  return (
    <div className='flex flex-col gap-4 items-start'>
      <Badge>{allRanking.length}</Badge>
      <BaseTable
        data={allRanking}
        columns={columns}
        filter={{
          key: 'user',
          name: 'User ID',
        }}
        defaultPage={100}
      />
    </div>
  );
};
