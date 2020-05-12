import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../components/title';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import BarChart from '../../../../echart/bar';


class List extends React.Component {
    render() {
        const { data, iconName, title } = this.props;
        var color;
        if (data.status == '强' || data.status == '偏强' || data.status == '极强') {
            color = '#39B54A';
        }
        else if (data.status == '偏弱' || data.status == '正常') {
            color = '#FFA500';
        }
        else {
            color = '#ED1C24';
        }
        return (
            <div className="listItem">
                <Icon type={require('../../../../assets/icons/new/' + iconName + '.svg')} color={color} size={'lg'} />
                <span className="text">{title}<i style={{ color: color }}>{data.status}</i></span>
            </div>
        )
    }
}


export default class DetailZongHealth extends React.Component {
    render() {
        const { data, dataDlp, listdata } = this.props;
        if (data != null && data != '') {
            var inamount = data.inamount; //资金流
            var mobility = data.mobility; //流动性
            var dispersion = data.dispersion; //分散度
            var popularity = data.popularity; //人气
            var stayStill = data.stayStill; //体量
            var loyalty = data.loyalty; //忠诚度
            var growth = data.growth; //成长性
            var rate = data.rate; //收益率

            if (inamount != '' && inamount != null) {
                var color;
                if (inamount.status == '强' || inamount.status == '偏强' || inamount.status == '极强') {
                    color = '#39B54A';
                }
                else if (inamount.status == '偏弱' || inamount.status == '正常') {
                    color = '#FFA500';
                }
                else {
                    color = '#ED1C24';
                }
            }


        }
        return (
            <div className="box mt10 healthCon">
                <Title data={'健康度'} />
                {
                    dataDlp !== null && data !== null ?
                        <div className="content">
                            {
                                dataDlp.ordernum > 0 ?
                                    <div className="info">
                                        <div className="l">
                                            <div className="li">
                                                <span className="label">健康度指数</span>
                                                <span className="num">{dataDlp.score}</span>
                                            </div>
                                            <div className="li bt">
                                                <span className="label">较上月</span>
                                                <span className="x2">
                                                    <Icon type={dataDlp.changnum >= 0 ? require('../../../../assets/icons/new/arrow-up.svg') : require('../../../../assets/icons/new/arrow-down.svg')} color={'#999'} size={'xxs'} />
                                                    {Math.abs(dataDlp.changnum)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="r">
                                            <div className="li">
                                                <span className="label">健康度排名</span>
                                                <span className="num">{dataDlp.ordernum}</span>
                                            </div>
                                            <div className="li bt">
                                                <span className="x2 t">在统计的{dataDlp.totalNum}家平台中</span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="null">暂无</div>
                            }
                            <div className="zijin">
                                <div className="l">
                                    <Icon type={require('../../../../assets/icons/new/zb-zijin.svg')} color={color} size={'lg'} />
                                    <span className="text">资金流<i style={{ color: color }}>{inamount.status}</i></span>
                                </div>
                                <div id='barEchartZhijin' className='barEchart'></div>
                            </div>
                            <div className="list">
                                <List data={mobility} iconName={'zb-liudong'} title={'流动性'} />
                                <List data={dispersion} iconName={'zb-fensan'} title={'分散度'} />
                                <List data={popularity} iconName={'zb-renqi'} title={'人气'} />
                                <List data={stayStill} iconName={'zb-tiliang'} title={'体量'} />
                                <List data={loyalty} iconName={'zb-zhongchengdu'} title={'忠诚度'} />
                                <List data={growth} iconName={'zb-chengzhang'} title={'成长性'} />
                                <List data={rate} iconName={'zb-shouyi'} title={'收益率'} />
                            </div>
                        </div>
                        :
                        <div className="null">暂无数据</div>
                }

            </div>
        )
    }
    componentDidMount() {
        const { data, dataDlp, listdata } = this.props;


        if (listdata != null && listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataInamount = []   //资金流
            for (var i = 0; i < listdata.length; i++) {
                dateTimeAll.push(listdata[i].date_str.substring(5));
                dataInamount.push(listdata[i].inamount)
            }
            const barEchartZhijin = document.getElementById('barEchartZhijin')

            echarts.init(barEchartZhijin).setOption(BarChart.bar3('资金流(万元)', '资金流', dateTimeAll, dataInamount, 52));

        }

    }
}