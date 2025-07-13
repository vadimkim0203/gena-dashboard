// import { Chart } from '@/lib/mockData';
// import AppBarChart from './AppBarChart';
// import AppAreaChart from './AppAreaChart';
// import AppPieChart from './AppPieChart';
// import CardList from './CardList';

// export default function ChartRenderer({ chart }: { chart: Chart }) {
//   switch (chart.type) {
//     case 'bar':
//       return <AppBarChart title={chart.title} endpoint="/api/data/revenue" />;
//     case 'line':
//       return <AppAreaChart title={chart.title} endpoint={chart.dataEndpoint} />;
//     case 'number':
//       return <CardList title={chart.title} endpoint={chart.dataEndpoint} />;
//     case 'pie':
//       return <AppPieChart title={chart.title} endpoint={chart.dataEndpoint} />;
//     default:
//       return (
//         <div className="p-4 text-red-500">
//           Unsupported chart type: {chart.type}
//         </div>
//       );
//   }
// }

'use client';

import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Chart } from '@/lib/mockData';
import AppBarChart from './AppBarChart';
import AppAreaChart from './AppAreaChart';
import CardList from './CardList';
import AppPieChart from './AppPieChart';

interface ChartRendererProps {
  chart: Chart;
}

export default function ChartRenderer({ chart }: ChartRendererProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this chart?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/charts/${chart.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete chart');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting chart:', error);
      alert('Failed to delete chart. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {/* Existing chart rendering logic */}
      <div className="w-full h-full">{renderChart(chart)}</div>
    </div>
  );
}

function renderChart(chart: Chart) {
  switch (chart.type) {
    case 'bar':
      return <AppBarChart title={chart.title} endpoint={chart.dataEndpoint} />;
    case 'line':
      return <AppAreaChart title={chart.title} endpoint={chart.dataEndpoint} />;
    case 'number':
      return <CardList title={chart.title} endpoint={chart.dataEndpoint} />;
    case 'pie':
      return <AppPieChart title={chart.title} endpoint={chart.dataEndpoint} />;
    default:
      return (
        <div className="p-4 text-red-500">
          Unsupported chart type: {chart.type}
        </div>
      );
  }
}
