import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd-mobile';
import Api from '../../../../utils/api';
import { fetchPostsDeatail } from '../../../../redux/actions/index';
import Loading from '../../../../components/loading/index';
import TabBar from '../../../../components/tabBar2/tabs';

import { lineChartFlow } from '../../../../echart/line';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import './index.scss';


class FlowList extends React.Component {
    render() {
        const flowEchartId = this.props.flowEchartId;
        return (
            <ul className='flowList'>
                <li className='flowListName'>{this.props.flowName}</li>
                <li className='flowListChart' id={flowEchartId}></li>
                <li className='flowListNum'>{this.props.flowValName}<b>{this.props.dataZhishu}</b></li>
            </ul>
        )
    }
    componentDidMount() {
        const dataList = this.props.dataList;
        const flowEchartId = this.props.flowEchartId;

        var dataListNew = [];
        if (dataList != 0) {
            dataListNew = dataList.split(',');
        }

        const lineEchart = document.getElementById(flowEchartId)
        echarts.init(lineEchart).setOption(lineChartFlow(this.props.flowName, dataListNew));
    }

}


class DetailFlow extends React.Component {
    render() {
        const { detailFlow, detailCommon } = this.props;
        if (detailFlow.isFetching || detailCommon.isFetching) {
            return <Loading />
        }
        else {
            const data = detailFlow.dataSource.dataDetail
            if (detailCommon.dataSource.platstatus != 1) {
                return (
                    <span className='nullBlack'>黑名单平台，已停止流量监控</span>
                )
            }
            else {
                return (
                    <div>
                        {
                            data != null ?
                                <div>
                                    <div className='healthInfoHead'>
                                        <div className='info'>
                                            <span className="ic1">综合指数</span>
                                            <span className="ic2">{data.score}</span>
                                            <span className="ic3">( 统计{data.totalNum}家平台中排名<b>{data.ordernum}</b> )</span>
                                        </div>
                                        <p>较上月
                            <span><Icon type={data.changnum >= 0 ? require('../../../../assets/icons/arrow-up.svg') : require('../../../../assets/icons/arrow-down.svg')} color={data.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                            </span>
                                            {data.changnum >= 0 ? data.changnum : -data.changnum}%
                            </p>
                                    </div>
                                    <div className='flowwp'>
                                        {
                                            data != null ?
                                                <div>
                                                    <FlowList flowName={'百度指数'} flowValName={'指数'} dataList={data.zs_baidu_str} flowEchartId={'flowEchartBaiDu'} dataZhishu={data.zs_baidu} />
                                                    <FlowList flowName={'站长工具'} flowValName={'权重'} dataList={data.pr_zz_str} flowEchartId={'flowEchartZhanzhang'} dataZhishu={data.pr_zz} />
                                                    <FlowList flowName={'爱站网'} flowValName={'权重'} dataList={data.pr_az_str} flowEchartId={'flowEchartAizhan'} dataZhishu={data.pr_az} />
                                                    <FlowList flowName={'好搜'} flowValName={'指数'} dataList={data.zs_so_str} flowEchartId={'flowEchartSo'} dataZhishu={data.zs_so} />
                                                    <FlowList flowName={'76676'} flowValName={'指数'} dataList={data.zs_76676_str} flowEchartId={'flowEchart766'} dataZhishu={data.zs_76676} />
                                                </div>
                                                :
                                                <div className='dataNull'>暂无负面数据</div>

                                        }

                                    </div>
                                </div>    
                                :
                                <span className='dataNull'>暂无数据</span> 
                        }

                    </div>
                )
            }

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
        detailCommon: state.deatail.common
    };
}

export default connect(mapStateToProps)(DetailFlow);


