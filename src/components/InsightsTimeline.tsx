import { Line } from '@ant-design/plots';
import { Card, Spin } from 'antd';

interface InsightOverTime {
  year: number;
  count: number;
}

interface Props {
  data: InsightOverTime[];
  loading: boolean;
}

const InsightsTimeline = ({ data, loading }: Props) => {
  const timelineConfig = {
    data,
    xField: 'year',
    yField: 'count',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  return (
    <Card 
      title="Insights Published Over Time" 
      style={{ height: '100%' }}
      extra={
        <span style={{ color: '#666' }}>
          Showing publication trends across years
        </span>
      }
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ height: 400 }}>
          <Line 
            {...timelineConfig}
            xAxis={{
              title: { text: 'Year' },
              tickCount: Math.min(data.length, 10),
            }}
            yAxis={{
              title: { text: 'Number of Insights' },
              min: 0,
            }}
            tooltip={{
              title: 'Year',
              formatter: (datum: { count: number }) => {
                return { name: 'Insights', value: datum.count };
              },
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default InsightsTimeline;
