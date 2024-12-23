import { Pie } from '@ant-design/plots';
import { Card, Spin } from 'antd';

interface SectorData {
  name: string;
  count: number;
}

interface Props {
  data: SectorData[];
  loading: boolean;
}

const SectorDistribution = ({ data, loading }: Props) => {
  const pieConfig = {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} ({percentage})',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'right',
    },
  };

  return (
    <Card title="Sector Distribution" style={{ height: '100%' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ height: 400 }}>
          <Pie {...pieConfig} />
        </div>
      )}
    </Card>
  );
};

export default SectorDistribution;
