import { ChartType } from './mockData';

export interface Dashboard {
  id: string;
  name: string;
}

export interface EditableDashboardTitleProps {
  id: string;
  initialName: string;
}

export interface NewDashboardButtonProps {
  onDashboardCreated?: () => void;
}

export interface NewChartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    type: ChartType;
    rawData?: unknown[];
  }) => void;
  dashboardId?: string;
}

export type PieChartData = {
  browser: string;
  visitors: number;
};

export type PieChartProps = {
  data?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  totalLabel?: string;
  totalValue?: string;
  endpoint?: string | URL;
};

export type CustomData = Record<string, unknown>;

export type ChartData = {
  name: string;
  value: number;
  color: string;
  [key: string]: unknown;
};

export type RawDataItem = { [key: string]: string | number | boolean };

export interface AreaChartData {
  month: string;
  desktop: number;
  mobile: number;
}

export type ChartDataEntry = AreaChartData | PieChartData;
