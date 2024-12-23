import { Column } from '@ant-design/plots';
import { Card, Spin } from 'antd';

interface RelevanceLikelihood {
  sector: string;
  averageRelevance: number;
  averageLikelihood: number;
}

interface Props {
  data: RelevanceLikelihood[];
  loading: boolean;
}

// interface ChartData {
//   sector: string;
//   type: string;
//   value: number;
// }

const RelevanceLikelihoodChart = ({ data, loading }: Props) => {
  const chartData = data.flatMap(item => [
    {
      sector: item.sector,
      type: 'Relevance',
      value: item.averageRelevance
    },
    {
      sector: item.sector,
      type: 'Likelihood',
      value: item.averageLikelihood
    }
  ]);

  return (
    <Card 
      title={
        <div>
          <div>Relevance vs. Likelihood by Sector</div>
          <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginTop: '4px' }}>
            Average relevance and likelihood scores across different sectors
          </div>
        </div>
      }
      style={{ height: '100%' }}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ height: 500 }}>
          <Column
            data={chartData}
            isGroup={true}
            xField="sector"
            yField="value"
            seriesField="type"
            groupField="type"
            columnStyle={{
              radius: [4, 4, 0, 0],
            }}
            color={['#1890ff', '#2fc25b']}
            xAxis={{
              label: {
                autoRotate: true,
                autoHide: true,
                autoEllipsis: true,
              },
            }}
            yAxis={{
              min: 0,
              max: 5,
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default RelevanceLikelihoodChart;
