import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Util from '../../../utils/util';
import Api from '../../../utils/api'
import Load from '../../../components/loading'
import LoadMore from '../../../components/loadMore';
import { fetchPosts } from '../../../redux/actions/index'
import Item from '../item';


import './index.scss';

class List extends React.Component {
    render() {
        const { data, totalNum, history } = this.props;
        return (
            <div className="reportContainer">
                {
                    data.isFetching ?
                        <Load />
                        :
                        <div>
                            <ul className='list'>
                                {
                                    data.items !== null && data.items.length > 0 ?
                                        data.items.map((item, i) => {
                                            return (
                                                <Item key={i} data={item} />
                                            )
                                        })
                                        :
                                        <li className='null'>暂无数据</li>
                                }
                            </ul>
                            {
                                data.items !== null && totalNum > 50 ?
                                    <LoadMore onClick={this.loadMore.bind(this)} data={data} />
                                    :
                                    null
                            }

                        </div>
                }

            </div>
        )
    }
    loadMore() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;
        const type = this.props.type;
        const url = Api.getReportsList + '?type=' + type + '&pagesize=50&page=' + data.page;;
        if (!data.loadMore && data.pageCount >= data.page) {
            dispatch(fetchPosts(columnID, url, 2, 'dataList'))
        }
    }
    componentDidMount() {
        const columnID = this.props.columnID;
        const type = this.props.type;
        const { dispatch } = this.props;
        const url = Api.getReportsList + '?type=' + type + '&pagesize=50&page=' + 1;
        dispatch(fetchPosts(columnID, url, 1, 'dataList'))
    }
}

function mapStateToProps(state, ownProps) {
    return {
        data: state[ownProps.columnID],
        totalNum: state.totalNum.totalNum
    };
}

export default connect(mapStateToProps)(List);