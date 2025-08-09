import { v4 as uuidv4 } from 'uuid';

export interface ChartDataEntry {
  [key: string]: any;
}

export const customDataStore = new Map<string, ChartDataEntry[]>();

export const storeCustomData = (
  data: ChartDataEntry[],
  name?: string,
): { id: string; endpoint: string } => {
  const id = name || `custom_${Date.now()}`;
  customDataStore.set(id, data);

  return {
    id,
    endpoint: `/api/data/${id}`,
  };
};

export const getCustomData = (id: string): ChartDataEntry[] | null => {
  return customDataStore.has(id) ? customDataStore.get(id) || null : null;
};

if (process.env.NODE_ENV === 'development') {
  customDataStore.set('sample_area', [
    { month: 'Jan', desktop: 120, mobile: 80 },
    { month: 'Feb', desktop: 140, mobile: 100 },
    { month: 'Mar', desktop: 170, mobile: 130 },
    { month: 'Apr', desktop: 190, mobile: 120 },
    { month: 'May', desktop: 220, mobile: 170 },
  ]);

  customDataStore.set('sample_pie', [
    { browser: 'Chrome', visitors: 7200 },
    { browser: 'Firefox', visitors: 3200 },
    { browser: 'Safari', visitors: 2800 },
    { browser: 'Edge', visitors: 1800 },
  ]);
}

export const persistCustomData = () => {
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Custom data store size:', customDataStore.size);
  }
};
