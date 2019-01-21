import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';

export default class TabFindActivity extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="activity box mt10">
                <Title data={'热门活动'} mfTag={true} screenUrlInfo={{ screenUrl: '/activity', tabId: null }} />
                <div className="list">
                    {
                        data.length > 0 ?
                            data.map((item, i) => {
                                const url = 'http://m.fanlimofang.com/Activity/Detail/' + item.activityid
                                return (
                                    <a className="item" key={i} href={url} target='_blank'>
                                        <div className="plat">{item.platname}</div>
                                        <div className="inv">
                                            {item.investtype == 0 ? '首投' : '复投'}{item.invest}获得{item.rebate}
                                        </div>
                                        <div className="keyword">{item.keywords}</div>
                                    </a>
                                )
                            })
                            :
                            <div className="null">暂无</div>
                    }
                </div>
            </div>
        )
    }
}