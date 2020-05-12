import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ListContainer from '../listContainer/'
import Api from '../../utils/api'
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index'

const listCout = [
    { title: '综指', field: 'score', 'isArrow': true, isArrowWidth: '0.8', width: '1.6' },
    { title: '之家', field: 'score_wdzj', 'isArrow': false, width: '1.5' },
    { title: '天眼', field: 'score_p2peye', 'isArrow': false, width: '1.5' },
    { title: '贷罗盘', field: 'score_dlp', 'isArrow': false, width: '1.5' },
    { title: '融360', field: 'level_r360', 'isArrow': false, width: '1.5' },
    { title: '星火', field: 'level_xinghuo', 'isArrow': false, width: '1.5' },
    { title: '羿飞', field: 'score_yifei', 'isArrow': false, width: '1' }
];

class FiveYears extends React.Component {
    render() {
        const { datas, history } = this.props;
        const pathname = this.props.location.pathname;
        const url = Api.fiveYears + '?type=all'
        return (
            <div className='container'>
                <Header title={'5年老平台'} history={history} pathname={pathname} />
                <NumBar numText={'5年老平台数量：' + datas + '家'} />
                <div className='noTabContainer'>
                    <ListContainer listCout={listCout} url={url} columnID={'fiveYears'} dataListName={'gradeList'} history={history} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { datas: state.totalNum.totalNum };
}

export default connect(mapStateToProps)(FiveYears);




