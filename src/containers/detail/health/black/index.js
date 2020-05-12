import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../components/title';


export default class DetailHealth extends React.Component {
    render() {
        const { data } = this.props;
        if (data.dataDetail != null && data.dataDetail != '') {
            var brand = data.dataDetail.brand //品牌基本信息
        }
        return (
            <div className="detailHealthBlack">
                {
                    data.dataDetail != null && data.dataDetail != '' ?
                        <div>
                            <div className="box pinpai">
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
                            <div className={'diagnoseBox box mt10'}>
                                <div className="hd">
                                    <div className="l">
                                        <Icon type={require('../../../../assets/icons/new/zb-fumian.svg')} color={'#b8c1c7'} size={'lg'} />
                                    </div>
                                    <div className="r">
                                        <h6 className="tit">负面事件诊断</h6>
                                    </div>
                                </div>
                                <div className="bdFumian">
                                    {
                                        data.dataDetail.negative != '' && data.dataDetail.negative != null ?
                                            data.dataDetail.negative.split('<p>').map((text, i) => {
                                                let list = text.split('<href>');
                                                return (
                                                    <a key={i} className='fumianList' href={list[1]} >
                                                        {list[0]}
                                                    </a>
                                                )
                                            })
                                            :
                                            <div className='nullF'>暂无负面数据</div>
                                    }

                                </div>
                                <div className='instruction'>
                                    <p>说明：不断有负面信息的平台，往往是出事的前兆。</p>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                <div className="black box mt10">
                    <Icon type={require('../../../../assets/icons/new/ico-close.svg')} color={'#1A1A1A'} size={'lg'} />
                    <span className="text">黑名单平台</span>
                    <span className="text">已停止其数据监控</span>
                </div>

            </div>
        )
    }
}


