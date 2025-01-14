'use client';
import Cookies from 'js-cookie';
import { ArrowBigLeft, Database, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSubscription } from '@/hooks';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

export const FAKE_USER_ICON = '/images/default-icon.png';

export const menuItems = [
  {
    title: '我的記錄',
    href: '/user/my-lists',
    icon: 'https://assets.leetcode.com/static_assets/public/webpack_bundles/images/list.be52ffc55.png',
  },
  {
    title: '練習本',
    href: '/user/notebook',
    icon: 'https://leetcode.com/static/webpack_bundles/images/notebook.44bf4230c.png',
  },
  {
    title: '討論',
    href: '/user/discussion',
    icon: 'https://leetcode.com/static/webpack_bundles/images/answer.08334763f.png',
  },
];

export default function AvatarAndMenu() {
  const { userData, isError } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const { isActiveSubscription } = useSubscription();

  const path = usePathname();

  const { setLoginDialogOpen } = useAppStore();

  const signOut = () => {
    Cookies.remove('token');
    window.location.href = path;
  };

  const toLogin = () => {
    setLoginDialogOpen(true);
  };

  useEffect(() => {
    if (isError) {
      signOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const router = useRouter();
  const toRedirect = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (!userData) {
    return (
      <button onClick={toLogin} className='text-white'>
        登入
      </button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <img src={FAKE_USER_ICON} alt='' className='w-10 h-10 rounded-full cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className=' grid gap-4'>
          <div className='flex gap-4'>
            <img src={FAKE_USER_ICON} alt='user_icon' className='w-14 h-14 object-cover rounded-full' />
            <div className='grid'>
              <span className='font-black ml-2'>{userData.name}</span>

              {isActiveSubscription ? (
                <Button
                  onClick={() => toRedirect('/config/subscription')}
                  className='text-sm text-primary hover:bg-[#00000009] px-2 py-1 rounded-lg typo-round text-green-500 flex gap-2'
                >
                  <Image src={'/images/leaf.png'} alt='' width={20} height={20} />
                  <span> DSE00+ PLUS 會員</span>
                </Button>
              ) : (
                <Button
                  onClick={() => toRedirect('/membership')}
                  className={cn(buttonVariants({ size: 'sm' }), 'typo-round')}
                >
                  訂閱 DSE00 +
                </Button>
              )}
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            {menuItems.map((item, index) => (
              <button
                key={item.title}
                onClick={() => toRedirect(item.href)}
                className='flex flex-col items-center gap-2 p-2 bg-gray-100 rounded-lg w-20'
              >
                <Image src={item.icon} alt='' className='w-10 h-10' width={40} height={40} />
                <span className='text-xs'>{item.title}</span>
              </button>
            ))}
          </div>
          <div className='grid items-stretch gap-2 text-sm opacity-60'>
            {userData.roles.includes('admin') && (
              <Button variant={'ghost'} onClick={() => toRedirect('/admin')} className={'justify-start'}>
                <Database />
                <span>管理員</span>
              </Button>
            )}
            <Link href={'https://www.dse00.com/'} className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}>
              <ArrowBigLeft />
              <span>返回 DSE00</span>
            </Link>
            <Button variant={'ghost'} className='justify-start' onClick={signOut}>
              <LogOut />
              <span>登出</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
