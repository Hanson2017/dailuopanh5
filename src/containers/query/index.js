import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';

import Header from '../../components/navbar/index';
import TabBar from '../../components/tabBar/tabs';
import NumBar from '../../components/numBar/index'
import UpDateTime from '../../components/upDateTime/index';

import Rongzi from './rongzi/'
import Yewu from './yewu/'
import ListTab from './listTab/'

import './index.scss';

const width = document.body.clientWidth;

const Query = createReactClass({
    render() {
        const { num, text, updatetime, history } = this.props;
        const pathname = this.props.location.pathname;
        const tabIndex = this.props.location.state;
        return (
            <div className='container containerQuery' style={{ 'paddingTop': '2.2rem' }}>
                <Header title={'多维度查询'} history={history} pathname={pathname} />
                <NumBar numText={'多维度统计平台数量：' + num + '家'} />
                <UpDateTime updatetime={updatetime} />
                <TabBar current={tabIndex.tab1}>
                    <Rongzi name={'融资背景'} tabIndex={tabIndex.column == 'rongzi' ? tabIndex.tab2 : null} history={history} />
                    <Yewu name={'业务类型'} tabIndex={tabIndex.column == 'yewu' ? tabIndex.tab2 : null} history={history} />
                    <ListTab name={'地区'} type={'diqu'} columnID={'queryDiqu'} tabWidth={(width - 0.2 * 50 * 8) / (50 * 6)} history={history} />
                    <ListTab name={'上线时间'} type={'shangxian'} columnID={'queryShangxian'} tabWidth={(width - 0.2 * 50 * 5.5) / (50 * 4)} titleText={'年'} history={history} />
                    <ListTab name={'银行存管'} type={'cunguan'} columnID={'queryCunguan'} tabWidth={(width - 0.2 * 50 * 4.5) / (50 * 3)} history={history} />
                </TabBar>
            </div>
        )
    },
})

function mapStateToProps(state) {
    return {
        num: state.totalNum.totalNum,
        text: state.totalNum.text,
        updatetime: state.queryFengtou.updatetime
    };
}

export default connect(mapStateToProps)(Query);