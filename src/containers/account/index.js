import React, { Component } from 'react';
import Member from './member/index';
import Login from './login/index';

export default class Account extends React.Component {
    render() {
        if (localStorage.loginState) {
            return (
                <Member location={this.props.location}  />
            )
        }
        else {
            return (
                <Login location={this.props.location}  />
            )

        }

    }
} 