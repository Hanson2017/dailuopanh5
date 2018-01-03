import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../../utils/api';
import { fetchPosts } from '../../../redux/actions/index'
import Load from '../../../components/loading'
import LoadMore from '../../../components/loadMore';
import UpDateTime from '../../../components/upDateTime';
import List from '../../query/temp/listTab/index';

class ListTab extends React.Component {
    render() {
        const { data, updatetime } = this.props;
        if (data.isFetching) {
            return (
                <Load />
            )
        }
        else {
            return (
                <div>
                    <UpDateTime updatetime={updatetime} />
                    <List data={data.items} tabWidth={{width:this.props.tabWidth+'rem'}} titleText={this.props.titleText?this.props.titleText:null} />
                </div>
            )
        }

    }
    componentDidMount() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;
        const url=Api.black+'?type='+this.props.type;
        dispatch(fetchPosts(columnID, url, 1, 'dataList'))
    }
}

function mapStateToProps(state, ownProps) {
    return {
        data: state[ownProps.columnID],
        updatetime: state[ownProps.columnID].updatetime
    }
}


export default connect(mapStateToProps)(ListTab);