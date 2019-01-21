import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../../components/title';
import Util from '../../../../utils/util';

export default class DetailZongPingce extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box mt10 pingceCon">
                <Title data={'评测监控'} />
                <div className="list">
                    {

                        data !== '' && data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Link to={'/pingce/' + item.id} className="item" key={i}>
                                        <span className="title">{item.title}</span>
                                        <span className="date">{Util.formatDate(item.updatetime)}</span>
                                    </Link>
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