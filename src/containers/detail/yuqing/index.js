import React, { Component } from 'react';
import TabBar from '../../../components/tabBar2/tabs';
import All from './all';
import Pingce from './pingce';
import Yulun from './yulun';
import Comment from './comment';

import './index.scss';

export default class DetailYuqing extends React.Component {
    render() {
        const { id, history } = this.props;
        return (
            <div className="detailYuqingContainer">
                <TabBar>
                    <div name={'全部'}>
                        <All id={id} history={history} />
                    </div>
                    <div name={'评测监控'}>
                        <Pingce id={id} />
                    </div>
                    <div name={'舆论监控'}>
                        <Yulun id={id} />
                    </div>
                    <div name={'点评监控'}>
                        <Comment id={id} history={history} />
                    </div>
                </TabBar>
            </div>
        )
    }
}

