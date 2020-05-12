import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../../../utils/util';

export default class YulunItem extends React.Component {
    render(){
        const {data}=this.props;
        return(
            <li>
                <a href={data.siteurl} className='title' target='_blank'>{data.title}</a>
                <span className="date">{Util.formatDate(data.pubtime)}</span>
            </li>
        )
    }

}