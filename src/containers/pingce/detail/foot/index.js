import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Modal, Toast } from 'antd-mobile';
import Api from '../../../../utils/api';
const alertShow = Modal.alert;

export default class PingceDetailFoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollection: false,
            disabled: false,
        }
    }
    render() {
        const { isCollection } = this.state;
        const { commentcount, history, cid } = this.props;
        return (
            <div className="foot">
                <button className="inputBtn" onClick={() => {
                   this.onPressComment()
                }}>
                    我也要发表评论
                </button>
                <button className="btn reviewsBtn" onClick={() => {
                    history.push('/pingceComment/' + cid)
                }}>
                    <Icon type={commentcount !== 0 ? require('../../../../assets/icons/new/ico-reviewsNo.svg') : require('../../../../assets/icons/new/ico-reviews.svg')} size={'sm'} color={'#737373'} />
                    {
                        commentcount !== 0 ?
                            <span className="num">{commentcount}</span>
                            :
                            null
                    }
                </button>
                <button className="btn reviewsBtn" onClick={() => {
                    this.onPressCollection()
                }}>
                    <Icon type={isCollection ? require('../../../../assets/icons/new/ico-collectionAl.svg') : require('../../../../assets/icons/new/ico-collection.svg')} size={'md'} color={isCollection ? '#FFA500' : '#737373'} />
                </button>
            </div>
        )
    }
    componentDidMount() {
        if (localStorage.loginState) {
            this.isCollection()
        }
    }
    //是否已收藏
    isCollection() {
        const that = this;
        const { cid } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.isCollection + '?cid=' + cid + '&memberid=' + memberid;

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    if (json.data == 1) {
                        that.setState({
                            isCollection: true,
                        })
                    }
                    else {
                        that.setState({
                            isCollection: false,
                        })
                    }

                }
            });
    }

    //点击评论    
    onPressComment() {

        const { cid, history } = this.props;

        if (localStorage.loginState) {
            history.push('/pingCeCommentsForm', { cid: cid })
        }
        else {
            alertShow('提示', '请先登录后评论', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => this.goLogin() },
            ])
        }
    }

    //点击收藏操作    
    onPressCollection() {
        if (localStorage.loginState) {
            if (this.state.isCollection) {

                alertShow('提示', '是否取消收藏', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => { this.collectionDel(); } },
                ])
            }
            else {
                this.collectionAdd()
            }
        }
        else {
            alertShow('提示', '请先登录后收藏！', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => this.goLogin() },
            ])
        }
    }

    // 跳转登陆
    goLogin() {
        const { history } = this.props;
        history.push('/member')
    }

    // 添加收藏
    collectionAdd() {
        const that = this;
        const { cid } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.collectionAdd + '?cid=' + cid + '&memberid=' + memberid;

        this.setState({
            disabled: true
        })

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
                        isCollection: true,
                        disabled: false
                    })
                    Toast.success('已收藏', 2);
                    console.log('已收藏')
                }
            });

    }
    // 取消关注
    collectionDel() {
        const that = this;
        const { cid } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.collectiondel + '?cid=' + cid + '&memberid=' + memberid;

        this.setState({
            disabled: true
        })

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
                        isCollection: false,
                        disabled: false
                    })
                    Toast.success('取消收藏', 2);
                    console.log('取消收藏')
                }
            });
    }
}