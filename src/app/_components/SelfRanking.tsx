'use server';
import { cookies } from 'next/headers';

import { Badge } from '@/components/ui/badge';
import services from '@/services';

const SelfRanking = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  let userRanking;
  if (token) {
    userRanking = await services.getRankingByUser(token as string);
  }

  return <Badge variant={'secondary'}>{userRanking && <span>排名：{userRanking.rank}</span>}</Badge>;
};

export default SelfRanking;
