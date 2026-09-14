# Mixed Time-Series Chart

React-компонент, который принимает 4 time-series последовательности и отображает их в одном графике: `area`, `spline`, `line`, `bar`.

Внешний вид и hover-tooltip повторяют предоставленный референс.

## Stack

- React
- TypeScript
- Vite
- Recharts

## Run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Usage

```tsx
import MixedTimeSeriesChart from './MixedTimeSeriesChart';

const area = [
  { timestamp: '2026-06-10', value: 10 },
  { timestamp: '2026-06-11', value: 20 },
];

const spline = [
  { timestamp: '2026-06-10', value: 50 },
  { timestamp: '2026-06-11', value: 35 },
];

const line = [
  { timestamp: '2026-06-10', value: 5 },
  { timestamp: '2026-06-11', value: 15 },
];

const bar = [
  { timestamp: '2026-06-10', value: 1.1 },
  { timestamp: '2026-06-11', value: 1.3 },
];

export default function Example() {
  return <MixedTimeSeriesChart area={area} spline={spline} line={line} bar={bar} />;
}
```

## Data format

```ts
type TimeSeriesPoint = {
  timestamp: string | number | Date;
  value: number;
};
```

The chart is responsive and displays a shared tooltip with values from all four series for the selected timestamp.
