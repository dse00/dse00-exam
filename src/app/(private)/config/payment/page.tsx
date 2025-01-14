import { cookies } from 'next/headers';

import services from '@/services';

import PaymentCard from './_components/PaymentCard';

const UserConfigPaymentPage = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  const paymentData = await services.getPaymentRecords(token);

  return (
    <div>
      <div className='grid gap-4'>
        {paymentData.map(payment => (
          <PaymentCard key={payment._id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default UserConfigPaymentPage;
