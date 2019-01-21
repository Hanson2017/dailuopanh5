import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../../../utils/util';

export default class PingceItem extends React.Component {
    render(){
        const {data}=this.props;
        return(
            <li>
                <Link to={'/pingce/' + data.id} className="title">{data.title}</Link>  
                <span className="date">{Util.formatDate(data.updatetime)}</span>
            </li>
        )
    }

}