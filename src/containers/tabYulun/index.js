import React, { Component } from 'react';
import Api from '../../utils/api';
import Loading from '../../components/loading';
import NavBar from '../../components/navbar';
import TabTop from '../../components/tabTop';
import Pingce from './pingce';
import Yulun from './yulun';
import Comment from './comment';
import BBS from './bbs';
import Mianze from '../mianze';
import './index.scss';

var data = [
    { title: '贷罗盘论坛', iconName: 'nav-people', iconSize: 'lg', routerName: '/pingce', tabId: null },
    { title: '评测监控', iconName: 'nav-pingce', iconSize: 'lg', routerName: '/pingce', tabId: 1 },
    { title: '舆论监控', iconName: 'nav-yulun', iconSize: 'lg', routerName: '/yulun', tabId: null },
    { title: '平台点评', iconName: 'nav-dianping', iconSize: 'lg', routerName: '/comment', tabId: null },
];


export default class TabYulun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dataSource: '',
            bbsHejList: [],
            bbsBgtList: [],
        }
    }
    render() {
        const { history, onOpenChange } = this.props;
        const { isFetching, dataSource, bbsHejList, bbsBgtList } = this.state;
        return (
            <div className="ptTabBar">
                <NavBar history={history} title={'网贷行业舆情'} onOpenChange={onOpenChange} />
                {
                    isFetching ?
                        <Loading />
                        :
                        <div className="tabYulunContainer">
                            <TabTop data={data} />
                            <BBS data={{ bbsHejList: bbsHejList, bbsBgtList: bbsBgtList }} />
                            <Pingce data={dataSource.mplist} />
                            <Yulun data={dataSource.sentlist} />
                            <Comment data={dataSource.commentlist} />
                            <Mianze />
                        </div>
                }

            </div>
        )
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        const that = this;
        const url = Api.sentHome;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {

                if (json.result == 1) {

                    that.setState({
                        dataSource: json.data
                    })
                    that.getDataBBs();
                }

            });
    }
    getDataBBs() {
        const that = this;
        const url = Api.bbs + 'gettype=yqhome&getnum=5';
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {

                that.setState({
                    isFetching: false,
                    bbsHejList: json.forum1list,
                    bbsBgtList: json.forum2list,
                })

            });
    }
}