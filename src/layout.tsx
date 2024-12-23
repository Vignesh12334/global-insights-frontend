import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Typography } from 'antd';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/', <PieChartOutlined />),
  getItem('All insights', '/insights', <DesktopOutlined />),
];

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getPageTitle = (pathname: string) => {
    switch(pathname) {
      case '/':
        return 'Dashboard';
      case '/insights':
        return 'All Insights';
      default:
        return '';
    }
  };

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh'  }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        style={{ 
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['/']} 
          selectedKeys={[location.pathname]}
          mode="inline" 
          items={items}
          
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Title level={4} className="m-0 font-semibold">
            {getPageTitle(location.pathname)}
          </Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
