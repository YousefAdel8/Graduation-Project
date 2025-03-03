import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { ConfigProvider } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Card, Row, Col, Statistic, Typography, Space, Avatar } from 'antd';
//import SideBar from './SideBar/SideBar';
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
  datasets: [
    {
      label: "المبيعات",
      data: [10, 20, 15, 30, 25],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [En] = useState(false);
  const stats = [
    { title: 'إجمالي الإيرادات' , value: '45,231.89', prefix: '$', percentage: '+20.1', period: 'من الشهر الماضي' },
    { title: 'الاشتراكات', value: '2350', prefix: '+', percentage: '+180.1', period: 'من الشهر الماضي' },
    { title: 'المبيعات', value: '12,234', prefix: '+', percentage: '+19', period: 'من الشهر الماضي' },
    { title: 'نشط الآن', value: '573', prefix: '+', percentage: '+201', period: 'منذ الساعة الماضية' },
  ];

  return (
    <ConfigProvider direction={!En ? 'rtl' : 'ltr'}>
      <Layout style={{ minHeight: '100vh' }} >
        <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                style={{ background: colorBgContainer }}
                width={250}
                
              >
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
                  <Avatar shape="square" size={36} style={{ backgroundColor: '#1890ff' }}>أ</Avatar>
                  {!collapsed && <Title level={5} style={{ margin: '0 0 0 10px' }} className='me-2'>أدمن</Title>}
                </div>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  style={{ borderRight: 0, background: colorBgContainer }}
                  items={[
                    { type: 'divider', style: { margin: '8px 0' } },
                    { label: 'عام', type: 'group' },
                    { key: '1', icon: <DashboardOutlined />, label: 'لوحة التحكم' },
                    { key: '2', icon: <AppstoreOutlined />, label: 'المهام' },
                    { key: '3', icon: <AppstoreOutlined />, label: 'التطبيقات' },
                    { key: '4', icon: <MessageOutlined />, label: 'المحادثات' },
                    { key: '5', icon: <TeamOutlined />, label: 'المستخدمين' },
                  
                  ]}
                />
        </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '16px',
            padding: 20,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Title level={3} style={{ marginBottom: 24 }} >لوحة التحكم</Title>
          <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card bodyStyle={{ padding: '20px' }} className="shadow-sm">
                  <Statistic
                    title={<Typography.Text >{stat.title}</Typography.Text>}
                    value={stat.value}
                    prefix={stat.prefix}
                    style={{ marginBottom: 8 }}
                    
                  />
                  <Text type="secondary">
                    <Text type="success">{stat.percentage}%</Text> {stat.period}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* المحتوى الرئيسي */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={14}>
            <Card title="نظرة عامة" bodyStyle={{ padding: '20px' }}>
            <Bar data={data} />
            </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card 
                title="المبيعات الأخيرة" 
                bodyStyle={{ padding: '10px 20px' }}
                extra={<Text type="secondary">قمت بإجراء 265 عملية بيع هذا الشهر</Text>}
              >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">المبيعات</Text>
                    <Text type="secondary">التقارير</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>3,500</Text>
                    <Text type="secondary">بيعات</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>3,500</Text>
                    <Text type="secondary">مبيعات</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>3,500</Text>
                    <Text type="secondary">مبيعات</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
 
}