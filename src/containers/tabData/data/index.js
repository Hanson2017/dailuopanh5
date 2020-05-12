import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';

export default class TabDataD extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="data box mt10">
                <Title data={'数据概况'} screenUrlInfo={{ screenUrl: '/data', tabId: null }} />
                {
                    data != null && data.length > 0 ?
                        <dl className="list">
                            <dt className="item">
                                <span className="ic1">排名</span>
                                <span className="ic2">平台名称</span>
                                <span className="ic3">成交量(万元)</span>
                                <span className="ic4">综合利率</span>
                                <span className="ic5">平均借款期限</span>
                            </dt>
                            {
                                data.map((item, i) => {
                                    return (
                                        <dd key={i}>
                                            <Link className="item" to={'/detail/' + item.id_dlp}>
                                                <span className="ic1">{i + 1}</span>
                                                <span className="ic2">{item.plat_name}</span>
                                                <span className="ic3">{item.amount != 0 || item.amount != '' ? item.amount : '暂无'}</span>
                                                <span className="ic4">{item.rate}%</span>
                                                <span className="ic5">{item.amount != 0 || item.amount != '' ? item.amount + '月' : '暂无'}</span>
                                            </Link>
                                        </dd>
                                    )
                                })
                            }

                        </dl>
                        :
                        <div className="null">暂无</div>
                }

            </div>
        )
    }
}