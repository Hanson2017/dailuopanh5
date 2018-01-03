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

class FuzhuModule extends React.Component {
    render() {
        let data = this.props.data;
        let EchartID = this.props.EchartID;
        let titleText = this.props.titleText;
        return (
            <div>
                <Title titleText={titleText} />
                <div className='diagnoseBox'>
                    <h6 className='diagnoseText'>{data.info}</h6>
                    <div className='diagnoseState'>
                        <span>
                            状态：
                        <i className={
                                data.status == '强' || data.status == '偏强' || data.status == '极强' || data.status == '正常' ?
                                    'good'
                                    :
                                    data.status == '偏弱' ?
                                        'normal'
                                        :
                                        'bad'}>
                                {data.status}
                            </i>
                        </span>
                        <span className='qushi'>
                            后续趋势预判：  <Icon type={data.change == 'up' ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={data.change == 'up' ? '#ff0063' : '#009963'} size={'xxs'} />
                        </span>
                    </div>
                    <div id={EchartID} className='barEchartH'></div>
                    <div className='diagnoseInstruction'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}


export default class Fuzhu extends React.Component {
    render() {
        let data = this.props.data;
        if (data.dataDetail != null && data.dataDetail != '') {
            var mobility = data.dataDetail.mobility; //流动性基本信息
            var dispersion = data.dataDetail.dispersion; //分散度基本信息
            var popularity = data.dataDetail.popularity; //人气基本信息
            var stayStill = data.dataDetail.stayStill; //体量基本信息
            var loyalty = data.dataDetail.loyalty; //忠诚度基本信息
            var growth = data.dataDetail.growth; //成长性基本信息
            var rate = data.dataDetail.rate; //收益率基本信息
        }
        if (data.listdata != null && data.listdata.length > 0) {
            return (
                <div>
                    <div className='healthTop'>
                        <p>辅助指标为参考性指标，可辅助判断。</p>
                        <p>数据说明：极强 > 强 > 偏强 > 正常 > 偏弱 > 弱 > 极弱</p>
                    </div>
                    <FuzhuModule titleText={'流动性诊断'} data={mobility} EchartID={'barEchartFuzhuLiudong'}>
                        <p>说明：1. 借款期限数值越低代表流动性越好，资金的灵活性越高;</p>
                        <p>2. 借款期限数值越高代表流动性越差，资金的灵活性越低。</p>
                    </FuzhuModule>
                    {/*流动性诊断 end*/}

                    <FuzhuModule titleText={'分散度诊断'} data={dispersion} EchartID={'barEchartFuzhuFensan'}>
                        <p>说明：1. 借款金额数值越低代表分散度越好，系统性风险越低;</p>
                        <p> 2. 借款金额数值越高代表分散度越差，系统性风险越高。</p>
                    </FuzhuModule>
                    {/*分散度诊断 end*/}

                    <FuzhuModule titleText={'人气诊断'} data={popularity} EchartID={'barEchartFuzhuRenqi'}>
                        <p>说明：1. 投资人数数值越高代表人气越好;</p>
                        <p>2. 投资人数数值越低代表人气越差。</p>
                    </FuzhuModule>
                    {/*人气诊断 end*/}

                    <FuzhuModule titleText={'体量诊断'} data={stayStill} EchartID={'barEchartFuzhuTiliang'}>
                        <p>说明：1. 累计待还金额数值越高代表体量越大，系统性风险越低;</p>
                        <p> 2. 累计待还金额数值越低代表体量越低，系统性风险越高。</p>
                    </FuzhuModule>
                    {/*体量诊断 end*/}

                    <FuzhuModule titleText={'忠诚度诊断'} data={loyalty} EchartID={'barEchartFuzhuZhongchengdu'}>
                        <p>说明：1. 人均投资金额越高代表用户忠诚度越高，平台越健康;</p>
                        <p> 2. 人均投资金额越低代表用户忠诚度越低，平台越不健康。</p>
                    </FuzhuModule>
                    {/*忠诚度诊断 end*/}

                    <FuzhuModule titleText={'成长性诊断'} data={growth} EchartID={'barEchartFuzhuChengzhang'}>
                        <p>说明：1. 待收投资人数数值越高代表用户体量健康，成长性越好;</p>
                        <p> 2. 待收投资人数数值越低代表用户体量萎靡，成长性越差。</p>
                    </FuzhuModule>
                    {/*成长性诊断 end*/}

                    <FuzhuModule titleText={'收益率诊断'} data={rate} EchartID={'barEchartFuzhuShouyi'}>
                        <p>说明：利率数据高低与平台安全性没有直接关系，仅作为数据参考</p>
                    </FuzhuModule>
                    {/*收益率诊断 end*/}

                </div>
            )
        }
        else {
            return (
                <div className='dataNull'>暂无数据</div>
            )
        }

    }
    componentDidMount() {
        var data = this.props.data;

        if (data.listdata != null && data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataLoanPeriod = [] //流动性
            var dataAvgBorrowMoney = []  //分散度
            var dataBidderNum = []     //人气
            var dataStayStillOfTotal = []     //体量
            var dataAvgBidMoney = []  //忠诚度
            var dataBidderWaitNum = []  //成长性
            var dataRate = []   //收益率

            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataLoanPeriod.push(data.listdata[i].loanPeriod)
                dataAvgBorrowMoney.push(data.listdata[i].avgBorrowMoney)
                dataBidderNum.push(data.listdata[i].bidderNum)
                dataStayStillOfTotal.push(data.listdata[i].stayStillOfTotal)
                dataAvgBidMoney.push(data.listdata[i].avgBidMoney)
                dataBidderWaitNum.push(data.listdata[i].bidderWaitNum)
                dataRate.push(data.listdata[i].rate)
            }
            const barEchartFuzhuLiudong = document.getElementById('barEchartFuzhuLiudong');
            const barEchartFuzhuFensan = document.getElementById('barEchartFuzhuFensan');
            const barEchartFuzhuRenqi = document.getElementById('barEchartFuzhuRenqi');
            const barEchartFuzhuTiliang = document.getElementById('barEchartFuzhuTiliang');
            const barEchartFuzhuZhongchengdu = document.getElementById('barEchartFuzhuZhongchengdu');
            const barEchartFuzhuChengzhang = document.getElementById('barEchartFuzhuChengzhang');
            const barEchartFuzhuShouyi = document.getElementById('barEchartFuzhuShouyi');


            echarts.init(barEchartFuzhuLiudong).setOption(barChartHealth('借款期限(月)', '借款期限', dateTimeAll, dataLoanPeriod, 30));

            echarts.init(barEchartFuzhuFensan).setOption(barChartHealth('人均借款金额(万元)', '人均借款金额', dateTimeAll, dataAvgBorrowMoney, 30));

            echarts.init(barEchartFuzhuRenqi).setOption(barChartHealth('投资人数(人)', '投资人数', dateTimeAll, dataBidderNum, 50));

            echarts.init(barEchartFuzhuTiliang).setOption(barChartHealth('累计待还金额(万元)', '累计待还金额', dateTimeAll, dataStayStillOfTotal, 75));

            echarts.init(barEchartFuzhuZhongchengdu).setOption(barChartHealth('人均投资金额(万元)', '人均投资金额', dateTimeAll, dataAvgBidMoney, 35));

            echarts.init(barEchartFuzhuChengzhang).setOption(barChartHealth('待收投资人数(人)', '待收投资人数', dateTimeAll, dataBidderWaitNum, 60));

            echarts.init(barEchartFuzhuShouyi).setOption(barChartHealth('利率(%)', '利率', dateTimeAll, dataRate, 38));
        }

    }
}