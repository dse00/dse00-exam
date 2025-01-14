'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Header from '@/app/_components/Header';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button, buttonVariants } from '@/components/ui/button';

export const menuItems = [
  {
    title: '訂閱',
    href: '/config/subscription',
  },
  {
    title: '付款記錄',
    href: '/config/payment',
  },
];

export type LayoutProps = {
  children: React.ReactNode;
};

export default ({ children }: LayoutProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const pathname = usePathname();

  return (
    <DefaultLayout>
      <div className='container grid gap-10'>
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
        <div className='container justify-center gap-20 flex px-2 items-start'>
          <div className='gap-6 hidden sm:grid'>
            {menuItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost' })}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className='grow'>{children}</div>
        </div>
      </div>
    </DefaultLayout>
  );
};
