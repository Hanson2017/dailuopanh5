import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import Util from '../../../utils/util';
import Api from '../../../utils/api';
import Loading from '../../../components/loading/index';

export default class Callback extends Component{
    render() {
        return (
            <Loading />
        )
    }
    componentDidMount() {
        const that = this;
        const { history } = this.props;
        const code = Util.GetQueryString('code');
        const url = Api.getUserinfo + '?code=' + code + '&state=dlp';
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
                    history.replace('/member')
                }
                else {
                    console.log('登陆失败')
                }
            });

    }
}

