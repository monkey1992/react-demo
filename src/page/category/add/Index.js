import React from 'react'
import './Index.less'
import { Form, Input, Button, notification } from 'antd';
import api from '../../../service';

export default class Index extends React.Component {
    formRef = React.createRef()

    onFinish = ({ categoryName }) => {
        const nameArray = categoryName.replace(' ', '').split('|')
        const promises = []
        nameArray.forEach(element => {
            promises.push(this.addCategory(element))
        });
        Promise.allSettled(promises)
            .then(results => {
                const successArray = []
                const failureArray = []
                results.forEach(result => {
                    const { status, value, reason } = result
                    if (status === 'fulfilled') {
                        successArray.push(value.categoryName)
                    } else {
                        failureArray.push(reason)
                    }
                })
                this.showSuccessResult(successArray)
                this.showFailureResult(failureArray)
            })
    }

    onRest = () => {
        this.formRef.current.resetFields()
    }

    addCategory = (categoryName) => {
        return new Promise((resolve, reject) => {
            api.addCategory()({ categoryName })
                .then(res => res.json())
                .then(result => {
                    const { code, message } = result
                    if (code === 0) {
                        resolve({ categoryName, message })
                    } else {
                        reject({ categoryName, message })
                    }
                }).catch(e => {
                    reject({ categoryName, message: e.toString() })
                })
        })
    }

    render() {
        return <Form
            className='config-add'
            ref={this.formRef}
            name='control-ref'
            onFinish={this.onFinish}>

            <Form.Item
                name='categoryName'
                label='类别名'
                extra='通过|分割来一次性添加多条记录'
                rules={[
                    { required: true }
                ]}>
                <Input />
            </Form.Item>
            <Form.Item className='config-add-btn-layout'>
                <Button type='primary' htmlType='submit'
                    className='config-add-btn'>
                    提交
                </Button>
                <Button type='primary' htmlType='button' onClick={this.onRest}>
                    重置
                </Button>
            </Form.Item>
        </Form>
    }

    showSuccessResult = (successArray) => {
        if (!successArray || successArray.length === 0) {
            return
        }
        notification['success']({
            placement: 'bottomRight',
            message: '添加成功',
            description: successArray.toString()
        })
    }

    showFailureResult = (failureArray) => {
        if (!failureArray || failureArray.length === 0) {
            return
        }
        const shows = []
        failureArray.forEach(val => {
            const { categoryName, message } = val
            shows.push(<div key={categoryName}>{categoryName}:{message}></div>)
        })
        notification['error']({
            duration: null,
            placement: 'bottomRight',
            message: '添加失败',
            description: shows
        })
    }
}