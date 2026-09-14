export type TimeSeriesPoint = {
  timestamp: string | number | Date;
  value: number;
};

export type MixedTimeSeriesChartProps = {
  area: TimeSeriesPoint[];
  spline: TimeSeriesPoint[];
  line: TimeSeriesPoint[];
  bar: TimeSeriesPoint[];
  height?: number;
};
