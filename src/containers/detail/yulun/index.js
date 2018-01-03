import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import Title from '../../../components/title';
import Util from '../../../utils/util';
import LoadMore from '../../../components/loadMore';

import './index.scss';

class DetailYulun extends React.Component {
    render() {
        const { detailYulun } = this.props;
        if (detailYulun.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className='detailYulun'>
                    <Title titleText={'舆论监控'}>
                        <span className='yulunNUm'>舆论总条数：<i>{detailYulun.totalNum}</i></span>
                    </Title>
                    {
                        detailYulun.items.length > 0 ?
                            <ul className='detailYulunList'>
                                {
                                    detailYulun.items.map((text, i) => {
                                        return (
                                            <li key={i}>
                                                <a className='title' href={text.siteurl}>{text.title}</a>
                                                <span className='update'>{Util.formatDate(text.pubtime)}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='dataNull'>暂无舆论</div>
                    }
                    {
                        detailYulun.items.length >= 50 ?
                            <LoadMore onClick={this.loadMore.bind(this)} data={detailYulun} />
                            :
                            null
                    }
                </div>
            )
        }
    }
    loadMore() {
        const { dispatch, detailYulun } = this.props;
        const url = Api.detail + '?type=sent' + '&id_dlp=' + this.props.id + '&page=' + detailYulun.page + '&pagesize=50';

        if (!detailYulun.loadMore && detailYulun.pageCount >= detailYulun.page) {
            dispatch(fetchPostsDeatail('yulun', url, 2))
        }
    }
    componentDidMount() {
        const url = Api.detail + '?type=sent' + '&id_dlp=' + this.props.id + '&page=' + 1 + '&pagesize=50';
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('yulun', url))
    }
}

function mapStateToProps(state) {
    return { detailYulun: state.deatail.yulun };
}

export default connect(mapStateToProps)(DetailYulun);


