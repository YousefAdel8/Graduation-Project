import React, { useState, useEffect, useContext } from 'react';
import { ConfigProvider } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CommentOutlined,
  TeamOutlined,
  StarOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, theme, Avatar, Typography } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { PermissionContext  } from "../../context/PermissionContext.jsx";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AppLayout = ({ En = false }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClose = () => {
    setOpen(false);
  };


  //const permissions = ['dashboard', 'feedback', 'report', 'users', 'social media'];
  const { permissions } = useContext(PermissionContext );
  const getCurrentPath = () => {
    const path = location.pathname.split('/')[1] || '';
    switch (path) {
      case '': return '1';
      case 'feedback': return '2';
      case 'report': return '3';
      case 'socialmedia': return '4';
      case 'users': return '5';
      default: return '0';
    }
  };

  
  const menuItems = [
    isMobile?null:{ type: 'divider', style: { margin: '8px 0' } },
    //{ label: En ? 'General' : 'عام', type: 'group' },
    permissions.includes('dashboard') && ({ key: '1', icon: <DashboardOutlined />, label: En ? 'Dashboard' : 'لوحة التحكم' }),
    permissions.includes('feedback') && ({ key: '2', icon: <StarOutlined  />, label: En ? 'Feedback' : 'التقييمات' }),
    permissions.includes('report') && ({ key: '3', icon: <FormOutlined />, label: En ? 'Reports' : 'التقارير' }),
    permissions.includes('social media') && ({ key: '4', icon: <CommentOutlined />, label: En ? 'Social Media' : 'منصة المجتمع' }),
    permissions.includes('users') && ({ key: '5', icon: <TeamOutlined />, label: En ? 'Users' : 'المستخدمين' }),
  ].filter(Boolean);

  const handleMenuClick = ({ key }) => {
    setOpen(false);
    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/feedback');
        break;
      case '3':
        navigate('/report');
        break;
      case '4':
        navigate('/socialmedia');
        break;
      case '5':
        navigate('/users');
        break;
      default:
        break;
    }
  };

  return (
    <ConfigProvider direction={!En ? 'rtl' : 'ltr'}>
      <Layout style={{ minHeight: '100vh' }}>
        {isMobile ? (
          <Drawer
            trigger={null}
            title={
              <div  style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
                <Avatar shape="square" size={36} style={{ backgroundColor: 'rgb(2, 8, 23)' }}>{En ? "A" : "أ"}</Avatar>
                {!collapsed && <Title level={5} style={{  margin: En ? '0 0 0 10px' : '0 10px 0 0' }} >{En ? "Admin" : "ادمن"}</Title>}
              </div>
            }
            onClose={onClose}
            open={open}
            placement={En ? "left" : "right"}
            style={{ background: colorBgContainer }}
            width={250}
            
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[getCurrentPath()]}
              selectedKeys={[getCurrentPath()]}
              style={{ borderRight: 0, background: colorBgContainer,width: '100%'  }}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Drawer>
        ) : (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ background: colorBgContainer }}
            width={250}
            
          >
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
              <Avatar shape="square" size={36} style={{ backgroundColor: "rgb(2, 8, 23)" }}>{En ? "A" : "أ"}</Avatar>
              {!collapsed && <Title level={5} style={{ margin: '0 0 0 10px' }} className='me-2'>{En ? "Admin" : "ادمن"}</Title>}
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[getCurrentPath()]}
              selectedKeys={[getCurrentPath()]}
              style={{ borderRight: 0, background: colorBgContainer }}
              onClick={handleMenuClick}
              items={menuItems}
              
            />
          </Sider>
        )}

        <Layout>
          <Header
            style={{
              padding: '0 16px',
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={En ?
                isMobile ? <MenuUnfoldOutlined /> : collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                :
                isMobile ? <MenuFoldOutlined /> : collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() =>
                isMobile ? setOpen(true) : setCollapsed(!collapsed)}
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;