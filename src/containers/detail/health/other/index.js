import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import './index.scss';
import Title from '../../../../components/title';

import { barChartHealth } from '../../../../echart/bar';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



class OtherModule extends React.Component {
    render() {
        let EchartID = this.props.EchartID;
        let titleText = this.props.titleText; 
        return (
            <div>
                <Title titleText={titleText} />
                <div id={EchartID} className='barEchartH barEchartPD'></div>
            </div>
        )
    }
}

export default class Other extends React.Component {
    render() {
        const data = this.props.data;
        if(data.listdata != null && data.listdata.length > 0){
            return (
                <div className='healthOtherWp'>
                    <OtherModule  titleText={'成交量走势'} EchartID={'barEchartOtherChengjiao'}  />
    
                    <OtherModule  titleText={'每日借款人数走势'} EchartID={'barEchartOtherJiekuanNumer'}  />
    
                    <OtherModule  titleText={'待还借款人数走势'} EchartID={'barEchartOtherDaihuanNumer'}  />
    
                    <OtherModule  titleText={'满标用时走势'} EchartID={'barEchartOtherManbiaoTime'}  />
                </div>
            )
        }
        else{
            return (
                <div className='dataNull'>暂无数据</div>
            )
        }
        
    }
    componentDidMount() {
        var data = this.props.data;
        if (data.listdata != null && data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataAmount = []  //成交量走势
            var dataBorrowerNum = []  //每日借款人数走势
            var dataBorrowWaitNum = []  //待还借款人数
            var dataFullloanTime = []   //满标用时

            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataAmount.push(data.listdata[i].amount)
                dataBorrowerNum.push(data.listdata[i].borrowerNum)
                dataBorrowWaitNum.push(data.listdata[i].borrowWaitNum)
                dataFullloanTime.push(data.listdata[i].fullloanTime)
            }

            const barEchartOtherChengjiao = document.getElementById('barEchartOtherChengjiao');
            const barEchartOtherJiekuanNumer = document.getElementById('barEchartOtherJiekuanNumer');
            const barEchartOtherDaihuanNumer = document.getElementById('barEchartOtherDaihuanNumer');
            const barEchartOtherManbiaoTime = document.getElementById('barEchartOtherManbiaoTime');

            echarts.init(barEchartOtherChengjiao).setOption(barChartHealth('成交量走势(万元)', '成交量走势', dateTimeAll, dataAmount, 70));

            echarts.init(barEchartOtherJiekuanNumer).setOption(barChartHealth('每日借款人数走势(人)', '每日借款人数走势', dateTimeAll, dataBorrowerNum, 70));

            echarts.init(barEchartOtherDaihuanNumer).setOption(barChartHealth('待还借款人数走势(人)', '待还借款人数走势', dateTimeAll, dataBorrowWaitNum, 70));

            echarts.init(barEchartOtherManbiaoTime).setOption(barChartHealth('满标用时走势(分钟)', '满标用时走势', dateTimeAll, dataFullloanTime, 70));
        }
    }
}