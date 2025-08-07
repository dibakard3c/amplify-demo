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
import { SetStateAction, useState } from 'react';
import { cn } from '@estia/lib/utils';
import { formatCurrency } from '@estia/utils/currency';

const chartData = [
  { month: 'January', desktop: 386 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'July', desktop: 314 },
  { month: 'August', desktop: 200 },
  { month: 'September', desktop: 100 },
  { month: 'October', desktop: 40 },
  { month: 'November', desktop: 200 },
  { month: 'December', desktop: 214 },
];

const options = [
  {
    title: '1D',
    value: '1d',
  },
  {
    title: '1W',
    value: '1w',
  },
  {
    title: '1M',
    value: '1m',
  },
  {
    title: '3M',
    value: '3m',
  },
  {
    title: 'CURRENT YEAR',
    value: 'current-year',
  },
  {
    title: 'ALL TIME',
    value: 'all-time',
  },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-neutral-5)',
  },
} satisfies ChartConfig;

export function SalesChart({ showTimeline = true }: any) {
  const [activeTime, setActiveTime] = useState('1m');
  const [activeIndex, setActiveIndex] = useState(3);

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
    <div className='relative w-full'>
      {showTimeline ? (
        <div className='mt-4 flex items-center'>
          <h3 className='mr-4 -ml-1 p-2 text-base font-bold'>Time</h3>
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
              <h3 className='text-base font-bold'>{item?.title}</h3>
            </div>
          ))}
        </div>
      ) : null}
      <ChartContainer
        config={chartConfig}
        className='mt-2 h-96 w-full rounded-lg p-0'
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
          <YAxis
            width={45}
            padding={{ top: 30, bottom: 10 }}
            tickFormatter={(value) => `${formatCurrency(value)}`}
            // domain={['dataMin - 60', 'dataMax + 40']}
            // hide={true}
          />
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
