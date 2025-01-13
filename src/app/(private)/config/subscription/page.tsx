import { cookies } from 'next/headers';

import SubscriptionCard from '@/components/SubscriptionCard';
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
          {subscriptionData.map(subscription => (
            <SubscriptionCard key={subscription._id} subscription={subscription} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserConfigSubscriptionPage;
