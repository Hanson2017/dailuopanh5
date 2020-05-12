import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../components/title';
import Theme from '../../../../utils/theme';

export default class DetailZongFlow extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box mt10 flowCon">
                <Title data={'流量监控'} />
                <div className="content">
                    {
                        data !== null ?
                            <div className="info">
                                <div className="l">
                                    <div className="li">
                                        <span className="label">流量综合指数</span>
                                        <span className="num">{data.score}</span>
                                    </div>
                                    <div className="li bt">
                                        <span className="label">较上月</span>
                                        <span className="x2">
                                            <Icon type={data.changnum >= 0 ? require('../../../../assets/icons/new/arrow-up.svg') : require('../../../../assets/icons/new/arrow-down.svg')} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />
                                            {Math.abs(data.changnum)}%
                                                </span>
                                    </div>
                                </div>
                                <div className="r">
                                    <div className="li">
                                        <span className="label">流量排名</span>
                                        <span className="num">{data.ordernum}</span>
                                    </div>
                                    <div className="li bt">
                                        <span className="x2 t">&nbsp;&nbsp;&nbsp;在统计的{data.totalNum}家平台中</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="null">暂无数据</div>
                    }

                </div>
            </div>
        )
    }
}