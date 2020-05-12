import React from 'react';
import { Layout, Menu } from 'antd';
import { BarsOutlined, BugOutlined } from '@ant-design/icons';
const { Sider } = Layout;

function Common(props: any) {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed={true}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item
              key="1"
              icon={<BarsOutlined />}
              onClick={() => props.history.push('./forward')}
            >
              转发
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<BugOutlined />}
              onClick={() => props.history.push('./intercept')}
            >
              拦截
            </Menu.Item>
          </Menu>
        </Sider>
        {props.children}
      </Layout>
    </>
  );
}
export default Common;
