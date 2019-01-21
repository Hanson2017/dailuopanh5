import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../../../utils/api';
import Loading from '../../../../components/loading/index';
import LoadMore from '../../../../components/loadMore';
import { fetchPostsDeatail } from '../../../../redux/actions/index';
import Item from '../all/yulunItem';

class DetailYuqingYulun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagesize: 50,
        };
    }
    render() {
        const { detailYulun } = this.props;
        if (detailYulun.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="pingceCon box">
                    <ul className='list'>
                        {
                            detailYulun.items !== null && detailYulun.items.length > 0 ?
                            detailYulun.items.map((item, i) => {
                                    return (
                                        <Item key={i} data={item} />
                                    )
                                })
                                :
                                <li className='null'>暂无舆论</li>
                        }
                        {
                            detailYulun.items !== null && detailYulun.items.length >= this.state.pagesize ?
                                <LoadMore onClick={this.loadMore.bind(this)} data={detailYulun} />
                                :
                                null
                        }
                    </ul>



                </div>
            )
        }

    }
    loadMore() {
        const { dispatch, id, detailYulun } = this.props;
        const url = Api.detail + '?type=sent' + '&id_dlp=' + id + '&page=' + detailYulun.page + '&pagesize=' + this.state.pagesize;

        if (!detailYulun.loadMore && detailYulun.pageCount >= detailYulun.page) {
            dispatch(fetchPostsDeatail('yulun', url, 2))
        }
    }
    componentDidMount() {
        const { dispatch, id } = this.props;
        const url = Api.detail + '?type=sent' + '&id_dlp=' + id + '&page=' + 1 + '&pagesize=' + this.state.pagesize;
        dispatch(fetchPostsDeatail('yulun', url))
    }
}

function mapStateToProps(state) {
    return { detailYulun: state.deatail.yulun };
}

export default connect(mapStateToProps)(DetailYuqingYulun);
