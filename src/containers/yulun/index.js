import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import UpDateTime from '../../components/upDateTime';
import LoadMore from '../../components/loadMore';

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

    render() {
        const { datas } = this.props;
        var totalNum = 0;
        if (!datas.isFetching) {
            totalNum = datas.dataView.plat_count;
        }

        return (
            <div style={this.props.location?null:{marginBottom:'1rem'}}>
                <Header title={'舆论监控'} location={this.props.location} />
                <NumBar numText={'舆论监控平台数量：' + totalNum + '家'} />
                <div className='noTabContainer'>
                    <UpDateTime updatetime={Util.setDate(new Date())} />
                    {
                        datas.isFetching ?
                            <Loading />
                            :
                            <div>
                                <PieEchart data={datas.dataView.viewlist} />
                                <div className='yulunNum'>
                                    <span className='total'>舆论总条数{datas.dataView.viewinfo.all_num}条</span>    
                                    <span>昨日条数{datas.dataView.viewinfo.date_num}条</span>
                                </div>
                                <div className='yulunList'>
                                    {

                                        datas.items.map((text, i) => {
                                            return (
                                                <a href={text.siteurl} key={i} className='link' target='_blank'>
                                                    <h6 className='title'>{text.title}</h6>
                                                    <p className='time'> {Util.formatDate(text.pubtime)}</p>
                                                </a>
                                            )
                                        })
                                    }
                                    <LoadMore onClick={this.loadMore.bind(this)} data={datas} />
                                </div>
                            </div>
                    }

                </div>

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