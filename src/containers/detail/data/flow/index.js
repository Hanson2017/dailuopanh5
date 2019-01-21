import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd-mobile';
import Api from '../../../../utils/api';
import Theme from '../../../../utils/theme';
import { fetchPostsDeatail } from '../../../../redux/actions/index';
import Loading from '../../../../components/loading/index';
import TabBar from '../../../../components/tabBar2/tabs';


import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import LineChart from '../../../../echart/line';

class List extends React.Component {
    render() {
        const { label, echartID, valText, score } = this.props;
        return (
            <ul className='list'>
                <li className='name'>{label}</li>
                <li className='echart' id={echartID}></li>
                <li className='num'>{valText}<b>{score}</b></li>
            </ul>
        )
    }
    componentDidMount() {

        const { dataList, label, echartID } = this.props;

        var dataListNew = [];
        if (dataList != 0) {
            dataListNew = dataList.split(',');
        }

        const lineEchart = document.getElementById(echartID)
        echarts.init(lineEchart).setOption(LineChart.lineChartFlow(label, dataListNew));
    }

}


class DetailDataFlow extends React.Component {
    render() {
        const { detailFlow, detailCommon } = this.props;
        if (detailFlow.isFetching) {
            return <Loading />
        }
        else {
            const data = detailFlow.dataSource.dataDetail


            return (
                <div className="detailDataFlowContainer">
                    {
                        data !== null ?
                            <div>
                                <ul className="box score">
                                    <li>
                                        <span className="label">流量综合指数</span>
                                        <span className="num">{data.score}</span>
                                        <span className="bijiao">
                                            较上月
                                    <Icon type={data.changnum >= 0 ? require('../../../../assets/icons/new/arrow-up.svg') : require('../../../../assets/icons/new/arrow-down.svg')} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />
                                            <i className={data.changnum >= 0 ? "up" : "down"}>{Math.abs(data.changnum)}%</i>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">流量排名</span>
                                        <span className="num">{data.ordernum}</span>
                                        <span className="tj">在统计的{data.totalNum}家平台中</span>
                                    </li>
                                </ul>

                                <div className="box mt10 listContainer">
                                    <List dataList={data.zs_baidu_str} label={'百度指数'} echartID={'echartBaidu'} valText={'指数'} score={data.zs_baidu} />
                                    <List dataList={data.pr_zz_str} label={'站长工具'} echartID={'echartZhanzhang'} valText={'权重'} score={data.pr_zz} />
                                    <List dataList={data.pr_az_str} label={'爱站网'} echartID={'echartAizhan'} valText={'权重'} score={data.pr_az} />
                                    <List dataList={data.zs_so_str} label={'好搜指数'} echartID={'echartSo'} valText={'指数'} score={data.zs_so} />
                                </div>
                            </div>
                            :
                            <div className='null'>暂无数据</div>
                    }

                </div>
            )


        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=flow' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('flow', url))
    }
}

function mapStateToProps(state) {
    return {
        detailFlow: state.deatail.flow,
        detailCommon: state.deatail.common.dataSource
    };
}

export default connect(mapStateToProps)(DetailDataFlow);


