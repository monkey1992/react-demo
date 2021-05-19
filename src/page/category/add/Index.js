import React from 'react'
import './Index.less'
import { Form, Input, Button } from 'antd';

export default class Index extends React.Component {
    formRef = React.createRef()

    onFinish = (values) => {

    }

    onRest = () => {
        this.formRef.current.resetFields()
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
}