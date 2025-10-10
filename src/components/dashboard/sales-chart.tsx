'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartConfig, ChartContainer } from '@estia/components/ui/chart';
import { useState } from 'react';
import { cn } from '@estia/utils/utils';
import { formatCurrency } from '@estia/utils/currency';
import { useIs43Inches } from '@estia/hooks/useIsMobile';
import { useTranx } from '@estia/hooks/useTranx';
import { format } from 'date-fns';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-neutral-5)',
  },
} satisfies ChartConfig;

export function SalesChart({ showTimeline = true }: any) {
  const [activeTime, setActiveTime] = useState('1m');
  const [activeIndex, setActiveIndex] = useState(3);
  const isLargeScreen = useIs43Inches();
  const { t } = useTranx();

  const chartData = [
    { month: format(new Date(2024, 0, 1), 'LLLL'), desktop: 386 },
    { month: format(new Date(2024, 1, 1), 'LLLL'), desktop: 305 },
    { month: format(new Date(2024, 2, 1), 'LLLL'), desktop: 237 },
    { month: format(new Date(2024, 3, 1), 'LLLL'), desktop: 73 },
    { month: format(new Date(2024, 4, 1), 'LLLL'), desktop: 209 },
    { month: format(new Date(2024, 5, 1), 'LLLL'), desktop: 214 },
    { month: format(new Date(2024, 6, 1), 'LLLL'), desktop: 314 },
    { month: format(new Date(2024, 7, 1), 'LLLL'), desktop: 200 },
    { month: format(new Date(2024, 8, 1), 'LLLL'), desktop: 100 },
    { month: format(new Date(2024, 9, 1), 'LLLL'), desktop: 40 },
    { month: format(new Date(2024, 10, 1), 'LLLL'), desktop: 200 },
    { month: format(new Date(2024, 11, 1), 'LLLL'), desktop: 214 },
  ];

  const options = [
    {
      title: t('dashboard.analytics.sales_page.sales_chart.1_day'),
      value: '1d',
    },
    {
      title: t('dashboard.analytics.sales_page.sales_chart.1_week'),
      value: '1w',
    },
    {
      title: t('dashboard.analytics.sales_page.sales_chart.1_month'),
      value: '1m',
    },
    {
      title: t('dashboard.analytics.sales_page.sales_chart.3_months'),
      value: '3m',
    },
    {
      title: t('dashboard.analytics.sales_page.sales_chart.current_year'),
      value: 'current-year',
    },
    {
      title: t('dashboard.analytics.sales_page.sales_chart.all_time'),
      value: 'all-time',
    },
  ];

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // const handleMouseLeave = () => {
  //   setActiveIndex(undefined);
  // };

  const CustomLabel = (props: any) => {
    const { index, x, y, value, width } = props;
    if (index !== activeIndex) return null;

    const centerX = x + width / 2;

    return (
      <text
        x={centerX}
        y={y - 8}
        fill='#000'
        fontSize={12}
        fontWeight='bold'
        textAnchor='middle'
      >
        {value}
      </text>
    );
  };

  return (
    <div className='relative w-full overflow-x-auto'>
      {showTimeline ? (
        <div className='mt-2 flex items-center sm:mt-4'>
          <h3 className='mr-4 -ml-1 p-2 text-base font-bold'>
            {t('dashboard.analytics.sales_page.sales_chart.time')}
          </h3>
          {options?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveTime(item?.value);
              }}
              className={cn(
                'text-neutral-4 mr-3 max-h-max cursor-pointer p-1 px-3',
                item.value === activeTime &&
                  'bg-neutral-3 rounded-3xl text-white'
              )}
            >
              <h3 className='text-sm font-bold sm:text-base'>{item?.title}</h3>
            </div>
          ))}
        </div>
      ) : null}
      <ChartContainer
        config={chartConfig}
        className='mt-2 h-96 overflow-x-auto rounded-lg p-0 sm:w-full'
      >
        <BarChart barSize='100%' accessibilityLayer data={chartData}>
          <CartesianGrid className='rounded-2xl' radius={100} />
          <Bar
            dataKey='desktop'
            fill='#B1B5C3'
            radius={2}
            isAnimationActive={true}
            activeIndex={activeIndex}
            activeBar={{ fill: '#360C46' }}
            onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            <LabelList
              position='top'
              offset={12}
              className='fill-foreground'
              fontSize={12}
              content={<CustomLabel />}
            />
          </Bar>
          {isLargeScreen ? (
            <YAxis
              width={110}
              padding={{ top: 30, bottom: 10 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}K` : formatCurrency(value)
              }
              label={{
                value: 'EUR',
                angle: -90,
                position: 'insideLeft',
                // offset: -5,
                style: {
                  textAnchor: 'middle',
                  fill: '#777E90',
                  fontWeight: '600',
                },
              }}
            />
          ) : (
            <YAxis
              padding={{ top: 30, bottom: 10 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}K` : formatCurrency(value)
              }
              label={{
                value: 'EUR',
                angle: -90,
                position: 'insideLeft',
                // offset: -5,
                style: {
                  textAnchor: 'middle',
                  fill: '#777E90',
                  fontWeight: '600',
                },
              }}
            />
          )}
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            // axisLine={false}
            // domain={['dataMin - 60', 'dataMax - 60']}
            padding={{ left: 15, right: 15 }}
            tick={{ fontSize: 12, fill: 'red', fontWeight: 600 }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
