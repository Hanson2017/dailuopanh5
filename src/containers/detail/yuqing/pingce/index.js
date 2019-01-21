import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../../../utils/api';
import Loading from '../../../../components/loading/index';
import LoadMore from '../../../../components/loadMore';
import { fetchPostsDeatail } from '../../../../redux/actions/index';
import Item from '../all/pingceItem';

class DetailYuqingPingce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagesize: 50,
        };
    }
    render() {
        const { detailPingCe } = this.props;
        if (detailPingCe.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="pingceCon box">
                    <ul className='list'>
                        {
                            detailPingCe.items !== null && detailPingCe.items.length > 0 ?
                                detailPingCe.items.map((item, i) => {
                                    return (
                                        <Item key={i} data={item} />
                                    )
                                })
                                :
                                <li className='null'>暂无评测</li>
                        }
                        {
                            detailPingCe.items !== null && detailPingCe.items.length >= this.state.pagesize ?
                                <LoadMore onClick={this.loadMore.bind(this)} data={detailPingCe} />
                                :
                                null
                        }
                    </ul>



                </div>
            )
        }

    }
    loadMore() {
        const { dispatch, id, detailPingCe } = this.props;
        const url = Api.detail + '?type=article' + '&id_dlp=' + id + '&page=' + detailPingCe.page + '&pagesize=' + this.state.pagesize;

        if (!detailPingCe.loadMore && detailPingCe.pageCount >= detailPingCe.page) {
            dispatch(fetchPostsDeatail('pingce', url, 2))
        }
    }
    componentDidMount() {
        const { dispatch, id } = this.props;
        const url = Api.detail + '?type=article' + '&id_dlp=' + id + '&page=' + 1 + '&pagesize=' + this.state.pagesize;
        dispatch(fetchPostsDeatail('pingce', url))
    }
}

function mapStateToProps(state) {
    return { detailPingCe: state.deatail.pingce };
}

export default connect(mapStateToProps)(DetailYuqingPingce);
