import React, { Component } from 'react';
import Header from '../../../components/navbar/index';
import TabBar from '../../../components/tabBar/tabs';

import Guanzhu from './temp/guanzhu/index';
import Set from './temp/set/index';

import './index.scss';

const clientHeight = window.screen.height;

export default class Member extends React.Component {
    render() {
        var tabIndex = null;
        const { that } = this.props;
        if(that.props.location.state && that.props.location.state !== null){
            tabIndex=that.props.location.state.tabId
        }
        return (
            <div className='memberIndexWp'>
                <Header title={'个人中心'} search={'null'} back={'null'} history={that.props.history} pathname={that.props.location.pathname} />
                <TabBar current={tabIndex ? tabIndex : null}>
                    <div name={'关注平台'}>
                        <Guanzhu />
                    </div>
                    <div className='accountSetWp' name={'设置'} style={{ height: clientHeight - 1.72 * 50 }}>
                        <Set that={that} />
                    </div>
                </TabBar>
            </div>
        )
    }
}