import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import Util from '../../../utils/util';
import Api from '../../../utils/api'
import Load from '../../../components/loading'
import LoadMore from '../../../components/loadMore';
import { fetchPosts } from '../../../redux/actions/index'

import './index.scss';

const List = createReactClass({
    mixins: [History],
    render() {
        const { data, totalNum } = this.props;
        return (
            <div>
                {
                    data.isFetching ?
                        <Load />
                        :
                        <div>
                            <ul className='reportList'>
                                {
                                    data.items.length > 0 ?
                                        data.items.map((item, index) => {
                                            return (
                                                <li className='list'
                                                    onClick={() => { this.history.pushState(item.type, '/reportDetail/' + item.id) }}
                                                >
                                                    <h6 className='title'>{item.title}</h6>
                                                    <p className='ft'>
                                                        发布时间<span className='addtime'>{Util.formatDate(item.addtime)}</span>
                                                    </p>
                                                </li>
                                            )
                                        })
                                        :
                                        <li>暂无数据</li>
                                }
                            </ul>
                            {
                                totalNum > 50 ?
                                    <LoadMore onClick={this.loadMore.bind(this)} data={data} />
                                    :
                                    null
                            }

                        </div>
                }

            </div>
        )
    },
    loadMore() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;
        const type = this.props.type;
        const url = Api.getReportsList + '?type=' + type + '&pagesize=50&page=' + data.page;;
        if (!data.loadMore && data.pageCount >= data.page) {
            dispatch(fetchPosts(columnID, url, 2, 'dataList'))
        }
    },
    componentDidMount() {
        const columnID = this.props.columnID;
        const type = this.props.type;
        const { dispatch } = this.props;
        const url = Api.getReportsList + '?type=' + type + '&pagesize=50&page=' + 1;
        dispatch(fetchPosts(columnID, url, 1, 'dataList'))
    }
})

function mapStateToProps(state, ownProps) {
    return {
        data: state[ownProps.columnID],
        totalNum: state.totalNum.totalNum
    };
}

export default connect(mapStateToProps)(List);