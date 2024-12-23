import { Column } from '@ant-design/plots';
import { Card, Spin } from 'antd';

interface RegionData {
  name: string;
  count: number;
}

interface Props {
  data: RegionData[];
  loading: boolean;
}

const RegionDistribution = ({ data, loading }: Props) => {
  const barConfig = {
    data,
    xField: 'name',
    yField: 'count',
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      name: {
        alias: 'Region',
      },
      count: {
        alias: 'Number of Insights',
      },
    },
  };

  return (
    <Card title="Region Distribution" style={{ height: '100%' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ height: 400 }}>
          <Column {...barConfig} />
        </div>
      )}
    </Card>
  );
};

export default RegionDistribution;
