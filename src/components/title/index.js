import React, { Component } from 'react';
import './index.scss';

export default class Title extends React.Component {
    render() {
        const titleText = this.props.titleText;
        const subtitle=this.props.subtitle;
        return (
            <div className='detailTitle'>
                <i className='titleIcon'></i>
                {titleText}
               
                <span className='subtitle'>{subtitle}</span>    
                {this.props.children}
            </div>
        )
    }
}
