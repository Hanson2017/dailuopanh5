import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import createReactClass from 'create-react-class';

import Api from '../../../utils/api';
import Util from '../../../utils//util';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import LoadMore from '../../../components/loadMore';
import Title from '../../../components/title';

import './index.scss';

const DetailComment = createReactClass({
    mixins: [History],
    render() {
        const { detailComment } = this.props;
        if (detailComment.isFetching) {
            return <Loading />
        }
        else {

            return (
                <div className='detailComment'>
                    <Title titleText={'网友评论'} />
                    {
                        detailComment.items.length > 0 ?
                            <ul className='detailCommentList'>
                                {
                                    detailComment.items.map((text, i) => {
                                        var source;
                                        if (text.type == '1') {
                                            source = require('../../../assets/images/good.png');
                                        }
                                        else if (text.type == '2') {
                                            source = require('../../../assets/images/average.png');
                                        }
                                        else {
                                            source = require('../../../assets/images/bad.png');
                                        }
                                        return (
                                            <li key={i}>
                                                <div className='hd'>
                                                    <div>
                                                        <span className='name'>{text.username}</span>
                                                        <span className='type'> <img src={source} /></span>
                                                    </div>
                                                    <span className='update'>{Util.formatDate(text.updatetime)}</span>
                                                </div>
                                                <p>{text.detail}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='dataNull'>暂无评论</div>
                    }
                    {
                        detailComment.items.length >= 10 ?
                            <LoadMore onClick={this.loadMore.bind(this)} data={detailComment} />
                            :
                            null
                    }
                    <div onClick={()=>{this.history.pushState(null, '/commentForm')}}>我要评论</div>
                </div>
            )
        }
    },
    loadMore() {
        const { dispatch, detailComment } = this.props;
        const url = Api.commentListNew + '?id_dlp=' + this.props.id + '&page=' + detailComment.page + '&pagesize=10';
        if (!detailComment.loadMore && detailComment.pageCount >= detailComment.page) {
            dispatch(fetchPostsDeatail('comment', url, 2))
        }
    },
    componentDidMount() {
        const url = Api.commentListNew + '?id_dlp=' + this.props.id + '&page=' + 1 + '&pagesize=10';
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('comment', url))
    }
})

function mapStateToProps(state) {
    return { detailComment: state.deatail.comment };
}

export default connect(mapStateToProps)(DetailComment);


