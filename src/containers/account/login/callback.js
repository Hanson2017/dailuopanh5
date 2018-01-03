import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import fetch from 'isomorphic-fetch'
import Util from '../../../utils/util';
import Api from '../../../utils/api';
import Loading from '../../../components/loading/index';

const Callback = createReactClass({
    mixins: [History],
    render() {
        return (
            <Loading />
        )
    },
    componentDidMount() {
        const that = this;
        const code = Util.GetQueryString('code');
        const url = Api.getUserinfo + '?code=' + code + '&state=dlp';
        console.log(url)
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    const result = JSON.stringify(json)
                    localStorage.loginState = result
                    that.history.replaceState(null, '/member/index')
                }
                else {
                    that.history.replaceState(null, '/member/Login')
                    console.log('登陆失败')
                }
                console.log(json)
            });

    }
})

export default Callback;
