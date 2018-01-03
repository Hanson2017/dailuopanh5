import React, { Component, PropTypes } from 'react';
import Util from '../../../../utils/util';
import UpDateTime from '../../../../components/upDateTime';

import { pieFund } from '../../../../echart/pie';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import './index.scss';

export default class All extends React.Component {

    render() {
        const data = this.props.data;
        return (
            <div>
                <UpDateTime updatetime={Util.setDate(new Date())} />
                <div className='fundsTop'>
                    <p>• 示范投资目前投资总额为<i>{data.investall}</i>万</p>
                    <p>• 示范投资仅起到参考作用</p>
                    <p>• 建议合理分配资金，选择优质平台分散投资</p>
                </div>
                <div className='fundTitle'>示范投资组合如下</div>
                <div className='fundEchartBox'>
                    <h6 className='fundEchartTitleText'>1号示范投资（稳健型）</h6>
                    <div className='fundEchart' id='fundEchart1'></div>
                </div>
                <div className='fundEchartBox'>
                    <h6 className='fundEchartTitleText'>2号示范投资（平衡型）</h6>
                    <div className='fundEchart' id='fundEchart2'></div>
                </div>
                <div className='fundEchartBox'>
                    <h6 className='fundEchartTitleText'>3号示范投资（收益型）</h6>
                    <div className='fundEchart' id='fundEchart3'></div>
                </div>
                <div className='fundEchartBox'>
                    <h6 className='fundEchartTitleText'>活期示范投资（高流动型）</h6>
                    <div className='fundEchart' id='fundEchart4'></div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        var fund1Data = [];
        var fund2Data = [];
        var fund3Data = [];
        var fund4Data = [];
        for (let i = 0; i < data.fund1.length; i++) {
            fund1Data.push({ value: data.fund1[i].fund_amount, name: data.fund1[i].plat_name + '\n' + '(' + data.fund1[i].fund_amount + '万)' })
        }
        for (let i = 0; i < data.fund2.length; i++) {
            fund2Data.push({ value: data.fund2[i].fund_amount, name: data.fund2[i].plat_name + '\n' + '(' + data.fund2[i].fund_amount + '万)' })
        }
        for (let i = 0; i < data.fund3.length; i++) {
            fund3Data.push({ value: data.fund3[i].fund_amount, name: data.fund3[i].plat_name + '\n' + '(' + data.fund3[i].fund_amount + '万)' })
        }
        for (let i = 0; i < data.fund4.length; i++) {
            fund4Data.push({ value: data.fund4[i].fund_amount, name: data.fund4[i].plat_name + '\n' + '(' + data.fund4[i].fund_amount + '万)' })
        }

        const fundEchart1 = document.getElementById('fundEchart1')
        echarts.init(fundEchart1).setOption(pieFund(fund1Data));

        const fundEchart2 = document.getElementById('fundEchart2')
        echarts.init(fundEchart2).setOption(pieFund(fund2Data));

        const fundEchart3 = document.getElementById('fundEchart3')
        echarts.init(fundEchart3).setOption(pieFund(fund3Data));

        const fundEchart4 = document.getElementById('fundEchart4')
        echarts.init(fundEchart4).setOption(pieFund(fund4Data));

    }
}