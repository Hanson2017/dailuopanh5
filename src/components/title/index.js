import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import './index.scss';

export default class Title extends React.Component {
    render() {
        const { data, borderNot, screenUrlInfo, linkUrl, mfTag } = this.props;
        return (
            <div className={borderNot ? 'titleContainer borderNot' : 'titleContainer'}>
                <div className="title">
                    <i className="icon"></i>
                    {data}
                    {
                        mfTag ?
                            <div className="mfTag">全网较高</div>
                            :
                            null
                    }
                    {
                        this.props.children ?
                            this.props.children
                            :
                            null
                    }
                </div>

                {
                    screenUrlInfo || linkUrl ?
                        <Link to={screenUrlInfo.screenUrl} className='more'>
                            查看更多
                            <span className="icon"><Icon type={require('../../assets/icons/new/arrow-right.svg')} color={'#ccc'} size={'xxs'} /></span>
                        </Link>
                        :
                        null
                }
            </div>
        )
    }
}
