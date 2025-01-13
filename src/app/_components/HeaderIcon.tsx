'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useSubscription } from '@/hooks';

const HeaderIcon = () => {
  const { subscriptionData } = useSubscription();

  return (
    <Link
      href={'/'}
      className='typo-round text-white font-black text-3xl drop-shadow-[0_0px_6px_rgba(255,255,255,0.7)]'
    >
      {subscriptionData ? (
        <div className='flex gap-4'>
          <Image src='/images/leaf.png' width={34} height={34} alt='icon' />
          <span> DSE00+ exam</span>
        </div>
      ) : (
        ' DSE00 exam'
      )}
    </Link>
  );
};

export default HeaderIcon;
