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
  onSubmit: (data: { title: string; type: ChartType; rawData?: any[] }) => void;
  dashboardId?: string;
}

export type PieChartData = {
  browser: string;
  visitors: number;
  fill: string;
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
