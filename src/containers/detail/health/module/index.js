import React, { Component } from 'react';
import './index.scss';

import { radarEchart } from '../../../../echart/radar';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/radar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

export default class ModuleH extends React.Component {
    render() {
        let data = this.props.data;
        if (data.dlpDetail != null && data.industryDetail != null) {
            return (
                <div className='healthModuleEchart' id='healthModuleEchart'>模型</div>
            )
        }
        else{
            return (
                <div className='dataNull'>暂无数据</div>
            )
        }

    }
    componentDidMount() {
        let data = this.props.data;
        let platName = this.props.platName;

        if (data.dlpDetail != null && data.industryDetail != null) {
            var dlpDetail = data.dlpDetail;
            var industryDetail = data.industryDetail;

            var platdata = [dlpDetail.inamount, dlpDetail.dispersion, dlpDetail.mobility, dlpDetail.rate, dlpDetail.popularity, dlpDetail.stayStill, dlpDetail.loyalty, dlpDetail.growth]
            var platdata_ind = [industryDetail.inamount, industryDetail.dispersion, industryDetail.mobility, industryDetail.rate, industryDetail.popularity, industryDetail.stayStill, industryDetail.loyalty, industryDetail.growth]

            const healthModuleEchart = document.getElementById('healthModuleEchart');

            echarts.init(healthModuleEchart).setOption(radarEchart(platName, platdata, platdata_ind));
        }
    }
}