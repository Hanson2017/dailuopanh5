import React, { Component } from 'react';
import Api from '../../utils/api';
import Loading from '../../components/loading';
import NavBar from '../../components/navbar';
import TabTop from '../../components/tabTop';
import List from './list';
import Mianze from '../mianze';


var data = [
    { title: '机构评级', iconName: 'nav-pingjiJG', iconSize: 'lg', routerName: '/pingji/jigou', tabId: null },
  
    { title: '健康度分析', iconName: 'nav-health', iconSize: 'lg', routerName: '/health', tabId: null },
    { title: '流量监控', iconName: 'nav-flow', iconSize: 'lg', routerName: '/flow', tabId: null },
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
                <NavBar history={history} title={'排行详情'} onOpenChange={onOpenChange} />
                {
                    isFetching ?
                        <Loading />
                        :
                        <div className="">
                            <TabTop data={data} />
                            <List title={'机构评级概况'} routerName={'/pingji/jigou'} data={dataSource.gradelist} field={{name:'score',text:'综合指数',width:'1.8rem',width2:'0.76rem'}} history={history} />
                            <List title={'健康度分析'} routerName={'/health'} data={dataSource.dlplist} field={{name:'score',text:'健康度综指',width:'1.8rem',width2:'1rem'}}  history={history} />
                            <List title={'流量监控'} routerName={'/flow'} data={dataSource.flowlist} field={{name:'score',text:'综合流量指数',width:'1.8rem',width2:'1rem'}}  history={history} />
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
        const url = Api.gradeHome
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