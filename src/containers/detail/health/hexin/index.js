import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Theme from '../../../../utils/theme';
import Title from '../../../../components/title';
import BarEchart from '../barEchart';

export default class DetailHealthAllHexin extends React.Component {
    render() {

        const { data } = this.props;

        if (data.dataDetail != null && data.dataDetail != '') {
            var inamountInfo = data.dataDetail.inamount;  //资金流基本信息 
            var brand = data.dataDetail.brand //品牌基本信息

            var color;
            if (inamountInfo !== null) {
                if (inamountInfo.status == '强' || inamountInfo.status == '偏强' || inamountInfo.status == '极强') {
                    color = '#39B54A';
                }
                else if (inamountInfo.status == '偏若' || inamountInfo.status == '正常') {
                    color = '#FFA500';
                }
                else {
                    color = '#ED1C24';
                }
            }
        }

        return (
            <div className="hexin">
                <div className="box mt10 hxzb">
                    <Title data={'核心指标'} />
                    {
                        data.listdata !== null && data.listdata.length > 0 ?
                            <div className="content">
                                <p className="note">核心指标为安全性指标，是平台运营的核心指标，建议重点关注。</p>
                                <div className='diagnoseBox'>
                                    <div className="hd">
                                        <div className="l">
                                            <Icon type={require('../../../../assets/icons/new/zb-zijin.svg')} color={color} size={'lg'} />
                                        </div>
                                        <div className="r">
                                            <h6 className="tit">资金流诊断</h6>
                                            <p className="info">{inamountInfo.info}</p>
                                        </div>
                                    </div>
                                    <ul className="stateCon">
                                        <li>
                                            <span className="label">状态：</span>
                                            <span className="status" style={{ backgroundColor: color }}>{inamountInfo.status}</span>
                                        </li>
                                        <li>
                                            <span className="label">后续趋势预判：</span>
                                            <span className="icon">
                                                <Icon type={inamountInfo.change == 'up' ? require('../../../../assets/icons/new/arrow-up.svg') : require('../../../../assets/icons/new/arrow-down.svg')} color={inamountInfo.change == 'up' ? Theme.upColor : Theme.downColor} size={'xxs'} />
                                            </span>
                                        </li>
                                    </ul>
                                    <BarEchart data={data.listdata} field={'inamount'} echartID={'barEchartZhijin'} name={'资金流(万元)'} title={'资金流'} x={52} />
                                    <div className='instruction'>
                                        <p>说明：</p>
                                        <p>1. 如资金流长期处于正流入状态，则资金链健康；</p>
                                        <p>2. 如资金流长期处于负流出状态，则可能引起资金链断裂。</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='null'>暂无数据</div>
                    }
                </div>

                <div className="box mt10 pinpai">
                    <Title data={'品牌诊断'} />
                    {
                        data.dataDetail != null && data.dataDetail.brand != null ?
                            <div className='content'>
                                <dl className='dl'>
                                    <dt>股东背景</dt>
                                    <dd>
                                        <span className={brand.platback == '民营' ? 'on' : null}>民营</span>
                                        <span className={brand.platback == '国资' ? 'on' : null}>国资</span>
                                        <span className={brand.platback == '上市公司' ? 'on' : null}>上市</span>
                                        <span className={brand.platback == '银行' ? 'on' : null}>银行</span>
                                    </dd>
                                </dl>
                                <dl className='dl'>
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
                                <dl className='dl'>
                                    <dt>银行存管</dt>
                                    <dd>
                                        <span className="on">{brand.Deposittype}</span>
                                    </dd>
                                </dl>
                                <div className='rz'>
                                    {
                                        brand.financing_info.split('<br />').map((text, i) => {
                                            return (
                                                <p key={i}>{text}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div className='instruction'>说明：<br /> 品牌背书是平台安全性的重要保障。</div>
                            </div>
                            :
                            <div className='null'>暂无数据</div>
                    }

                </div>
            </div>

        )
    }
    componentDidMount() {


    }
}