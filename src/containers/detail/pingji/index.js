import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd-mobile';
import Api from '../../../utils/api';
import Theme from '../../../utils/theme';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import Title from '../../../components/title';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import LineChart from '../../../echart/line';

import './index.scss';

const width = document.body.clientWidth;

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }
    render() {
        const { label, data, score, score2 } = this.props;
        const { isHidden } = this.state;
        if (data !== null) {
            return (
                <div className={label == '综合指数' ? "list zh" : 'list'}>
                    <div className={width < 375 ? "hd hdMix" : 'hd'}>
                        <span className="label">{label}</span>
                        <span className="score">{data[score]}&nbsp;{score2 ? data[score2] : null}</span>
                        <span className="orderText">统计{data.totalNum}家平台中排名</span>
                        <span className="ordernum">{data.ordernum}</span>
                        {
                            this.props.children ?
                                <span className="btn" onClick={() => {
                                    this.setState({
                                        isHidden: !this.state.isHidden
                                    })
                                }}>
                                    <Icon type={isHidden ? require('../../../assets/icons/new/circle-down.svg') : require('../../../assets/icons/new/circle-up.svg')} color={isHidden ? '#bbb' : '#4AB3FF'} size={'sm'} /></span>
                                :
                                null
                        }

                    </div>
                    {
                        this.props.children ?
                            isHidden ?
                                null
                                :
                                this.props.children
                            :
                            null
                    }
                </div>
            )
        }
        else {
            return (
                <div className={label == '综合指数' ? "list zh" : 'list'}>
                    <div className="hd">
                        <span className="label">{label}</span>
                        <span className="null">暂无</span>
                    </div>
                </div>
            )
        }
    }
}

class EchartLine extends React.Component {

    render() {
        const { id } = this.props;
        return (
            <div className="lineEchartD" id={id}></div>
        )
    }

    componentDidMount() {
        const { data, id, title, name } = this.props;
        const echartDataTime = [];
        const echartData = [];
        const echartDataTextR360 = [];

        for (let i = 0; i < data.length; i++) {
            echartData.push(data[i].datavalue);
            echartDataTime.push(data[i].date_str)
            if (id == 'echartR360') {
                echartDataTextR360.push(data[i].text)
            }

        }
        const lineEchart = document.getElementById(id)
        if (id == 'echartR360') {
            echarts.init(lineEchart).setOption(LineChart.line1(title, name, echartDataTime, echartData, echartDataTextR360));
        }
        else {
            echarts.init(lineEchart).setOption(LineChart.line1(title, name, echartDataTime, echartData));
        }

    }
}


