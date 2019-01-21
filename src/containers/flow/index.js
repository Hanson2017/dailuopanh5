import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';

import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'
import TabBar from '../../components/tabBar/tabs';
import List from './temp/index';


const Flow = createReactClass({

    getInitialState: function () {
        return {
            tabNames: [
                { title: '综合', type: 'all', columnID: 'flowAll', field: { name: 'score', text: '综合流量', width: '1.8rem', width2: '1rem' } },
                { title: '百度', type: 'baidu', columnID: 'flowBaidu', field: { name: 'zs_baidu', text: '百度指数', width: '1.8rem', width2: '0.8rem' } },
                { title: '好搜', type: 'haosou', columnID: 'flowHaosou', field: { name: 'zs_so', text: '好搜指数', width: '1.8rem', width2: '0.9rem' } },
                { title: '站长', type: 'zhanzhang', columnID: 'flowZhanzhang', field: { name: 'pr_zz', text: '站长工具', width: '1.6rem' } },
                { title: '爱站', type: 'aizhan', columnID: 'flowAizhan', field: { name: 'pr_az', text: '爱站权重', width: '1.6rem' } },
            ]
        }
    },
    render() {
        const { dispatch, datas, history } = this.props;
        const { tabNames } = this.state;
        return (
            <div className='ptTab'>
                <Header title={'流量监控'} history={history} />
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
    return { datas: state.totalNum.totalNum };
}

export default connect(mapStateToProps)(Flow);

