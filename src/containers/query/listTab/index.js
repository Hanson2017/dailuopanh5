import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../../utils/api';
import Util from '../../../utils/util';
import { fetchPosts } from '../../../redux/actions/index';
import Load from '../../../components/loading/index';
import List from '../temp/listTab/index';


class ListTab extends React.Component {
    render() {
        const { data, updatetime,history } = this.props;
        if (data.isFetching) {
            return (
                <Load />
            )
        }
        else {
            return (
                <List tabIndex={this.props.tabIndex} data={data.items} updatetime={updatetime} tabWidth={{ width: this.props.tabWidth + 'rem' }} titleText={this.props.titleText ? this.props.titleText : null} history={history} />
            )
        }
    }
    componentDidMount() {
        const columnID = this.props.columnID;
        const type = this.props.type;
        const url = Api.diqu + '?type=' + type;
        const { dispatch } = this.props;
        dispatch(fetchPosts(columnID, url, 1, 'dataList'))
    }
}

function mapStateToProps(state, ownProps) {
    return {
        data: state[ownProps.columnID],
        updatetime: state[ownProps.columnID].updatetime,
    };
}

export default connect(mapStateToProps)(ListTab);