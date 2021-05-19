import React from 'react'
import './Index.less'
import { Table, Popconfirm } from 'antd'
import api from '../../service';
import { domainToASCII } from 'url';

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
                title: '商品类别ID',
                dataIndex: 'categoryId'
            },
            {
                title: '商品类别',
                dataIndex: 'categoryName'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return <Popconfirm title={`确定要删除${record.categoryName}吗？`}
                        onConfirm={() => this.removeCategory(record)}>
                        <a className='delete-text'>删除</a>
                    </Popconfirm>
                },
                width: '20%'
            }
        ];
    }

    render() {
        const { data, total, loading } = this.state
        return (
            <Table
                columns={this.columns}
                rowKey={item => item.categoryId}
                pagination={{
                    total,
                    pageSize: PAGE_SIZE,
                    onChange: (page, pageSize) => {
                        console.log(page, pageSize)
                        this.loadData(page)
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
        api.categoryList({ pageIndex: pageIndex, pageSize: PAGE_SIZE })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                // {"code":0,"message":"SUCCESS","data":{"total":12,"list":[{"categoryId":1,"categoryName":"手机"},{"categoryId":3,"categoryName":"电视"},{"categoryId":4,"categoryName":"跑步机"},{"categoryId":5,"categoryName":"牛奶"},{"categoryId":6,"categoryName":"酸奶"},{"categoryId":7,"categoryName":"洋芋"},{"categoryId":8,"categoryName":"鱼"},{"categoryId":9,"categoryName":"猪肉"},{"categoryId":10,"categoryName":"腊肉"},{"categoryId":11,"categoryName":"汽车"}]}}
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

    removeCategory = (record) => {
        api.removeCategory(record.categoryId)
            .then(res => res.json)
            .then(result => {
                this.loadData(this.pageIndex)
            }).catch(e => {
                console.log(e)
            })
    }
}