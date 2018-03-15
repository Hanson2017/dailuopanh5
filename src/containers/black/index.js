import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import TabBar from '../../components/tabBar/tabs';

import List from './list/'
import ListTab from './listTab/'

const width = document.body.clientWidth;

const Black = createReactClass({
    render() {
        const { datas, history } = this.props;
        const pathname = this.props.location.pathname;
        return (
            <div className='container' style={{ 'paddingTop': '2.2rem' }}>
                <Header title={'黑名单'} history={history} pathname={pathname} />
                <NumBar numText={'黑名单统计平台数量：' + datas + '家'} />
                <TabBar>
                    <List name={'列表'} column={'black'} columnID={'blackList'} ctype={'black'} history={history} />
                    <ListTab name={'按省份'} type={'shengfen'} columnID={'blackShengfen'} tabWidth={(width - 0.2 * 50 * 8) / (50 * 6)} history={history} />
                    <ListTab name={'按首字母'} type={'zimu'} columnID={'blackZimu'} tabWidth={(width - 0.2 * 50 * 8) / (50 * 6)} history={history} />
                    <ListTab name={'按出事时间'} type={'shijian'} columnID={'blackShijian'} tabWidth={(width - 0.2 * 50 * 5.5) / (50 * 4)} titleText={'年'} history={history} />
                </TabBar>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return { datas: state.totalNum.totalNum };
}

export default connect(mapStateToProps)(Black);

