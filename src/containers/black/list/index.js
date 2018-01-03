import React, { Component } from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import Api from '../../../utils/api'
import { fetchPosts } from '../../../redux/actions/index';
import Load from '../../../components/loading';
import LoadMore from '../../../components/loadMore';
import UpDateTime from '../../../components/upDateTime';
import './index.scss';

const List = createReactClass({
    mixins: [History],
    render() {
        const { dispatch, data, updatetime } = this.props;
        if (data.isFetching) {
            return (
                <Load />
            )
        }
        else {
            return (
                <div className='blackList'>
                    <UpDateTime updatetime={updatetime} />
                    <dl className='tabListBlack'>
                        <dt className='item'>
                            <span className='ic1'>平台名称</span>
                            <span className='ic2'>省市</span>
                            <span className='ic3'>{this.props.ctype == 'black' ? '黑名单原因' : '争议时间'}</span>
                        </dt>
                        {
                            data.items.map((item, i) => {
                                return (
                                    <dd key={i} onClick={() => { this.history.pushState(null, '/detail/' + item.id_dlp) }}>
                                        <div className='item'>
                                            <span className='ic1'>{item.plat_name}</span>
                                            <span className='ic2'>{item.province}/{item.city}</span>
                                            <span className='ic3'>{this.props.ctype == 'black' ? item.info_operation : item.negative_time}</span>
                                        </div>
                                        <div className='info'>
                                            <span className='url'>{item.siteurl}</span>
                                            <span className='yygs'>{item.info_yygs}</span>
                                        </div>
                                    </dd>
                                )
                            })
                        }
                    </dl>
                    <LoadMore onClick={this.loadMore.bind(this)} data={data} />
                </div>
            )
        }

    },
    loadMore() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;

        const url = Api[this.props.column] + '?type=all&pagesize=50&page=' + data.page;
        if (!data.loadMore && data.pageCount >= data.page) {
            dispatch(fetchPosts(columnID, url, 2, 'dataList'))
        }
    },
    componentDidMount() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;
        const url = Api[this.props.column] + '?type=all&pagesize=50&page=' + 1;
        dispatch(fetchPosts(columnID, url, 1, 'dataList'))
    }
})

function mapStateToProps(state, ownProps) {
    return {
        data: state[ownProps.columnID],
        updatetime: state[ownProps.columnID].updatetime
    };
}


export default connect(mapStateToProps)(List);
