import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import createReactClass from 'create-react-class';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import Title from '../../../components/title';
import Util from '../../../utils/util';
import LoadMore from '../../../components/loadMore';

import './index.scss';

const DetailPingCe = createReactClass({
    mixins: [History],
    render() {
        const { detailPingCe } = this.props;
        if (detailPingCe.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className='detailYulun'>
                    <Title titleText={'评测监控'} />
                    {
                        detailPingCe.items !== null && detailPingCe.items.length > 0 ?
                            <ul className='detailYulunList'>
                                {
                                    detailPingCe.items.map((text, i) => {
                                        return (
                                            <li key={i} onClick={() => this.history.pushState(null, '/pingce/' + text.id)}>
                                                <a className='title'>{text.title}</a>
                                                <span className='update'>{Util.formatDate(text.updatetime)}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className='dataNull'>暂无舆论</div>
                    }
                    {
                        detailPingCe.items !== null && detailPingCe.items.length >= 50 ?
                            <LoadMore onClick={this.loadMore.bind(this)} data={detailPingCe} />
                            :
                            null
                    }
                </div>
            )
        }
    },
    loadMore() {
        const { dispatch, detailPingCe } = this.props;
        const url = Api.detail + '?type=article' + '&id_dlp=' + this.props.id + '&page=' + detailPingCe.page + '&pagesize=50';

        if (!detailPingCe.loadMore && detailPingCe.pageCount >= detailPingCe.page) {
            dispatch(fetchPostsDeatail('pingce', url, 2))
        }
    },
    componentDidMount() {
        const url = Api.detail + '?type=article' + '&id_dlp=' + this.props.id + '&page=' + 1 + '&pagesize=50';
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('pingce', url))
    }
})

function mapStateToProps(state) {
    return { detailPingCe: state.deatail.pingce };
}

export default connect(mapStateToProps)(DetailPingCe);


