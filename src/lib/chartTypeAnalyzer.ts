import { ChartType } from './mockData';

export type DataPoint = {
  [key: string]: any;
};

export default function chartTypeAnalyzer(data: DataPoint[]): ChartType {
  if (!data || data.length === 0) {
    return 'bar';
  }
  const sample = data[0];
  const keys = Object.keys(sample);

  if (data.length === 1 && keys.length <= 2) {
    return 'value';
  }

  const hasTimeField = keys.some((key) =>
    ['date', 'month', 'year', 'time', 'timestamp', 'period'].includes(
      key.toLowerCase(),
    ),
  );

  const categoricalField = keys.find(
    (key) =>
      typeof sample[key] === 'string' &&
      !['date', 'month', 'year'].includes(key.toLowerCase()),
  );

  const numericField = keys.filter((key) => typeof sample[key] === 'number');

  if (hasTimeField && numericField.length >= 1) {
    return 'area';
  } else if (categoricalField && numericField.length === 1) {
    return data.length <= 5 ? 'pie' : 'bar';
  } else if (categoricalField && numericField.length > 1) {
    return 'stacked';
  } else if (numericField.length > 1) {
    return 'bar';
  }
  return 'bar';
}
