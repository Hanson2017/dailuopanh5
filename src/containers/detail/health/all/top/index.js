import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import Theme from '../../../../../utils/theme';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import { radarEchart } from '../../../../../echart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';


class ModuleH extends React.Component {

    render() {
        return (
            <div className='healthModuleEchart' id='healthModuleEchart'>模型</div>
        )
    }
    componentDidMount() {
        const { platName, data } = this.props;
        const dlpDetail = data.dlpDetail;
        const industryDetail = data.industryDetail;
        const platdata = [dlpDetail.inamount, dlpDetail.dispersion, dlpDetail.mobility, dlpDetail.rate, dlpDetail.popularity, dlpDetail.stayStill, dlpDetail.loyalty, dlpDetail.growth]
        const platdata_ind = [industryDetail.inamount, industryDetail.dispersion, industryDetail.mobility, industryDetail.rate, industryDetail.popularity, industryDetail.stayStill, industryDetail.loyalty, industryDetail.growth]

        const healthModuleEchart = document.getElementById('healthModuleEchart');

        echarts.init(healthModuleEchart).setOption(radarEchart(platName, platdata, platdata_ind));

    }
}

export default class DetailHealthAllTop extends React.Component {
    render() {
        const { platName, data } = this.props;
        const dataDlp = data.dlpDetail;
        const dataIndustry = data.industryDetail;


        return (
            <div className="box top">
                {
                    dataDlp != null && dataIndustry != null ?
                        <div>
                            <ul className="score">
                                <li>
                                    <span className="label">健康度指数</span>
                                    <span className="num">{dataDlp.score}</span>
                                    <span className="bijiao">
                                        较上月
                                <Icon type={dataDlp.changnum >= 0 ? require('../../../../../assets/icons/new/arrow-up.svg') : require('../../../../../assets/icons/new/arrow-down.svg')} color={dataDlp.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />
                                        <i className={dataDlp.changnum >= 0 ? "up" : "down"}>{Math.abs(dataDlp.changnum)}%</i>
                                    </span>
                                </li>
                                <li>
                                    <span className="label">健康度排名</span>
                                    <span className="num">{dataDlp.ordernum}</span>
                                    <span className="tj">在统计的{dataDlp.totalNum}家平台中</span>
                                </li>
                            </ul>
                            <ModuleH data={data} platName={platName} />
                        </div>
                        :
                        <div className="null">暂无数据</div>
                }

            </div>
        )




    }
}