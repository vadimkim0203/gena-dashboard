import ChartRenderer from '@/components/ChartRenderer';
import NewChartButton from '@/components/NewChartButton';
import {
  getDashboardById,
  getChartsForDashboard,
  updateDashboard,
} from '@/lib/mockStore';

interface DashboardPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await Promise.resolve(params);

  try {
    let dashboard = getDashboardById(id);

    if (!dashboard) {
      dashboard = {
        id,
        name: 'New Dashboard',
        charts: [],
      };
      updateDashboard(id, dashboard);
    }
    const charts = getChartsForDashboard(id);

    return (
      <div className="flex flex-col p-4 gap-8">
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
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>Unable to load dashboard. Please try again later.</p>
        </div>
      </div>
    );
  }
}
