import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import TabBar from '../../components/tabBar/tabs';

import List from './list/'
import ListTab from './listTab/'

import './index.scss';

const width = document.body.clientWidth;

const Black = createReactClass({
    render() {
        const { totalNum, updatetime, history } = this.props;
        return (
            <div className='blackContainer'>
                <Header title={'黑名单'} history={history} black={true} />
                <div className="update">
                    更新时间：{updatetime}<i>|</i>共{totalNum}家黑名单平台
                </div>
                <TabBar black={true}>
                    <List name={'列表'} column={'black'} columnID={'blackList'} ctype={'black'} history={history} />
                    <ListTab name={'按地区'} type={'shengfen'} columnID={'blackShengfen'} tabWidth={(width - 0.2 * 50 * 8) / (50 * 6)} history={history} />
                    <ListTab name={'按首字母'} type={'zimu'} columnID={'blackZimu'} tabWidth={(width - 0.2 * 50 * 8) / (50 * 6)} history={history} />
                    <ListTab name={'按出事时间'} type={'shijian'} columnID={'blackShijian'} tabWidth={(width - 0.2 * 50 * 5.5) / (50 * 4)} titleText={'年'} history={history} />
                </TabBar>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        totalNum: state.blackList.totalNum,
        updatetime: state.blackList.updatetime
    };
}

export default connect(mapStateToProps)(Black);

