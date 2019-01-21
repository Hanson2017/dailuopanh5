import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { fetchPosts } from '../../redux/actions/index'
import Load from '../../components/loading'
import UpDateTime from './update';

import TabList from './component2/tabList';
import TabListFixed from './component2/tabListFixed';
import LoadMore from '../../components/loadMore';

import './index.scss';

const ListContainer = createReactClass({
    getInitialState: function () {
        return {
            fixed: false,
        }
    },
    render() {
        const { datas, updatetime, totalNum, history,field } = this.props;

        return (
            <div>
                {
                    this.props.noupdate ?
                        null
                        :
                        datas.isFetching ?
                            null
                            :
                            <UpDateTime updatetime={updatetime} totalNum={totalNum} />
                }
                {
                    this.props.updateQuery ?
                        <div className="update">更新时间：{updatetime}</div>
                        :
                        null
                }
                <div className='listContainer'>
                    <div className='table' ref={'tabList'} >
                        {
                            datas.isFetching ?
                                <Load />
                                :
                                <TabList pageName={this.props.pageName ? this.props.pageName : null} field={field} data={datas} Ttype={this.props.Ttype} history={history} />
                        }
                    </div>
                    {
                        datas.isFetching ?
                            null
                            :
                            <div className='listBotttom'>
                                <TabListFixed pageName={this.props.pageName ? this.props.pageName : null} data={datas} isFixed={this.state.fixed} Ttype={this.props.Ttype} history={history} />
                                <LoadMore onClick={this.loadMore} data={datas} />
                            </div>
                    }
                </div>
            </div>
        )
    },
    loadMore: function () {
        const columnID = this.props.columnID;
        const dataListName = this.props.dataListName;
        const { dispatch, datas } = this.props;

        const url = this.props.url + '&pagesize=50&page=' + datas.page;
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts(columnID, url, 2, dataListName))
        }
    },
    componentDidMount: function () {

        var that = this;
        const columnID = this.props.columnID;
        const dataListName = this.props.dataListName;
        const { dispatch, datas } = this.props;
        const url = this.props.url + '&pagesize=50&page=' + 1;
        dispatch(fetchPosts(columnID, url, 1, dataListName))
        this.refs.tabList.addEventListener('scroll', this.handleScroll)
    },
    componentWillUnmount: function () {
        this.refs.tabList.removeEventListener('scroll', this.handleScroll);

    },
    handleScroll: function (e) {
        if (this.refs.tabList.scrollLeft > 0) {
            this.setState({
                fixed: true
            })
        }
        else {
            this.setState({
                fixed: false
            })
        }
    },

})

function mapStateToProps(state, ownProps) {
    return {
        datas: state[ownProps.columnID],
        updatetime: state[ownProps.columnID].updatetime,
        totalNum: state[ownProps.columnID].totalNum
    };
}


export default connect(mapStateToProps)(ListContainer);
