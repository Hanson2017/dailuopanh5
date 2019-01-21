import React, { Component, PropTypes } from 'react';
import Header from '../../components/navbar/index';
import './index.scss';
const clientHeight = window.screen.height;

export default class About extends React.Component {
    render(){
        const {history}=this.props;
        return(
            <div className="ptNoTab aboutContainer" style={{ height: clientHeight}}>
                <Header title={'关于贷罗盘'} search='null' history={history} />    
                <div className="hd">
                    <img src={require('../../assets/images/logoAbout.png')} className="logo" />
                    <p className="v">版本号3.0.1</p>
                </div>
                <div className="bd">贷罗盘成立于2015年，是专注网贷行业的数据平台。我们希望通过客观的数据展示，来协助用户进行投资理财决策。</div>
                <div className="ft">官网: www.dailuopan.com</div>
            </div>
        )
    }
}