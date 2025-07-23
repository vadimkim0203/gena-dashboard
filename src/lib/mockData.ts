export type ChartType = 'number' | 'line' | 'bar' | 'pie';

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

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface RevenueData {
  label: string;
  value: number;
}

export interface Props {
  title?: string;
  endpoint: string;
}

export interface DashboardPageProps {
  params: { id: string } | Promise<{ id: string }>;
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
    dataEndpoint: '/api/data/signups_by_region',
    order: 0,
  },
  {
    id: 'chart-2',
    dashboardId: 'dashboard-1',
    type: 'number',
    title: 'Total Revenue',
    dataEndpoint: '/api/data/total_revenue',
    order: 1,
  },
  {
    id: 'chart-3',
    dashboardId: 'dashboard-2',
    type: 'line',
    title: 'Orders Over Time',
    dataEndpoint: '/api/data/orders_over_time',
    order: 0,
  },
];

export const mockChartData = {
  revenue: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [30000, 45000, 42000, 50000, 63000, 70000],
  },
  users: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1000, 1500, 2200, 2800, 3500, 4200],
  },
  activeUsers: {
    value: 3842,
    change: +12.5,
  },
};
