import React from 'react'
import './App.less';
import { Layout } from 'antd';
import Header from './component/Header'
import DrawerMenu from './component/DrawerMenu'
import { Switch, Route } from 'react-router-dom'
import Home from './page/Index'
import User from './page/user/Index'
import AddCategory from './page/category/add/Index'
import Category from './page/category/Index'
import ConfigList from './page/config/Index'
import ConfigAdd from './page/config/add/Index'

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
        <DrawerMenu collapsed={collapsed} onMenuSelect={(pathName, title) => {
          this.setState({ title })
        }} />
        <Layout>
          <Header title={title} toggle={(collapsed) => {
            this.setState({ collapsed })
          }} />
          <Content className='App-content'>
            <Switch>
              <Route exact path='/' Component={Home} />
              <Route path='/category' Component={Category} />
              <Route path='/category-add' Component={AddCategory} />
              <Route path='/user' Component={User} />
              <Route path='/config' Component={ConfigList} />
              <Route path='/config-add' Component={ConfigAdd} />
            </Switch>
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