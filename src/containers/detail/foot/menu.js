import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';

export default class DetailFootMenu extends React.Component {
    render(){
        return(
            <div className="menu">
                <Link to={'/'} className="link">首页</Link>
                <a target="_blank" href={'http://bbs.dailuopan.com'} className="link">论坛</a>
                <Link to={'/pingji/jigou'} className="link">机构评级</Link>
                <Link to={'/health'} className="link">健康度分析</Link>
                <Link to={'/query'} className="link">多维度查询</Link>
                <Link to={'/data'} className="link">数据详情</Link>
            </div>
        )
    }
}