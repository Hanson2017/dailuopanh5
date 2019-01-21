import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Modal, Toast } from 'antd-mobile';

import Api from '../../../utils/api';
import Util from '../../../utils/util';
import Loading from '../../../components/loading/index';
import Header from '../../../components/navbar/index';
import LoadMore from '../../../components/loadMore';
import Item from '../../comment/item/index2';
import { fetchPosts } from '../../../redux/actions/index';

const alertShow = Modal.alert;
const clientHeight = window.screen.height;

class PingceDetailComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: null,
            pagesize: 50
        }
    }
    componentWillMount() {
        var match = this.props.match;
        this.setState({
            cid: match.params.id
        });
    }
    render() {
        const { pagesize } = this.state;
        const { history, datas } = this.props;
        return (
            <div className="ptNoTab pingceCommentContainer" >
                <Header title={'评论'} history={history} search={'null'} />
                {
                    datas.isFetching ?
                        <Loading />
                        :
                        <div className="box content" style={{ minHeight: clientHeight - 42 - 50 }}>

                            <ul className='list'>
                                {
                                    datas.items.map((item, i) => {
                                        return (
                                            <Item data={item} key={i} leftNo={true} />
                                        )
                                    })
                                }

                            </ul>
                            {
                                datas.totalNum > pagesize ?
                                    <LoadMore onClick={this.loadMore.bind(this)} data={datas} />
                                    :
                                    null
                            }

                        </div>
                }
                <div className="foot">
                    <button className="inputBtn" onClick={() => {
                        this.onPressComment()
                    }}>我也要发表评论</button>
                </div>

            </div>
        )
    }
    componentDidMount() {
        const { cid, pagesize } = this.state;
        const { dispatch } = this.props;
        const url = Api.pingCeCommentList + '?id_dlp=' + cid + '&page=1&pagesize=' + pagesize;
        dispatch(fetchPosts('commentPCList', url, 1, 'dataList'))
    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const { cid, pagesize } = this.state;
        const url = Api.pingCeCommentList + '?id_dlp=' + cid + '&page=' + datas.page + '&pagesize=' + pagesize;
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('commentPCList', url, 2, 'dataList'))
        }
    }
    //点击评论    
    onPressComment() {
        const { cid } = this.state;
        const { history } = this.props;

        if (localStorage.loginState) {
            history.push('/pingCeCommentsForm', { cid: cid })
        }
        else {
            alertShow('提示', '请先登录后评论', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => this.goLogin() },
            ])
        }
    }
    // 跳转登陆
    goLogin() {
        const { history } = this.props;
        history.push('/member')
    }
}


function mapStateToProps(state) {
    return { datas: state.commentPCList };
}

export default connect(mapStateToProps)(PingceDetailComments);