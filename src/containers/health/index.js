import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';

import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'
import TabBar from '../../components/tabBar/tabs';

import List from './temp/index';


const Health = createReactClass({
    getInitialState: function () {
        return {
            tabNames: [
                { title: '综指', type: 'all', columnID: 'healthAll', field: { name: 'score', text: '健康度综指', width: '1.8rem', changnum: true } },
                { title: '资金', type: 'zijin', columnID: 'healthZijin', field: { name: 'score', text: '资金流', width: '1.8rem', changnum: true } },
                { title: '分散', type: 'fensan', columnID: 'healthFensan', field: { name: 'score', text: '分散度', width: '1.8rem', changnum: true } },
                { title: '流动', type: 'liudong', columnID: 'healthLiudong', field: { name: 'score', text: '流动性', width: '1.8rem', changnum: true } },
                { title: '收益', type: 'shouyi', columnID: 'healthShouyi', field: { name: 'score', text: '收益率', width: '1.8rem', changnum: true } },
                { title: '人气', type: 'renqi', columnID: 'healthRenqi', field: { name: 'score', text: '人气', width: '1.8rem', changnum: true } },
                { title: '体量', type: 'tiliang', columnID: 'healthTiliang', field: { name: 'score', text: '体量', width: '1.8rem', changnum: true } },
                { title: '忠诚', type: 'zhongcheng', columnID: 'healthZhongcheng', field: { name: 'score', text: '忠诚度', width: '1.8rem', changnum: true } },
                { title: '成长', type: 'chengzhang', columnID: 'healthChengzhang', field: { name: 'score', text: '成长性', width: '1.8rem', changnum: true } },
            ]
        }
    },
    render() {
        const { datas, history } = this.props;
        const { tabNames } = this.state;
        return (
            <div className='ptTab'>
                <Header title={'健康度分析'} history={history} />
                <TabBar>
                    {
                        tabNames.map((tab, i) => {
                            return (
                                <List key={i} name={tab.title} type={tab.type} columnID={tab.columnID} field={tab.field} history={history} />
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

