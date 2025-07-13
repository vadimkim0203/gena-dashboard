export type ChartType = 'number' | 'line' | 'bar';

export interface Chart {
  id: string;
  dashboardId: string;
  type: ChartType;
  title: string;
  dataEndpoint: string;
  order: number;
}

export interface Dashboard {
  id: string;
  name: string;
  charts: string[];
}

export const dashboards: Dashboard[] = [
  {
    id: 'dashboard-1',
    name: 'Marketing KPIs',
    charts: ['chart-1', 'chart-2'],
  },
  {
    id: 'dashboard-2',
    name: 'Product Analytics',
    charts: ['chart-3'],
  },
];

export const charts: Chart[] = [
  {
    id: 'chart-1',
    dashboardId: 'dashboard-1',
    type: 'bar',
    title: 'Signups by Region',
    dataEndpoint: '/api/data/signups',
    order: 0,
  },
  {
    id: 'chart-2',
    dashboardId: 'dashboard-1',
    type: 'number',
    title: 'Total Revenue',
    dataEndpoint: '/api/data/revenue',
    order: 1,
  },
  {
    id: 'chart-3',
    dashboardId: 'dashboard-2',
    type: 'line',
    title: 'Orders Over Time',
    dataEndpoint: '/api/data/orders',
    order: 0,
  },
];

export interface Props {
  title?: string;
  endpoint: string;
}

export interface DashboardPageProps {
  params: Promise<{ id: string }> | { id: string };
}
