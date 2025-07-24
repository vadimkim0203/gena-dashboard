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

export const deleteDashboard = (id: string): boolean => {
  const index = dashboardStore.findIndex((d) => d.id === id);

  if (index === -1) {
    return false;
  }

  dashboardStore.splice(index, 1);
  persistStore();
  return true;
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

export const getAllDashboards = (): Dashboard[] => {
  initializeStore();
  return dashboardStore;
};

export const updateDashboard = (
  id: string,
  updates: Partial<Dashboard>,
): Dashboard | null => {
  const index = dashboardStore.findIndex((d) => d.id === id);

  if (index === -1) return null;

  dashboardStore[index] = { ...dashboardStore[index], ...updates };
  persistStore();

  return dashboardStore[index];
};
