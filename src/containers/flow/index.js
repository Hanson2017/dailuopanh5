import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';

import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'
import TabBar from '../../components/tabBar/tabs';
import List from './temp/index';

const width = document.body.clientWidth;

const listCoutAll = [
    { title: '流量', field: 'score', 'isArrow': true, isArrowWidth: '1.1', width: '1.8' },
    { title: '百度指数', field: 'zs_baidu', 'isArrow': false, width: '1.6' },
    { title: '好搜指数', field: 'zs_so', 'isArrow': false, width: '1.6' },
    { title: '站长工具', field: 'pr_zz', 'isArrow': false, width: '1.6' },
    { title: '爱站指数', field: 'pr_az', 'isArrow': false, width: '1.6' },
    { title: '76676指数', field: 'zs_76676', 'isArrow': false, width: '1.8' },
];

const listCoutBaidu = [
    { title: '百度指数', field: 'zs_baidu', 'isArrow': true, isArrowWidth: '0.8', width: (width - 3.48 * 50) / 50 },
];

const listCoutHaosou = [
    { title: '好搜指数', field: 'zs_so', 'isArrow': true, isArrowWidth: '0.8', width: (width - 3.48 * 50) / 50 },
];

const listCoutZhanzhang = [
    { title: '站长工具', field: 'pr_zz', 'isArrow': false, width: (width - 3.48 * 50) / 50 },
];

const listCoutAizhan = [
    { title: '爱站权重', field: 'pr_az', 'isArrow': false, width: (width - 3.48 * 50) / 50 },
];

const listCout76676 = [
    { title: '76676指数', field: 'zs_76676', 'isArrow': true, isArrowWidth: '0.95', width: (width - 3.48 * 50) / 50 },
];

const Flow = createReactClass({

    getInitialState: function () {
        return {
            tabNames: [
                { title: '综合', type: 'all', columnID: 'flowAll', listCout: listCoutAll },
                { title: '百度', type: 'baidu', columnID: 'flowBaidu', listCout: listCoutBaidu },
                { title: '好搜', type: 'haosou', columnID: 'flowHaosou', listCout: listCoutHaosou },
                { title: '站长', type: 'zhanzhang', columnID: 'flowZhanzhang', listCout: listCoutZhanzhang },
                { title: '爱站', type: 'aizhan', columnID: 'flowAizhan', listCout: listCoutAizhan },
                { title: '76676', type: '76676', columnID: 'flow76676', listCout: listCout76676 }
            ]
        }
    },
    render() {
        const { dispatch, datas, history } = this.props;
        const pathname = this.props.location.pathname;
        const tabNames = this.state.tabNames;
        return (
            <div className='container' style={{ 'paddingTop': '2.2rem' }}>
                <Header title={'流量'} history={history} pathname={pathname} />
                <NumBar numText={'流量统计平台数量：' + datas + '家'} />
                <TabBar>
                    {
                        tabNames.map((tab, i) => {
                            return (
                                <List key={i} name={tab.title} type={tab.type} columnID={tab.columnID} listCout={tab.listCout} history={history} />
                            )
                        })
                    }

                </TabBar>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return { datas: state.totalNum.totalNum };
}

export default connect(mapStateToProps)(Flow);

