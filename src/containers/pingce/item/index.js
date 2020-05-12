import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../../utils/util';
import './index.scss';

export default class PingceItem extends React.Component {
    render() {
        const { data } = this.props;
        const article = data.article;
        const plats = data.plats;
        return (
            <li className="yulunListContainer">
                <Link  to={'/pingce/' + article.id} className='title'>{article.title}</Link>
                <div className="ft">
                    <div className='plats'>
                        {
                            plats !== '' && plats.length > 0 ?
                                plats.map((item, i) => {
                                    return (
                                        <Link key={i} to={'/detail/' + item.id_dlp} className="platBox">{item.plat_name}</Link>
                                    )
                                })
                                :
                                <span className="platBox">其他</span>
                        }
                    </div>
                    <span className="date">{Util.formatDate(article.updatetime)}</span>
                </div>
            </li>
        )
    }
}