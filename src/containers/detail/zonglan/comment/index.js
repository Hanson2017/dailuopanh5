import React, { Component } from 'react';
import Title from '../../../../components/title';
import Item from '../../../comment/item';

export default class DetailZongYulun extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box mt10 pingceCon">
                <Title data={'点评监控'} />
                <ul className="list">
                    {
                        data !== '' && data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Item data={item} key={i} />
                                )
                            })
                            :
                            <div className="null">暂无数据</div>
                    }
                </ul>
            </div>
        )
    }
}