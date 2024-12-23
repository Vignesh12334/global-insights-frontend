import { Scatter } from '@ant-design/plots';
import { Card, Spin } from 'antd';

interface LikelihoodIntensity {
  likelihood: number;
  intensity: number;
  title: string;
  topic: string;
  sector: string;
  pestle: string;
  isOutlier: boolean;
}

interface Props {
  data: LikelihoodIntensity[];
  loading: boolean;
}

const LikelihoodIntensityChart = ({ data, loading }: Props) => {
  return (
    <Card 
      title={
        <div>
          <div>Likelihood vs. Intensity Analysis</div>
          <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginTop: '4px' }}>
            Analyzing insights based on their likelihood of occurrence and potential impact intensity
          </div>
        </div>
      }
      style={{ height: '100%' }}
      extra={
        <div style={{ color: '#666' }}>
          <div>🔵 Regular Insight</div>
          <div>⭐ Outlier (High Impact)</div>
        </div>
      }
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ height: 500 }}>
          <Scatter 
            data={data}
            xField="likelihood"
            yField="intensity"
            colorField="sector"
            sizeField="isOutlier"
            size={[4, 8]}
            shape={(record: LikelihoodIntensity) => (record.isOutlier ? 'square' : 'circle')}
            pointStyle={{
              fillOpacity: 0.8,
            }}
            xAxis={{
              title: { 
                text: 'Likelihood Score',
                style: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
              grid: {
                line: {
                  style: {
                    stroke: '#e5e5e5',
                    lineWidth: 1,
                    lineDash: [4, 4],
                  },
                },
              },
              min: 0,
              max: 5,
            }}
            yAxis={{
              title: { 
                text: 'Intensity Score',
                style: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
              grid: {
                line: {
                  style: {
                    stroke: '#e5e5e5',
                    lineWidth: 1,
                    lineDash: [4, 4],
                  },
                },
              },
              min: 0,
              max: 5,
            }}
            legend={{
              position: 'top-right',
              title: {
                text: 'Sectors',
                style: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
            }}
            tooltip={{
              fields: ['title', 'topic', 'sector', 'pestle', 'likelihood', 'intensity', 'isOutlier'],
              formatter: (datum: LikelihoodIntensity) => {
                return { 
                  name: datum.sector,
                  value: 
                    `Title: ${datum.title}\n` +
                    `Topic: ${datum.topic}\n` +
                    `PESTLE: ${datum.pestle}\n` +
                    `Likelihood: ${datum.likelihood}\n` +
                    `Intensity: ${datum.intensity}` +
                    (datum.isOutlier ? '\n⚠️ Outlier' : '')
                };
              },
            }}
            annotations={[
              // Vertical reference line
              {
                type: 'line',
                start: [2.5, 0],
                end: [2.5, 5],
                style: {
                  stroke: '#666',
                  lineDash: [4, 4],
                  opacity: 0.7,
                },
              },
              // Horizontal reference line
              {
                type: 'line',
                start: [0, 2.5],
                end: [5, 2.5],
                style: {
                  stroke: '#666',
                  lineDash: [4, 4],
                  opacity: 0.7,
                },
              },
              // Quadrant labels
              {
                type: 'text',
                position: [1.25, 4.3],
                content: 'Monitor Closely\nHigh Impact, Low Probability',
                style: {
                  textAlign: 'center',
                  fill: '#666',
                  fontSize: 12,
                  textBaseline: 'middle',
                },
              },
              {
                type: 'text',
                position: [3.75, 4.3],
                content: 'Critical Focus Area\nHigh Impact & Probability',
                style: {
                  textAlign: 'center',
                  fill: '#666',
                  fontSize: 12,
                  fontWeight: 'bold',
                  textBaseline: 'middle',
                },
              },
              {
                type: 'text',
                position: [1.25, 0.7],
                content: 'Low Priority\nMinimal Impact & Probability',
                style: {
                  textAlign: 'center',
                  fill: '#666',
                  fontSize: 12,
                  textBaseline: 'middle',
                },
              },
              {
                type: 'text',
                position: [3.75, 0.7],
                content: 'Keep Informed\nHigh Probability, Low Impact',
                style: {
                  textAlign: 'center',
                  fill: '#666',
                  fontSize: 12,
                  textBaseline: 'middle',
                },
              },
            ]}
          />
        </div>
      )}
    </Card>
  );
};

export default LikelihoodIntensityChart;
