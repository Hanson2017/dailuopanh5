import React, { Component, PropTypes } from 'react';

import Api from '../../../utils/api'
import ListContainer from '../../listContainer/'

const listCout = [
    { title: '综指', field: 'score', 'isArrow': true, isArrowWidth: '0.8', width: '1.6' },
    { title: '之家', field: 'score_wdzj', 'isArrow': false, width: '1.5' },
    { title: '天眼', field: 'score_p2peye', 'isArrow': false, width: '1.5' },
    { title: '贷罗盘', field: 'score_dlp', 'isArrow': false, width: '1.5' },
    { title: '融360', field: 'level_r360', 'isArrow': false, width: '1.5' },
    { title: '星火', field: 'level_xinghuo', 'isArrow': false, width: '1.5' },
    { title: '羿飞', field: 'score_yifei', 'isArrow': false, width: '1' }
];


export default class List extends React.Component {
    render() {
        const {history}=this.props;
        const typeInfo=this.props.type;
        const url=Api[typeInfo.column]+'?type='+typeInfo.type;
        return (
            <ListContainer noupdate={true} listCout={listCout} url={url} columnID={typeInfo.columnID} dataListName={'dataList'} Ttype={this.props.Ttype} history={history} />
        )
    }
}


