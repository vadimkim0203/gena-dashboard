'use client';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ChartDataPoint, Props } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-3)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

const AppAreaChart = ({ title, endpoint }: Props) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(endpoint);
  //       if (!res.ok) throw new Error('Failed to fetch data');
  //       const jsonData = await res.json();
  //       if (!jsonData || !Array.isArray(jsonData)) {
  //       } else {
  //         setData(jsonData);
  //       }
  //     } catch (error: unknown) {
  //       console.error('Error fetching chart data:', error);
  //       setError('Failed to load chart data');
  //     }
  //   };
  //   fetchData();
  // }, [endpoint]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          console.warn(`Failed to fetch from ${endpoint}, using fallback data`);
          // Use fallback data instead of throwing error
          const fallbackData = [
            { label: 'Jan', value: 30 },
            { label: 'Feb', value: 45 },
            { label: 'Mar', value: 38 },
            { label: 'Apr', value: 55 },
            { label: 'May', value: 48 },
            { label: 'Jun', value: 62 },
          ];
          setData(fallbackData);
          return;
        }

        const jsonData = await res.json();
        if (!jsonData || !Array.isArray(jsonData)) {
          console.warn('Invalid data format, using fallback data');
          const fallbackData = [
            { label: 'Jan', value: 30 },
            { label: 'Feb', value: 45 },
            { label: 'Mar', value: 38 },
            { label: 'Apr', value: 55 },
            { label: 'May', value: 48 },
            { label: 'Jun', value: 62 },
          ];
          setData(fallbackData);
        } else {
          setData(jsonData);
        }
      } catch (error: unknown) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load chart data');

        const fallbackData = [
          { label: 'Jan', value: 30 },
          { label: 'Feb', value: 45 },
          { label: 'Mar', value: 38 },
          { label: 'Apr', value: 55 },
          { label: 'May', value: 48 },
          { label: 'Jun', value: 62 },
        ];
        setData(fallbackData);
      }
    };
    fetchData();
  }, [endpoint]);

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="value"
            type="natural"
            fill="url(#fillMobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
