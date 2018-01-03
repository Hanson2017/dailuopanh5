import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { Icon } from 'antd-mobile';
import './index.scss';

export default class SharePage extends React.Component {
    render() {
        return (
            <div className='shareContainer'>
                <ul className='list'>
                    <li>
                        <Icon type={require('../../../assets/icons/qq-circle-o.svg')} color={'#3c4650'} size='lg' />
                        <span className='text'>QQ</span>
                    </li>
                    <li>
                        <Icon type={require('../../../assets/icons/qzone-circle-o.svg')} color={'#3c4650'} size='lg' />
                        <span className='text'>QQ空间</span>
                    </li>
                    <li>
                        <Icon type={require('../../../assets/icons/wechat-circle-o.svg')} color={'#3c4650'} size='lg' />
                        <span className='text'>微信</span>
                    </li>
                    <li>
                        <Icon type={require('../../../assets/icons/friendsC-circle-o.svg')} color={'#3c4650'} size='lg' />
                        <span className='text'>朋友圈</span>
                    </li>
                    <li>
                        <Icon type={require('../../../assets/icons/shareLink-circle-o.svg')} color={'#3c4650'} size='lg' />
                        <span className='text'>复制链接</span>
                    </li>
                </ul>
                <div className='close'>
                    <Icon type={require('../../../assets/icons/shareClose.svg')} color={'#3c4650'} size='lg' />
                </div>
            </div>
        )
    }
}