import React, { Component } from 'react';
import Title from '../../../../../components/title';
import Util from '../../../../../utils/util';

export default class Guquan extends React.Component {
    render() {
        const { data,title } = this.props;
        return (
            <div className="box mt10 gudongCon">
                <Title data={title} />
                <ul className="gudongList">
                    {

                        data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <li className="item" key={i}>
                                        <div className="hd">
                                            <span className="name">{item.name}</span>
                                            {
                                                item.dagudong == 1 ?
                                                    <span className="iconGd">大股东</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="bd">
                                            <span className="bili">持股比例：<i>{item.renjiaobili != '' ? item.renjiaobili : '--'}</i></span>
                                            <span className="chuzi">认缴出资：{item.renjiao != '' ? item.renjiao + '万元' : '--'}</span>
                                            {
                                                item.renjiaoshijian != '-' ?
                                                    <span className="date">{item.renjiaoshijian}</span>
                                                    :
                                                    null
                                            }
                                            <span className="date"></span>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            <li className="null">暂无股权信息</li>
                    }
                </ul>
            </div>
        )
    }
}