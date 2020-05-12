import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';
import Item from '../../comment/item';

export default class TabYulunComment extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="comment box mt10">
                <Title data={'平台点评'} screenUrlInfo={{ screenUrl: '/comment', tabId: null }} />
                <ul className="list">
                    {
                        data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Item data={item} key={i} />
                                )
                            })
                            :
                            <li className="null">暂无</li>
                    }
                </ul>
            </div>
        )
    }
}