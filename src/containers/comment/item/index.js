import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Util from '../../../utils/util';
import './index.scss';

export default class CommentItem extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <li className="commentListContainer">
                <div className="hd">
                    <div className="left">
                        <span className="icon"><Icon type={require('../../../assets/icons/new/ico-portrait.svg')} color={'#73C3FF'} size={'xxs'} /></span>
                        <span className="username">{data.username}</span>
                    </div>
                    <div className="date">{Util.formatDate(data.updatetime)}</div>
                </div>
                <div className="bd">{Util.cutText(Util.delHtmlTag(data.detail), 50)}</div>
                {
                    data.title ?
                        <div className="ft">
                            <Link to={'/detail/' + data.cid} className="platBox" >{data.title}</Link>
                        </div>
                        :
                        null
                }

            </li>
        )
    }
}