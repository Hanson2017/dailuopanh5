import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import { changeTabIndexF } from '../../../redux/actions/index';

import Header from '../../../components/navbar';
import NumBar from '../../../components/numBar'
import TabBar from '../../../components/tabBar/tabs';
import List from '../temp/index';

const listCoutXh = [
    { title: '星火评级', field: 'level', 'isArrow': false, width: '1.6' },
];

const listCoutYuanwang = [
    { title: '远望评级', field: 'level', 'isArrow': false, width: '1.6' }
];

const listCoutYifei = [
    { title: '羿飞评级', field: 'score', 'isArrow': true, isArrowWidth: '0.5', width: '1.6' },
    { title: '星级', field: 'star_level', 'isArrow': false, width: '1.5' },
    { title: '利率', field: 'rate', 'isArrow': false, width: '1.5' },
    { title: '成交', field: 'amount', 'isArrow': false, width: '1.5' },
    { title: '品牌', field: 'brand', 'isArrow': false, width: '1.5' },
    { title: '周期', field: 'period', 'isArrow': false, width: '1.5' },
    { title: '风控', field: 'security_level', 'isArrow': false, width: '1.2' },
    { title: '投资人', field: 'invest', 'isArrow': false, width: '1.5' },
    { title: '均投', field: 'avg_invest', 'isArrow': false, width: '1.5' },
    { title: '借款人', field: 'loan', 'isArrow': false, width: '1.5' },
    { title: '均借', field: 'avg_loan', 'isArrow': false, width: '1.5' },
    { title: '服务', field: 'service_level', 'isArrow': false, width: '1.2' },
    { title: '成交增长', field: 'increase', 'isArrow': false, width: '1.5' }
];


const PingjiMT = createReactClass({

    getInitialState: function () {
        return {
            tabNames: [
                { title: '羿飞评级', type: 'yifei', columnID: 'pjYifei', listCout: listCoutYifei },
                { title: '远望评级', type: 'yuanwang', columnID: 'pjYuanwang', listCout: listCoutYuanwang }
            ],
            tab1: null
        }
    },
    render() {
        const { datas, history } = this.props;
        const { tabNames } = this.state;
        return (
            <div className='ptTab'>
                <Header title={'媒体评级'} history={history} />
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
    },
    getUrl(tab) {
        const { dispatch } = this.props;
        dispatch(changeTabIndexF({ tab1: tab }))
    },
})

function mapStateToProps(state) {
    return {
        datas: state.totalNum.totalNum
    };
}

export default connect(mapStateToProps)(PingjiMT);