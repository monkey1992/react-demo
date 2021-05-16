import React from 'react'
import './Index.less'
import { Table } from 'antd'
import api from '../../service';

const PAGE_SIZE = 10

export default class Index extends React.Component {
    state = {
        data: [],
        total: 0,
        loading: false
    }

    constructor(props) {
        super(props)
        this.columns = [
            {
                title: '用户ID',
                dataIndex: 'uid'
            },
            {
                title: 'imooc ID',
                dataIndex: 'imoocId'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '是否禁用',
                dataIndex: 'forbid'
            }
        ];
    }

    render() {
        const { data, total, loading } = this.state
        return (
            <Table
                columns={this.columns}
                rowKey={item => item.uid}
                pagination={{
                    total,
                    pageSize: PAGE_SIZE,
                    onChange: (page, pageSize) => {
                        console.log(page, pageSize)
                        this.onCollapse(page)
                    }
                }}
                loading={loading}
                dataSource={data}
            />
        )
    }

    componentDidMount() {
        this.setState({ loading: false })
        this.loadData(1)
    }

    loadData = (pageIndex) => {
        this.pageIndex = pageIndex
        this.setState({ loading: false })
        api.userList({ pageIndex: pageIndex, pageSize: PAGE_SIZE })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                // {"code":0,"message":"SUCCESS","data":{"total":3,"list":[{"uid":"1","imoocId":"111","orderId":"222","userName":"tom","createTime":"2020-09-02 15:32:03","forbid":"1"},{"uid":"2","imoocId":"123456","orderId":"123456789","userName":"tom2","createTime":"2021-04-10 10:08:35"},{"uid":"7","imoocId":"234","orderId":"345","userName":"翠花","createTime":"2021-04-10 11:07:37"}]}}
                const { code, message, data: { total, list } = {} } = result
                this.setState({
                    loading: false,
                    data: list,
                    total: total
                })
            }).catch(e => {
                console.log(e)
                this.setState({ loading: false })
            })
    }
}