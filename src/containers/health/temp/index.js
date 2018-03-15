import React, { Component } from 'react';


import Api from '../../../utils/api'
import ListContainer from '../../listContainer/'

export default class List extends React.Component {
    render() {
        const { history, type, listCout, columnID } = this.props;
        const url = Api.health + '?type=' + type;
        return (
            <ListContainer listCout={listCout} url={url} columnID={columnID} dataListName={'dataList'} history={history} />
        )
    }
}