class DetailPingji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [true, true, true, true, true, true, true]
        }
    }
    render() {
        const { data, detailCommon, history } = this.props;
        const { isHidden } = this.state;
        if (data.isFetching) {
            return <Loading />
        }
        else {
            const gradecompare = data.dataSource.gradecompare;
            const dataPj = data.dataSource.dataDetail;
            const dataZh = dataPj.database;
            const wdzj = dataPj.wdzj;
            const p2peye = dataPj.p2peye;
            const dlp = dataPj.dlp;
            const rong360 = dataPj.rong360;
            const yifei = dataPj.yifei;
            const yuanwang = dataPj.yuanwang;

            var gradecompareArr;
            var gradecompareText = [detailCommon.plat_name, '行业平均', '行业高', '行业低']
            if (gradecompare != '') {
                gradecompareArr = gradecompare.split(',');
            }

            return (
                <div className="detailPingjiContainer">
                    <div className="box detailPingjiBox">
                        <Title data={'机构评级监控'} />
                        <div className="content">
                            {
                                dataPj.score !== null && dataPj.score !== 0 && detailCommon.platstatus == 1 ?
                                    <List label={'综合指数'} data={dataPj} score={'score'} >
                                        <div className="listInfo">
                                            <div className="bijiao">
                                                <span className="text">较上月</span>
                                                <span className="icon"><Icon type={dataPj.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={dataPj.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} /></span>
                                                <span className={dataPj.changnum >= 0 ? "up changnum" : "down changnum"}>{Math.abs(dataPj.changnum)}%</span>
                                            </div>
                                            <ul className="compareContainer">
                                                {
                                                    gradecompareArr.map((item, i) => {
                                                        return (
                                                            <li key={i}>
                                                                <span className="progress" style={{ width: item / gradecompareArr[2] * 0.5 * 100 + '%' }}></span>
                                                                <span className="label">{gradecompareText[i]}</span>
                                                                <span className="num">{item}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            {
                                                dataZh !== null ?
                                                    <EchartLine data={dataZh.dataview} id={'echartZh'} title={'综合指数'} name={'综合指数'} />
                                                    :
                                                    null
                                            }

                                        </div>
                                    </List>
                                    :
                                    <List label={'综合指数'} data={null} />
                            }
                            <List label={'之家评级'} data={wdzj} score={'fzzhishu'}>
                                {
                                    wdzj !== null ?
                                        <div className="listInfo">
                                            <div className="bijiao">
                                                <span className="text">较上月</span>
                                                <span className="icon"><Icon type={wdzj.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={wdzj.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} /></span>
                                                <span className={wdzj.changnum >= 0 ? "up changnum" : "down changnum"}>{Math.abs(wdzj.changnum)}%</span>
                                            </div>
                                            <div className="info">
                                                <span>成&nbsp;&nbsp;&nbsp;交：{wdzj.chengjiao}</span>
                                                <span>人&nbsp;&nbsp;&nbsp;气：{wdzj.renqi}</span>
                                                <span>合&nbsp;&nbsp;&nbsp;规：{wdzj.ganggan}</span>
                                                <span>品&nbsp;&nbsp;&nbsp;牌：{wdzj.ldxing}</span>
                                                <span>分散度：{wdzj.fsdu}</span>
                                                <span>透明度：{wdzj.tmdu}</span>
                                            </div>
                                            <EchartLine data={wdzj.dataview} id={'echartWdzj'} title={'之家评级'} name={'之家评级'} />
                                        </div>
                                        : null
                                }

                            </List>
                            <List label={'天眼评级'} data={p2peye} score={'level'} score2={'score'}>
                                {
                                    p2peye !== null ?
                                        <div className="listInfo">
                                            <div className="bijiao">
                                                <span className="text">较上月</span>
                                                <span className="icon"><Icon type={p2peye.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={p2peye.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} /></span>
                                                <span className={p2peye.changnum >= 0 ? "up changnum" : "down changnum"}>{Math.abs(p2peye.changnum)}%</span>
                                            </div>
                                            <div className="info">
                                                <span>信&nbsp;&nbsp;&nbsp;披：{p2peye.xscore}</span>
                                                <span>合&nbsp;&nbsp;&nbsp;规：{p2peye.hscore}</span>
                                                <span>期&nbsp;&nbsp;&nbsp;限：{p2peye.limit_t}</span>
                                                <span>利&nbsp;&nbsp;&nbsp;率：{p2peye.rate}</span>
                                                <span>偿兑性：{p2peye.claims}</span>
                                                <span>运&nbsp;&nbsp;&nbsp;营：{p2peye.operation}</span>
                                                <span>地域性：{p2peye.regional}</span>
                                                <span>资金流：{p2peye.standard}</span>
                                                <span>投&nbsp;&nbsp;&nbsp;资：{p2peye.investment}</span>
                                                <span>借&nbsp;&nbsp;&nbsp;款：{p2peye.borrowing}</span>
                                                <span>流动性：{p2peye.liquidity}</span>
                                            </div>
                                            <EchartLine data={p2peye.dataview} id={'echartP2peye'} title={'天眼评级'} name={'天眼评级'} />
                                        </div>
                                        :
                                        null
                                }

                            </List>
                            {
                                dlp !== null && detailCommon.platstatus == 1 && dlp.ordernum > 0 ?
                                    <List label={'贷罗盘指数'} data={dlp} score={'score'}>
                                        <div className="listInfo">
                                            <div className="bijiao">
                                                <span className="text">较上月</span>
                                                <span className="icon"><Icon type={dlp.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={dlp.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} /></span>
                                                <span className={dlp.changnum >= 0 ? "up changnum" : "down changnum"}>{Math.abs(dlp.changnum)}%</span>
                                            </div>
                                            <div className="info">
                                                <span>资金流：{dlp.inamount}</span>
                                                <span>人&nbsp;&nbsp;&nbsp;气：{dlp.popularity}</span>
                                                <span>收益率：{dlp.rate}</span>
                                                <span>流动性：{dlp.mobility}</span>
                                                <span>分散度：{dlp.dispersion}</span>
                                                <span>忠诚度：{dlp.loyalty}</span>
                                                <span>体&nbsp;&nbsp;&nbsp;量：{dlp.stayStill}</span>
                                                <span>成长性：{dlp.growth}</span>
                                            </div>
                                            <EchartLine data={dlp.dataview} id={'echartDlp'} title={'贷罗盘指数'} name={'贷罗盘指数'} />
                                        </div>
                                    </List>
                                    :
                                    <List label={'贷罗盘指数'} data={null} />
                            }
                            <List label={'融360评级'} data={rong360} score={'level'}>
                                {
                                    rong360 !== null ?
                                        <div className="listInfo">
                                            <div className="info">
                                                <span>收    益：{rong360.rate}</span>
                                                <span>人    气：{rong360.renqi}</span>
                                            </div>
                                            <EchartLine data={rong360.dataview} id={'echartR360'} title={'融360评级'} name={'融360评级'} />
                                        </div>
                                        :
                                        null
                                }

                            </List>
                        </div>
                    </div>

                </div>
            )
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        const { id, dispatch } = this.props;
        const url = Api.detail + '?type=all' + '&id_dlp=' + id;
        dispatch(fetchPostsDeatail('pingji', url))
    }


}


function mapStateToProps(state) {
    return {
        data: state.deatail.pingji,
        detailCommon: state.deatail.common.dataSource
    };
}

export default connect(mapStateToProps)(DetailPingji);


