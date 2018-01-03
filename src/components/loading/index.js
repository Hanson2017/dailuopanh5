import React, { Component } from 'react';
import {Icon } from 'antd-mobile';
import './index.scss';

export default class Load extends React.Component {
    render() {
        return (
            <div className='loading'>
                <Icon type={'loading'} size={'lg'} color={'#999'} />
            </div>
        )
    }
}
