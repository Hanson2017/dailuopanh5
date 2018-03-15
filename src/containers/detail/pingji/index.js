import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Toast } from 'antd-mobile';
import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';
import Shuzhi from './shuzhi';
import Bijiao from './bijiao';
import Fund from './fund';
import './index.scss';

const alertShow = Modal.alert;


class DetailPingji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGuanzhu: false
        }
    }
    render() {
        const { detailPingji, detailCommon, history } = this.props;
        if (detailPingji.isFetching || detailCommon.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className='detailPingjiWp'>
                    <TabBar>
                        <div name={'评级数值'}>
                            {
                                detailCommon.dataSource.platstatus != 1 ?
                                    <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                    :
                                    <Shuzhi data={detailPingji.dataSource.dataDetail} platName={detailPingji.dataSource.plat_name} replatData={detailPingji.dataSource.replat} history={history} />
                            }

                        </div>
                        <div name={'评级比较'}>
                            {
                                detailCommon.dataSource.platstatus != 1 ?
                                    <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                    :
                                    <Bijiao data={detailPingji.dataSource.gradecompare} platName={detailPingji.dataSource.plat_name} />
                            }
                        </div>
                        <div name={'示范投资'}>
                            <Fund data={detailPingji.dataSource.fundDetail} platName={detailPingji.dataSource.plat_name} history={history} />
                        </div>
                    </TabBar>
                    <div className={this.state.isGuanzhu ? 'guanzhuBtn guanzhuBtnCancel' : 'guanzhuBtn'}
                        onClick={() => {
                            if (localStorage.loginState) {
                                if (this.state.isGuanzhu) {
                                    alertShow('提示', '你确定要取消关注该平台吗', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '确认', onPress: () => { this.attentionDel(); } },
                                    ])
                                }
                                else {
                                    this.attentionAdd()
                                }
                            }
                            else {
                                alertShow('提示', '请先登录后关注！', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确认', onPress: () => history.push('/member') },
                                ])
                            }

                        }}
                    >
                        <span className='icon'>{this.state.isGuanzhu ? '-' : '+'}</span>
                        <span className='text'>{this.state.isGuanzhu ? '取消关注' : '关注'}</span>
                    </div>
                </div>
            )
        }
    }
    componentDidMount() {
        const url = Api.detail + '?type=all' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('pingji', url))

        if (localStorage.loginState) {
            this.isAttention()
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    //是否关注了该平台
    isAttention() {
        const that = this;
        const id = this.props.id;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.isAttention + '?id_dlp=' + id + '&memberid=' + memberid;
        that._isMounted = true
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    if (that._isMounted) {
                        if (json.data == 1) {
                            that.setState({
                                isGuanzhu: true,
                            })
                        }
                        else {
                            that.setState({
                                isGuanzhu: false,
                            })
                        }
                    }

                }
            });
    }
    // 添加关注
    attentionAdd() {
        const that = this;
        const id = this.props.id;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionAdd + '?id_dlp=' + id + '&memberid=' + memberid;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    that.setState({
                        isGuanzhu: true,
                    })
                    that.successToast()
                    console.log('添加关注成功')
                }
            });


    }
    // 取消关注
    attentionDel() {
        const that = this;
        const id = this.props.id;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;

        const url = Api.attentionDel + '?id_dlp=' + id + '&memberid=' + memberid;

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (json.result == 1) {
                    that.setState({
                        isGuanzhu: false,
                    })
                    that.failToast()
                    console.log('取消关注成功')
                }
            });
    }
    successToast() {
        Toast.success('关注成功', 2);
    }
    failToast() {
        Toast.success('取消关注成功', 2);
    }
}


function mapStateToProps(state) {
    return {
        detailPingji: state.deatail.pingji,
        detailCommon: state.deatail.common
    };
}

export default connect(mapStateToProps)(DetailPingji);


