import React from 'react'
import './Index.less'
import { get } from '../../service';
import { api } from '../../service/api';
import { Button } from 'antd';

export default class Index extends React.Component {
    fire = () => {
        get(api.userList)({ pageIndex: 1, pageSize: 10 })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            }).catch(e => {
                console.log(e);
            })
    }

    render() {
        return <div className='user'>
            <Button onClick={this.fire}>test API</Button>
        </div>
    }
}