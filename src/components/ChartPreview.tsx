import { ChartType } from '@/lib/mockData';
import AppPieChart from './AppPieChart';
import AppAreaChart from './AppAreaChart';
import AppBarChart from './AppBarChart';
import { AppStackedChart } from './AppStackedChart';

export type ChartPreviewProps = {
  type: ChartType;
  data: any[];
  title: string;
};

export default function ChartPreview({ type, data, title }: ChartPreviewProps) {
  switch (type) {
    case 'pie':
      return <AppPieChart title={title} data={data} />;
    case 'area':
      return <AppAreaChart title={title} data={data} />;
    case 'bar':
      return <AppBarChart title={title} data={data} />;
    case 'stacked':
      return <AppStackedChart title={title} data={data} />;
    default:
      return <div>Unsuppported chart type</div>;
  }
}
