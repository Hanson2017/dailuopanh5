import React, { Component } from 'react';
import { Icon, Modal, Toast } from 'antd-mobile';
import Api from '../../../utils/api';
import Menu from './menu';
const alertShow = Modal.alert;

export default class DetailFoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGuanzhu: false,
            isHiddenMenu: true,
        }
    }
    render() {
        const { } = this.props;
        const { isGuanzhu, isHiddenMenu } = this.state;
        return (
            <div className>
                <div className="detailFootContainer">
                    <ul className="list">
                        <li onClick={() => {
                            this.onPressGuanzhu()
                        }}>
                            <Icon type={require('../../../assets/icons/new/ico-collectionAl.svg')} color={isGuanzhu ? '#FFA500' : '#666'} size={'sm'} />
                            <span className="text">{isGuanzhu ? '取消关注' : '加关注'}</span>
                        </li>
                        <li onClick={() => {
                            this.setState({
                                isHiddenMenu: !this.state.isHiddenMenu,
                            })
                        }}>
                            <Icon type={require('../../../assets/icons/new/icon-menu.svg')} color={'#666'} size={'xs'} />
                            <span className="text">快捷菜单</span>
                        </li>
                    </ul>
                    {
                        isHiddenMenu ?
                            null
                            :
                            <Menu />
                    }


                </div>
                {
                    isHiddenMenu ?
                        null
                        :
                        <div className="mask" onClick={() => {
                            this.setState({
                                isHiddenMenu: true,
                            })
                        }}></div>
                }

            </div>
        )
    }
    componentDidMount() {

        if (localStorage.loginState) {
            this.isAttention()
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    onPressGuanzhu() {
        const { history } = this.props;
        if (localStorage.loginState) {
            if (this.state.isGuanzhu) {
                alertShow('提示', '你确定要取消关注该平台吗', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => { this.attentionDel(); } },
                ])
            }
            else {
                this.attentionAdd()
            }
        }
        else {
            alertShow('提示', '请先登录后关注！', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => history.push('/member') },
            ])
        }
    }

    //是否关注了该平台
    isAttention() {
        const that = this;
        const { id } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.isAttention + '?id_dlp=' + id + '&memberid=' + memberid;
        that._isMounted = true

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    if (that._isMounted) {
                        if (json.data == 1) {
                            that.setState({
                                isGuanzhu: true,
                            })
                        }
                        else {
                            that.setState({
                                isGuanzhu: false,
                            })
                        }
                    }

                }
            });
    }

    // 添加关注
    attentionAdd() {
        const that = this;
        const { id } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionAdd + '?id_dlp=' + id + '&memberid=' + memberid;
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
                        isGuanzhu: true,
                    })
                    that.successToast()
                    console.log('添加关注成功')
                }
            });


    }
    // 取消关注
    attentionDel() {
        const that = this;
        const { id } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;

        const url = Api.attentionDel + '?id_dlp=' + id + '&memberid=' + memberid;

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
                        isGuanzhu: false,
                    })
                    that.failToast()
                    console.log('取消关注成功')
                }
            });
    }
    successToast() {
        Toast.success('关注成功', 2);
    }
    failToast() {
        Toast.success('取消关注成功', 2);
    }
}
