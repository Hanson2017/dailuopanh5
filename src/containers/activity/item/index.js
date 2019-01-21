import React, { Component } from 'react';

export default class ActivityListItem extends React.Component {
    render() {
        const { data } = this.props;
        const url = 'http://m.fanlimofang.com/Activity/Detail/' + data.activityid;
        return (
            <a className='activityListItem' href={url} target='_blank'>
                <div className="hd">{data.platname}</div>
                <div className="bd">
                    <p>{data.investtype == 0 ? '首投' : '复投'}{data.invest}获得{data.rebate}</p>
                </div>
                <div className="keyword">{data.keywords}</div>
            </a>
        )
    }
}
