import MixedTimeSeriesChart from './MixedTimeSeriesChart';
import { areaData, barData, lineData, splineData } from './data';

export default function App() {
  return (
    <main className="page">
      <section className="demo-card">
        <MixedTimeSeriesChart
          area={areaData}
          spline={splineData}
          line={lineData}
          bar={barData}
        />
      </section>
    </main>
  );
}
