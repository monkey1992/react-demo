import './App.less';
import React from 'react'
import { Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';

function App() {
  return (
    <Layout className="App">
      左侧导航菜单
      <Layout>
        Header
        <Content className='App-content'>
          Hello
        </Content>
        <Footer className='App-footer'>
          <a href="https://github.com/">React Demo</a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;