import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import { Icon } from 'antd-mobile';
import { fetchPosts } from '../../../redux/actions/index';
import Api from '../../../utils/api';
import Loading from '../../../components/loading/index';
import './index.scss'

const Sidebar = createReactClass({
    mixins: [History],
    render() {
        let loginState;
        const { datas } = this.props;
        if (localStorage.loginState) {
            loginState = JSON.parse(localStorage.loginState);
        }

        return (
            <div className='sideBarContainer'>
                <div className='sideBarHeader' onClick={() => {
                    if (localStorage.loginState) {
                        this.history.replaceState(1, '/member/index')
                    }
                    else {
                        this.history.replaceState(null, '/member/login')
                    }
                }}>
                    <div className='left'>
                        {
                            localStorage.loginState ?
                                <img src={loginState.r_avatar_img} className='portraitbig' />
                                :
                                <img src={require('../../../assets/images/portrait.png')} className='portraitbig' />
                        }
                        <span className='name'>{localStorage.loginState ? loginState.r_username : '登录'}</span>
                    </div>
                    <span className='right'>
                        <Icon type={require('../../../assets/icons/right.svg')} color={'#616267'} />
                    </span>
                </div>
                {
                    localStorage.loginState ?
                        <div className='sideBarListTitle'>
                            <span className='set'><Icon type={require('../../../assets/icons/set.svg')} color={'#8c96a0'} size='xxs' /></span>
                            <span>关注平台列表</span>
                            {
                                datas.items.length > 0 ?
                                    <span className='more' onClick={() => {
                                        this.history.replaceState(null, '/member/index')
                                    }}>更多</span>
                                    :
                                    null
                            }

                        </div>
                        :
                        null
                }
                <div className='sideBarBody'>
                    {
                        localStorage.loginState ?
                            datas.isFetching ?
                                <Loading />
                                :
                                datas.items.length > 0 ?
                                    datas.items.map((item, i) => {
                                        return (
                                            <Item key={i} data={item} />
                                        )
                                    })
                                    :
                                    <span className='null'>暂无关注平台</span>
                            :
                            null
                    }
                </div>
                <div className='sideBarFooter'>
                    <ul className='list'>
                        {/* <li>
                            <span className='icon'><Icon type={require('../../../assets/icons/gift.svg')} color={'#8c96a0'} size='xxs' /></span>
                            <span className='text'>推荐给好友</span>
                        </li> */}
                        <li
                            onClick={() => {
                                if (localStorage.loginState) {
                                    this.history.replaceState(1, '/member/index')
                                }
                                else {
                                    this.history.replaceState(null, '/member/login')
                                }
                            }}
                        >
                            <span className='icon set'><Icon type={require('../../../assets/icons/set.svg')} color={'#8c96a0'} size='xxs' /></span>
                            <span className='text'>设置</span>
                        </li>
                    </ul>
                    <div className='logoWp'>
                        <img src={require('../../../assets/images/logo2.png')} className='logo' />
                    </div>
                </div>
   
            </div>
        )
    },
    getData() {
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionList + '?memberid=' + memberid + '&page=' + 1 + '&pagesize=20';
        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('guanzhuListSider', url, 1, 'dataList'))
    },
    componentDidMount() {
        if (localStorage.loginState) {
            this.getData();
        }

    }
})


class Item extends React.Component {
    render() {
        const data = this.props.data;
        let fundType = null;
        const url = '/detail/' + data.id_dlp;
        switch (data.fundtype) {
            case 1:
                fundType = '1号'
                break;
            case 2:
                fundType = '2号'
                break;
            case 3:
                fundType = '3号'
                break;
            case 4:
                fundType = '活期'
                break;
            default:
                fundType = null
        }
        return (
            <Link to={url} className='link'>
                <div className='hd'>
                    <span className='platName'>{data.plat_name}</span>
                    {
                        data.platstatus == 1 ?

                            <span className='state'>（正常）</span>
                            :
                            data.platstatus == 3 ?
                                <span className='state stateZhengyi'>（争议中）</span>
                                :
                                <span className='state stateBlack'>（黑名单）</span>

                    }
                    {
                        fundType != null ?
                            <span className='shifan'>（示范投资{fundType}）</span>
                            : null
                    }
                </div>
                <div className='bd'>
                    <span className='pm'>
                        综合排名：
                    {
                            data.ordernum != 0 ?
                                data.ordernum
                                :
                                '暂无'
                        }
                    </span>
                    <span className='arrow'>
                        {
                            data.ordernum != 0 ?
                                <Icon type={data.changnum >= 0 ? require('../../../assets/icons/arrow-up.svg') : require('../../../assets/icons/arrow-down.svg')} color={data.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                :
                                null
                        }

                    </span>
                    <span>本周新舆论：{data.infonum}条</span>
                </div>
            </Link>
        )
    }
}

function mapStateToProps(state) {
    return { datas: state.guanzhuListSider };
}
export default connect(mapStateToProps)(Sidebar);