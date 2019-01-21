import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'
import ListContainer from '../listContainer/'
import Api from '../../utils/api'

const listCout = [
    { title: '成交量(万)', title2: '资金流(万)', field: 'amount', field2: 'inamount', 'isArrow': false, width: '1.8' },
    { title: '当日待还金额(万)', title2: '累计待还金额(万)', field: 'stayStill', field2: 'stayStillOfTotal', 'isArrow': false, width: '2.6' },
    { title: '平均出借金额(万)', title2: '平均借款金额(万)', field: 'avgBidMoney', field2: 'avgBorrowMoney', 'isArrow': false, width: '2.6' },
    { title: '当日出借人数(人)', title2: '当日借款人数(人)', field: 'bidderNum', field2: 'borrowerNum', 'isArrow': false, width: '2.6' },
    { title: '待收出借人数(人)', title2: '待还借款人数(人)', field: 'bidderWaitNum', field2: 'borrowWaitNum', 'isArrow': false, width: '2.6' },
    { title: '前10大出借人待收占比(%)', title2: '前10大借款人待还占比(%)', field: 'top10DueInProportion', field2: 'top10StayStillProportion', 'isArrow': false, width: '3.4' },
    { title: '收益率(%)', title2: '满标用时(分钟)', field: 'rate', field2: 'fullloanTime', 'isArrow': false, width: '2' },
    { title: '平均借款期限(月)', title2: '', field: 'loanPeriod', field2: '', 'isArrow': false, width: '2.2' },
];

class Data extends React.Component {
    render() {
        const { totalNum, history } = this.props;
        const url = Api.data + '?type=all'
        return (
            <div className='ptNoTab'>
                <Header title={'数据详情'} history={history} />
                <div className='noTabContainer'>
                    <ListContainer listCout={listCout} url={url} columnID={'dataList'} dataListName={'dataList'} pageName={'data'} history={history} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { totalNum: state.totalNum.totalNum };
}

export default connect(mapStateToProps)(Data);


