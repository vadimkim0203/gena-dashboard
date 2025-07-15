import {
  Chart,
  ChartType,
  Dashboard,
  charts as initialCharts,
  dashboards as initialDashboards,
} from './mockData';

let dashboardStore = [...initialDashboards];
let chartStore = [...initialCharts];

const initializeStore = () => {
  if (typeof window !== 'undefined') {
    const savedDashboards = localStorage.getItem('dashboards');
    const savedCharts = localStorage.getItem('charts');

    if (savedDashboards) {
      dashboardStore = JSON.parse(savedDashboards);
    }

    if (savedCharts) {
      chartStore = JSON.parse(savedCharts);
    }

    console.log('Store initialized from localStorage:', {
      dashboards: dashboardStore.length,
      charts: chartStore.length,
    });
  }
};
initializeStore();

const persistStore = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dashboards', JSON.stringify(dashboardStore));
    localStorage.setItem('charts', JSON.stringify(chartStore));
  }
};
export const getDashboards = () => dashboardStore;

export const getDashboardById = (id: string) => {
  const dashboard = dashboardStore.find((d) => d.id === id);
  return dashboard;
};

export const addDashboard = (dashboard: Dashboard) => {
  dashboardStore.push(dashboard);
  persistStore();
  return dashboard;
};

export const updateDashboard = (id: string, data: Partial<Dashboard>) => {
  let dashboard = getDashboardById(id);

  if (!dashboard) {
    dashboard = {
      id,
      name: data.name || 'New Dashboard',
      charts: [],
      ...data,
    };
    dashboardStore.push(dashboard);
    return dashboard;
  }

  Object.assign(dashboard, data);
  persistStore();
  return dashboard;
};

export const deleteDashboard = (id: string) => {
  dashboardStore = dashboardStore.filter((d) => d.id !== id);
  persistStore();
};

export const getCharts = (): Chart[] => chartStore;

export const addChart = (chart: Chart) => {
  try {
    chartStore.push(chart);

    let dashboard = getDashboardById(chart.dashboardId);

    if (!dashboard) {
      console.log(`Creating dashboard for chart: ${chart.dashboardId}`);
      dashboard = {
        id: chart.dashboardId,
        name: 'New Dashboard',
        charts: [],
      };
      dashboardStore.push(dashboard);
    }

    if (!dashboard.charts) {
      dashboard.charts = [];
    }

    dashboard.charts.push(chart.id);

    updateDashboard(dashboard.id, dashboard);

    console.log(`Chart ${chart.id} added to dashboard ${dashboard.id}`);
    persistStore();
    return chart;
  } catch (error) {
    console.error('Error adding chart:', error);
    throw error;
  }
};

export const getChartsForDashboard = (dashboardId: string): Chart[] => {
  const dashboard = getDashboardById(dashboardId);
  if (!dashboard?.charts) return [];

  return dashboard.charts
    .map((chartId) => chartStore.find((c) => c.id === chartId))
    .filter((chart): chart is Chart => chart !== undefined);
};

export const deleteChart = (chartId: string) => {
  try {
    const chart = chartStore.find((c) => c.id === chartId);
    if (!chart) {
      throw new Error('Chart not found');
    }

    chartStore = chartStore.filter((c) => c.id !== chartId);

    const dashboard = getDashboardById(chart.dashboardId);
    if (dashboard) {
      dashboard.charts = dashboard.charts.filter((id) => id !== chartId);
      updateDashboard(dashboard.id, dashboard);
    }
    persistStore();

    return true;
  } catch (error) {
    console.error('Error deleting chart:', error);
    return false;
  }
};

export const getEndpointForChartType = (type: ChartType): string => {
  switch (type) {
    case 'bar':
      return '/api/data/product_performance';
    case 'line':
      return '/api/data/orders_over_time';
    case 'pie':
      return '/api/data/total_visitors';
    case 'number':
      return '/api/data/total_revenue';
    default:
      console.warn(`No endpoint defined for chart type: ${type}`);
      return '';
  }
};
