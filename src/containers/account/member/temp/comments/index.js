import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Api from '../../../../../utils/api';
import Util from '../../../../../utils/util';
import Theme from '../../../../../utils/theme';
import Loading from '../../../../../components/loading';
import LoadMore from '../../../../../components/loadMore';
import { fetchPosts } from '../../../../../redux/actions/index';

import './index.scss';


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }
    render() {
        const { data } = this.props;
        const { isHidden } = this.state;
        const triangleName = isHidden ? 'triangle-down' : 'triangle-up';
        return (
            <li>
                <div className="hd">
                    <span className="type">{data.ctype == 'p2p' ? '平台' : '文章'}</span>
                    <Link className="title" to={data.ctype == 'p2p' ? '/detail/' + data.cid : '/pingce/' + data.cid}>{data.title}</Link>
                </div>  
                <div className="bd">
                    {
                        isHidden ?
                            Util.cutText(Util.delHtmlTag(data.detail), 75)
                            :
                            Util.delHtmlTag(data.detail)
                    }
                </div>
                <div className="ft">
                    <span className="date">{Util.formatDate(data.updatetime)}</span>
                    {
                        Util.delHtmlTag(data.detail).length > 75 ?
                            <div className="openCon"
                                onClick={() => {
                                    this.setState({
                                        isHidden: !this.state.isHidden
                                    })
                                }}
                            >
                                <span className="icon"><Icon type={require('../../../../../assets/icons/new/' + triangleName + '.svg')} color={isHidden ? '#bbb' : Theme.color} size={'xxs'} /></span>
                                <span className={isHidden ? 'open' : 'close'}>{isHidden ? '展开' : '收起'}</span>
                            </div>
                            :
                            null
                    }
                </div>
            </li>
        )

    }
}


class AccountComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.loadMore = this.loadMore.bind(this);
    }
    render() {
        const { history, datas } = this.props;

        if (datas.isFetching) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div className='commentListAccountContainer'>
                    {
                        datas.items.length !== 0 ?
                            <ul className='list'>
                                {
                                    datas.items.map((item, i) => {
                                        return (
                                            <Item data={item} key={i} />
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='null'>暂无评论</div>
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

        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.commentListAccount + '?memberid=' + memberid + '&page=' + 1 + '&pagesize=50';

        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('commentListAccount', url, 1, 'dataList'))

    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.commentListAccount + '?memberid=' + memberid + '&page=' + datas.page + '&pagesize=50';
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('commentListAccount', url, 2, 'dataList'))
        }
    }
}

function mapStateToProps(state) {
    return { datas: state.commentListAccount };
}

export default connect(mapStateToProps)(AccountComments);