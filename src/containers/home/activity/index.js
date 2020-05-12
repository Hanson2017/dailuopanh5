import React, { Component } from 'react';
import Title from '../../../components/title';
import './index.scss';

export default class HomeActivity extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="homeActivityContainer box mt10">
                <Title data={'热门活动'} mfTag={true} screenUrlInfo={{ screenUrl: '/activity', tabId: null }} />
                <div className="content">
                    {
                        data.length > 0 ?
                            <div className="list">
                                {
                                    data.map((item, i) => {
                                        const url = 'http://m.fanlimofang.com/Activity/Detail/' + item.activityid;
                                        return (
                                            <a className="item" key={i} href={url} target='_blank'>
                                                <div className="hd">{item.platname}</div>
                                                <div className="bd">
                                                    <p>{item.investtype == 0 ? '首投' : '复投'}{item.invest}</p>
                                                    <p>获得{item.rebate}</p>
                                                </div>
                                                <div className="keyword">{item.keywords}</div>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="null">暂无</div>
                    }
                </div>
            </div >
        )
    }
}