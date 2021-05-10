import React from 'react'
import './App.less';
import { Layout } from 'antd';
import Header from './component/Header'
import DrawerMenu from './component/DrawerMenu'
import { Switch, Route } from 'react-router-dom'
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
            <switch>
              
            </switch>
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