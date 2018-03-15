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
        if (localStorage.loginState) {
            return (
                <Member that={this} />
            )
        }
        else {
            return (
                <Login />
            )

        }

    }
} 