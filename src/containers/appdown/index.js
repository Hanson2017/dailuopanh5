import React, { Component } from 'react';
import './index.scss';

const clientHeight = window.screen.height;

export default class AppDown extends React.Component {
    render() {
        return (
            <div className="appDownContainer" style={{ height: clientHeight }}>
                <div className='appDownLogo'>
                    <img src={require('../../assets/images/appdownLogo.png')} className='logo' alt="贷罗盘" />
                </div>
                <div className='appDownLogoText'>
                    <img src={require('../../assets/images/appdownLogoText.png')} className='text' alt="贷罗盘" />
                </div>
                <div className='appDownBiaoyu'>专注网贷数据</div>
                <div className='appDownImg'>
                    <img src={require('../../assets/images/appdownImg.png')} className='img' alt="贷罗盘" />
                </div>
                <a className="appDownDownBtn" href="http://a.app.qq.com/o/simple.jsp?pkgname=dailuopan.android" target="_blank">
                    <img src={require('../../assets/images/appdownBtn.png')} className='downBtn' alt="贷罗盘" />
                </a>
                <div className="copyright">
                    <p>深圳罗盘科技有限公司</p>
                    <p>@2017 Shenzhen Compass Technology Co., Ltd.</p>
                </div>
            </div>
        )
    }
}