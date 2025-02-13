import { NextPage } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import services from '@/services';

import PaymentConfirmDialog from './_components/PaymentConfirmDialog';

type props = {
  params: Promise<{ plan: string }>;
};

const MembershipPaymentPage: NextPage<props> = async ({ params }) => {
  const param = await params;

  const currentPlan = await services.getPlan(param.plan);

  const cookieStore = await cookies();

  const token = cookieStore.get('token');

  if (!token) {
    return redirect('/');
  }

  return (
    <div>
      <div className='bg-white rounded-lg shadow-lg my-40 flex justify-between overflow-hidden'>
        <div className='p-10 grid gap-10'>
          <h1 className='text-3xl font-bold'>使用 PayMe 掃描此 PayCode</h1>
          <div className='flex justify-between gap-10 items-stretch'>
            <Image src={'/images/paycode.jpg'} alt='PayMe QR Code' width={300} height={300} priority />
            <div className='border-[0.5px]' />
            <div className='flex flex-col justify-between gap-4 py-10'>
              <div className='flex'>
                <span className='mr-8'>1.</span>
                <span>打開 PayMe 應用程式，掃描這個 PayCode</span>
              </div>
              <div className='flex'>
                <span className='mr-8'>2.</span>
                <span> 輸入金額</span>
                <span className='ml-1'>${currentPlan.price}</span>
              </div>
              <div className='flex'>
                <span className='mr-8'>3.</span>
                <p>
                  <span> 在 PayMe 信息中輸入您的</span>
                  <span className='font-bold'> 電子郵件地址</span>
                </p>
              </div>
              <div className='flex'>
                <span className='mr-8'>4.</span>確認付款，並保存截圖以供日後查閱
              </div>
            </div>
          </div>
        </div>
        <div className='bg-light_brown p-10 min-w-80 flex flex-col pb-20'>
          <div className='flex justify-between grow font-medium'>
            <h2 className='typo-round'>{currentPlan.name}</h2>
            <span>${currentPlan.price}</span>
          </div>
          <div className='flex justify-between font-black'>
            <span> 總付款額</span>
            <span className='text-2xl'>${currentPlan.price}</span>
          </div>
        </div>
      </div>
      <div className='flex gap-10 justify-end'>
        <Link href={'/membership'} className={buttonVariants({ variant: 'ghost' })}>
          返回
        </Link>
        <PaymentConfirmDialog currentPlan={currentPlan} />
      </div>
    </div>
  );
};

export default MembershipPaymentPage;
