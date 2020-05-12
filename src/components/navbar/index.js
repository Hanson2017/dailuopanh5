import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import './index.scss';

export default class NavBar extends React.Component {
    render() {
        const { history, onOpenChange, back, title, black } = this.props;
        let loginState;
        if (localStorage.loginState) {
            loginState = JSON.parse(localStorage.loginState);
        }
        const pathname = history.location.pathname
        return (
            <div className={black ? 'navbar navbarBlack' : 'navbar'}>
                <div className="navbar-left" onClick={() => {
                    if (pathname == '/' || pathname == '/tabPingji' || pathname == '/tabData' || pathname == '/tabYulun' || pathname == '/tabFind') {
                        onOpenChange()
                    }
                    else {
                        history.goBack()
                    }

                }}
                >
                    {
                        pathname == '/' || pathname == '/tabPingji' || pathname == '/tabData' || pathname == '/tabYulun' || pathname == '/tabFind' ?
                            localStorage.loginState ?
                                <img src={loginState.r_avatar_img} className='portraitSmart' />
                                :
                                <img src={require('../../assets/images/portrait2.png')} className='portraitSmart' />
                            :
                            back && back === 'null' ?
                                null
                                :
                                <Icon type={require('../../assets/icons/new/arrow-left.svg')} color={'#fff'} />

                    }
                </div>
                <div className="navbar-title">
                    {
                        pathname == '/' ?
                            <img src={require('../../assets/images/logo.png')} className='logo' />
                            :
                            <span>{title}</span>
                    }
                </div>
                {
                    this.props.children ?
                        null
                        :
                        <div className="navbar-right" onClick={() => {
                            if (!this.props.search) {
                                history.push('/search')
                            }

                        }}>
                            {
                                this.props.search && this.props.search == 'null' ?
                                    null
                                    :
                                    <Icon type={require('../../assets/icons/new/ico-search.svg')} size={'sm'} color={'#fff'} />
                            }

                        </div>
                }

                {
                    this.props.children ?
                        this.props.children
                        :
                        null
                }
            </div>
        )
    }
}
