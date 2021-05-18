import React from 'react'
import './Index.less'
import api from '../service'
import { Button } from 'antd'

class Index extends React.Component {
    state = {
        result: {}
    }
    fire = () => {
        api.categories({ pageIndex: 1, pageSize: 10 })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({
                    result
                })
            }).catch(e => {
                console.log(e)
            })
    }

    render() {
        const { result } = this.state
        return <div className='home'>
            <Button onClick={this.fire}>test API</Button>
            <div>
                Result:{JSON.stringify(result)}
            </div>
        </div>
    }
}

export default Index;