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
