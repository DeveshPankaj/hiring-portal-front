import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import React from 'react';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider} = Layout;


function MyApp({ Component, pageProps }: AppProps) {

  const [isCollapsed, setCollapsed] = React.useState(true)
  const toggle = () => {
    setCollapsed(!isCollapsed)
  }
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider width={200} className="site-layout-background" style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          style={{ height: '100%', borderRight: 0 }}  
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Job Templates">
            <Menu.Item key="1">Create Template</Menu.Item>
            <Menu.Item key="2">Update Template</Menu.Item>
            <Menu.Item key="3">Remove Template</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Forms">
            <Menu.Item key="5">Search Jobs</Menu.Item>
            <Menu.Item key="6">Track Application</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Data">
            <Menu.Item key="9">Search Application</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          className="site-layout-background"
          style={{ margin: '16px 16px', padding: '1rem', overflow: 'initial' }}
        >
      <Component {...pageProps} />
      </Content>
      </Layout>
  </Layout>

  )
}

export default MyApp
