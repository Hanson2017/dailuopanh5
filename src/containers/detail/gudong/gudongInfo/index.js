import React, { Component } from 'react';
import './index.scss';

export default class GuDongInfo extends React.Component {
    render() {
        let data = this.props.data;
        if (data != null) {
            var gudongxinxi = data.gudongxinxi;
            var gudongchengyuan = data.zhuyaorenyuan;
            return (
                <div>
                    {
                        gudongxinxi != null && gudongxinxi.length > 0 ?
                            <div className='gudongInfo'>
                                <div className='gudongInfo-hd'>
                                    <span className="ic1">股东类型</span>
                                    <span className="ic2">股东</span>
                                </div>
                                {
                                    gudongxinxi.map((list, i) => {
                                        return (
                                            <dl className='gudongInfoList' key={i}>
                                                <dt>{list.type}</dt>
                                                <dd>
                                                    <div className='name'>{list.name}
                                                        {
                                                            list.dagudong == 1 ?
                                                                <span className='dagudong'>大股东</span>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                    <div>持股比例<i>{list.renjiaobili != '' ? list.renjiaobili : '--'}</i></div>
                                                    <div>认缴出资<i>{list.renjiao != '' ? list.renjiao : '--'}</i>
                                                        {
                                                            list.renjiaoshijian != '-' ?
                                                                <span className='time'>{list.renjiaoshijian}</span>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </dd>
                                            </dl>
                                        )
                                    })
                                }

                            </div>
                            :
                            <div className='dataNull'>暂无股东信息</div>
                    }
                    {
                        gudongchengyuan != null && gudongchengyuan.length > 0 ?
                            <div className='memberInfo'>
                                <h6>主要成员</h6>
                                <ul className='memberInfoList'>
                                    {
                                        gudongchengyuan.map((list, i) => {
                                            return (
                                                <li key={i}>
                                                    <span title={list.name}>{list.name}</span>
                                                    {list.zhiwei}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            <div className='dataNull'>暂无成员信息</div>
                    }
                </div>
            )
        }
        else {
            return (
                <div className='dataNull'>暂无数据</div>
            )
        }

    }
}