import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import { changeTabIndexF } from '../../../redux/actions/index';

import Header from '../../../components/navbar';
import NumBar from '../../../components/numBar'
import TabBar from '../../../components/tabBar/tabs';
import List from '../temp/index';
import List2 from '../temp/index2';


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
    { title: '资金流入率', field: 'standard', 'isArrow': false, width: '1.4' },
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


const PingjiJG = createReactClass({

    getInitialState: function () {
        return {
            tabNames: [
               
                { title: '之家', type: 'wdzj', columnID: 'pjWdzj', listCout: listCoutWdzj },
                { title: '天眼', type: 'p2peye', columnID: 'pjP2peye', listCout: listCoutP2peye },
                { title: '贷罗盘', type: 'dlp', columnID: 'pjDlp', listCout: listCoutDlp },
                { title: '融360', type: 'rong360', columnID: 'pjR360', listCout: listCoutR360 }
            ],
            tab1: null
        }
    },
    render() {
        const { datas, history } = this.props;
        const { tabNames } = this.state;
        return (
            <div className='ptTab'>
                <Header title={'机构评级'} history={history} />
                <TabBar>
                    <List2 name={'综合'} type={'all'} columnID={'pjAll'} history={history} field={{name:'score',text:'综指',width:'1.6rem',width2:'0.76rem'}} />
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

export default connect(mapStateToProps)(PingjiJG);