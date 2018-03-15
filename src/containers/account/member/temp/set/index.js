import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import { Icon } from 'antd-mobile';
import Api from '../../../../../utils/api';
import './index.scss';

export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            qqInfo: ''
        }
    }
    render() {
        const { that } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        return (
            <div className='accountSet'>
                <ul className='accountSetList'>
                    <li>
                        <label>当前账号：</label>
                        {loginState.r_username}
                        {
                            loginState.r_fromtype == 'qq' ?
                                '（QQ登录）'
                                :
                                '（微信登录）'
                        }
                    </li>
                    <li onClick={() => that.props.history.push('/help')}>
                        <label>常见问题</label>
                        <Icon type={require('../../../../../assets/icons/right.svg')} color={'#c7c7cc'} size={'xs'} />
                    </li>
                    <li>
                        <a target="_blank" href={this.state.loading ? '' : this.state.qqInfo.qqqun_url.replace(/\u0026/, "&")}>
                            <label>反馈</label>
                            QQ群：{this.state.qqInfo.qqqun_num}
                        </a>
                    </li>
                </ul>
                <button type="button" className='logout' onClick={this.logout.bind(this)}>退出登录</button>
            </div>
        )
    }
    logout() {
        const that = this.props.that;
        localStorage.clear();
        that.setState({
            ref: !that.state.ref
        });
      
    }
    componentDidMount() {
        const url = Api.getqqun;
        const that = this;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    that.setState({
                        qqInfo: json.data,
                        loading: false
                    })
                }
            });
    }
}
