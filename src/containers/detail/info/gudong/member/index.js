import React, { Component } from 'react';
import Title from '../../../../../components/title';

export default class Menber extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box mt10 memberCon">
                <Title data={'主要成员  '} />
                <ul className="memberList">
                    {
                        data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <li className={data.length - 1 == i || (data.length - 2 == i && i % 2 == 0) ? "item notBt" : 'item'} key={i}>
                                        <span className="name">{item.name}</span>
                                        <span className="zhiwei">{item.zhiwei}</span>
                                    </li>
                                )
                            })
                            :
                            <li className="null">暂无成员信息</li>
                    }
                </ul>
            </div>
        )
    }
}