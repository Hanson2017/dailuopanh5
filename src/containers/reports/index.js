import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/navbar/index';
import TabBar from '../../components/tabBar/tabs';
import List from './list/';

import './index.scss';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: [
                { title: '汇总', type: 'zh', columnID: 'reportsZh' },
                { title: '之家', type: 'wdzj', columnID: 'reportsWdzj' },
                { title: '天眼', type: 'p2peye', columnID: 'reportsP2peye' },
                { title: '贷罗盘', type: 'dlp', columnID: 'reportsDlp' },
                { title: '融360', type: 'rong360', columnID: 'reportsR360' },
                { title: '其他', type: 'qita', columnID: 'reportsOther' }
            ]
        };
    }
    render() {
        const {history} = this.props;
        const tabNames = this.state.tabNames;
        return (
            <div className='ptTab'>
                <Header title={'数据报表'} history={history} />
                <TabBar>
                    {
                        tabNames.map((tab, i) => {
                            return (
                                <List key={i} name={tab.title} type={tab.type} columnID={tab.columnID} history={history} />
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}


