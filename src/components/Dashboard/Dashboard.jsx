import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  SettingOutlined,
  AppstoreOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Card, Row, Col, Statistic, Typography, Space, Avatar } from 'antd';
//import SideBar from './SideBar/SideBar';
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  const stats = [
    { title: 'إجمالي الإيرادات', value: '45,231.89', prefix: '$', percentage: '+20.1', period: 'من الشهر الماضي' },
    { title: 'الاشتراكات', value: '2350', prefix: '+', percentage: '+180.1', period: 'من الشهر الماضي' },
    { title: 'المبيعات', value: '12,234', prefix: '+', percentage: '+19', period: 'من الشهر الماضي' },
    { title: 'نشط الآن', value: '573', prefix: '+', percentage: '+201', period: 'منذ الساعة الماضية' },
  ];

  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
              trigger={null} 
              collapsible 
              collapsed={collapsed}
              style={{ background: colorBgContainer }}
              width={250}
            >
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
                <Avatar shape="square" size={36} style={{ backgroundColor: '#1890ff' }}>A</Avatar>
                {!collapsed && <Title level={5} style={{ margin: '0 0 0 10px' }}>Admin</Title>}
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
                  { type: 'divider', style: { margin: '8px 0' } },
                  { label: 'الصفحات', type: 'group' },
                  { key: '6', icon: <UserOutlined />, label: 'المصادقة' },
                  { key: '7', icon: <ShoppingOutlined />, label: 'الأخطاء' },
                  { type: 'divider', style: { margin: '8px 0' } },
                  { label: 'أخرى', type: 'group' },
                  { key: '8', icon: <SettingOutlined />, label: 'الإعدادات' },
                  { key: '9', icon: <AppstoreOutlined />, label: 'مركز المساعدة' },
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
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
          <Title level={3} style={{ marginBottom: 24 }}>لوحة التحكم</Title>
          <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card bodyStyle={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' } }>
                  <Statistic
                    title={stat.title}
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
                {/* يمكن إضافة رسم بياني هنا باستخدام Recharts أو Chart.js */}
                <div style={{ height: 250, display: 'flex', alignItems: 'flex-end', gap: 15 }}>
                  {[60, 80, 40, 50, 75, 55, 70, 45, 35, 80, 40, 60].map((height, i) => (
                    <div 
                      key={i}
                      style={{
                        height: `${height * 2}px`,
                        width: '100%',
                        backgroundColor: '#111827',
                        borderRadius: '4px',
                      }}
                    />
                  ))}
                </div>
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
  );
}