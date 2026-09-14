import MixedTimeSeriesChart from './MixedTimeSeriesChart';
import { areaData, barData, lineData, splineData } from './data';

export default function App() {
  return (
    <main className="page">
      <div className="chart-demo">
        <MixedTimeSeriesChart
          area={areaData}
          spline={splineData}
          line={lineData}
          bar={barData}
          height={529}
        />
      </div>
    </main>
  );
}
