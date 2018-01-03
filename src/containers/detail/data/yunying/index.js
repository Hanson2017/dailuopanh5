import React, { Component } from 'react';
import './index.scss';
import Title from '../../../../components/title';

export default class Yunying extends React.Component {
    render() {
        let data = this.props.data;
        if (data !== null) {
            return (
                <div className='detailDataYunyingWp'>
                    <Title titleText={'交易类数据（万）'} />
                    <ul className='detailDataYunying'>
                        <li>
                            <span className="ic-1"><label>成交量：</label>{data.amount}</span>
                            <span className="ic-2"><label>资金净流入/出：</label>{data.inamount}</span>
                        </li>
                        <li>
                            <span className="ic-1"><label>当日待还金额：</label>{data.stayStill}</span>
                            <span className="ic-2"><label>累计待还：</label>{data.stayStillOfTotal}</span>
                        </li>
                        <li>
                            <span className="ic-1"><label>平均投资金额：</label>{data.avgBidMoney}</span>
                            <span className="ic-2"><label>平均借款金额：</label>{data.avgBorrowMoney}</span>
                        </li>
                    </ul>

                    <Title titleText={'用户类数据（人）'} />
                    <ul className='detailDataYunying'>
                        <li>
                            <span className="ic-1"><label>当日投资人数：</label>{data.bidderNum}</span>
                            <span className="ic-2"><label>当日借款人数：</label>{data.borrowerNum}</span>
                        </li>
                        <li>
                            <span className="ic-1"><label>待收投资人数：</label>{data.bidderWaitNum}</span>
                            <span className="ic-2"><label>待还借款人数：</label>{data.borrowWaitNum}</span>
                        </li>
                    </ul>

                    <Title titleText={'占比数据'} />
                    <ul className='detailDataYunying'>
                        <li>
                            前10大投资人待收占比：{data.top10DueInProportion}
                        </li>
                        <li>
                            前10大借款人待还占比：{data.top10StayStillProportion}
                        </li>
                    </ul>

                    <Title titleText={'其它数据'} />
                    <ul className='detailDataYunying'>
                        <li>
                            <span className="ic-1"><label>收益率：</label>{data.rate} %</span>
                            <span className="ic-2"><label>平均借款期限：</label>{data.loanPeriod} 月</span>
                        </li>
                        <li>
                            <span className="ic-1"><label>满标用时：</label>{data.fullloanTime} 分钟</span>
                        </li>
                    </ul>
                </div>
            )
        }
        else{
            return (
                <div className='dataNull'>暂无运营数据</div>
            )
        }

    }
}