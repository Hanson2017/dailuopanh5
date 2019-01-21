import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/loading/index';
import LoadMore from '../../../components/loadMore';

import Api from '../../../utils/api';
import Util from '../../../utils/util';
import { fetchPosts } from '../../../redux/actions/index';

import Item from '../item';

class PingceList extends React.Component {

    render() {
        const { datas, history } = this.props;

        return (
            <div className=''>
                {
                    datas.isFetching ?
                        <Loading />
                        :
                        <div className='content'>
                            <ul className="List">
                                {

                                    datas.items.map((item, i) => {
                                        return (
                                            <Item data={item} key={i} />
                                        )
                                    })
                                }
                            </ul>
                            <LoadMore onClick={this.loadMore.bind(this)} data={datas} />
                        </div>
                }

            </div>
        )
    }
    componentDidMount() {

        const { dispatch, columnID } = this.props;
        var url = '';
        if (columnID == 'pingceList') {
            url = Api.pingCeList_new + '?page=' + 1 + '&pagesize=' + 50;
        }
        else {
            url = Api.pingCeList_hot + '?pagenum=50';
        }

        dispatch(fetchPosts(columnID, url, 1, 'dataList'))

    }
    loadMore() {
        const { dispatch, datas, columnID } = this.props;
        const url = Api.pingCeList_new + '?pagesize=50&page=' + datas.page;

        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('pingceList', url, 2, 'dataList'))
        }
    }
}



function mapStateToProps(state, ownProps) {
    return {
        datas: state[ownProps.columnID],
    };
}

export default connect(mapStateToProps)(PingceList);
