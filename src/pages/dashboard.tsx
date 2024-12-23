import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import SectorDistribution from '../components/SectorDistribution';
import RegionDistribution from '../components/RegionDistribution';
import InsightsTimeline from '../components/InsightsTimeline';
import RelevanceLikelihoodChart from '../components/RelevanceLikelihoodChart';

interface SectorData {
  name: string;
  count: number;
}

interface RegionData {
  name: string;
  count: number;
}

interface InsightOverTime {
  year: number;
  count: number;
}

interface RelevanceLikelihood {
  sector: string;
  averageRelevance: number;
  averageLikelihood: number;
}

const Dashboard = () => {
  const [sectorData, setSectorData] = useState<SectorData[]>([]);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [insightsOverTime, setInsightsOverTime] = useState<InsightOverTime[]>([]);
  const [relevanceLikelihood, setRelevanceLikelihood] = useState<RelevanceLikelihood[]>([]);
  const [loading, setLoading] = useState({
    sectors: true,
    regions: true,
    insightsTime: true,
    relevanceLikelihood: true,
  });

  useEffect(() => {
    fetchSectorData();
    fetchRegionData();
    fetchInsightsOverTime();
    fetchRelevanceLikelihood();
  }, []);

  const fetchSectorData = async () => {
    try {
      const response = await fetch('https://global-insights-backend.onrender.com/insights/sectors');
      const data = await response.json();
      setSectorData(data);
    } catch (error) {
      console.error('Error fetching sector data:', error);
    } finally {
      setLoading(prev => ({ ...prev, sectors: false }));
    }
  };

  const fetchRegionData = async () => {
    try {
      const response = await fetch('https://global-insights-backend.onrender.com/insights/regions');
      const data = await response.json();
      setRegionData(data);
    } catch (error) {
      console.error('Error fetching region data:', error);
    } finally {
      setLoading(prev => ({ ...prev, regions: false }));
    }
  };

  const fetchInsightsOverTime = async () => {
    try {
      const response = await fetch('https://global-insights-backend.onrender.com/insights/insights-over-time');
      const data = await response.json();
      setInsightsOverTime(data);
    } catch (error) {
      console.error('Error fetching insights over time:', error);
    } finally {
      setLoading(prev => ({ ...prev, insightsTime: false }));
    }
  };

  const fetchRelevanceLikelihood = async () => {
    try {
      const response = await fetch('https://global-insights-backend.onrender.com/insights/relevance-likelihood');
      const data = await response.json();
    
      const formattedData = data.map((item:any) => ({
        sector: item.sector,
        averageRelevance: Number(item.averageRelevance),
        averageLikelihood: Number(item.averageLikelihood)
      }));
     
      setRelevanceLikelihood(formattedData);
    } catch (error) {
      console.error('Error fetching relevance likelihood data:', error);
    } finally {
      setLoading(prev => ({ ...prev, relevanceLikelihood: false }));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Global Insights on Economic, Environmental, and Industry Trends.</h1>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
        {/* First Row: Distribution Charts */}
        <Row gutter={[24, 24]}>
          <Col xs={24} xl={12}>
            <SectorDistribution data={sectorData} loading={loading.sectors} />
          </Col>
          <Col xs={24} xl={12}>
            <RegionDistribution data={regionData} loading={loading.regions} />
          </Col>
        </Row>

        {/* Second Row: Timeline */}
        <Row style={{ marginTop: '24px' }}>
          <Col span={24}>
            <InsightsTimeline data={insightsOverTime} loading={loading.insightsTime} />
          </Col>
        </Row>

        {/* Third Row: Relevance Likelihood Chart */}
        <Row style={{ marginTop: '24px' }}>
          <Col span={24}>
            <RelevanceLikelihoodChart data={relevanceLikelihood} loading={loading.relevanceLikelihood} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
