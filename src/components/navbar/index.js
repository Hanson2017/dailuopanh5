import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import './index.scss';

export default class NavBar extends React.Component {
    render() {
        const { history, pathname } = this.props;
        let loginState;
        if (localStorage.loginState) {
            loginState = JSON.parse(localStorage.loginState);
        }
        return (
            <div className='navbar'>
                <div className="navbar-left" onClick={() => {
                    if (pathname == '/') {
                        this.props.onOpenChange()
                    }
                    else {
                        if (history.action !== 'POP') {
                            history.goBack()
                        }
                        else {
                            history.replace('/')
                        }
                    }

                }}
                >
                    {
                        pathname == '/' ?
                            localStorage.loginState ?
                                <img src={loginState.r_avatar_img} className='portraitSmart' />
                                :
                                <img src={require('../../assets/images/portrait2.png')} className='portraitSmart' />
                            :
                            this.props.back && this.props.back === 'null' ?
                                null
                                :
                                <Icon type={require('../../assets/icons/left.svg')} color={'#fff'} />

                    }
                </div>
                <div className="navbar-title">
                    {
                        pathname == '/' ?
                            <img src={require('../../assets/images/logoico.png')} className='logo' />
                            :
                            <span> {this.props.title}</span>
                    }
                </div>
                <div className="navbar-right" onClick={() => {
                    if (!this.props.search) {
                        history.push('/search')
                    }

                }}>
                    {
                        this.props.search && this.props.search == 'null' ?
                            null
                            :
                            <Icon type={require('../../assets/icons/search.svg')} size={'sm'} color={'#fff'} />
                    }

                </div>
            </div>
        )
    }
}
