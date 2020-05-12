import React, { Component, PropTypes } from 'react';
import './index.scss';

export default class UpDateTime extends React.Component {
    render() {
        return (
           <div className='topUpdate'>更新时间：{this.props.updatetime}</div>
        )
    }
}
