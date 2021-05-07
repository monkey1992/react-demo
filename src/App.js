import React from 'react'
import './App.less';
import { Layout } from 'antd';
import Header from './component/Header'
import DrawerMenu from './component/DrawerMenu'
const { Content, Footer } = Layout

class App extends React.Component {

  state = {
    title: '首页',
    collapsed: false
  }

  render() {
    const { collapsed, title } = this.state
    return (
      <Layout className="App">
        <DrawerMenu collapsed={collapsed} />
        <Layout>
          <Header title={title} toggle={(collapsed) => {
            this.setState({ collapsed })
          }} />
          <Content className='App-content'>
          </Content>
          <Footer className='App-footer'>
            <a href="https://github.com/">React Demo</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;