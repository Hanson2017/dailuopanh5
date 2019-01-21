import React, { Component } from 'react';
import Header from '../../../components/navbar/index';
import TabBar from '../../../components/tabBar/tabs';

import Guanzhu from './temp/guanzhu';
import Comments from './temp/comments';
import Collection from './temp/collection';
import Set from './temp/set';

import './index.scss';

const clientHeight = window.screen.height;

export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            guanzhuDel: false,
            collectionDel: false,
        };
        this.onChangeTab = this.onChangeTab.bind(this)
    }
    componentWillMount() {
        const { that } = this.props;
        var tabIndex = 0;
        if (that.props.location.state && that.props.location.state !== null) {
            tabIndex = that.props.location.state.tabId
        }

        this.setState({
            index: tabIndex,
        })
    }
    render() {
        const { that, history } = this.props;
        const { index, guanzhuDel, collectionDel } = this.state;
        return (
            <div className='ptTab accountContainer' style={{ minHeight: clientHeight }}>
                <Header title={'个人中心'} search={'null'} history={history}>
                    {
                        index == 0 ?
                            <div className="navBarOperation" onClick={() => {
                                this.setState({
                                    guanzhuDel: !guanzhuDel,
                                })
                            }}>
                                {guanzhuDel ? '完成' : '编辑'}
                            </div>
                            :
                            index == 2 ?
                                <div className="navBarOperation" onClick={() => {
                                    this.setState({
                                        collectionDel: !collectionDel,
                                    })
                                }}>
                                    {collectionDel ? '完成' : '编辑'}
                                </div>
                                :
                                null
                    }
                </Header>
                <TabBar current={index} onChangeTab={this.onChangeTab}>
                    <div name={'关注平台'}>
                        <Guanzhu history={history} guanzhuDel={guanzhuDel} />
                    </div>
                    <div name={'我的评论'}>
                        <Comments history={history} />
                    </div>
                    <div name={'收藏夹'} >
                        <Collection history={history} collectionDel={collectionDel} />
                    </div>
                    <div className='accountSetWp' name={'设置'} style={{ height: clientHeight - 1.6 * 50 }}>
                        <Set that={that} history={history} />
                    </div>
                </TabBar>
            </div>
        )
    }
    onChangeTab(index) {
        this.setState({
            index: index,
        })
    }
}