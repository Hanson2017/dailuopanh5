import React, { Component } from 'react';
import './index.scss';

export default class LoadMore extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <div className='loadMore' onClick={ this.props.onClick}
            >
                {
                    data.loadMore ?
                        '正在加载...'
                        :
                        data.pageCount < data.page ?
                            '没有更多了'
                            :
                            '加载更多'
                }
            </div>
        )
    }
}




