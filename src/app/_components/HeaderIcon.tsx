'use client';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

import { useSubscription } from '@/hooks';

const HeaderIcon = () => {
  const { isActiveSubscription } = useSubscription();

  return (
    <Link
      href={'/'}
      className='typo-round text-white font-black text-3xl drop-shadow-[0_0px_6px_rgba(255,255,255,0.7)]'
    >
      <div className='flex gap-4 items-center'>
        <Leaf size={32} fill={isActiveSubscription ? '#eab308' : ''} />
        <span> {isActiveSubscription ? 'DSE00+ exam' : 'DSE00 exam'}</span>
      </div>
    </Link>
  );
};

export default HeaderIcon;
