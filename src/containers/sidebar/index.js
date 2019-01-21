import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Modal, Toast } from 'antd-mobile';
import { fetchPosts } from '../../redux/actions/index';
import Api from '../../utils/api';
import Theme from '../../utils/theme';
import Loading from '../../components/loading/index';
import './index.scss'
const alertShow = Modal.alert;
class Sidebar extends React.Component {
    render() {
        let loginState;
        const { datas, history } = this.props;
        if (localStorage.loginState) {
            loginState = JSON.parse(localStorage.loginState);
        }
        const QQUrl = encodeURI("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101402579&redirect_uri=http://m.dailuopan.com/member/Login/qqlogin&state=dlp")
        return (
            <div className='sideBarContainer'>
                <div className='sideBarHeader'>
                    {
                        localStorage.loginState ?
                            <div className="sideBarHeaderlogin" onClick={() => {
                                const location = {
                                    pathname: '/member',
                                    state: { tabId: 3 }
                                }
                                history.push(location)
                            }}>
                                <div className="left">
                                    <img src={loginState.r_avatar_img} className='portrait' />
                                    <span className='name'>{loginState.r_username}</span>
                                </div>
                                <div className="right">
                                    <Icon type={require('../../assets/icons/new/arrow-right.svg')} color={'#fff'} size='xxs' />
                                </div>
                            </div>
                            :
                            <div className="sideBarHeaderNologin">
                                <p className="p1">未登录</p>
                                <p className="p2">请先登录，享受更好的体验</p>
                            </div>
                    }

                </div>
                <div className="sideBarBody">
                    {
                        localStorage.loginState ?
                            <div className="sideBarGuanzhuListContainer">
                                <div className="hd" onClick={() => {
                                    const location = {
                                        pathname: '/member',
                                        state: { tabId: 0 }
                                    }
                                    history.push(location)
                                }}>
                                    <span className="label">关注平台</span>
                                    <span className="icon"><Icon type={require('../../assets/icons/new/arrow-right.svg')} color={'#BFBFBF'} size='xxs' /></span>
                                </div>
                                {
                                    datas.isFetching ?
                                        <Loading />
                                        :
                                        datas.items.length > 0 ?
                                            <div className="list">
                                                {
                                                    datas.items.map((item, i) => {
                                                        return (
                                                            <Item key={i} data={item} />
                                                        )
                                                    })
                                                }
                                            </div>
                                            :
                                            <span className='null'>暂无关注平台</span>


                                }

                            </div>
                            :
                            <div className="singe">
                                <a className='link' href={QQUrl}>
                                    <span className='icon'>
                                        <Icon type={require('../../assets/icons/new/ico-qq.svg')} color={'#73c3ff'} size='lg' />
                                    </span>
                                    <span className='text'>QQ登录</span>
                                </a>
                                {/* <a className='link wx'
                                    onClick={() => alertShow('提示', '暂不支持微信登陆，请前往下载APP', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '确认', onPress: () => { window.open('http://a.app.qq.com/o/simple.jsp?pkgname=dailuopan.android') } },
                                    ])}
                                >
                                    <span className='icon'>
                                        <Icon type={require('../../assets/icons/new/ico-wechart.svg')} color={'#4ACE49'} size='lg' />
                                    </span>
                                    <span className='text'>微信登陆</span>
                                </a> */}
                            </div>
                    }
                </div>
                {
                    localStorage.loginState ?
                        <div className="sideBarFooter">
                            <div className="set" onClick={() => {
                                const location = {
                                    pathname: '/member',
                                    state: { tabId: 3 }
                                }
                                history.push(location)
                            }}>
                                <span className='icon'><Icon type={require('../../assets/icons/new/ico-set.svg')} color={Theme.color2} size='xxs' /></span>
                                <span className='text'>设置</span>
                            </div>
                        </div>
                        :
                        <div className="sideBarFooterNologin">
                            <img src={require('../../assets/images/logoside.png')} className='logo' />
                        </div>
                }

            </div>
        )
    }
    getData() {
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionList + '?memberid=' + memberid + '&page=' + 1 + '&pagesize=20';
        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('guanzhuListSider', url, 1, 'dataList'))
    }
    componentDidMount() {
        if (localStorage.loginState) {
            this.getData();
        }

    }
}


class Item extends React.Component {
    render() {
        const data = this.props.data;
        const url = '/detail/' + data.id_dlp;
        return (
            <Link to={url} className='item'>
                {
                    data.fundtype ?
                        <div className="fundtype">
                            <Icon type={require('../../assets/icons/new/fund-icon.svg')} color={Theme['fund' + data.fundtype + 'Color']} />
                            <span className="fundtypeNo">{data.fundtype}</span>
                        </div>
                        :
                        null
                }
                <div className="platCon">
                    <span className='platName'>{data.plat_name}</span>
                    {
                        data.platstatus == 1 ?
                            <span className='state'>正常运营</span>
                            :
                            data.platstatus == 3 ?
                                <span className='stateBlack zy'>争议中</span>
                                :
                                <span className='stateBlack'>黑名单</span>

                    }
                </div>
                <div className="orderCon">
                    <span className="label">综合排名</span>
                    <div className="lisPmNo">
                        <span className="num">
                            {
                                data.ordernum != 0 ?
                                    data.ordernum
                                    :
                                    <i className="null">暂无</i>
                            }
                        </span>
                        <span className="arrow">
                            {
                                data.ordernum != 0 ?
                                    <Icon type={data.changnum >= 0 ? require('../../assets/icons/new/arrow-up.svg') : require('../../assets/icons/new/arrow-down.svg')} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />
                                    :
                                    null
                            }
                        </span>
                    </div>
                </div>
                <div className="yl">
                    <span className="label">本周新舆论</span>
                    <span className="num">{data.infonum}</span>
                </div>

            </Link>
        )
    }
}

function mapStateToProps(state) {
    return { datas: state.guanzhuListSider };
}
export default connect(mapStateToProps)(Sidebar);