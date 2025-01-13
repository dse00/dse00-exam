import moment from 'moment';
import Image from 'next/image';
import { FC } from 'react';

import { SubscriptionType } from '@/types/subscription';

import { Badge } from './ui/badge';

type props = {
  subscription: SubscriptionType;
};

export const SubscriptionCard: FC<props> = ({ subscription }) => {
  return (
    <div
      className='flex tems-center gap-8 px-6 py-8 rounded-2xl shadow-2xl typo-round hover:scale-105 transition-transform shrink-0'
      style={{
        background:
          'linear-gradient(294.57deg,  rgba(252, 229, 172) 10%, rgba(255, 255, 255) 30%,  rgba(252, 229, 172) 80%)',
        borderColor: 'rgba(255, 161, 22, 0.3)',
      }}
    >
      <Image src={'/images/leaf.png'} width={120} height={100} alt='' />

      {/* information */}
      <div className='grid gap-4'>
        <h2>{subscription.plan.name}</h2>
        <div className='flex gap-6'>
          <span>有效期至</span>
          <span>{moment(subscription.endDate).format('YYYY-MM-DD')}</span>
        </div>
        <div className='flex gap-6'>
          <span>訂閱編號</span>
          <span>{subscription._id.substring(16)}</span>
        </div>
        <div>
          <Badge>{new Date(subscription.endDate) > new Date() ? '生效中' : '已過期'}</Badge>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
