import React, { Component } from 'react';
import Title from '../../../components/title';
import Item from '../../comment/item';
import './index.scss';

export default class HomeComment extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="homeCommentContainer box mt10">
                <Title data={'点评监控'} screenUrlInfo={{ screenUrl: '/comment', tabId: null }} />
                <div className="content">
                    {
                        data.length > 0 ?
                            <ul className="list">
                                {
                                    data.map((item, i) => {
                                        return (
                                            <Item key={i} data={item} />
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className="null">暂无</div>
                    }

                </div>
            </div >
        )
    }
}