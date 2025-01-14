import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import { buttonVariants } from '@/components/ui/button';
import services from '@/services';

export type LayoutProps = {
  children: React.ReactNode;
};

export default async () => {
  // redirect to home page when server resume
  const health = await services.getHealth();
  if (health) {
    redirect('/');
  }

  return (
    <DefaultLayout>
      <div className='flex justify-center px-2 flex-col items-center pt-20 gap-10'>
        <Image src='/images/wind-chime.gif' alt='404' width={300} height={300} />

        <h1 className='text-3xl'>網站正在維護...</h1>
        <Link href='https://www.dse00.com/' className={buttonVariants()}>
          返回 DSE00
        </Link>
      </div>
    </DefaultLayout>
  );
};
