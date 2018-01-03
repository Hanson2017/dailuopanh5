import React, { Component, PropTypes } from 'react';
import './index.scss';

export default class UpDateTime extends React.Component {
    render() {
        return (
           <div className='upDateTime'>更新时间<span>{this.props.updatetime}</span></div>
        )
    }
}
