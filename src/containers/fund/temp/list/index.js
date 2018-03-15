import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../../../utils/util';
import UpDateTime from '../../../../components/upDateTime';

import { pieFund } from '../../../../echart/pie';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import './index.scss';

export default class List extends React.Component {
    render() {

        let data = this.props.data;
        let type = this.props.fundType;

        let fundType, fundS, fundRenqun, star;
        switch (type) {
            case 1:
                fundType = '1号';
                fundS = '稳健型';
                fundRenqun = '以稳健安全为首选目标，风险厌恶型的人群';
                star = '★★★★★';
                break;
            case 2:
                fundType = '2号';
                fundS = '平衡型';
                fundRenqun = '以平衡为首选目标，能承受低风险的人群';
                star = '★★★★';
                break;
            case 3:
                fundType = '3号';
                fundS = '收益型';
                fundRenqun = '以收益为首选目标，能承受少量风险的人群';
                star = '★★★';
                break;
            case 4:
                fundType = '活期';
                fundS = '高流动型';
                fundRenqun = '高流动性为首选目标，0-3万资金暂存的人群';
                star = '★★★';
                break;
        }
        return (
            <div>
                <UpDateTime updatetime={Util.setDate(new Date())} />
                <div className='fundListTitle'>示范投资({fundS}）</div>
                <div className='fundlistTop'>
                    <p>安全指数：{star}</p>
                    <p>适合人群：{fundRenqun}</p>
                    <p>投资组成如下：</p>
                </div>
                <div className='fundEchart' id={this.props.fundEchartID} style={{ 'width': '6.4rem' }}></div>
                <div className='fundTextlist'>
                    {
                        data.map((text, i) => {
                            return (
                                <Link key={i} className='list' to={'/detail/' + text.id_dlp}>
                                    <div className='fundlistHd'>
                                        <span className='platname'>{text.plat_name}</span>
                                        <span className='rate'>平均利率：<i>{text.fund_rate}%</i></span>
                                        <span className='amount'>已投资：<i>{text.fund_amount}%</i></span>
                                    </div>
                                    <div className='fundlistReasons'>
                                        {
                                            text.fund_reasons.split('<br />').map((list, index) => {
                                                return (
                                                    <p key={index}>{list}</p>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='fundlistFt'>综上，{fundType}示范投资（{fundS}）决定进入投资。</div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        var fundEchartID = this.props.fundEchartID;
        var fundData = [];
        for (let i = 0; i < data.length; i++) {
            fundData.push({ value: data[i].fund_amount, name: data[i].plat_name + '\n' + '(' + data[i].fund_amount + '万)' })
        }

        const fundEchart = document.getElementById(fundEchartID)
        echarts.init(fundEchart).setOption(pieFund(fundData));
    }
}