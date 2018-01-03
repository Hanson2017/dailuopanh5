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

export default class Hexin extends React.Component {
    render() {
        let data = this.props.data;

        if (data.dataDetail != null && data.dataDetail != '') {
            var inamountInfo = data.dataDetail.inamount;  //资金流基本信息 
            var brand = data.dataDetail.brand //品牌基本信息
        }

        return (
            <div>
                <div className='healthTop'>
                    <p>核心指标为安全性指标，是平台运营的核心指标，建议重点关注。</p>
                    <p>数据说明：极强 > 强 > 偏强 > 正常 > 偏弱 > 弱 > 极弱</p>
                </div>
                <Title titleText={'概述'} />
                {
                    data.dlpDetail != null ?
                        <div className='healthInfoHead'>
                            <div className='info'>
                                <span className="ic1">综合指数</span>
                                <span className="ic2">{data.dlpDetail.score}</span>
                                <span className="ic3">( 统计{data.dlpDetail.totalNum}家平台中排名<b>{data.dlpDetail.ordernum}</b> )</span>
                            </div>
                            <p>较上月
                            <span><Icon type={data.dlpDetail.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={data.dlpDetail.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                </span>
                                {data.dlpDetail.changnum >= 0 ? data.dlpDetail.changnum : -data.dlpDetail.changnum}%
                            </p>
                        </div>
                        :
                        <div className='dataNull'>暂无数据</div>
                }
                {/*概述 end*/}
                <Title titleText={'资金流诊断'} />
                {
                    data.listdata != null && data.listdata.length > 0 ?
                        <div className='diagnoseBox'>
                            <h6 className='diagnoseText'>{inamountInfo.info}</h6>
                            <div className='diagnoseState'>
                                <span>
                                    状态：
                                <i className={
                                        inamountInfo.status == '强' || inamountInfo.status == '偏强' || inamountInfo.status == '极强' || inamountInfo.status == '正常' ?
                                            'good'
                                            :
                                            inamountInfo.status == '偏弱' ?
                                                'normal'
                                                :
                                                'bad'}>
                                        {inamountInfo.status}
                                    </i>
                                </span>
                                <span className='qushi'>
                                    后续趋势预判：  <Icon type={inamountInfo.change == 'up' ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={inamountInfo.change == 'up' ? '#ff0063' : '#009963'} size={'xxs'} />
                                </span>
                            </div>
                            <div id='barEchartZhijin' className='barEchartH'></div>
                            <div className='diagnoseInstruction'>
                                <p>说明：1. 如资金流长期处于正流入状态，则资金链健康；</p>
                                <p>2. 如资金流长期处于负流出状态，则可能引起资金链断裂。</p>
                            </div>
                        </div>
                        :
                        <div className='dataNull'>暂无数据</div>
                }
                {/*资金流诊断 end*/}
                <Title titleText={'品牌诊断'} />
                {
                    data.dataDetail != null && data.dataDetail.brand != null ?
                        <div className='diagnoseBox'>
                            <dl className='diagnosePinpai'>
                                <dt>股东背景</dt>
                                <dd>
                                    <span className={brand.platback == '民营' ? 'on' : null}>民营</span>
                                    <span className={brand.platback == '国资' ? 'on' : null}>国资</span>
                                    <span className={brand.platback == '上市公司' ? 'on' : null}>上市</span>
                                    <span className={brand.platback == '银行' ? 'on' : null}>银行</span>
                                </dd>
                            </dl>
                            <dl className='diagnosePinpai'>
                                <dt>融资背景</dt>
                                <dd>
                                    <span className={brand.financing == '暂无融资' ? 'on' : null}>暂无</span>
                                    <span className={brand.financing == '天使' ? 'on' : null}>天使</span>
                                    <span className={brand.financing == 'A' || brand.financing == 'Pre-A' ? 'on' : null}>A</span>
                                    <span className={brand.financing == 'B' ? 'on' : null}>B</span>
                                    <span className={brand.financing == 'C' ? 'on' : null}>C</span>
                                    <span className={brand.financing == 'D' ? 'on' : null}>D</span>
                                    <span className={brand.financing == 'IPO' ? 'on' : null}>IPO</span>
                                </dd>
                            </dl>
                            <dl className='diagnosePinpai'>
                                <dt>银行存管</dt>
                                <dd>
                                    <span className="on">{brand.Deposittype}</span>
                                </dd>
                            </dl>
                            <div className='rongziInfo'>
                                {
                                    brand.financing_info.split('<br />').map((text,i) => {
                                        return (
                                            <p  key={i} className='rongziInfoText'>{text}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className='diagnoseInstruction'>说明： 品牌背书是平台安全性的重要保障。</div>
                        </div>
                        :
                        <div className='dataNull'>暂无数据</div>
                }
                {/*品牌诊断 end*/}
                <Title titleText={'负面事件诊断'} />
                {
                    data.dataDetail != null ?
                        <div className='diagnoseBox'>
                            {
                                data.dataDetail.negative != '' && data.dataDetail.negative != null ?
                                    data.dataDetail.negative.split('<p>').map((text,i) => {
                                        let list = text.split('<href>');
                                        return (
                                            <a  key={i} className='fumianList' href={list[1]} >
                                                {list[0]}
                                            </a>
                                        )
                                    })
                                    :
                                    <div className='dataNull'>暂无负面数据</div>
                            }
                        </div>
                        :
                        <div className='dataNull'>暂无负面数据</div>
                }
            </div>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        if (data.listdata != null && data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataInamount = []   //资金流
            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataInamount.push(data.listdata[i].inamount)
            }
            const barEchartZhijin = document.getElementById('barEchartZhijin')
            echarts.init(barEchartZhijin).setOption(barChartHealth('资金流(万元)', '资金流', dateTimeAll, dataInamount, 52));
        }
    }
}