import React, { Component } from 'react';
import Top from './top';
import Zhibiao from './zhibiao';
import Hexin from '../hexin';

export default class DetailHealthAll extends React.Component {
    render() {
        const { platName, data } = this.props;
        return (
            <div className="detailHealthAll">
                <Top data={data} platName={platName} />
                <Zhibiao data={data} />
                <Hexin data={data} />
            </div>
        )
    }
}