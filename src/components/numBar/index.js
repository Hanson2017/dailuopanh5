import React, { Component, PropTypes } from 'react';
import './index.scss';

export default class NumText extends React.Component {
    render() {
        return (
           <div className='topNumBar'>{this.props.numText}</div>
        )
    }
}
