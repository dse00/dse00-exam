'use client';
import { MessageSquareMore } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { menuItems } from '@/app/_components/AvatarAndMenu';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import ChatBot from '@/components/ChatBot';
import { useLanguage } from '@/components/LanguageButton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const pathname = usePathname();

  useLanguage();

  return (
    <div className='flex flex-col items-center gap-6'>
      <Header />
      <div className='container px-2'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>DSE00</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>我的記錄</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='container justify-center gap-20 flex px-2 items-start min-h-[72vh]'>
        <div className='gap-6 hidden sm:grid'>
          <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />
          {[
            ...menuItems,
            {
              smallIcon: <MessageSquareMore />,
              title: '我的討論',
              href: '/user/discussion',
            },
          ].map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost' }),
                'grid grid-cols-3'
              )}
            >
              <span className='mr-2'>{item.smallIcon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        <div className='grow'>{children}</div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
};
