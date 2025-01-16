import Image from 'next/image';
import Link from 'next/link';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import { buttonVariants } from '@/components/ui/button';

const Custom404 = () => {
  return (
    <DefaultLayout>
      <div className='container mx-auto flex flex-col items-center gap-10 pt-20'>
        <Image src='/images/wind-chime.gif' alt='404' width={300} height={300} />
        <h1 className='text-4xl typo-round'>404 Page</h1>
        <Link href={'/'} className={buttonVariants()}>
          HOME
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default Custom404;
