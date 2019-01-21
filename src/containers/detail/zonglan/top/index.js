import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Theme from '../../../../utils/theme';
import Util from '../../../../utils/util';
import Mianze from './mianze';

export default class DetailZonglanTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHiddenMianze: true,
        }
    }
    render() {
        const { dataZonglan, detailCommon } = this.props;
        return (
            <div className="box topCon">
                <div className="info">
                    <div className="l">
                        <div className="platCon">
                            <span className="platName">{detailCommon.plat_name}</span>
                            {
                                detailCommon.fundtype !== 0 && detailCommon.fundtype !== null ?
                                    <div className="fundtype">
                                        <Icon type={require('../../../../assets/icons/new/fund-icon.svg')} color={Theme['fund' + detailCommon.fundtype + 'Color']} />
                                        <span className="fundtypeNo">{detailCommon.fundtype}</span>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="uptime">上线时间：{detailCommon.uptime != '1900-01-01' ? detailCommon.uptime : '未知'}</div>
                        <div className="">官方网站：<a className="url" onClick={() => {
                            this.setState({
                                isHiddenMianze: false
                            })
                        }}>{detailCommon.siteurl}</a></div>
                    </div>
                    {
                        detailCommon.platstatus == 1 ?
                            <div className="r normal">
                                <p>评测总条数：<i className="num">{dataZonglan.mpcount}</i></p>
                                <p>舆论总条数：<i className="num">{dataZonglan.sentcount}</i></p>
                                <p>点评总条数：<i className="num">{dataZonglan.commentcount}</i></p>
                            </div>
                            :
                            <div className="r black">
                                <div className="tagW"><span className="tagN">黑名单</span></div>
                                <div className="reason">原因：{detailCommon.blackinfo}</div>
                            </div>
                    }

                </div>
                {
                    detailCommon.platstatus == 1 && ((dataZonglan.goodtag !== null && dataZonglan.goodtag !== '' && dataZonglan.goodtag.length > 0) || (dataZonglan.badtag !== null && dataZonglan.badtag !== '' && dataZonglan.badtag.length > 0)) ?
                        <div className="tagsContainer">
                            <dl className="tags good">
                                <dt className="icon">
                                    <Icon type={require('../../../../assets/icons/new/ico-goodTag.svg')} color={'#0096E6'} size={'xxs'} />
                                </dt>
                                {
                                    dataZonglan.goodtag !== null && dataZonglan.goodtag !== '' && dataZonglan.goodtag.length > 0 ?
                                        dataZonglan.goodtag.map((item, i) => {
                                            return (
                                                <dd key={i}>
                                                    {item.tags}
                                                    {
                                                        item.tags == '一线平台' ?
                                                            <Icon type={require('../../../../assets/icons/new/ico-baseTag.svg')} color={'#fff'} size={'xxs'} />
                                                            :
                                                            null
                                                    }
                                                </dd>
                                            )
                                        })
                                        :
                                        <dd className="null">暂无</dd>
                                }

                            </dl>
                            <dl className="tags bad">
                                <dt className="icon">
                                    <Icon type={require('../../../../assets/icons/new/ico-badTag.svg')} color={'#bbb'} size={'xxs'} />
                                </dt>
                                {
                                    dataZonglan.badtag !== null && dataZonglan.badtag !== '' && dataZonglan.badtag.length > 0 ?
                                        dataZonglan.badtag.map((item, i) => {
                                            return (
                                                <dd key={i}>
                                                    {item.tags}
                                                </dd>
                                            )
                                        })
                                        :
                                        <dd className="null">暂无</dd>
                                }

                            </dl>
                        </div>
                        :
                        null
                }
                {
                    dataZonglan.flmllist != null ?
                        <div className="activity">
                            {
                                dataZonglan.flmllist.map((list, i) => {
                                    let url = 'http://m.fanlimofang.com/Activity/Detail/' + list.activityid;
                                    return (
                                        <a className={list.investtype == 1 ? "activityCon activityConFt" : "activityCon"} href={url} target='_blank' key={i}>
                                            <span className="icon"><i></i></span>
                                            <span className="text">{list.investtype == 0 ? '首投' : '复投'}{list.invest}奖{list.rebate}</span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }
                {
                    detailCommon.platstatus == 1 && detailCommon.negative_time !== null && detailCommon.negative_time != '' ?
                        <div className="zhengyi">
                            <span className="state">争议中</span>
                            <div className="cn">
                                <span className="time">争议时间：{Util.formatDate(detailCommon.negative_time)}</span>
                                {
                                    dataZonglan.zylinktitle !== null ?
                                        <span className="reason">
                                            争议原因：<a target="_blank" href={dataZonglan.zylinkurl !== null ? dataZonglan.zylinkurl : null}>{dataZonglan.zylinktitle}</a>
                                        </span>
                                        :
                                        null
                                }

                            </div>

                        </div>
                        :
                        null
                }
                {
                    detailCommon.platstatus != 1 ?
                        <div className="blackZoushi">
                            <div className="line"></div>
                            <ul>
                                <li>
                                    <span className="text">上线运营</span>
                                    <span className="icon"><i></i></span>
                                    <span className="time">{detailCommon.uptime != '1900-01-01' ? detailCommon.uptime : '未知'}</span>
                                </li>
                                {

                                    detailCommon.negative_time !== null && detailCommon.negative_time != '' ?
                                        <li className="zy">
                                            <span className="text">争议中</span>
                                            <span className="icon"><i></i></span>
                                            <span className="time">{Util.formatDate(detailCommon.negative_time)}</span>
                                            {
                                                dataZonglan.zylinktitle !== null ?
                                                    <a className="link" target="_blank" href={dataZonglan.zylinkurl}>查看相关材料</a>
                                                    :
                                                    null
                                            }
                                        </li>
                                        :
                                        null
                                }

                                <li className="black">
                                    <span className="text">{detailCommon.blackinfo}</span>
                                    <span className="icon"><i></i></span>
                                    <span className="time">{Util.formatDate(detailCommon.blacktime)}</span>
                                    {
                                        dataZonglan.blacklinkurl !== null ?
                                            <a className="link" target="_blank" href={dataZonglan.blacklinkurl}>查看相关材料</a>
                                            :
                                            null
                                    }

                                </li>
                            </ul>
                        </div>
                        :
                        null
                }
                {
                    this.state.isHiddenMianze ?
                        null
                        :
                        <Mianze that={this} siteUrl={detailCommon.acurl != '' && detailCommon.acurl != null ? detailCommon.acurl : 'http://' + detailCommon.siteurl} />
                }


            </div>
        )
    }

}