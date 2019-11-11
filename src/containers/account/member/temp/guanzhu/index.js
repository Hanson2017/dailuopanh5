import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Modal, Toast } from 'antd-mobile';
import { fetchPosts } from '../../../../../redux/actions/index';
import Api from '../../../../../utils/api';
import Theme from '../../../../../utils/theme';
import Loading from '../../../../../components/loading/index';
import LoadMore from '../../../../../components/loadMore';
import './index.scss';
const alertShow = Modal.alert;

class Item extends React.Component {
    render() {
        const { data, guanzhuDel, that } = this.props;
        return (
            <div className="list">
                <div className="hd">
                    <div className="left">
                        <div className="platContainer">
                            <Link className="plat" to={'/detail/' + data.id_dlp}>{data.plat_name}</Link>
                            {
                                data.fundtype ?
                                    <div className="fundtype">
                                        <Icon type={require('../../../../../assets/icons/new/fund-icon.svg')} color={Theme['fund' + data.fundtype + 'Color']} />
                                        <span className="fundtypeNo">{data.fundtype}</span>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        {
                            data.platstatus == 1 ?
                                <span className="state">正常运营</span>
                                :
                                data.platstatus == 3 ?
                                    <span className="state stateBlack zy">争议中</span>
                                    :
                                    <span className="state stateBlack">黑名单</span>
                        }
                    </div>
                    {
                        data.flmflist.length > 0 ?
                            <div className={guanzhuDel ? "right right2" : "right"}>
                                {
                                    data.flmflist.map((list, i) => {
                                        let url = 'http://m.fanlimofang.com/Activity/Detail/' + list.activityid;
                                        return (
                                            <a className={list.investtype == 1 ? "activityCon activityConFt" : "activityCon"} href={url} target='_blank' key={i}>
                                                <span className="icon"><i></i></span>
                                                <span className="text">{list.investtype == 0 ? '首投' : '复投'}{list.invest}奖{list.rebate}</span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                            :
                            null
                    }
                    {
                        guanzhuDel ?
                            <div className="delBtn"
                                onClick={() => {
                                    alertShow('提示', '你确认要取消关注该平台?', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '确认', onPress: () => { that.attentionDel(data.id_dlp); } },
                                    ])
                                }}
                            >
                                <Icon type={require('../../../../../assets/icons/new/icon-del.svg')} color={"#D51920"} size={'sm'} />
                            </div>
                            :
                            null
                    }
                </div>
                <div className="bd">
                    <div className="paimingZh">
                        <div className="paimingZhList">
                            <span className="label">综合排名:</span>
                            {
                                data.ordernum != 0 ?
                                    <div className="con">
                                        <span className="odr">{data.ordernum}</span>
                                        <Icon type={data.changnum >= 0 ? require('../../../../../assets/icons/new/arrow-up.svg') : require('../../../../../assets/icons/new/arrow-down.svg')} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />
                                        <span className="num">(共{data.countnum}家)</span>
                                    </div>
                                    :
                                    <span className="null">暂无</span>
                            }
                        </div>
                        <div className="yulun">本周新舆论：<i>{data.infonum}</i></div>
                    </div>
                    <ul className="paiming">
                        {this.item('网贷之家', data.wdzj)}
                        {this.item('贷罗盘', data.dlp)}
                        {this.item('网贷天眼', data.p2peye)}
                        {this.item('融360', data.rong360)}
                      
                        
                    </ul>
                </div>
            </div>
        )
    }
    item(nameText, data) {
        return (
            <li className="paimingList">
                <span className="label">{nameText}:</span>
                {
                    data != null ?
                        <div className="con">
                            <span className="odr">{data.ordernum}名</span>
                            <Icon type={data.changenum >= 0 ? require('../../../../../assets/icons/new/arrow-up.svg') : require('../../../../../assets/icons/new/arrow-down.svg')} color={data.changenum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />
                            <span className="num">(共{data.countnum}家)</span>
                        </div>
                        :
                        <span className="nul">暂无</span>
                }
            </li>
        )
    }

}

class Guanzhu extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }
    render() {
        const { datas, guanzhuDel } = this.props;
        if (datas.isFetching) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div className='guanzhuContainer'>
                    {
                        datas.items.length != 0 ?
                            <ul className='guanzhuList'>
                                {
                                    datas.items.map((item, i) => {
                                        return (
                                            <Item data={item} key={i} guanzhuDel={guanzhuDel} that={this} />
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='null'>暂无关注平台</div>
                    }
                    {
                        datas.totalNum > 20 ?
                            <LoadMore onClick={this.loadMore} data={datas} />
                            :
                            null
                    }

                </div>
            )
        }

    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionList + '?memberid=' + memberid + '&page=' + 1 + '&pagesize=20';

        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('guanzhuList', url, 1, 'dataList'))
    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionList + '?memberid=' + memberid + '&page=' + datas.page + '&pagesize=20';
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('guanzhuList', url, 2, 'dataList'))
        }
    }

    // 取消关注
    attentionDel(id) {
        const that = this;
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
                    Toast.success('取消关注成功', 2);
                    that.getData()
                }
            });
    }
}

function mapStateToProps(state) {
    return { datas: state.guanzhuList };
}

export default connect(mapStateToProps)(Guanzhu);