import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import Theme from '../../../utils/theme';
import Util from '../../../utils/util';
import Title from '../../../components/title';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import { pieYulun } from '../../../echart/pie';

import './index.scss';
const clientWidth = window.screen.width;

class List extends React.Component {
    render() {
        const { labelText, data } = this.props;
        return (
            <div className="list">
                <div className="listlabel">{labelText}</div>
                <div className="listCon">
                    <Icon type={require('../../../assets/icons/new/arrow-' + data.preday.change + '.svg')} color={data.preday.change == 'up' ? Theme.upColor : Theme.downColor} size={'xxs'} />
                    <span className="listNum">{data.valuenum}</span>
                </div>
            </div>
        )
    }
}

class PieEchart extends React.Component {
    render() {
        return (
            <div className='pieEchart' id='pieEchartYulun'></div>
        )
    }
    componentDidMount() {

        var dataList = this.props.data;
        var echartsData = [];
        for (var i = 0; i < dataList.length; i++) {
            echartsData.push({ value: dataList[i].date_snum, name: dataList[i].platname })
        }
        const pieEchartYulun = document.getElementById('pieEchartYulun')
        echarts.init(pieEchartYulun).setOption(pieYulun(echartsData));
    }
}


export default class HomeDapan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
        };
    }
    render() {
        const { data, history } = this.props;
        const { isHidden } = this.state;
        const inamount = data.inamount;
        const markent = data.markent;

        let echartsDataList = data.echartYulun;



        return (
            <div className='homeDapanContainer box mt10'>
                <Title data={'行业动态'} />
                <div className="content">
                    <div className="status">
                        <div className="left">
                            <div className="t">资金流状态</div>
                            <div className="s">{inamount.status}</div>
                        </div>
                        <div className="right">
                            <div className={clientWidth > 350 ? 'keduContainer' : 'keduContainer keduContainer2'}>
                                <img src={require('../../../assets/images/kedu.png')} className='kedu' />
                                <img src={require('../../../assets/images/zhizhen.png')} className='zhizhen' style={clientWidth > 350 ? { left: inamount.score / 180 * 4.6 + 'rem' } : { left: inamount.score / 180 * 4.2 + 'rem' }} />
                            </div>
                        </div>
                    </div>
                    <div className="statusDescribe">{inamount.detailinfo}</div>
                    <div className="dapanNumContainer">
                        <a className="openBtn" onClick={() => {
                            this.setState({
                                isHidden: !this.state.isHidden
                            })
                        }} >
                            {isHidden ? '展开大盘参数' : '收起大盘参数'}
                        </a>
                        {
                            !isHidden ?
                                <div className="dapanNumList">
                                    <List labelText={'资金流指数'} data={markent.inamount} />
                                    <List labelText={'交易指数'} data={markent.amount} />
                                    <List labelText={'人气指数'} data={markent.popularity} />
                                    <List labelText={'流动性指数'} data={markent.mobility} />
                                    <List labelText={'分散度指数'} data={markent.dispersion} />
                                    <List labelText={'忠诚度指数'} data={markent.loyalty} />
                                    <List labelText={'利率指数'} data={markent.rate} />
                                </div>
                                :
                                null
                        }

                    </div>
                    <div className="newBlack">
                        <div className="title">
                            <div className="left">
                                <span className="icon"><Icon type={require('../../../assets/icons/new/ico-zhengyi.svg')} color={"#A81616"} size={'xxs'} /></span>
                                <span className="label">最新争议平台</span>
                            </div>
                            <Link to="/zhengyi" className="more">
                                <span className="label"> 查看更多</span>
                                <span className="icon"><Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={"#ccc"} size={'xxs'} /></span>
                            </Link>
                        </div>
                        <ul className="list">
                            {
                                data.newZhengyi.map((item, i) => {
                                    return (
                                        <li key={i} className="item">
                                            <Link className="plat" to={'/detail/' + item.id_dlp}>{item.plat_name}</Link>
                                            <span className="date">{item.platback}</span>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                    <div className="newBlack">
                        <div className="title">
                            <div className="left">
                                <span className="icon"><Icon type={require('../../../assets/icons/new/ico-black.svg')} color={"#1A1A1A"} size={'xxs'} /></span>
                                <span className="label">最新黑名单平台</span>
                            </div>
                            <Link to="/black" className="more">
                                <span className="label"> 查看更多</span>
                                <span className="icon"><Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={"#ccc"} size={'xxs'} /></span>
                            </Link>
                        </div>
                        <ul className="list">
                            {
                                data.newBlack.map((item, i) => {
                                    return (
                                        <li key={i} className="item">
                                            <Link className="plat" to={'/detail/' + item.id_dlp}>{item.plat_name}</Link>
                                            <span className="date">{item.platback}</span>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                    <div className="newBlack newGongshang">
                        <div className="title">
                            <div className="left">
                                <span className="icon"><Icon type={require('../../../assets/icons/new/ico-gongshang.svg')} color={"#025FAA"} size={'xxs'} /></span>
                                <span className="label">最新工商变更</span>
                            </div>
                            <Link to="/gongshang" className="more">
                                <span className="label"> 查看更多</span>
                                <span className="icon"><Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={"#ccc"} size={'xxs'} /></span>
                            </Link>
                        </div>
                        <ul className="list">
                            {
                                data.gongshang.map((item, i) => {
                                    return (
                                        <li key={i} className="item">
                                            <Link className="plat" to={'/detail/' + item.id_dlp}>{item.plat_name}</Link>
                                            <span className="type">[{item.type}]</span>
                                            <span className="date">{Util.formatDate3(item.updatetime)}</span>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                    <div className="yulun">
                        <PieEchart data={echartsDataList} />
                        <div className="echartTitle">过去48小时舆论热点分布</div>
                        <div className="yulunNumm">
                            <span>舆论总条数：<i className="num">{data.numYulun.all_num}</i></span>
                            <span>昨日条数：<i className="num">{data.numYulun.date_num}</i></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


