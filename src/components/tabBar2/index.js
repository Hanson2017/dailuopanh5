import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link, History } from 'react-router';
import createReactClass from 'create-react-class';
import './index.scss';

export default class TabBar extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 0
        }
        this.currentClass = this.currentClass.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.contentClass = this.contentClass.bind(this);
    }
    render() {
        const tabNames = this.props.tabNames;
        return (
            <ul className='tabBarNav2'>
                {
                    tabNames.map((tab, i) => {
                        return (
                            <List key={i} index={i} tab={tab} handleClick={this.handleClick} currentClass={this.currentClass} />
                        )
                    })
                }
            </ul>

        )
    }
    componentDidMount() {
        this.setState({
            current: this.props.current || 0
        })
    }
    handleClick(index) {
        this.setState({ current: index });
    }
    currentClass(index) {
        return this.state.current === index ? 'current' : '';
    }
    contentClass(index) {
        return this.state.current === index ? 'active' : '';
    }
}

class List extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {

        this.props.handleClick(this.props.index);
    }
    render() {
        const tab = this.props.tab;
        return (
            <Link className={'list ' + this.props.currentClass(this.props.index)} onClick={this.handleClick} to={tab.route} >{tab.title}</Link>
        )
    }
}

