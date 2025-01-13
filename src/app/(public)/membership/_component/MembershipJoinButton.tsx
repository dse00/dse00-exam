'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks';
import { useAppStore } from '@/store';

type props = {
  plan: string;
};

const MembershipJoinButton: FC<props> = ({ plan }) => {
  const router = useRouter();

  const { userData } = useUser();
  const { setLoginDialogOpen } = useAppStore();

  const toJoin = () => {
    if (!userData) {
      return setLoginDialogOpen(true);
    }
    router.push(`membership/payment/${plan}`);
  };

  return <Button onClick={toJoin}>加入</Button>;
};

export default MembershipJoinButton;
