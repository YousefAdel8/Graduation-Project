import React, { useState,useEffect } from 'react';
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
import { Button,Drawer, Layout, Menu, theme, Card, Row, Col, Statistic, Typography, Space, Avatar } from 'antd';
import TableSearch  from './FeedbackTable/FeedbackTable';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const En = false;
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: En?["January", "February", "March", "April", "May"]:["يناير", "فبراير", "مارس", "أبريل", "مايو"],
  datasets: [
    {
      label: En?"Sales":"المبيعات",
      data: [10, 20, 15, 30, 25],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: true, 
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return value; 
        }
      }
    }
  }
};
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  const stats = [
    { title: En?'Total Revenue':'إجمالي الإيرادات' , value: '45,231.89', prefix: '$', percentage: '+20.1', period: En?'Last Month':'من الشهر الماضي' },
    { title: En?'Total Subscriptions':'الاشتراكات', value: '2350', prefix: '+', percentage: '+180.1', period: En?'Last Month':'من الشهر الماضي' },
    { title: En?'Total Sales':'المبيعات', value: '12,234', prefix: '+', percentage: '+19', period: En?'Last Month':'من الشهر الماضي' },
    { title: En?'Active Users':'نشط الآن', value: '573', prefix: '+', percentage: '+201', period: En?'Last Hour':'منذ الساعة الماضية' },
  ];

  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <ConfigProvider direction={!En ? 'rtl' : 'ltr'}>
      <Layout style={{ minHeight: '100vh' }} >
        {isMobile ?
          <Drawer  trigger={null} title={<div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Avatar shape="square" size={36} style={{ backgroundColor: '#1890ff' }}>{En?"A":"أ"}</Avatar>
          {!collapsed && <Title level={5} style={{ margin: '0 0 0 10px' }} className='me-2'>{En?"Admin":"ادمن"}</Title>}
        </div>}
         onClose={onClose} open={open}
          placement={En?"left":"right"}
          style={{ background: colorBgContainer }}
          width={250}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ borderRight: 0, background: colorBgContainer }}
            items={[
              { type: 'divider', style: { margin: '8px 0' } },
              { label: En? 'General':'عام', type: 'group' },
              { key: '1', icon: <DashboardOutlined />, label: En?'Dashboard':'لوحة التحكم' },
              { key: '2', icon: <AppstoreOutlined />, label: En?'Tasks':'المهام' },
              { key: '3', icon: <AppstoreOutlined />, label: En?'Apps':'التطبيقات' },
              { key: '4', icon: <MessageOutlined />, label: En?'Chats':'المحادثات' },
              { key: '5', icon: <TeamOutlined />, label: En?'Users':'المستخدمين' },
            
            ]}
          />
          </Drawer>
        :
        <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                style={{ background: colorBgContainer }}
                width={250}
                
              >
                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
                  <Avatar shape="square" size={36} style={{ backgroundColor: '#1890ff' }}>{En?"A":"أ"}</Avatar>
                  {!collapsed && <Title level={5} style={{ margin: '0 0 0 10px' }} className='me-2'>{En?"Admin":"ادمن"}</Title>}
                </div>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  style={{ borderRight: 0, background: colorBgContainer }}
                  items={[
                    { type: 'divider', style: { margin: '8px 0' } },
                    { label: En? 'General':'عام', type: 'group' },
                    { key: '1', icon: <DashboardOutlined />, label: En?'Dashboard':'لوحة التحكم' },
                    { key: '2', icon: <AppstoreOutlined />, label: En?'Tasks':'المهام' },
                    { key: '3', icon: <AppstoreOutlined />, label: En?'Apps':'التطبيقات' },
                    { key: '4', icon: <MessageOutlined />, label: En?'Chats':'المحادثات' },
                    { key: '5', icon: <TeamOutlined />, label: En?'Users':'المستخدمين' },
                  
                  ]}
                />
        </Sider>
        }
        
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={isMobile ? <MenuFoldOutlined /> : collapsed ? <MenuFoldOutlined /> :  <MenuUnfoldOutlined />}
            onClick={() =>
              isMobile? setOpen(true) : setCollapsed(!collapsed)}
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
          <Title level={3} style={{ marginBottom: 24 }} >{En?'Dashboard':'لوحة التحكم'}</Title>
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

          <Row gutter={[16, 16]} style={{ marginTop: 16 } }>
            <Col xs={24} lg={14}>
            <Card 
              title={En?"Sales Overview":"نظرة عامة"} 
              bodyStyle={{ 
                padding: '20px', 
                
              }}
              className='shadow-sm'
            >
              <div style={{ 
                width: '100%', 
                height: '100%' 
              }}>
                <Bar 
                  data={data} 
                  options={options}
                  style={{ 
                    width: '100%', 
                    height: '100%' 
                  }}
                />
              </div>
            </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card 
                title={En?"Latest Sales":"المبيعات الأخيرة" }
                bodyStyle={{ padding: '10px 20px' }}
                className='shadow-sm'
               >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">{En?"Sales":"المبيعات"}</Text>
                    <Text type="secondary">{En?"Reports":"التقارير"}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>3,500</Text>
                    <Text type="secondary">{En?"Sales":"بيعات"}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>3,500</Text>
                    <Text type="secondary">{En?"Sales":"مبيعات"}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>3,500</Text>
                    <Text type="secondary">{En?"Sales":"مبيعات"}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }} >
              <Col xs={24} sm={24} lg={24} >
                <Card bodyStyle={{ padding: '0px', width: '100%'}} className="shadow-sm">
                  <TableSearch />
                </Card> 
              </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
}