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
    dataEndpoint: string;
  }) => Promise<void> | void;
}

export type PieChartData = {
  browser: string;
  visitors: number;
  fill: string;
};