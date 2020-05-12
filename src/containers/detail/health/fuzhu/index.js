import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../components/title';
import Theme from '../../../../utils/theme';
import BarEchart from '../barEchart';

class FuzhuModule extends React.Component {
    render() {
        const { data, dataList, iconName, title, field, echartID, echartName, echartTitle, echartX, mt } = this.props;
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
            <div className={mt ? 'diagnoseBox box' : 'diagnoseBox box mt10'}>
                <div className="hd">
                    <div className="l">
                        <Icon type={require('../../../../assets/icons/new/' + iconName + '.svg')} color={color} size={'lg'} />
                    </div>
                    <div className="r">
                        <h6 className="tit">{title}</h6>
                        <p className="info">{data.info}</p>
                    </div>
                </div>
                <ul className="stateCon">
                    <li>
                        <span className="label">状态：</span>
                        <span className="status" style={{ backgroundColor: color }}>{data.status}</span>
                    </li>
                    <li>
                        <span className="label">后续趋势预判：</span>
                        <span className="icon">
                            <Icon type={data.change == 'up' ? require('../../../../assets/icons/new/arrow-up.svg') : require('../../../../assets/icons/new/arrow-down.svg')} color={data.change == 'up' ? Theme.upColor : Theme.downColor} size={'xxs'} />
                        </span>
                    </li>
                </ul>
                <BarEchart data={dataList} field={field} echartID={echartID} name={echartName} title={echartTitle} x={echartX} />
                <div className='instruction'>
                    <p>说明：</p>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default class DetailHealthFuzhu extends React.Component {
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
            var negative = data.dataDetail.negative; //负面信息
        }
        if (data.listdata !== null && data.listdata.length > 0) {
            return (
                <div className="detailHealthFuzhu">
                    <div className='note'>
                        辅助指标为参考性指标，可辅助判断。
                    </div>
                    <FuzhuModule mt={true} data={mobility} dataList={data.listdata} iconName={'zb-liudong'} title={'流动性诊断'} field={'loanPeriod'} echartID={'barEchartLiudong'} echartName={'借款期限(月)'} echartTitle={'借款期限'} echartX={30}>
                        <p>1. 借款期限数值越低代表流动性越好，资金的灵活性越高;</p>
                        <p>2. 借款期限数值越高代表流动性越差，资金的灵活性越低。</p>
                    </FuzhuModule>
                    {/*流动性诊断 end*/}

                    <FuzhuModule data={dispersion} dataList={data.listdata} iconName={'zb-fensan'} title={'分散度诊断'} field={'avgBorrowMoney'} echartID={'barEchartFensan'} echartName={'人均借款金额(万元)'} echartTitle={'人均借款金额'} echartX={30}>
                        <p>1. 借款金额数值越低代表分散度越好，系统性风险越低;</p>
                        <p>2. 借款金额数值越高代表分散度越差，系统性风险越高。</p>
                    </FuzhuModule>
                    {/*分散度诊断 end*/}

                    <FuzhuModule data={popularity} dataList={data.listdata} iconName={'zb-renqi'} title={'人气诊断'} field={'bidderNum'} echartID={'barEchartRenqi'} echartName={'投资人数(人)'} echartTitle={'投资人数'} echartX={50}>
                        <p>1. 投资人数数值越高代表人气越好;</p>
                        <p>2. 投资人数数值越低代表人气越差。</p>
                    </FuzhuModule>
                    {/*人气诊断 end*/}

                    <FuzhuModule data={stayStill} dataList={data.listdata} iconName={'zb-tiliang'} title={'体量诊断'} field={'stayStillOfTotal'} echartID={'barEchartTiliang'} echartName={'累计待还金额(万元)'} echartTitle={'累计待还金额'} echartX={75}>
                        <p>1. 累计待还金额数值越高代表体量越大，系统性风险越低;</p>
                        <p>2. 累计待还金额数值越低代表体量越低，系统性风险越高。</p>
                    </FuzhuModule>
                    {/*体量诊断 end*/}

                    <FuzhuModule data={loyalty} dataList={data.listdata} iconName={'zb-zhongchengdu'} title={'忠诚度诊断'} field={'avgBidMoney'} echartID={'barEchartZHongchengdu'} echartName={'人均投资金额(万元)'} echartTitle={'人均投资金额'} echartX={35}>
                        <p>1. 人均投资金额越高代表用户忠诚度越高，平台越健康;</p>
                        <p>2. 人均投资金额越低代表用户忠诚度越低，平台越不健康。</p>
                    </FuzhuModule>
                    {/*忠诚度诊断 end*/}

                    <FuzhuModule data={growth} dataList={data.listdata} iconName={'zb-chengzhang'} title={'成长性诊断'} field={'bidderWaitNum'} echartID={'barEchartChengzhang'} echartName={'待收投资人数(人)'} echartTitle={'待收投资人数'} echartX={60}>
                        <p>1. 待收投资人数数值越高代表用户体量健康，成长性越好;</p>
                        <p>2. 待收投资人数数值越低代表用户体量萎靡，成长性越差。</p>
                    </FuzhuModule>
                    {/*成长性诊断 end*/}

                    <FuzhuModule data={rate} dataList={data.listdata} iconName={'zb-shouyi'} title={'收益率诊断'} field={'rate'} echartID={'barEchartShouyi'} echartName={'利率(%)'} echartTitle={'利率'} echartX={38}>
                        <p>利率数据高低与平台安全性没有直接关系，仅作为数据参考</p>
                    </FuzhuModule>
                    {/*收益率诊断 end*/}


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
                                data.dataDetail != null && data.dataDetail != '' && data.dataDetail.negative != '' && data.dataDetail.negative != null ?
                                    negative.split('<p>').map((text, i) => {
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
            )
        }
        else {
            return (
                <div className="detailHealthFuzhu">
                    <div className='null'>暂无数据</div>
                </div>

            )
        }

    }

}