import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router';
import { History } from 'react-router';
import createReactClass from 'create-react-class';
import './index.scss';

import { lineChart } from '../../../../echart/line';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import Title from '../../../../components/title';
const width = document.body.clientWidth;
const Shuzhi = createReactClass({
    mixins: [History],
    getInitialState() {
        return {
            isHidden: [true, true, true, true, true, true, true],
            ref: false
        }
    },
    render() {
        const data = this.props.data;
        const isHidden = this.state.isHidden;
        const dataWdzj = data.wdzj;
        const dataP2peye = data.p2peye;
        const dataDlp = data.dlp;
        const dataR360 = data.rong360;
        const dataXinghuo = data.xinghuo;
        const dataYifei = data.yifei;
        const dataZh = data.database;

        return (
            <div className=''>
                {
                    data.score != 0 && data.score != '' ?
                        <div className="detailPingjiInfo detailPingjiInfo-zh">
                            <dl>
                                <dt>
                                    <span className="ic1">综合指数</span>
                                    <span className="ic2">{data.score}</span>
                                    <span className="ic3">( 统计{data.totalNum}家平台中排名<b>{data.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[0] ? null : 'show'} >
                                    <p>较上月
                            <Icon type={data.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={data.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                        {data.changnum >= 0 ? data.changnum : -data.changnum}%
                                    </p>
                                    <div id='lineEchartZh' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[0] = !this.state.isHidden[0];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[0] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo detailPingjiInfo-zh">
                            <dl>
                                <dt>
                                    <span className="ic1">综合指数</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }
                {/*综合指数 end*/}

                {
                    dataWdzj != null && dataWdzj != '' ?

                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">之家评级</span>
                                    <span className="ic2">{dataWdzj.fzzhishu}</span>
                                    <span className="ic3">( 统计{dataWdzj.totalNum}家平台中排名<b>{dataWdzj.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[1] ? null : 'show'} >
                                    <p>较上月
                            <Icon type={dataWdzj.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={dataWdzj.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                        {dataWdzj.changnum >= 0 ? dataWdzj.changnum : -dataWdzj.changnum}%
                                    </p>
                                    <div className='item'>
                                        <span>成 交：{dataWdzj.chengjiao}</span>
                                        <span>流动性：{dataWdzj.ldxing}</span>
                                        <span>杠&nbsp;&nbsp;&nbsp;杆：{dataWdzj.ganggan}</span>
                                        <span>人 气：{dataWdzj.renqi}</span>
                                        <span>透明度：{dataWdzj.tmdu}</span>
                                        <span>分散度：{dataWdzj.fsdu}</span>
                                    </div>
                                    <div id='lineEchartWdzj' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[1] = !this.state.isHidden[1];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[1] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">之家评级</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }
                {/*之家评级 end*/}

                {
                    dataP2peye != null && dataP2peye != '' ?

                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">天眼评级</span>
                                    <span className="ic2">{dataP2peye.level}</span>
                                    <span className="ic3">( 统计{dataP2peye.totalNum}家平台中排名<b>{dataP2peye.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[2] ? null : 'show'} >
                                    <p>较上月
                            <Icon type={dataP2peye.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={dataP2peye.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                        {dataP2peye.changnum >= 0 ? dataP2peye.changnum : -dataP2peye.changnum}%
                                    </p>
                                    <div className='item'>
                                        <span>偿兑性：{dataP2peye.claims}</span>
                                        <span>成长性：{dataP2peye.standard}</span>
                                        <span>期 限：{dataP2peye.limit_t}</span>
                                        <span>投&nbsp;&nbsp;&nbsp;资：{dataP2peye.investment}</span>
                                        <span>流动性：{dataP2peye.liquidity}</span>
                                        <span>利 率：{dataP2peye.rate}</span>
                                        <span>运&nbsp;&nbsp;&nbsp;营：{dataP2peye.operation}</span>
                                        <span>地域性：{dataP2peye.regional}</span>
                                        <span>借 款：{dataP2peye.borrowing}</span>
                                    </div>
                                    <div id='lineEchartP2peye' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[2] = !this.state.isHidden[2];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[2] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">天眼评级</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }
                {/*天眼评级 end*/}

                {
                    dataDlp != null && dataDlp != '' ?
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">贷罗盘指数</span>
                                    <span className="ic2">{dataDlp.score}</span>
                                    <span className="ic3">( 统计{dataDlp.totalNum}家平台中排名<b>{dataDlp.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[3] ? null : 'show'} >
                                    <p>较上月
                            <Icon type={dataDlp.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={dataDlp.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                        {dataDlp.changnum >= 0 ? dataDlp.changnum : -dataDlp.changnum}%
                                    </p>
                                    <div className='item'>
                                        <span>资金流：{dataDlp.inamount}</span>
                                        <span>人&nbsp;&nbsp;&nbsp;气：{dataDlp.popularity}</span>
                                        <span>收益率：{dataDlp.rate}</span>
                                        <span>流动性：{dataDlp.mobility}</span>
                                        <span>分散度：{dataDlp.dispersion}</span>
                                        <span>忠诚度：{dataDlp.loyalty}</span>
                                        <span>体&nbsp;&nbsp;&nbsp;量：{dataDlp.stayStill}</span>
                                        <span>成长性：{dataDlp.growth}</span>
                                    </div>
                                    <div id='lineEchartDlp' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[3] = !this.state.isHidden[3];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[3] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">贷罗盘指数</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }
                {/*贷罗盘指数 end*/}

                {
                    dataR360 != null && dataR360 != '' ?
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">融360评级</span>
                                    <span className="ic2">{dataR360.level}</span>
                                    <span className="ic3">( 统计{dataR360.totalNum}家平台中排名<b>{dataR360.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[4] ? null : 'show'} >

                                    <div className='item'>
                                        <span>收益：{dataR360.rate}</span>
                                        <span>人气：{dataR360.renqi}</span>
                                    </div>
                                    <div id='lineEchartR360' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[4] = !this.state.isHidden[4];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[4] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">融360评级</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }
                {/*融360评级 end*/}

                {
                    dataXinghuo != null && dataXinghuo != '' ?
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">星火评级</span>
                                    <span className="ic2">{dataXinghuo.level}</span>
                                    <span className="ic3">( 统计{dataXinghuo.totalNum}家平台中排名<b>{dataXinghuo.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[5] ? null : 'show'} >
                                    <div id='lineEchartXinghuo' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[5] = !this.state.isHidden[5];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[5] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">星火评级</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }
                {/*星火评级 end*/}

                {
                    dataYifei != null && dataYifei != '' ?
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">羿飞评级</span>
                                    <span className="ic2">{dataYifei.score}</span>
                                    <span className="ic3">( 统计{dataYifei.totalNum}家平台中排名<b>{dataYifei.ordernum}</b> )</span>
                                </dt>
                                <dd className={this.state.isHidden[6] ? null : 'show'} >
                                    <p>较上月
                            <Icon type={dataYifei.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={dataYifei.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                        {dataYifei.changnum >= 0 ? dataYifei.changnum : -dataYifei.changnum}%
                                    </p>
                                    <div className='item'>
                                        <span>利&nbsp;&nbsp;&nbsp;率：{dataYifei.rate_level}</span>
                                        <span>成&nbsp;&nbsp;&nbsp;交：{dataYifei.amount_level}</span>
                                        <span>品&nbsp;&nbsp;&nbsp;牌：{dataYifei.brand_level}</span>
                                        <span>周&nbsp;&nbsp;&nbsp;期：{dataYifei.period_level}</span>
                                        <span>风&nbsp;&nbsp;&nbsp;控：{dataYifei.security_level}</span>
                                        <span>投资人：{dataYifei.invest_level}</span>
                                        <span>均&nbsp;&nbsp;&nbsp;投：{dataYifei.avg_invest_level}</span>
                                        <span>均&nbsp;&nbsp;&nbsp;借：{dataYifei.avg_loan_level}</span>
                                        <span>服&nbsp;&nbsp;&nbsp;务：{dataYifei.service_level}</span>
                                        <span>增&nbsp;&nbsp;&nbsp;长：{dataYifei.increase_level}</span>
                                    </div>
                                    <div id='lineEchartYifei' className='lineEchartD' style={{width:width-20}}></div>
                                </dd>
                            </dl>
                            <a href="javascript:;" className="more" onClick={() => {
                                this.state.isHidden[6] = !this.state.isHidden[6];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                {this.state.isHidden[6] ? '详情' : '收起'}
                            </a>
                        </div>
                        :
                        <div className="detailPingjiInfo">
                            <dl>
                                <dt>
                                    <span className="ic1">羿飞评级</span>
                                    <span className="ic2 null">无评级</span>
                                </dt>
                            </dl>
                        </div>
                }

                <Title titleText={'"' + this.props.platName + '"' + '用户还关注'} subtitle={'绿色背景为“示范投资”进入平台'} />
                <ul className='relatedList'>
                    {
                        this.props.replatData != null && this.props.replatData.length > 0 ?
                            this.props.replatData.map((text, i) => {
                                return (
                                    <Link key={i} className={text.fundtype != 0 ? 'relatedActive related' : 'related'} to={'/detail/' + text.id_dlp}>{text.plat_name}</Link>
                                )
                            })
                            :
                            <div>暂无用户关注</div>
                    }

                </ul>
            </div>
        )
    },
    componentDidMount() {
        const data = this.props.data;
        var dataWdzj = data.wdzj;
        var dataP2peye = data.p2peye;
        var dataDlp = data.dlp;
        var dataR360 = data.rong360;
        var dataXinghuo = data.xinghuo;
        var dataYifei = data.yifei;
        var dataZh = data.database;

        var echartDataTimeZh = [];
        var echartDataZh = [];

        var echartDataTimeWdzj = [];
        var echartDataWdzj = [];

        var echartDataTimeP2peye = [];
        var echartDataP2peye = [];

        var echartDataTimeDlp = [];
        var echartDataDlp = [];

        var echartDataTimeR360 = [];
        var echartDataR360 = [];
        var echartDataTextR360 = [];

        var echartDataTimeXinghuo = [];
        var echartDataXinghuo = [];
        var echartDataTextXinghuo = [];

        var echartDataTimeYifei = [];
        var echartDataYifei = [];

        if (dataZh != null) {
            for (let i = 0; i < dataZh.dataview.length; i++) {
                echartDataZh.push(dataZh.dataview[i].datavalue);
                echartDataTimeZh.push(dataZh.dataview[i].date_str)
            }
            const lineEchartZh = document.getElementById('lineEchartZh')
            echarts.init(lineEchartZh).setOption(lineChart('综合指数', '综合指数', echartDataTimeZh, echartDataZh));
        }

        if (dataWdzj != null) {
            for (let i = 0; i < dataWdzj.dataview.length; i++) {
                echartDataWdzj.push(dataWdzj.dataview[i].datavalue);
                echartDataTimeWdzj.push(dataWdzj.dataview[i].date_str)
            }
            const lineEchartWdzj = document.getElementById('lineEchartWdzj')
            echarts.init(lineEchartWdzj).setOption(lineChart('之家评级', '之家评级', echartDataTimeWdzj, echartDataWdzj));
        }

        if (dataP2peye != null) {
            for (let i = 0; i < dataP2peye.dataview.length; i++) {
                echartDataP2peye.push(dataP2peye.dataview[i].datavalue);
                echartDataTimeP2peye.push(dataP2peye.dataview[i].date_str)
            }

            const lineEchartP2peye = document.getElementById('lineEchartP2peye')
            echarts.init(lineEchartP2peye).setOption(lineChart('天眼评级', '天眼评级', echartDataTimeP2peye, echartDataP2peye));
        }

        if (dataDlp != null) {
            for (let i = 0; i < dataDlp.dataview.length; i++) {
                echartDataDlp.push(dataDlp.dataview[i].datavalue);
                echartDataTimeDlp.push(dataDlp.dataview[i].date_str)
            }
            const lineEchartDlp = document.getElementById('lineEchartDlp')
            echarts.init(lineEchartDlp).setOption(lineChart('贷罗盘指数', '贷罗盘指数', echartDataTimeDlp, echartDataDlp));
        }

        if (dataR360 != null) {
            for (let i = 0; i < dataR360.dataview.length; i++) {
                echartDataR360.push(dataR360.dataview[i].datavalue);
                echartDataTimeR360.push(dataR360.dataview[i].date_str)
                echartDataTextR360.push(dataR360.dataview[i].text)
            }

            const lineEchartR360 = document.getElementById('lineEchartR360')
            echarts.init(lineEchartR360).setOption(lineChart('融360评级', '融360评级', echartDataTimeR360, echartDataR360, echartDataTextR360));
        }

        if (dataXinghuo != null) {
            for (let i = 0; i < dataXinghuo.dataview.length; i++) {
                echartDataXinghuo.push(dataXinghuo.dataview[i].datavalue);
                echartDataTimeXinghuo.push(dataXinghuo.dataview[i].date_str)
                echartDataTextXinghuo.push(dataXinghuo.dataview[i].text)
            }
            const lineEchartXinghuo = document.getElementById('lineEchartXinghuo')
            echarts.init(lineEchartXinghuo).setOption(lineChart('星火评级', '星火评级', echartDataTimeXinghuo, echartDataXinghuo, echartDataTextXinghuo));
        }

        if (dataYifei != null) {
            for (let i = 0; i < dataYifei.dataview.length; i++) {
                echartDataYifei.push(dataYifei.dataview[i].datavalue);
                echartDataTimeYifei.push(dataYifei.dataview[i].date_str)
            }

            const lineEchartYifei = document.getElementById('lineEchartYifei')
            echarts.init(lineEchartYifei).setOption(lineChart('羿飞评级', '羿飞评级', echartDataTimeYifei, echartDataYifei));
        }

    }
})

export default Shuzhi;
