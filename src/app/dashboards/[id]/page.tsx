import AppAreaChart from '@/components/AppAreaChart';
import AppBarChart from '@/components/AppBarChart';
import CardList from '@/components/CardList';
import NewChartButton from '@/components/NewChartButton';
import { Chart, Dashboard } from '@/lib/mockData';
import { notFound } from 'next/navigation';

interface DashboardPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await Promise.resolve(params);

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  try {
    const resDashboard = await fetch(`${baseUrl}/api/dashboards/${id}`, {
      cache: 'no-store',
    });

    if (!resDashboard.ok) {
      console.error(
        `Dashboard fetch failed: ${resDashboard.status} ${resDashboard.statusText}`,
      );
      if (resDashboard.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch dashboard: ${resDashboard.statusText}`);
    }

    const dashboard: Dashboard = await resDashboard.json();

    const chartPromises = dashboard.charts.map(async (chartId) => {
      const res = await fetch(`${baseUrl}/api/charts/${chartId}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        console.error(`Chart fetch failed for ${chartId}: ${res.status}`);
        return null;
      }
      return res.json();
    });

    const chartResults = await Promise.all(chartPromises);
    const charts: Chart[] = chartResults.filter(
      (chart): chart is Chart => chart !== null,
    );

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">{dashboard.name}</h1>
        <NewChartButton dashboardId={dashboard.id} />
        <div className="flex flex-wrap gap-4">
          {charts
            .sort((a, b) => a.order - b.order)
            .map((chart) => (
              <div
                key={chart.id}
                className="bg-primary-foreground p-4 rounded-lg flex-shrink-0"
              >
                <ChartRenderer chart={chart} />
              </div>
            ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return (
      <div className="p-4">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">NOT WORKING</h2>
          <p>Unable to load dashboard. Please try again later.</p>
        </div>
      </div>
    );
  }
}

function ChartRenderer({ chart }: { chart: Chart }) {
  switch (chart.type) {
    case 'bar':
      return <AppBarChart title={chart.title} endpoint="/api/data/revenue" />;
    case 'line':
      return <AppAreaChart title={chart.title} endpoint={chart.dataEndpoint} />;
    case 'number':
      return <CardList title={chart.title} endpoint={chart.dataEndpoint} />;
    default:
      return <div>Unsupported chart type: {chart.type}</div>;
  }
}
