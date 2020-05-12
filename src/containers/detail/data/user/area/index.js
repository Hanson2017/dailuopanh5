import React, { Component } from 'react';
import Title from '../../../../../components/title';

export default class Area extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <div className="box mt10 areaCon">
                <Title data={'地区分布'} />
                <ul className="list">
                    {
                        data !== null ?
                            data.list.map((item, i) => {
                                return (
                                    <li key={i} className={'li'+i}>
                                        <span className="number">{i + 1}</span>
                                        <span className="platName">{item.province}</span>
                                        <span className="progress" style={{ width: 0.6 * item.perctent * 100 + '%' }}></span>
                                    </li>
                                )
                            })
                            :
                            <li className="null">暂无数据</li>
                    }

                </ul>
            </div>
        )


    }
}
