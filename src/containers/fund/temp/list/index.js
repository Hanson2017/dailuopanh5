import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Util from '../../../../utils/util';
import Theme from '../../../../utils/theme';

import { pieFund } from '../../../../echart/pie';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fundData: '',
        };
    }
    componentWillMount() {
        let data = this.props.data;
        let fundData = [];
        for (let i = 0; i < data.length; i++) {
            fundData.push({ value: data[i].fund_amount, name: data[i].plat_name + '\n' + '(' + data[i].fund_amount + '万)' })
        }
        this.setState({
            fundData: fundData
        })
    }
    render() {

        const { data, type, echartColor } = this.props;



        return (
            <div className="fundListContainer">
                <div className="top">
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
                        data.length > 0 ?
                            <div>
                                <div className='echart' id={'fundEchart' + type}></div>
                                <div className="echartBtn">投资组成</div>
                            </div>
                            :
                            <div className="null">暂无</div>
                    }

                </div>
                {
                    data.map((item, i) => {
                        return (
                            <div className="list" key={i}>
                               
                                <Link className="hd" to={'/detail/' + item.id_dlp}>
                                    <div className="l">
                                        <span className="icon"><Icon type={require('../../../../assets/icons/new/fund-icon.svg')} color={Theme['fund' + type + 'Color']} size={'xs'} /></span>
                                        <span className="plat">{item.plat_name}</span>
                                    </div>
                                    <div className="r"><Icon type={require('../../../../assets/icons/new/arrow-right.svg')} color={'#ccc'} size={'xxs'} /></div>
                                </Link>
                                <div className="bd">
                                    <dl>
                                        <dt className="item">
                                            <span className="ic1">[在投项目]</span>
                                            <span className="ic2">[投资额]</span>
                                            <span className="ic3">[年化收益率]</span>
                                        </dt>
                                        {
                                            item.investlist.map((list, j) => {
                                                return (
                                                    <dd key={j} className="item">
                                                        <span className="ic1">{list.name}</span>
                                                        <span className="ic2">{list.invest}万</span>
                                                        <span className={"ic3 icc" + type}>{list.rate}%</span>
                                                    </dd>
                                                )
                                            })
                                        }
                                    </dl>
                                </div>
                                <div className="reasons">
                                    <h6 className="h6">[投资理由]</h6>
                                    <div className="con">
                                        {
                                            item.fund_reasons.split('<br />').map((list, z) => {
                                                return (
                                                    <p key={z}>{list}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        )

                    })
                }

            </div>
        )
    }
    componentDidMount() {
        const { type, echartColor } = this.props;
        const { fundData } = this.state;

        if (fundData.length > 0) {
            const fundEchart = document.getElementById('fundEchart' + type)
            echarts.init(fundEchart).setOption(pieFund(fundData, echartColor));
        }
    }
}