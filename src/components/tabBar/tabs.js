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
                <ul className={this.props.black?'tabBarNav tabBarNavBlack':'tabBarNav'}>
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return (
                                <List key={index} index={index} tab={element.props.name} that={this} handleClick={this.handleClick} currentClass={this.currentClass} />
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
    onChangeTab(index){
        if(this.props.onChangeTab){
            this.props.onChangeTab(index)
        }
        
    }
}

class List extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const {that,index}=this.props;
        that.handleClick(index);
        that.onChangeTab(index);
    }
    render() {
        const {tab,that,index}=this.props;
        return (
            <li className={'list ' + that.currentClass(index)} onClick={this.handleClick} >{tab}</li>
        )
    }
}

