import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../../components/title';
import Util from '../../../../utils/util';

export default class DetailZongYulun extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box mt10 pingceCon">
                <Title data={'舆论监控'} />
                <div className="list">
                    {
                        data !== '' && data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <a href={item.siteurl} className='item' target='_blank' key={i}>
                                        <span className="title">{item.title}</span>
                                        <span className="date">{Util.formatDate(item.pubtime)}</span>
                                    </a>
                                )
                            })
                            :
                            <div className="null">暂无数据</div>
                    }
                </div>
            </div>
        )
    }
}