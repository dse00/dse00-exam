import { BellPlus, BookOpenCheck, Infinity, LibraryBig } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const MembershipPage: NextPage = () => {
  return (
    <div className='container sm:py-20 py-10'>
      <div className='max-w-4xl mx-auto grid sm:gap-20 gap-10'>
        <h1 className='typo-round sm:text-6xl text-4xl text-center'>DSE00 +</h1>

        <div className='flex flex-col sm:flex-row sm:gap-20 gap-10 justify-between'>
          <Card className='px-1 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-2xl'>1 個月</CardTitle>
              <CardDescription>原價 $39/月</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <p>
                DSE考生優惠，月費計劃可使用所有 <span className='font-semibold'>高階功能</span>。
              </p>

              <p className='text-label-1 text-3xl font-semibold'>$13</p>
            </CardContent>
            <CardFooter>
              <Link href={`membership/payment/1month`} className={buttonVariants({ variant: 'default' })}>
                加入
              </Link>
            </CardFooter>
          </Card>
          <Card
            className='px-1 shadow-xl'
            style={{
              background: 'linear-gradient(294.57deg, rgba(255, 148, 88) 0%, rgba(252, 229, 172) 100%)',
              borderColor: 'rgba(255, 161, 22, 0.3)',
            }}
          >
            <CardHeader>
              <CardTitle className='flex items-center gap-2 justify-between'>
                <span className='text-2xl'> 3 個月</span>

                <div className='text-sm rounded px-3 py-1' style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  🎉 最受歡迎
                </div>
              </CardTitle>
              <CardDescription>平均每月 $9/月</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <p>
                DSE考生優惠，月費計劃可使用所有 <span className='font-semibold'>高階功能</span>。
              </p>

              <p className='text-label-1 text-3xl font-semibold'>$27</p>
            </CardContent>
            <CardFooter>
              <Link href={`membership/payment/3month`} className={buttonVariants()}>
                加入
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className='grid gap-12 sm:grid-cols-2 grid-cols-1 max-w-4xl mx-auto'>
          {[
            {
              title: 'Extremely Hard 題庫',
              description: '提供更多高難度題目，讓你更好地準備DSE考試。。',
              icon: <BookOpenCheck />,
            },
            {
              title: '所有題庫',
              description: '無限次數使用我們的練習模式，不用擔心次數限制。',
              icon: <LibraryBig />,
            },
            {
              title: '無限練習本',
              description: '可以保存無限個練習本，方便你分類練習。',
              icon: <Infinity />,
            },
            {
              title: '未來更新',
              description: '可以訪問最新功能',
              icon: <BellPlus />,
            },
          ].map(item => (
            <BenefitsItem key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;

const BenefitsItem: FC<{ title: string; description: string; icon: React.ReactNode }> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className='flex gap-6'>
      {icon}
      <div className='grid gap-4'>
        <h2 className='flex items-center gap-4 font-bold'>{title}</h2>
        <p className='opacity-80'>{description}</p>
      </div>
    </div>
  );
};
