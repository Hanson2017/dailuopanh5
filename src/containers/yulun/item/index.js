import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../../utils/util';
import './index.scss';

export default class YulunItem extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <li className="yulunListContainer">
                <a href={data.siteurl} className='title' target='_blank'>{data.title}</a>
                <div className="ft">                  
                    <Link to={'/detail/' + data.id_dlp} className="platBox">{data.platname}</Link>
                    <span className="date">{Util.formatDate(data.pubtime)}</span>
                </div>
            </li>
        )
    }
}