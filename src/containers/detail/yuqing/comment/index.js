import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Modal, Toast } from 'antd-mobile';
import Api from '../../../../utils/api';
import Loading from '../../../../components/loading/index';
import LoadMore from '../../../../components/loadMore';
import { fetchPostsDeatail } from '../../../../redux/actions/index';
import Item from '../../../comment/item/index2';
const alertShow = Modal.alert;
class DetailYuqingComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagesize: 50,
        };
    }
    render() {
        const { detailComment } = this.props;
        if (detailComment.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="pinglunCon box">
                    <ul className='list'>
                        {
                            detailComment.items !== null && detailComment.items.length > 0 ?
                                detailComment.items.map((item, i) => {
                                    return (
                                        <Item key={i} data={item} leftNo={true} />
                                    )
                                })
                                :
                                <li className='null'>暂无舆论</li>
                        }
                        {
                            detailComment.items !== null && detailComment.items.length >= this.state.pagesize ?
                                <LoadMore onClick={this.loadMore.bind(this)} data={detailComment} />
                                :
                                null
                        }
                    </ul>

                    <div className="foot">
                        <button className="inputBtn" onClick={() => {
                            this.onPressComment()
                        }}>我也要发表评论</button>
                    </div>

                </div>
            )
        }

    }
    //点击评论    
    onPressComment() {
        const { cid } = this.state;
        const { history, id, detailCommon } = this.props;

        if (localStorage.loginState) {
            history.push('/commentForm', { cid: id, platName: detailCommon.plat_name })
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
    loadMore() {
        const { dispatch, id, detailComment } = this.props;
        const url = Api.commentListNew + '?id_dlp=' + id + '&page=' + detailComment.page + '&pagesize=' + this.state.pagesize;
        if (!detailComment.loadMore && detailComment.pageCount >= detailComment.page) {
            dispatch(fetchPostsDeatail('comment', url, 2))
        }
    }
    componentDidMount() {
        const { dispatch, id } = this.props;
        const url = Api.commentListNew + '?id_dlp=' + id + '&page=' + 1 + '&pagesize=' + this.state.pagesize;
        dispatch(fetchPostsDeatail('comment', url))
    }
}

function mapStateToProps(state) {
    return {
        detailComment: state.deatail.comment,
        detailCommon: state.deatail.common.dataSource
    };
}

export default connect(mapStateToProps)(DetailYuqingComment);
