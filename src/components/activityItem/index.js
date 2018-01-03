import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import './index.scss';

export default class Load extends React.Component {
    render() {
        const data = this.props.data;
        const url = 'http://m.fanlimofang.com/Activity/Detail/' + data.activityid;
        return (
            <a className='activity' href={url} target='_blank'>
                <div className='hd'>
                    <span>{data.platname}</span>
                    {data.investtype == 0 ? '首投' : '复投'}
                    {data.invest}获
                                                    {data.rebate}
                </div>
                <div className='ft'>
                    {data.keywords}
                </div>
            </a>
        )
    }
}
