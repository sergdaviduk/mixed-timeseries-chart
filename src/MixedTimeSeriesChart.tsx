import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { MixedTimeSeriesChartProps, TimeSeriesPoint } from './types';

type ChartRow = { timestamp: number; area?: number; spline?: number; line?: number; bar?: number };

const COLORS = { area: '#FFE867', spline: '#178A1A', line: '#B000F5', bar: '#3976F6' };

function normalizeTimestamp(value: TimeSeriesPoint['timestamp']) {
  const date = value instanceof Date ? value : new Date(value);
  return date.getTime();
}

function mergeSeries(area: TimeSeriesPoint[], spline: TimeSeriesPoint[], line: TimeSeriesPoint[], bar: TimeSeriesPoint[]): ChartRow[] {
  const rows = new Map<number, ChartRow>();
  const ingest = (series: TimeSeriesPoint[], key: 'area' | 'spline' | 'line' | 'bar') => {
    for (const point of series) {
      const timestamp = normalizeTimestamp(point.timestamp);
      const current = rows.get(timestamp) ?? { timestamp };
      current[key] = point.value;
      rows.set(timestamp, current);
    }
  };
  ingest(area, 'area'); ingest(spline, 'spline'); ingest(line, 'line'); ingest(bar, 'bar');
  return [...rows.values()].sort((a, b) => a.timestamp - b.timestamp);
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value));
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length || label == null) return null;
  const values = Object.fromEntries(payload.map((item) => [String(item.dataKey), item.value])) as Record<string, number | undefined>;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__date">{formatDate(Number(label))}</div>
      <div className="chart-tooltip__row"><span className="dot dot--area" /><span>Cost: <strong>{values.area?.toFixed(2) ?? '—'}</strong></span></div>
      <div className="chart-tooltip__row"><span className="dot dot--bar" /><span>CPA: <strong>{values.bar?.toFixed(2) ?? '—'}</strong></span></div>
      <div className="chart-tooltip__row"><span className="dot dot--spline" /><span>ROI confirmed: <strong>{values.spline?.toFixed(2) ?? '—'}</strong></span></div>
      <div className="chart-tooltip__row"><span className="dot dot--line" /><span>Conversions: <strong>{values.line?.toFixed(0) ?? '—'}</strong></span></div>
    </div>
  );
}

export default function MixedTimeSeriesChart({ area, spline, line, bar, height = 320 }: MixedTimeSeriesChartProps) {
  const data = mergeSeries(area, spline, line, bar);
  return (
    <div className="chart-shell" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 22, right: 24, bottom: 4, left: 8 }}>
          <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COLORS.area} stopOpacity={0.46} /><stop offset="100%" stopColor={COLORS.area} stopOpacity={0.20} /></linearGradient></defs>
          <CartesianGrid vertical={false} horizontal={false} stroke="rgba(0,0,0,0.08)" />
          <XAxis dataKey="timestamp" type="number" scale="time" domain={['dataMin', 'dataMax']} tick={false} axisLine={{ stroke: '#C3C3C3', strokeWidth: 1 }} tickLine={false} />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.08)', strokeWidth: 1 }} isAnimationActive={false} />
          <Area type="linear" dataKey="area" stroke={COLORS.area} strokeWidth={2} fill="url(#areaFill)" dot={false} activeDot={{ r: 4, fill: COLORS.area, stroke: '#fff', strokeWidth: 1.5 }} isAnimationActive={false} />
          <Bar dataKey="bar" fill={COLORS.bar} barSize={34} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          <Line type="monotone" dataKey="spline" stroke={COLORS.spline} strokeWidth={2.4} dot={false} activeDot={{ r: 4, fill: COLORS.spline, stroke: '#fff', strokeWidth: 1.5 }} isAnimationActive={false} />
          <Line type="linear" dataKey="line" stroke={COLORS.line} strokeWidth={2} dot={(props) => { const { cx, cy, key } = props; if (cx == null || cy == null) return <g key={key} />; return <rect key={key} x={cx - 5} y={cy - 5} width={10} height={10} fill={COLORS.line} />; }} activeDot={{ r: 4, fill: COLORS.line, stroke: '#fff', strokeWidth: 1.2 }} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
