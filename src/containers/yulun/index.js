import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import UpDateTime from '../../components/topUpdate';
import LoadMore from '../../components/loadMore';
import Item from './item';

import Api from '../../utils/api';
import Util from '../../utils/util';
import { fetchPosts } from '../../redux/actions/index';

import { pieYulun } from '../../echart/pie';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


import './index.scss';

class PieEchart extends React.Component {
    render() {
        return (
            <div className='pieEchart' id='pieEchartYulun'></div>
        )
    }
    componentDidMount() {

        var dataList = this.props.data;
        var echartsData = [];
        for (var i = 0; i < dataList.length; i++) {
            echartsData.push({ value: dataList[i].date_snum, name: dataList[i].platname })
        }
        const pieEchartYulun = document.getElementById('pieEchartYulun')
        echarts.init(pieEchartYulun).setOption(pieYulun(echartsData));
    }
}

class Yulun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatetime: Util.setDate(new Date())
        }
    }
    render() {
        const { datas, history } = this.props;
        const {updatetime}=this.state;
        return (
            <div className="yulunContainer">
                <Header title={'舆论监控'} history={history} />
                <UpDateTime updatetime={updatetime} /> 
                    {
                        datas.isFetching ?
                            <Loading />
                            :
                            <div className="content">            
                                <div className="top">                     
                                    <PieEchart data={datas.dataView.viewlist} />
                                    <div className="echartsTitle">过去48小时舆论热点分布</div>
                                    <div className='numCon'>
                                        <span>舆论总条数：<i className="num">{datas.dataView.viewinfo.all_num}</i></span>
                                        <span>昨日条数：<i className="num">{datas.dataView.viewinfo.date_num}</i></span>
                                    </div>
                                </div>
                                <ul className='list'>
                                    {

                                        datas.items.map((item, i) => {
                                            return (
                                                <Item data={item} key={i} />
                                            )
                                        })
                                    }
                                   
                                </ul>
                                <LoadMore onClick={this.loadMore.bind(this)} data={datas} />
                            </div>
                    }

            </div>
        )
    }
    componentDidMount() {
        const url = Api.yulun + '?pagesize=50&page=' + 1;
        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('yulunList', url, 1, 'dataList'))
    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const url = Api.yulun + '?pagesize=50&page=' + datas.page;

        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('yulunList', url, 2, 'dataList'))
        }
    }
}

function mapStateToProps(state) {
    return { datas: state.yulunList };
}

export default connect(mapStateToProps)(Yulun);