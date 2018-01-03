import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import { Icon } from 'antd-mobile';
import './index.scss';

var Navbar = createReactClass({
    mixins: [History],
    render: function () {
        let loginState;
        if (localStorage.loginState) {
            loginState = JSON.parse(localStorage.loginState);
        }
        return (
            <div className='navbar'>
                <div className="navbar-left" onClick={() => {
                    if (this.props.componentPage && this.props.componentPage == 'home') {
                        this.props.onOpenChange()
                    }
                    else {
                        if (this.props.backRouter) {
                            const backRouter=this.props.backRouter;
                            this.history.replaceState(backRouter.state, backRouter.pathname)
                        }
                        else{
                            this.history.goBack()
                        }
                    }

                }}
                >
                    {
                        this.props.componentPage && this.props.componentPage == 'home' ?
                            localStorage.loginState ?
                                <img src={loginState.r_avatar_img} className='portraitSmart' />
                                :
                                <img src={require('../../assets/images/portrait2.png')} className='portraitSmart' />
                            :
                            this.props.location ?
                                <Icon type={require('../../assets/icons/left.svg')} color={'#fff'} />
                                :
                                null

                    }
                </div>
                <div className="navbar-title">
                    {
                        this.props.componentPage && this.props.componentPage == 'home' ?
                            <img src={require('../../assets/images/logoico.png')} className='logo' />
                            :
                            <span> {this.props.title}</span>
                    }
                </div>
                <div className="navbar-right" onClick={() => {
                    if (!this.props.search) {
                        this.history.pushState(null, '/search')
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
})


export default Navbar;