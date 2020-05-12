import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Modal, Toast } from 'antd-mobile';
import Api from '../../../../../utils/api';
import Util from '../../../../../utils/util';
import Theme from '../../../../../utils/theme';
import Loading from '../../../../../components/loading';
import LoadMore from '../../../../../components/loadMore';
import { fetchPosts } from '../../../../../redux/actions/index';
import './index.scss';
const alertShow = Modal.alert;

class Item extends React.Component {
    render() {
        const { data, collectionDel,that } = this.props;
        const article = data.article;
        const plats = data.plats;
        return (
            <li className="yulunListContainer">
                {
                    collectionDel ?
                        <div className="delBtn"
                            onClick={() => {
                                alertShow('提示', '是否取消收藏?', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确认', onPress: () => { that.collectionDel(article.id); } },
                                ])
                            }}
                        >
                            <Icon type={require('../../../../../assets/icons/new/icon-del.svg')} color={"#D51920"} size={'sm'} />
                        </div>
                        :
                        null
                }
                <Link to={'/pingce/' + article.id} className={collectionDel ?'title title2':'title'}>{article.title}</Link>
                <div className="ft">
                    <div className='plats'>
                        {
                            plats !== '' && plats.length > 0 ?
                                plats.map((item, i) => {
                                    return (
                                        <Link key={i} to={'/detail/' + item.id_dlp} className="platBox">{item.plat_name}</Link>
                                    )
                                })
                                :
                                <span className="platBox">其他</span>
                        }
                    </div>
                    <span className="date">{Util.formatDate(article.updatetime)}</span>
                </div>
            </li>
        )
    }
}


class AccountCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { history, datas, collectionDel } = this.props;

        if (datas.isFetching) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div className='collectionListAccountContainer'>
                    {
                        datas.items.length != 0 ?
                            <ul className='list'>
                                {
                                    datas.items.map((item, i) => {
                                        return (
                                            <Item data={item} key={i} collectionDel={collectionDel} that={this} />
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='null'>暂无收藏</div>
                    }
                    {
                        datas.totalNum > 50 ?
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
    getData(){
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.collectionList + '?memberid=' + memberid + '&page=' + 1 + '&pagesize=50';
        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('collectionListAccount', url, 1, 'dataList'))
    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.collectionList + '?memberid=' + memberid + '&page=' + datas.page + '&pagesize=50';
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('collectionListAccount', url, 2, 'dataList'))
        }
    }
    // 取消收藏
    collectionDel(cid) {
        let that = this;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.collectiondel + '?cid=' + cid + '&memberid=' + memberid;

        fetch(url)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function (json) {
            if (json.result == 1) {
                Toast.success('已取消收藏', 2);
                that.getData()
            }
        });
    }
}



function mapStateToProps(state) {
    return { datas: state.collectionListAccount };
}

export default connect(mapStateToProps)(AccountCollection);