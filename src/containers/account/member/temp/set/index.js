import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import { Icon } from 'antd-mobile';
import Api from '../../../../../utils/api';
import Util from '../../../../../utils/util';
import Loading from '../../../../../components/loading';
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
        const { loading } = this.state;
        if (loading) {
            return (
                <Loading />
            )
        }
        else {
            const { that, history } = this.props;
            const loginState = JSON.parse(localStorage.loginState);
            var time = Date.parse(new Date());
            var day = null;
            if (loginState.r_regtime) {
                var lasttime = Date.parse(Util.formatDate(loginState.r_regtime));
                day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
            }
            return (
                <div className='accountSet'>
                    <div className="hd">
                        <img src={loginState.r_avatar_img} className='avatar' />
                        <p className="userName">{loginState.r_username}</p>
                        {
                            day != null ?
                                <p className="userDay">玩转罗盘 {day} 天</p>
                                :
                                null
                        }

                    </div>
                    <ul className='accountSetList'>
                        <li onClick={() => history.push('/help')}>
                            <label>常见问题</label>
                            <span className="icon"><Icon type={require('../../../../../assets/icons/new/arrow-right.svg')} color={'#c7c7cc'} size={'xxs'} /></span>
                        </li>
                        <li>
                            <a target="_blank" href={this.state.loading ? '' : this.state.qqInfo.qqqun_url.replace(/\u0026/, "&")}>
                                <label>意见反馈</label>
                                QQ群：{this.state.qqInfo.qqqun_num}
                            </a>
                        </li>
                        <li onClick={() => history.push('/about')}>
                            <label>关于贷罗盘</label>
                            <span className="icon">v3.0.1 <Icon type={require('../../../../../assets/icons/new/arrow-right.svg')} color={'#c7c7cc'} size={'xxs'} /></span>
                        </li>
                    </ul>
                    <button type="button" className='logout' onClick={this.logout.bind(this)}>退出登录</button>
                </div>
            )
        }


    }
    logout() {
        const { that, history } = this.props;
        localStorage.clear();
        that.setState({
            ref: !that.state.ref
        });
        history.replace('/')

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
