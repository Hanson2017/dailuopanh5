import React, { Component } from 'react';
import Title from '../../../../components/title';

export default class DetailDataYunying extends React.Component {
    render() {
        const { data } = this.props;
        if (data !== null) {
            return (
                <div className='detailDataYunyingContainer'>
                    <div className="box">
                        <Title data={'交易类数据'} />
                        <div className='list'>
                            <span>成交量：{data.amount} 万</span>
                            <span>资金净流入/出：{data.inamount} 万</span>
                            <span>当日待还金额：{data.stayStill}万</span>
                            <span>累计待还：{data.stayStillOfTotal}万</span>
                            <span>平均投资金额：{data.avgBidMoney} 万</span>
                            <span>平均借款金额：{data.avgBorrowMoney} 万</span>
                        </div>
                    </div>
                    <div className="box mt10">
                        <Title data={'用户类数据'} />
                        <div className='list'>
                            <span>当日投资人数：{data.bidderNum} 人</span>
                            <span>当日借款人数：{data.borrowerNum} 人</span>
                            <span>待收投资人数：{data.bidderWaitNum} 人</span>
                            <span>待还借款人数：{data.borrowWaitNum} 人</span>
                        </div>
                    </div>

                    <div className="box mt10">
                        <Title data={'占比数据'} />
                        <div className='list'>
                            <span>前10大投资人待收占比：  {data.top10DueInProportion} %</span>
                            <span></span>
                            <span>前10大借款人待还占比：  {data.top10StayStillProportion} %</span>
                        </div>
                    </div>

                    <div className="box mt10">
                        <Title data={'其它数据'} />
                        <div className='list'>
                            <span>收益率：{data.rate} %</span>
                            <span>平均借款期限：{data.loanPeriod} 月</span>
                            <span>满标用时：{data.fullloanTime} 分钟</span>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='detailDataYunyingContainer'>
                    <div className='null'>暂无数据</div>
                </div>
            )
        }

    }
}