'use client';

import { TrendingUp } from 'lucide-react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { Label, Pie, PieChart } from 'recharts';
import { useEffect, useState } from 'react';
import { PieChartData, PieChartProps } from '@/lib/type';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const AppPieChart = ({ title, endpoint }: PieChartProps) => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const signUps = data.reduce((sum, entry) => sum + entry.visitors, 0);

  useEffect(() => {
    if (!endpoint) {
      setError('No endpoint provided');
      return;
    }
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((apiData: PieChartData[]) => {
        const transformedData = apiData.map((item: PieChartData) => ({
          ...item,
          browser: item.browser.toLowerCase(),
          fill: `var(--color-${item.browser.toLowerCase()})`,
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching pie chart data', error);
      });
  }, [endpoint]);

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {signUps.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
      <div className="mt-4 flex flex-fol gap-2 items-center">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month{' '}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  );
};

export default AppPieChart;
