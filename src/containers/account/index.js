import React, { Component } from 'react';
import Member from './member/index';
import Login from './login/index';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: false,
        };
    }
    render() {
        const { history } = this.props;
        if (localStorage.loginState) {
            return (
                <Member that={this} history={history} />
            )
        }
        else {
            return (
                <Login history={history} />
            )

        }

    }
} 