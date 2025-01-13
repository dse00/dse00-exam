import moment from 'moment';
import Image from 'next/image';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentType } from '@/types/payment';

type props = {
  payment: PaymentType;
};

const PaymentCard: FC<props> = ({ payment }) => {
  return (
    <div className='relative w-[500px]'>
      <Image src={'/images/receipt.svg'} alt='payment' width={500} height={120} className='' />
      <div className='absolute text-white font-medium flex items-center justify-center uppercase text-xl tracking-widest top-0 right-0 bg-[#B6AC96] h-10 w-40 mr-3 rounded-bl-3xl rounded-tr-3xl mt-3'>
        {payment.status}
      </div>

      <div className='absolute z-10 top-0 left-0 pt-8 pb-0 px-14 text-gray-600 flex flex-col gap-[14px] text-lg justify-between w-full'>
        <h1 className='uppercase tracking-widest font-black '>{payment.type}</h1>
        <div className='flex gap-6'>
          <div className='font-black text-4xl flex items-center justify-center py-4 px-2 tracking-wider'>
            ${payment.amount}
          </div>
          <div className='flex flex-col justify-evenly'>
            <p>{payment.referenceId}</p>
            <p>{moment(payment.createdAt).format('YYYY-MM-DD: h:m:s')}</p>
          </div>
        </div>

        <div className='flex items-center gap-6 border-t-2 border-dashed pt-4 text-gray-400'>
          <span>交易編號</span>
          <span className='uppercase'> {payment._id}</span>
        </div>
      </div>
      {/* <Card>
        <CardHeader>
          <CardTitle>{payment.type}</CardTitle>
          <CardDescription>{payment.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{payment.referenceId}</p>
          <p>$ {payment.amount}</p>
          <p>{payment.type}</p>
          <p>{moment(payment.createdAt).format('YYYY-MM-DD')}</p>
          <p>
            <span>交易編號</span>
            {payment._id}
          </p>
        </CardContent>
        <CardFooter>
          <Badge>{payment.status}</Badge>
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default PaymentCard;
