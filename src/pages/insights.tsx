import { useEffect, useState } from "react";
import { Table, Input, Card, Space, Tag } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";

interface InsightData {
  id: number;
  title: string;
  intensity: number;
  likelihood: number;
  relevance: number;
  year: number;
  countries: {
    name: string;
  };
  topics: string[];
  sectors: {
    name: string;
  };
  regions: {
    name: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
}

const Insights = () => {
  const [data, setData] = useState<InsightData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3008/insights/all?page=${
          tableParams.pagination?.current || 1
        }&limit=${tableParams.pagination?.pageSize || 10}`
      );
      const result = await response.json();
      setData(result.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result.total,
        },
      });
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    setTableParams({
      pagination,
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
  };

  const filteredData = data.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.title?.toLowerCase().includes(searchLower) ||
      item.countries?.name?.toLowerCase().includes(searchLower) ||
      item.sectors?.name?.toLowerCase().includes(searchLower) ||
      item.regions?.name?.toLowerCase().includes(searchLower) ||
      item.topics?.some((topic) => topic.toLowerCase().includes(searchLower))
    );
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (text: string) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Sector",
      dataIndex: ["sectors", "name"],
      key: "sector",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Region",
      dataIndex: ["regions", "name"],
      key: "region",
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Country",
      dataIndex: ["countries", "name"],
      key: "country",
      render: (text: string) => <Tag color="red">{text}</Tag>,
    },

    {
      title: "Metrics",
      key: "metrics",
      render: (record: InsightData) => (
        <Space>
          <Tag color="orange">Intensity: {record.intensity}</Tag>
          <Tag color="cyan">Likelihood: {record.likelihood}</Tag>
          <Tag color="magenta">Relevance: {record.relevance}</Tag>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>All Insights</h1>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search insights..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default Insights;
