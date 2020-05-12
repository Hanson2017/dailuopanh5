import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../../utils/util';
import './index.scss';

export default class ReportItem extends React.Component {
    render() {
        const { data } = this.props;
        const location = {
            pathname: '/reports/' + data.id,
            state: { type: data.type }
        }
        return (
            <li className="reportListContainer">
                <Link to={location}>
                    <h6 className="title">{data.title}</h6>
                    <div className="ft">发布时间：{Util.formatDate(data.addtime)}</div>
                </Link>
            </li>
        )
    }
}