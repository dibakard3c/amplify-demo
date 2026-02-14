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
import { useTranx } from '@estia/hooks/useTranx';

const chartData = [
  { month: '18-25', desktop: 100 },
  { month: '26-35', desktop: 100 },
  { month: '46-45', desktop: 50 },
  { month: '46-55', desktop: 50 },
  { month: '56-66', desktop: 50 },
  { month: '66+', desktop: 120 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-neutral-5)',
  },
} satisfies ChartConfig;

export function CustomerDemographicsAgeDistributionChart({
  showTimeline = true,
}: any) {
  const { t } = useTranx();

  const options = [
    {
      title: t(
        'dashboard.analytics.demographics_page.age_distribution_chart.1_day'
      ),
      value: '1d',
    },
    {
      title: t(
        'dashboard.analytics.demographics_page.age_distribution_chart.1_week'
      ),
      value: '1w',
    },
    {
      title: t(
        'dashboard.analytics.demographics_page.age_distribution_chart.1_month'
      ),
      value: '1m',
    },
    {
      title: t(
        'dashboard.analytics.demographics_page.age_distribution_chart.3_months'
      ),
      value: '3m',
    },
    {
      title: t(
        'dashboard.analytics.demographics_page.age_distribution_chart.current_year'
      ),
      value: 'current-year',
    },
    {
      title: t(
        'dashboard.analytics.demographics_page.age_distribution_chart.all_time'
      ),
      value: 'all-time',
    },
  ];

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
          <h3 className='mr-4 -ml-1 p-2 text-base font-bold'>
            {t(
              'dashboard.analytics.demographics_page.age_distribution_chart.time'
            )}
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
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <YAxis domain={['dataMin - 60', 'dataMax + 40']} hide={true} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // domain={['dataMin - 60', 'dataMax - 60']}
            padding={{ left: 15, right: 15 }}
            tick={{ fontSize: 12, fill: 'red', fontWeight: 600 }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
