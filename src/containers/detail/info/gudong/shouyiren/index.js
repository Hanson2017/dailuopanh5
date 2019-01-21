import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../../components/title';

export default class Shouyiren extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box mt10 shouyirenCon">
                <Title data={'最终受益人'} />
                <div className="shouyirenList">
                    {
                        data != null && data.length > 0 ?
                            data.map((list, i) => {
                                return (
                                    <div className="list" key="i">
                                        <dl className="shouyiren">
                                            <dt className="number">[{list.number}]</dt>
                                            <dd>
                                                <span className="label">最终受益人：</span>
                                                <span className="text">{list.name}</span>
                                            </dd>
                                            <dd>
                                                <span className="label">持股比例：</span>
                                                <span className="text">{list.bili}</span>
                                            </dd>
                                            <dd>
                                                <span className="label">股权链：</span>
                                            </dd>
                                        </dl>
                                        {
                                            list.guquan.map((item, j) => {
                                                return (
                                                    <dl className="guquanlian" key={j}>
                                                        <dt>路径 {item.number}（占比约 {item.bili}）</dt>
                                                        <dd>
                                                            <div className="guquanlianList">
                                                                <span className="name">{item.name}</span>
                                                            </div>
                                                            {
                                                                item.guquan_detail.map((list3, z) => {
                                                                    return (
                                                                        <div className="guquanlianList" key={z}>
                                                                            <span className="guquanlianBili">
                                                                                <Icon type={require('../../../../../assets/icons/new/arrow-down.svg')} color={'#999'} size={'xxs'} />
                                                                                <i>{list3.bili}</i>
                                                                            </span>
                                                                            <span className="name">{list3.name}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </dd>
                                                    </dl>
                                                )
                                            })
                                        }

                                    </div>
                                )
                            })
                            :
                            <div className="null">暂无最终受益人</div>
                    }
                </div>
            </div>
        )
    }
}
