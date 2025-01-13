import Link from 'next/link';
import { FC } from 'react';

import AvatarAndMenu from './AvatarAndMenu';
import HeaderIcon from './HeaderIcon';

const Header: FC = () => {
  return (
    <header className='bg-main w-full h-[58px] flex justify-center items-center px-2'>
      <div className='container flex items-center gap-10'>
        <HeaderIcon />
        {/* {isExamPage ? (
          <div className='flex items-center gap-3'>
            <Image src='/images/leaf.png' width={34} height={34} alt='icon' />
            <ProblemListSidebar />
          </div>
        ) : (
          <Link href={'/'} className='text-white font-black text-4xl drop-shadow-[0_0px_6px_rgba(255,255,255,0.7)]'>
            DSE00 exam
          </Link>
        )} */}

        <div className='flex items-center gap-10 grow'>
          <div className='sm:flex gap-7 hidden'>
            <Link
              className={'text-white text-[15px]'}
              href={'https://www.dse00.com/p/core-cutoff.html'}
              target='_blank'
            >
              DSE00 AI 補習配對
            </Link>
            <Link
              className={'text-white text-[15px]'}
              href={'https://www.dse00.com/p/core-cutoff.html'}
              target='_blank'
            >
              2024 Cut-off
            </Link>
            <Link
              className={'text-white text-[15px]'}
              href={'https://www.dse00.com/p/core-cutoff.html'}
              target='_blank'
            >
              JUPAS Cuf-off
            </Link>
          </div>
        </div>
        <AvatarAndMenu />
      </div>
    </header>
  );
};

export default Header;
