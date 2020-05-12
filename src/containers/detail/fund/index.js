import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Header from '../../../components/navbar';
import Theme from '../../../utils/theme';
import './index.scss';

export default class DetailFund extends React.Component {
    render() {
        const { history } = this.props;
        const stateData = this.props.location.state;
        const platName = stateData.platName;
        const data = stateData.data;
        const fundelse = stateData.fundelse;
        var len = 3;
        if (data.fund_type == 3) {
            len = 5
        }
        return (
            <div className="ptNoTab detailFundContainer">
                <Header title={platName + ' | 示范投资'} history={history} black={true} />
                <div className="content">
                    <div className="box info">
                        <div className="hd">
                            <span className="icon"><Icon type={require('../../../assets/icons/new/fund-icon.svg')} color={Theme['fund' + data.fund_type + 'Color']} size={'sm'} /></span>
                            <span className="plat">{platName}</span>
                        </div>
                        <div className="bd">
                            <dl>
                                <dt className="item">
                                    <span className="ic1">投资状态</span>
                                    <span className="ic2">在投项目</span>
                                    <span className="ic3">投资额</span>
                                    <span className="ic4">年化收益率</span>
                                </dt>
                                {
                                    data.investlist.map((item, i) => {
                                        return (
                                            <dd className="item" key={i}>
                                                <span className="ic1">已参投</span>
                                                <span className="ic2">{item.name}</span>
                                                <span className="ic3">{item.invest}万</span>
                                                <span className="ic4">{item.rate}%</span>
                                            </dd>
                                        )
                                    })
                                }
                            </dl>
                            <div className="reasons">
                                <h6 className="h6">投资理由</h6>
                                <div className="con">
                                    {
                                        data.fund_reasons.split('<br />').map((list, z) => {
                                            return (
                                                <p key={z}>{list}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"box mt10 other"}>
                        <div className="hd">
                            <span className={'type type' + data.fund_type}>{data.fund_type}号</span>
                            <span className="tit">
                                {
                                    data.fund_type == 1 ?
                                        '稳健型'
                                        :
                                        data.fund_type == 2 ?
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
                                    <Icon type={require('../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                    <Icon type={require('../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                    <Icon type={require('../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                    {
                                        data.fund_type == 1 ?
                                            <Icon type={require('../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                            :
                                            null
                                    }
                                    {
                                        data.fund_type == 1 ?
                                            <Icon type={require('../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                            :
                                            null
                                    }
                                    {
                                        data.fund_type == 2 ?
                                            <Icon type={require('../../../assets/icons/new/fund-dunpai.svg')} color={'#FF9800'} size={'xxs'} />
                                            :
                                            null
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt>适合人群</dt>
                                <dd>
                                    {
                                        data.fund_type == 1 ?
                                            '适合以稳健安全为首选目标，风险厌恶型的人群。'
                                            :
                                            data.fund_type == 2 ?
                                                '适合以平衡为首选目标，能承受低风险的人群。'
                                                :
                                                '适合以收益为首选目标，能承受少量风险的人群。'
                                    }
                                </dd>
                            </dl>

                        </div>
                        {
                            fundelse.length > 0 ?
                                <div className="list">

                                    <div className="left">
                                        <dl className="">
                                            <dt className="item">
                                                <span className="ic1">在投平台</span>
                                                <span className="ic2">利率</span>
                                            </dt>
                                            {
                                                fundelse.map((item, i) => {
                                                    if (i < len) {
                                                        return (
                                                            <dd className={"item"} key={i}>
                                                                <Link to={'/detail/' + item.id_dlp} className="ic1">{item.plat_name}</Link>
                                                                <span className={"ic2 icc" + data.fund_type}>{item.fund_rate}%</span>
                                                            </dd>
                                                        )
                                                    }
                                                })
                                            }
                                        </dl>
                                    </div>
                                    {
                                        fundelse.length > len ?
                                            <div className="right">
                                                <dl className="">
                                                    <dt className="item">
                                                        <span className="ic1">在投平台</span>
                                                        <span className="ic2">利率</span>
                                                    </dt>
                                                    {
                                                        fundelse.map((item, i) => {
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
                </div>
            </div>
        )
    }

}