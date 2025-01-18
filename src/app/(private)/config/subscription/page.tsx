import { cookies } from 'next/headers';
import Link from 'next/link';

import SubscriptionCard from '@/components/SubscriptionCard';
import { buttonVariants } from '@/components/ui/button';
import services from '@/services';

const UserConfigSubscriptionPage = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  const subscriptionData = await services.getSubscriptionsByUser(token);

  return (
    <div className='w-full'>
      <div className='mx-auto p-4 max-w-lg'>
        <div className='grid gap-4 justify-start'>
          {subscriptionData.length === 0 && (
            <div className='flex flex-col gap-4'>
              <h1 className='text-2xl font-bold'>未有訂閱</h1>
              <Link href='/membership' className={buttonVariants()}>
                前往訂閱
              </Link>
            </div>
          )}
          {subscriptionData.map(subscription => (
            <SubscriptionCard key={subscription._id} subscription={subscription} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserConfigSubscriptionPage;
