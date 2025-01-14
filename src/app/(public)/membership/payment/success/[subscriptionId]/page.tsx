import { Heart } from 'lucide-react';
import moment from 'moment';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FAKE_USER_ICON } from '@/app/_components/AvatarAndMenu';
import SubscriptionCard from '@/components/SubscriptionCard';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import services from '@/services';

import ReturnHomeButton from './_components/ReturnHomeButton';

type props = {
  params: Promise<{
    subscriptionId: string;
  }>;
};

const MembershipPaymentSuccessPage: NextPage<props> = async ({ params }) => {
  const { subscriptionId } = await params;

  const subscription = await services.getSubscription(subscriptionId);

  return (
    <div className='container flex flex-col items-center mt-20 gap-10'>
      <div className='flex flex-col items-center justify-between max-w-4xl w-full gap-20'>
        <SubscriptionCard subscription={subscription} />

        <div className='flex flex-col items-center gap-10'>
          <div className='flex flex-col items-center gap-2'>
            <Heart color='red' size={100} fill='red' />

            <h1 className='text-3xl'>多謝支持</h1>
            <span>付款已記錄</span>
          </div>
          <p className='w-80 text-center text-gray-400'>
            我們會在 3 個工作天處理你的付款，在此之前，你可以開始使用 <span className='type-round'>DSE00 +</span>
          </p>
          <ReturnHomeButton />
        </div>
      </div>
    </div>
  );
};

export default MembershipPaymentSuccessPage;
