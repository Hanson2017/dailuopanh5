import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';

import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'
import TabBar from '../../components/tabBar/tabs';

import List from './temp/index';

const width = document.body.clientWidth;

const listCoutAll = [
    { title: '健康度指数', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '0.8', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutZijin = [
    { title: '资金流', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '1', width: (width - 3.48 * 50) / 100, percent: true }
];


const listCoutFensan = [
    { title: '分散度', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '1', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutLiudong = [
    { title: '流动性', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '1', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutShouyi = [
    { title: '收益率', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '0.9', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutRenqi = [
    { title: '人气', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '0.9', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutTiliang = [
    { title: '体量', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '0.9', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutZhongcheng = [
    { title: '忠诚度', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '1', width: (width - 3.48 * 50) / 100, percent: true }
];

const listCoutChengzhang = [
    { title: '成长性', field: 'score', 'isArrow': false, width: (width - 3.48 * 50) / 100 },
    { title: '变化幅度', field: 'changnum', 'isArrow': true, isArrowWidth: '1', width: (width - 3.48 * 50) / 100, percent: true }
];


const Health = createReactClass({

    getInitialState: function () {
        return {
            tabNames: [
                { title: '综指', type: 'all', columnID: 'healthAll', listCout: listCoutAll },
                { title: '资金', type: 'zijin', columnID: 'healthZijin', listCout: listCoutZijin },
                { title: '分散', type: 'fensan', columnID: 'healthFensan', listCout: listCoutFensan },
                { title: '流动', type: 'liudong', columnID: 'healthLiudong', listCout: listCoutLiudong },
                { title: '收益', type: 'shouyi', columnID: 'healthShouyi', listCout: listCoutShouyi },
                { title: '人气', type: 'renqi', columnID: 'healthRenqi', listCout: listCoutRenqi },
                { title: '体量', type: 'tiliang', columnID: 'healthTiliang', listCout: listCoutTiliang },
                { title: '忠诚', type: 'zhongcheng', columnID: 'healthZhongcheng', listCout: listCoutZhongcheng },
                { title: '成长', type: 'chengzhang', columnID: 'healthChengzhang', listCout: listCoutChengzhang },
            ]
        }
    },
    render() {
        const { datas, history } = this.props;
        const pathname = this.props.location.pathname;
        const tabNames = this.state.tabNames;
        return (
            <div className='container' style={{ 'paddingTop': '2.2rem' }}>
                <Header title={'健康度'} history={history} pathname={pathname} />
                <NumBar numText={'健康度统计平台数量：' + datas + '家'} />
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
    return {
        datas: state.totalNum.totalNum
    };
}

export default connect(mapStateToProps)(Health);

