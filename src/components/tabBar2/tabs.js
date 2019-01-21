import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router';
import { connect } from 'react-redux';


import './index.scss';

class TabBar extends React.Component {
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
        const { dispatch } = this.props;
        return (
            <div id="outer">
                <div className="tabBarNav2Container">
                    <ul className='tabBarNav2'>
                        {
                            React.Children.map(this.props.children, (element, index) => {
                                return (
                                    <List key={index} index={index} dispatch={dispatch} totalNum={element.props.totalNum} tab={element.props.name} handleClick={this.handleClick} currentClass={this.currentClass} />

                                )
                            })

                        }
                    </ul>
                </div>

                {
                    React.Children.map(this.props.children, (element, index) => {
                        if (this.state.current == index) {
                            return (
                                <div className='tabBarContainer2'>{element}</div>
                            )
                        }
                        // return (
                        //     <div className={this.contentClass(index)}>{element}</div>
                        // )
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

    }
    render() {
        const tab = this.props.tab;
        return (
            <li className={'list ' + this.props.currentClass(this.props.index)} onClick={this.handleClick} >{tab}</li>
        )
    }
}


export default connect()(TabBar);
