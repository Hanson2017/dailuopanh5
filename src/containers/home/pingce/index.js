import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';
import Util from '../../../utils/util';
import './index.scss';

export default class HomePingce extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="homePingceContainer box mt10">
                <Title data={'评测监控'} screenUrlInfo={{ screenUrl: '/pingce', tabId: null }} />
                <div className="content">
                    {
                        data.length > 0 ?
                            <ul className="list">
                                {data.map((item, i) => {
                                    return (
                                        <li key={i}>
                                            <div className="img">
                                                <img src={item.cover} />
                                            </div>
                                            <div className="con">
                                                <Link to={'/pingce/' + item.id} className="title">{Util.cutText(item.title, 32)}</Link>
                                                <div className="ft">
                                                    <Link to={'/detail/' + item.id_dlp} className="platBox">{item.platname}</Link>
                                                    <span className="date">{Util.formatDate(item.updatetime)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                            :
                            <div className="null">暂无</div>
                    }

                </div>
            </div>
        )
    }
}