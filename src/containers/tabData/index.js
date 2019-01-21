import React, { Component } from 'react';
import Api from '../../utils/api';
import Loading from '../../components/loading';
import NavBar from '../../components/navbar';
import TabTop from '../../components/tabTop';
import Data from './data';
import Query from './query';
import Report from './report';
import Mianze from '../mianze';
import './index.scss';

var data = [
    { title: '数据详情', iconName: 'nav-data', iconSize: 'lg', routerName: '/data', tabId: null },
    { title: '多维度查询', iconName: 'nav-query', iconSize: 'lg', routerName: '/query', tabId: null },
    { title: '数据报表', iconName: 'nav-report', iconSize: 'lg', routerName: '/reports' },
    { title: '争议名单', iconName: 'nav-zhengyi', iconSize: 'lg', routerName: '/zhengyi' },
    { title: '黑名单', iconName: 'nav-black', iconSize: 'lg', routerName: '/black' },
];

export default class TabPingji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dataSource: '',
        }
    }
    render() {
        const { history, onOpenChange } = this.props;
        const { isFetching, dataSource } = this.state;
        return (
            <div className="ptTabBar">
                <NavBar history={history} title={'行业数据'} onOpenChange={onOpenChange} />
                {
                    isFetching ?
                        <Loading />
                        :
                        <div className="tabDataContainer">
                            <TabTop data={data} />
                            <Data data={dataSource.datalist} />
                            <Query />
                            <Report data={dataSource.reportslist} />
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
        const url = Api.dataHome
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
                        isFetching: false,
                        dataSource: json.data
                    })
                }

            });
    }
}