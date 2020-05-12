import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class HomeNum extends React.Component {
    render() {
        const {data}=this.props;
        return (
            <div className="homeNumContainer box">
                <Link to="/pingji/jigou" className='link'>正常运营<span className="num">{data.Maincount}</span></Link>
                <Link to="/data" className='link'>数据监控<span className="num">{data.Maincount_grade}</span></Link>
                <Link to="/fund" className='link'>示范出借<span className="num">{data.Maincount_fund}</span></Link>
                <Link to="/gongshang" className='link'>工商监控<span className="num">{data.Maincount_gongshang}</span></Link>
                <Link to="/pingji/jigou" className='link'>评级监控<span className="num">{data.Maincount_flow}</span></Link>
                
                <Link to="/zhengyi" className='link'>争议平台<span className="num zhengyi">{data.Maincount_negative}</span></Link>
                <Link to="/black" className='link'>黑名单<span className="num black">{data.Maincount_black}</span></Link>
            </div>
        )
    }
}