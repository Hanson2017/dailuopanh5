import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router';
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
        return (
            <div id="outer">
                <ul className='tabBarNav'>
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return (
                                <List key={index} index={index} tab={element.props.name} handleClick={this.handleClick} currentClass={this.currentClass} chageTab2={this.props.chageTab2} />
                            )
                        })
                    }
                </ul>
                {
                    React.Children.map(this.props.children, (element, index) => {
                        if (this.state.current == index) {
                            return (
                                <div className='tabBarContainer'>{element}</div>
                            )
                        }
                    })
                }
            </div>
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
        this.props.chageTab2();
    }
    render() {
        const tab = this.props.tab;
        return (
            <li className={'list ' + this.props.currentClass(this.props.index)} onClick={this.handleClick} >{tab}</li>
        )
    }
}

