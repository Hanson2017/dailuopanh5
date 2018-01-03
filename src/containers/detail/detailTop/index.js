import React, { Component } from 'react';
import './index.scss';

export default class DetailTop extends React.Component {
    render() {
        const detailCommon = this.props.detailCommon;

        const linkUrl = detailCommon.acurl != null && detailCommon.acurl != '' ? detailCommon.acurl : 'http://' + detailCommon.siteurl

        return (
            <div className='detailTop'>
                <span className='type'>状态：
               {
                        detailCommon.platstatus != 1 ?
                            <i style={{ color: 'red' }}>黑名单，建议远离</i>
                            :
                            detailCommon.negative_time == null ?
                                <i style={{ color: '#fff' }}>正常运营中</i>
                                :
                                <i style={{ color: '#FFFF00' }}>争议中，需谨慎</i>
                    }
                </span>
                <span>上线日期：{detailCommon.uptime != '1900-01-01' ? detailCommon.uptime : '未知'}</span>
                <a className='link' href={linkUrl}>访问官网</a>
            </div>
        )
    }
}
