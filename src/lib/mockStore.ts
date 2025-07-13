import { Dashboard } from './mockData';
import { dashboards as initialDashboards } from './mockData';

let dashboardStore = [...initialDashboards];

export const getDashboards = () => dashboardStore;

export const getDashboardById = (id: string) =>
  dashboardStore.find((d) => d.id === id);

export const addDashboard = (dashboard: Dashboard) => {
  dashboardStore.push(dashboard);
  return dashboard;
};

export const updateDashboard = (id: string, data: Partial<Dashboard>) => {
  const dashboard = getDashboardById(id);
  if (dashboard) {
    Object.assign(dashboard, data);
  }
  return dashboard;
};

export const deleteDashboard = (id: string) => {
  dashboardStore = dashboardStore.filter((d) => d.id !== id);
};
