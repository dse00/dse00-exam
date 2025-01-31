'use client';

import moment from 'moment';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { UserAnswerType } from '@/types/userAnswer';

export const description = 'An interactive bar chart';

const chartConfig = {
  views: {
    label: '完成',
  },
  total: {
    label: '總數',
    color: 'hsl(var(--chart-1))',
  },
  maths: {
    label: '數學',
    color: 'hsl(var(--chart-2))',
  },
  chem: {
    label: '化學',
    color: 'hsl(var(--chart-3))',
  },
  phy: {
    label: '物理',
    color: 'hsl(var(--chart-4))',
  },
  bio: {
    label: '生物',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function ScoreDailyChart({ answersData }: { answersData: UserAnswerType[] }) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('total');

  const chartData = Object.entries(
    Object.groupBy(answersData, ({ createdAt }) => moment(createdAt).format('YYYY-MM-DD'))
  ).map(([key, value]) => ({
    date: key,
    total: value?.length,
    maths: value?.filter(({ question }) => question.subject === 'maths').length,
    chem: value?.filter(({ question }) => question.subject === 'chem').length,
    phy: value?.filter(({ question }) => question.subject === 'phy').length,
    bio: value?.filter(({ question }) => question.subject === 'bio').length,
  }));

  // 只顯示有作答的科目
  const subjects = Object.keys(Object.groupBy(answersData, ({ question }) => question.subject));

  const total = React.useMemo(
    () => ({
      total: chartData.reduce((acc, curr) => acc + (curr.total || 0), 0),
      maths: chartData.reduce((acc, curr) => acc + (curr.maths || 0), 0),
      chem: chartData.reduce((acc, curr) => acc + (curr.chem || 0), 0),
      phy: chartData.reduce((acc, curr) => acc + (curr.phy || 0), 0),
      bio: chartData.reduce((acc, curr) => acc + (curr.bio || 0), 0),
    }),
    [chartData]
  );

  return (
    <Card className='border-none shadow-none p-0'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 py-5 sm:py-6'>
          <CardTitle>進度表</CardTitle>
          <CardDescription>記錄你每天的進步</CardDescription>
        </div>
        <div className='flex'>
          {['total', ...subjects].map(key => {
            const chart = key as keyof typeof chartConfig;

            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>{chartConfig[chart]?.label}</span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value);

                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
