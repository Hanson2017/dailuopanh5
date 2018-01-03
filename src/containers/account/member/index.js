import React, { Component } from 'react';
import Header from '../../../components/navbar/index';
import TabBar from '../../../components/tabBar/tabs';

import Guanzhu from './temp/guanzhu/index';
import Set from './temp/set/index';

import './index.scss';

const clientHeight = window.screen.height;

export default class Member extends React.Component {
    render() {
        let tabIndex=null;
        if(this.props.location){
            tabIndex = this.props.location.state;
        }   
        return (
            <div  className='memberIndexWp'>
                <Header title={'个人中心'} search={'null'} location={this.props.location} backRouter={{state:null,pathname:'/'}} />
                <TabBar current={tabIndex?tabIndex:null}>
                    <div name={'关注平台'}>
                        <Guanzhu />
                    </div>
                    <div className='accountSetWp' name={'设置'} style={{height:clientHeight-1.72*50}}>
                        <Set />
                    </div>
                </TabBar>
            </div>
        )
    }
}