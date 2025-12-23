import Plot from 'react-plotly.js';
import { DataResponse } from '@shared/index';
import { useTranslation } from 'react-i18next';

interface Props {
  data?: DataResponse;
}

const DataCharts = ({ data }: Props) => {
  const { t } = useTranslation();
  const hasSeries = data && data.series.length > 0;
  const hasMapValues = data && data.mapValues.length > 0;

  if (!data || (!hasSeries && !hasMapValues)) {
    return <p>{t('explore.chart.empty')}</p>;
  }

  return (
    <div className="charts">
      {hasSeries && (
        <div className="chart-card">
          <h3>{t('explore.chart.timeseries')}</h3>
          <Plot
            data={[
              {
                x: data.series.map((d) => d.year),
                y: data.series.map((d) => d.value),
                mode: 'lines+markers',
                type: 'scatter',
                line: { shape: 'spline', color: '#0868ac' }
              }
            ]}
            layout={{
              autosize: true,
              height: 320,
              margin: { t: 30, r: 10, l: 40, b: 40 }
            }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </div>
      )}
      {hasMapValues && (
        <div className="chart-card">
          <h3>{t('explore.chart.bar')}</h3>
          <Plot
            data={[
              {
                x: data.mapValues.map((d) => d.region || d.basin || '—'),
                y: data.mapValues.map((d) => d.value),
                type: 'bar',
                marker: { color: '#4eb3d3' }
              }
            ]}
            layout={{
              autosize: true,
              height: 320,
              margin: { t: 30, r: 10, l: 40, b: 80 },
              xaxis: { tickangle: -30 }
            }}
            style={{ width: '100%' }}
            useResizeHandler
          />
        </div>
      )}
    </div>
  );
};

export default DataCharts;
