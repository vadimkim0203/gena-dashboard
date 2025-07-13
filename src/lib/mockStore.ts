import {
  Chart,
  Dashboard,
  charts as initialCharts,
  dashboards as initialDashboards,
} from './mockData';

let dashboardStore = [...initialDashboards];
let chartStore = [...initialCharts];

export const getDashboards = () => dashboardStore;

export const getDashboardById = (id: string) => {
  const dashboard = dashboardStore.find((d) => d.id === id);
  return dashboard;
};

export const addDashboard = (dashboard: Dashboard) => {
  dashboardStore.push(dashboard);
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
    console.log('Created new dashboard:', dashboard);
    return dashboard;
  }

  Object.assign(dashboard, data);
  console.log('Updated dashboard:', dashboard);
  return dashboard;
};

export const deleteDashboard = (id: string) => {
  dashboardStore = dashboardStore.filter((d) => d.id !== id);
};

export const getCharts = (): Chart[] => chartStore;

export const addChart = (chart: Chart) => {
  try {
    // Add chart to chart store
    chartStore.push(chart);

    // Get the dashboard and update its charts array
    const dashboard = getDashboardById(chart.dashboardId);
    if (!dashboard) {
      throw new Error(`Dashboard ${chart.dashboardId} not found`);
    }

    if (!dashboard.charts) {
      dashboard.charts = [];
    }

    // Add chart reference to dashboard
    dashboard.charts.push(chart.id);

    // Update the dashboard
    updateDashboard(dashboard.id, dashboard);

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

    return true;
  } catch (error) {
    console.error('Error deleting chart:', error);
    return false;
  }
};
