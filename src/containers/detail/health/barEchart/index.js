import React, { Component, PropTypes } from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import BarChart from '../../../../echart/bar';


export default class BarChartD extends React.Component {

    render() {
        const { echartID } = this.props;
        return (
            <div className='echart' id={echartID}></div>
        )
    }
    componentDidMount() {
        const { data, field, echartID, name, title, x } = this.props;

        const dateTime = [] //时间列表
        const dataList = []   //资金流
        for (let i = 0; i < data.length; i++) {
            dateTime.push(data[i].date_str.substring(5));
            dataList.push(data[i][field])
        }
        const barEchart = document.getElementById(echartID)
        echarts.init(barEchart).setOption(BarChart.barChartHealth(name, title, dateTime, dataList, x));


    }
}