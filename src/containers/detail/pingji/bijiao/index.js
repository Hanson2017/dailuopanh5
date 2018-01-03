import React, { Component } from 'react';
import './index.scss';

import { barChartBijiao } from '../../../../echart/bar';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class BiJiao extends React.Component {
    render() {
        if (this.props.data != '') {
            return (
                <div id='barEchartBijiao' className='barEchartD'></div>
            )
        }
        else {
            return (
                <div className='nullData'>暂无数据</div>
            )

        }

    }
    componentDidMount() {
        let data;
        if (this.props.data != '') {
            data = this.props.data.split(',');
            const xdata = [this.props.platName, '行业平均', '行业最高', '行业最低']
            const barEchartBijiao = document.getElementById('barEchartBijiao')
            echarts.init(barEchartBijiao).setOption(barChartBijiao('评级比较', xdata, data));
        }
    }
}
