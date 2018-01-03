import React, { Component } from 'react';


import Api from '../../../utils/api'
import ListContainer from '../../listContainer/'

export default class List extends React.Component {
    render() {
       
        const type=this.props.type;
        const listCout=this.props.listCout;
        const url=Api.pingji+'?type='+type;
        const columnID=this.props.columnID;
        return (
            <ListContainer listCout={listCout} url={url} columnID={columnID} dataListName={'gradeList'} />
        )
    }
}


