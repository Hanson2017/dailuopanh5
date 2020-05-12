import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';
import Item from '../../reports/item';

export default class TabDataReport extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="report mt10 box">
                <Title data={'数据报表'} screenUrlInfo={{ screenUrl: '/reports', tabId: null }} />
                <ul className="list">
                    {
                        data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Item key={i} data={item} />
                                )
                            })
                            :
                            <div className="null">暂无</div>
                    }
                </ul>
            </div>
        )
    }
}