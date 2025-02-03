import {
  BookOpenCheck,
  ClipboardMinus,
  Database,
  Infinity,
  Leaf,
  LibraryBig,
  MegaphoneOff,
  ScrollText,
  Smile,
} from 'lucide-react';
import { NextPage } from 'next';
import { FC } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import services from '@/services';
import { PlanType } from '@/types/plan';

import MembershipJoinButton from './_component/MembershipJoinButton';

const MembershipPage: NextPage = async () => {
  const plans = await services.getPlans();

  const plan1 = plans?.find(plan => plan.key === 'plan1') as PlanType;
  const plan2 = plans?.find(plan => plan.key === 'plan2') as PlanType;
  const plan3 = plans?.find(plan => plan.key === 'plan3') as PlanType;

  return (
    <div className='container sm:py-20 py-10'>
      <div className='max-w-5xl mx-auto grid sm:gap-20 gap-10'>
        <h1 className='typo-round sm:text-6xl text-4xl justify-center flex'>
          DSE00 +<Leaf />
        </h1>

        <div className='flex flex-col sm:flex-row sm:gap-14 gap-10 justify-between'>
          {/* 1 month membership */}
          <Card className='px-1 shadow-xl'>
            <CardHeader>
              <CardTitle className='text-2xl'>{plan1.name}</CardTitle>
              <CardDescription>原價 ${plan1?.originalPrice}/月</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <p>{plan1?.description}</p>

              <p className='text-label-1 text-3xl font-semibold'>${plan1.price}</p>
            </CardContent>
            <CardFooter>
              <MembershipJoinButton plan={plan1?.key as string} />
            </CardFooter>
          </Card>

          {/* 3 month membership */}
          <Card
            className='px-1 shadow-xl sm:scale-110 scale-100'
            style={{
              background:
                'linear-gradient(294.57deg,  rgba(252, 229, 172) 10%, rgba(255, 255, 255) 30%,  rgba(252, 229, 172) 80%)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <CardHeader>
              <CardTitle className='flex items-center gap-2 justify-between'>
                <div className='text-2xl items-center flex gap-2'>
                  <Smile />
                  <span>{plan2.name}</span>
                </div>

                <div className='text-sm rounded px-3 py-1' style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  🎉 最受歡迎
                </div>
              </CardTitle>
              <CardDescription>平均每月 ${(plan2.price / 3).toPrecision(2)}/月</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <p>{plan2?.description}</p>

              <p className='text-label-1 text-3xl font-semibold'>${plan2?.price}</p>
            </CardContent>
            <CardFooter>
              <MembershipJoinButton plan={plan2?.key as string} />
            </CardFooter>
          </Card>

          {/* lifetime Membership */}
          <Card
            className='px-1 shadow-xl shrink-0 text-white'
            style={{
              background:
                'linear-gradient(294.57deg,  rgba(0, 0, 0,0.8) 0%, rgba(100, 100, 100) 30%,  rgba(0, 0, 0,0.9) 70%)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <CardHeader>
              <CardTitle className='flex items-center gap-2 justify-between'>
                <span className='text-2xl'>{plan3.name}</span>

                <div className='text-sm rounded px-3 py-1' style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  名額有限
                </div>
              </CardTitle>
              <CardDescription className='text-gray-300'>原價 ${plan3?.originalPrice}/年</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4 '>
              <p className='typo-round'>{plan3?.description}</p>
              <p className='text-label-1 text-3xl font-semibold'>${plan3?.price}</p>
            </CardContent>
            <CardFooter>
              <MembershipJoinButton plan={plan3?.key as string} />
            </CardFooter>
          </Card>
        </div>

        <div className='grid gap-x-12 gap-y-16 sm:grid-cols-2 grid-cols-1 max-w-4xl mx-auto'>
          {[
            {
              title: 'Extremely Hard 題庫',
              description: '提供更多高難度題目，讓你更好地準備DSE考試。',
              icon: <BookOpenCheck />,
            },
            {
              title: 'AI 導師',
              description: '24小時 AI 導師，隨時解答你的問題。',
              icon: <BookOpenCheck />,
            },
            {
              title: '成績表',
              description: '生成你的成績表，了解自己的學習狀況。',
              icon: <ClipboardMinus />,
            },
            {
              title: '無限練習本',
              description: '可以保存無限個練習本，方便你分類練習。',
              icon: <Infinity />,
            },
            {
              title: '生成試卷',
              description: '可以生成自己的試卷，方便你練習。',
              icon: <ScrollText />,
            },
            {
              title: '25× 訪問容量',
              description: '訪問更多題目，生成更長試卷。',
              icon: <Database />,
            },
            {
              title: '無廣告',
              description: '不會有任何廣告打擾你的練習。',
              icon: <MegaphoneOff />,
            },
            {
              title: '所有題庫',
              description: '無限次數使用我們的練習模式，不用擔心次數限制。',
              icon: <LibraryBig />,
            },

            // {
            //   title: '未來更新',
            //   description: '可以訪問最新功能',
            //   icon: <BellPlus />,
            // },
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
