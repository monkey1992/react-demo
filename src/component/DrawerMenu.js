import React from 'react'
import './DrawerMenu.less';
import { Layout } from 'antd';

const { Sider } = Layout
const { SubMenu } = Layout

const MENUS = {
    home: {
        key: 'home',
        title: '首页'
    },
    user: {
        key: 'user',
        title: '用户管理'
    },
    category: {
        key: 'category',
        title: '商品类别'
    },
    addCategory: {
        key: 'addCategory',
        value: '添加商品类别'
    },
    configList: {
        key: 'configList',
        title: '配置列表'
    },
    configAdd: {
        key: 'configAdd',
        title: '添加配置'
    }
};

class Index extends React.Component {
    onCollapse = collapsed => {
        this.setState(collapsed)
    }
    render() {
        const { collapsed } = this.props;
        const headerTitle = collapsed ? null : <div className='drawer-header-text-container'>
            <label className='drawer-header-text'>移动端架构师</label>
            <label className='drawer-header-text'>管理后台</label>
        </div>
        return (
            <Sider trigger={null} collapsed={collapsed} collapsible onCollapse={this.onCollapse}>
                <div className='drawer-header'>
                    <img className='drawer-logo' alt='logo' src='https://www.devio.org/img/avatar.png' />
                    {headerTitle}
                </div>
            </Sider>
        )
    }
}

export default Index;