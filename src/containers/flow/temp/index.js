import React, { Component } from 'react';


import Api from '../../../utils/api'
import ListContainer from '../../listContainer/index2'

export default class List extends React.Component {
    render() {
        const { history, type, field, columnID } = this.props;
        const url = Api.flow + '?type=' + type;
        return (
            <ListContainer field={field} url={url} columnID={columnID} dataListName={'dataList'} history={history} />
        )
    }
}


