import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import { changeTabIndexF } from '../../redux/actions/index';

import './index.scss';

import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'
import TabBar from '../../components/tabBar/tabs';
import List from './temp/index';


const listCoutAll = [
    { title: '综指', field: 'score', 'isArrow': true, isArrowWidth: '0.8', width: '1.6' },
    { title: '之家', field: 'score_wdzj', 'isArrow': false, width: '1.5' },
    { title: '天眼', field: 'score_p2peye', 'isArrow': false, width: '1.5' },
    { title: '贷罗盘', field: 'score_dlp', 'isArrow': false, width: '1.5' },
    { title: '融360', field: 'level_r360', 'isArrow': false, width: '1.5' },
    { title: '星火', field: 'level_xinghuo', 'isArrow': false, width: '1.5' },
    { title: '羿飞', field: 'score_yifei', 'isArrow': false, width: '1' }
];

const listCoutWdzj = [
    { title: '网贷之家', field: 'fzzhishu', 'isArrow': true, isArrowWidth: '0.8', width: '1.6' },
    { title: '成交', field: 'chengjiao', 'isArrow': false, width: '1.5' },
    { title: '透明度', field: 'tmdu', 'isArrow': false, width: '1.5' },
    { title: '人气', field: 'renqi', 'isArrow': false, width: '1.5' },
    { title: '杠杆', field: 'ganggan', 'isArrow': false, width: '1.5' },
    { title: '流动性', field: 'ldxing', 'isArrow': false, width: '1.5' },
    { title: '分散度', field: 'fsdu', 'isArrow': false, width: '1.2' }
];

const listCoutP2peye = [
    { title: '网贷天眼', field: 'level', field2: 'level_p2peye', 'isArrow': false, width: '1.8' },
    { title: '信披', field: 'xscore', 'isArrow': false, width: '1.5' },
    { title: '合规', field: 'hscore', 'isArrow': false, width: '1.3' },
    { title: '期限', field: 'limit_t', 'isArrow': false, width: '1.3' },
    { title: '利率', field: 'rate', 'isArrow': false, width: '1.3' },
    { title: '偿兑性', field: 'claims', 'isArrow': false, width: '1.5' },
    { title: '资金流入率', field: 'standard', 'isArrow': false, width: '1.2' },
    { title: '运营', field: 'operation', 'isArrow': false, width: '1.5' },
    { title: '地域性', field: 'regional', 'isArrow': false, width: '1.2' },
    { title: '投资', field: 'investment', 'isArrow': false, width: '1.2' },
    { title: '借款', field: 'borrowing', 'isArrow': false, width: '1.5' },
    { title: '流动性', field: 'liquidity', 'isArrow': false, width: '1.2' }
];

const listCoutDlp = [
    { title: '贷罗盘', field: 'score', 'isArrow': true, isArrowWidth: '0.8', width: '1.6' },
    { title: '资金流', field: 'inamount', 'isArrow': false, width: '1.5' },
    { title: '分散度', field: 'dispersion', 'isArrow': false, width: '1.5' },
    { title: '流动性', field: 'mobility', 'isArrow': false, width: '1.5' },
    { title: '收益率', field: 'rate_d', 'isArrow': false, width: '1.5' },
    { title: '人气', field: 'popularity', 'isArrow': false, width: '1.5' },
    { title: '体量', field: 'stayStill', 'isArrow': false, width: '1.5' },
    { title: '忠诚度', field: 'loyalty', 'isArrow': false, width: '1.5' },
    { title: '成长性', field: 'growth', 'isArrow': false, width: '1.2' }
];

const listCoutR360 = [
    { title: '融360', field: 'level', 'isArrow': false, width: '1.3' },
    { title: '人气', field: 'renqi', 'isArrow': false, width: '1.2' },
    { title: '利率', field: 'rate', 'isArrow': false, width: '1.4' }
];

const listCoutXh = [
    { title: '星火评级', field: 'level', 'isArrow': false, width: '1.6' },
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


const Pingji = createReactClass({

    getInitialState: function () {
        return {
            tabNames: [
                { title: '综合', type: 'all', columnID: 'pjAll', listCout: listCoutAll },
                { title: '之家', type: 'wdzj', columnID: 'pjWdzj', listCout: listCoutWdzj },
                { title: '天眼', type: 'p2peye', columnID: 'pjP2peye', listCout: listCoutP2peye },
                { title: '贷罗盘', type: 'dlp', columnID: 'pjDlp', listCout: listCoutDlp },
                { title: '融360', type: 'rong360', columnID: 'pjR360', listCout: listCoutR360 },
                { title: '星火', type: 'xinghuo', columnID: 'pjXinghuo', listCout: listCoutXh },
                { title: '羿飞', type: 'yifei', columnID: 'pjYifei', listCout: listCoutYifei },
            ],
            tab1: null
        }
    },
    render() {
        const { datas,history} = this.props;
        const pathname = this.props.location.pathname;
        const tabNames = this.state.tabNames;
        return (
            <div className='container' style={{ 'paddingTop': '2.2rem' }}>
                <Header title={'评级'} history={history} pathname={pathname} />
                <NumBar numText={'参与评级平台数量：' + datas + '家'} />
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

export default connect(mapStateToProps)(Pingji);