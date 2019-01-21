import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';

export default class TabYulunPingce extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="pingce box mt10">
                <Title data={'热门评测'} screenUrlInfo={{ screenUrl: '/pingce', tabId: 0 }} />
                <div className="list">
                    {
                        data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Link to={'/pingce/' + item.id} key={i} className="title">{item.title}</Link>
                                )
                            })
                            :
                            <div className="null">暂无</div>
                    }
                </div>
            </div>
        )
    }
}