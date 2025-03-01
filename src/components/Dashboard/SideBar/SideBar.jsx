import React, { useState } from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  SettingOutlined,
  AppstoreOutlined,
  MessageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {  Layout, Menu, theme,  Typography, Avatar } from 'antd';

const {  Sider } = Layout;
const { Title } = Typography;
export default function SideBar() {
  const [collapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    
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
      
  )
}
