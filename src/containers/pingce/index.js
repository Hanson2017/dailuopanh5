import React, { Component } from 'react';
import Util from '../../utils/util';
import Header from '../../components/navbar/index';
import TabBar from '../../components/tabBar/tabs';
import UpDateTime from '../../components/topUpdate';
import List from './list';
import './index.scss';

export default class Pingce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: [
                { title: '热门评测', columnID: 'pingceListHot' },
                { title: '全部评测', columnID: 'pingceList' },
            ],
            updatetime: Util.setDate(new Date())
        }
    }
    render() {
        const { datas, history } = this.props;
        const { tabNames, updatetime } = this.state;
        const tabIndex = this.props.location.state;
        return (
            <div className="pingceListContainer ptTab3">
                <Header title={'评测监控'} history={history} />
                <UpDateTime updatetime={updatetime} />
                <TabBar current={tabIndex ? tabIndex.tabId : null}>
                    {
                        tabNames.map((tab, i) => {
                            return (
                                <List key={i} name={tab.title} columnID={tab.columnID} history={history} />
                            )
                        })
                    }

                </TabBar>
            </div>
        )
    }
}

