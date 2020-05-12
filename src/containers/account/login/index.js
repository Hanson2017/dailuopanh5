import React, { Component } from 'react';
import { Icon, Modal, Toast } from 'antd-mobile';
import Header from '../../../components/navbar/index';
import './index.scss';
const clientHeight = window.screen.height;
const alertShow = Modal.alert;
export default class Login extends React.Component {
    render() {
        const { history } = this.props;
        const QQUrl = encodeURI("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101402579&redirect_uri=http://m.dailuopan.com/member/Login/qqlogin&state=dlp")
        return (
            <div className='loginContainer' style={{ height: clientHeight }}>
                <Header title={'登录'} search='null' history={history} />
                <div className="content">
                    <div className='loginIcon'>
                        <a className='link' href={QQUrl}>
                            <span className='icon'>
                                <Icon type={require('../../../assets/icons/new/ico-qq.svg')} color={'#73c3ff'} size='lg' />
                            </span>
                            <span className='text'>QQ登录</span>
                        </a>
                        <a className='link qq'
                            onClick={() => alertShow('提示', '暂不支持微信登陆，请前往下载APP', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                { text: '确认', onPress: () => { window.open('http://a.app.qq.com/o/simple.jsp?pkgname=dailuopan.android') } },
                            ])}
                        >
                            <span className='icon'>
                                <Icon type={require('../../../assets/icons/new/ico-wechart.svg')} color={'#4ACE49'} size='lg' />
                            </span>
                            <span className='text'>微信登陆</span>
                        </a>
                    </div>
                    <div className='logo'>
                        <img src={require('../../../assets/images/logoLogin.png')} />
                    </div>
                </div>
            </div>
        )
    }
}