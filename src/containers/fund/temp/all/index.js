import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';

import { pieFund } from '../../../../echart/pie';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class List extends React.Component {
    render() {
        const { listData, type } = this.props;
        var len = 3;
        if (type == 3) {
            len = 5
        }
        return (
            <div className={"fundCon fundCon" + type}>
                <div className="hd">
                    <span className={'type type' + type}>{type}号</span>
                    <span className="tit">
                        {
                            type == 1 ?
                                '稳健型'
                                :
                                type == 2 ?
                                    '平衡型'
                                    :
                                    '收益型'
                        }
                        示范投资
                    </span>
                </div>
                {
                    listData.length > 0 ?
                        <div className='echart' id={'fundEchart' + type}></div>
                        :
                        null
                }
                <div className="sm">
                    <dl>
                        <dt>安全指数</dt>
                        <dd className="icon">
                            <Icon type={require('../../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                            <Icon type={require('../../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                            <Icon type={require('../../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                            {
                                type == 1 ?
                                    <Icon type={require('../../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                    :
                                    null
                            }
                            {
                                type == 1 ?
                                    <Icon type={require('../../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                    :
                                    null
                            }
                            {
                                type == 2 ?
                                    <Icon type={require('../../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                    :
                                    null
                            }
                        </dd>
                    </dl>
                    <dl>
                        <dt>适合人群</dt>
                        <dd>
                            {
                                type == 1 ?
                                    '适合以稳健安全为首选目标，风险厌恶型的人群。'
                                    :
                                    type == 2 ?
                                        '适合以平衡为首选目标，能承受低风险的人群。'
                                        :
                                        '适合以收益为首选目标，能承受少量风险的人群。'
                            }
                        </dd>
                    </dl>

                </div>
                {
                    listData.length > 0 ?
                        <div className="list">

                            <div className="left">
                                <dl className="">
                                    <dt className="item">
                                        <span className="ic1">在投平台</span>
                                        <span className="ic2">利率</span>
                                    </dt>
                                    {
                                        listData.map((item, i) => {
                                            if (i < len) {
                                                return (
                                                    <dd className={"item"} key={i}>
                                                        <Link to={'/detail/' + item.id_dlp} className="ic1">{item.plat_name}</Link>
                                                        <span className={"ic2 icc" + type}>{item.fund_rate}%</span>
                                                    </dd>
                                                )
                                            }
                                        })
                                    }
                                </dl>
                            </div>
                            {
                                listData.length > len ?
                                    <div className="right">
                                        <dl className="">
                                            <dt className="item">
                                                <span className="ic1">在投平台</span>
                                                <span className="ic2">利率</span>
                                            </dt>
                                            {
                                                listData.map((item, i) => {
                                                    if (i >= len) {
                                                        return (
                                                            <dd className="item" key={i}>
                                                                <Link to={'/detail/' + item.id_dlp} className="ic1">{item.plat_name}</Link>
                                                                <span className="ic2">{item.fund_rate}%</span>
                                                            </dd>
                                                        )
                                                    }
                                                })
                                            }
                                        </dl>
                                    </div>
                                    :
                                    null
                            }

                        </div>
                        :
                        <div className="null">暂无</div>
                }

            </div>
        )
    }
    componentDidMount() {
        const { listData, type, echartColor } = this.props;
        var fundData = [];

        if (listData.length > 0) {
            for (let i = 0; i < listData.length; i++) {
                fundData.push({ value: listData[i].fund_amount, name: listData[i].plat_name + '\n' + '(' + listData[i].fund_amount + '万)' })
            }

            const fundEchart = document.getElementById('fundEchart' + type)
            echarts.init(fundEchart).setOption(pieFund(fundData, echartColor));
        }

    }
}






export default class All extends React.Component {

    render() {
        const { data } = this.props;
        return (
            <div className="fundAllContainer">
                <div className="top">
                    <div className="intr">
                        <p>示范投资是贷罗盘运营团队发起的网贷领投项目，按照风险评估分为“稳健型”、“平衡型”、“收益型”三种，可供广大投资人参考。</p>
                        <p className="p">示范投资目前投资总额为 <i className="num">{data.investall}万</i></p>
                    </div>
                    <div className="note">
                        <p>※ 建议合理分配资金，选择优质平台分散投资</p>
                        <p>※ 示范投资仅起到参考作用</p>
                    </div>
                </div>
                <List listData={data.fund1} echartColor={['#4847bf', '#7f7fff', '#006699', '#94c4e2', '#4d9dcf']} type={1} />
                <List listData={data.fund2} echartColor={['#ffc55c', '#e88613', '#9c6c33', '#e2b394', '#c69c6d']} type={2} />
                <List listData={data.fund3} echartColor={['#b19deb', '#9c45de', '#4d226d', '#8557a7', '#662d91', '#9a308d', '#9686ae', '#9b9fc3', '#8f71a6', '#6264d6']} type={3} />

            </div>
        )
    }

}