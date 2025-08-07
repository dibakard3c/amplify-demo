'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@estia/components/ui/chart';
import { chartDemographicData } from '@estia/helpers/dummy';

const CustomTraveller = ({ x, y, width, height }: any) => {
  return (
    <svg
      width={width}
      height={height}
      x={x}
      y={y}
      viewBox='0 0 2 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 28H2V0H0V28Z'
        fill='#A9ABB6'
      />
    </svg>
  );
};

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary-1)',
  },
} satisfies ChartConfig;

export function CustomerDemographicsGraph({ className }: any) {
  return (
    <div className={className}>
      <ChartContainer
        config={chartConfig}
        className='m-0 mt-2 h-full w-full p-0'
      >
        <AreaChart
          accessibilityLayer
          data={chartDemographicData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize='100%'
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='date'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
            height={40}
          />
          <YAxis
            type='number'
            domain={[0, 150000]}
            tickCount={4}
            axisLine={false}
            tickMargin={15}
            tickFormatter={(value) => `${Math.round(value / 1000)}K`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator='line' />}
          />
          <Area
            dataKey='sales'
            type='linear'
            fill='var(--color-primary-2)'
            fillOpacity={0.4}
            stroke='var(--color-primary-1)'
            strokeWidth={3}
          />
          <Legend
            verticalAlign='top'
            wrapperStyle={{
              lineHeight: '40px',
            }}
            formatter={() => 'Total Sales'}
          />
          <Brush
            dataKey='date'
            stroke='#C4C7CF'
            traveller={CustomTraveller}
            startIndex={chartDemographicData.length - 30} // last 10 points
            endIndex={chartDemographicData.length - 1}
          >
            <AreaChart>
              <Area
                dataKey='sales'
                stroke='#CBD5E1'
                fill='none'
                type='monotone'
                strokeWidth={3}
              />
            </AreaChart>
          </Brush>
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
