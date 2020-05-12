import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../../components/title';
import './index.scss';

export default class HomeReport extends React.Component {
    render() {
        const { typeNo, type, data } = this.props;
        return (
            <div className="fundMenuList">
                <Link className="left" to={{pathname: '/fund',state: {tabId:typeNo}}}>
                    <span className={"num" + ' num' + typeNo}>{typeNo}号</span>
                    <span className="name">{type}</span>
                </Link>
                <div className="right">
                    {
                        data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Link to={'/detail/' + item.id_dlp} key={i} className="plat">{item.plat_name}</Link>
                                )
                            })
                            :
                            <span className="null">暂无</span>
                    }
                </div>
            </div >
        )
    }
}