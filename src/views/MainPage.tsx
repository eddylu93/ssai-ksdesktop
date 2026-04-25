import { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Empty,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import dayjs from "dayjs";
import { useAdvertisersStore } from "../store/useAdvertisersStore";
import type { LatestSnapshot } from "../types/advertisers";

const { Title, Text } = Typography;

function formatNumber(value: number, fractionDigits = 2): string {
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}

function formatPercent(value: number): string {
  return `${formatNumber(value * 100)}%`;
}

const columns = [
  {
    title: "广告主",
    dataIndex: "advertiser_name",
    key: "advertiser_name"
  },
  {
    title: "快照时间",
    dataIndex: "snapshot_at",
    key: "snapshot_at",
    render: (value: string) => dayjs(value).format("YYYY-MM-DD HH:mm:ss")
  },
  {
    title: "消耗",
    dataIndex: "cost",
    key: "cost",
    render: (value: number) => formatNumber(value)
  },
  {
    title: "曝光",
    dataIndex: "impressions",
    key: "impressions",
    render: (value: number) => formatNumber(value, 0)
  },
  {
    title: "点击",
    dataIndex: "clicks",
    key: "clicks",
    render: (value: number) => formatNumber(value, 0)
  },
  {
    title: "转化",
    dataIndex: "conversions",
    key: "conversions",
    render: (value: number) => formatNumber(value, 0)
  },
  {
    title: "收入",
    dataIndex: "revenue",
    key: "revenue",
    render: (value: number) => formatNumber(value)
  },
  {
    title: "ROI",
    dataIndex: "roi",
    key: "roi",
    render: (value: number) => formatNumber(value)
  },
  {
    title: "CTR",
    dataIndex: "ctr",
    key: "ctr",
    render: (value: number) => formatPercent(value)
  },
  {
    title: "CVR",
    dataIndex: "cvr",
    key: "cvr",
    render: (value: number) => formatPercent(value)
  },
  {
    title: "CPA",
    dataIndex: "cpa",
    key: "cpa",
    render: (value: number) => formatNumber(value)
  }
];

function MainPage() {
  const {
    advertisers,
    selectedId,
    snapshots,
    isLoading,
    error,
    loadAdvertisers,
    selectAdvertiser,
    refresh
  } = useAdvertisersStore();

  useEffect(() => {
    void loadAdvertisers();
  }, [loadAdvertisers]);

  const snapshot = selectedId ? snapshots[selectedId] : null;
  const dataSource: LatestSnapshot[] = snapshot ? [snapshot] : [];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24
      }}
    >
      <Card
        bordered={false}
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          background: "rgba(22, 22, 24, 0.92)"
        }}
      >
        <Space
          direction="vertical"
          size={20}
          style={{ width: "100%" }}
        >
          <div>
            <Text type="secondary">T05 Walking Skeleton</Text>
            <Title
              level={2}
              style={{ marginTop: 8, marginBottom: 0, color: "#E5E5E7" }}
            >
              SSAI 快手监控
            </Title>
          </div>

          {error ? (
            <Alert
              type="error"
              showIcon
              message="连接失败"
              description={error}
            />
          ) : null}

          <Space wrap>
            <Select
              style={{ minWidth: 280 }}
              placeholder="请选择广告主"
              value={selectedId}
              onChange={(value) => {
                void selectAdvertiser(value);
              }}
              options={advertisers.map((item) => ({
                value: item.id,
                label: item.name
              }))}
            />
            <Button
              type="primary"
              loading={isLoading}
              onClick={() => {
                void refresh();
              }}
            >
              刷新
            </Button>
          </Space>

          <Table<LatestSnapshot>
            rowKey="advertiser_id"
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            locale={{
              emptyText: (
                <Empty
                  description={
                    advertisers.length === 0
                      ? "暂无广告主数据"
                      : "暂无数据，等待 15min 后首次采集"
                  }
                />
              )
            }}
            scroll={{ x: 1200 }}
          />
        </Space>
      </Card>
    </main>
  );
}

export default MainPage;
