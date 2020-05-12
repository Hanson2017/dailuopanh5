import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

export default class UpDateTime extends React.Component {
    render() {
        const {updatetime,totalNum}=this.props;
        return (
           <div className='listupDateTime'>
                 <span className="icon"><Icon type={require('../../../assets/icons/new/ico-time.svg')} color={'#BBE2FF'} size={'xxs'} /></span>
                 <span className="time">更新时间：{updatetime}</span>
                 <span className="num">参与平台数量：{totalNum}家</span>
            </div>
        )
    }
}
